import fetch from "cross-fetch";
import Logger from "../utils/Logger.js";
import contracts from "../contracts/index.js";
import deployments from "../core/deployments.js";
import utils from "../utils/index.js";
import CaskUnits from "../core/units.js";
import chains from "../core/chains.js";

import EthersConnection from "../core/EthersConnection.js";
import Vault from "../vault/index.js";
import {ethers} from "ethers";
import Query from "../query/index.js";



/**
 * @memberOf DCA
 * @typedef DCADetail
 * @property {string} dcaId DCA ID
 * @property {number} status DCA status
 * @property {number} createdAt Unix timestamp of DCA creation time
 */

/**
 * @memberOf DCA
 * @typedef CreateDCAResult
 * @property {Object} tx Create Transaction
 * @property {number} chainId Chain ID that the transaction took place on
 * @property {string} dcaId ID of newly created DCA
 */

/**
 * @memberOf DCA
 * @typedef DCAAssetDefinition
 * @property {string} outputAssetSymbol Outut asset symbol
 */

/**
 * Service class to handle interacting with the Cask DCA system
 */
class DCA {

    /**
     * Create an instance of the DCA service.
     *
     * @param options See CaskSDK configuration.
     * @see CaskSDK
     */
    constructor(options={}) {
        this.options = {
            ...options,
            ...options?.dca
        };

        this.logger = new Logger('CaskSDK::DCA', this.options.logLevel);

        this.manifestBaseUrl = this.options.manifestBaseUrl || 'https://dcamanifest.cask.fi';
        this.manifestUrl = this.options.manifestUrl;

        if (!this.options?.cache) {
            this.options.cache = {};
        }
        this.options.cache.dca = this;

        if (this.options.cache?.query) {
            this.query = this.options.cache?.query;
        } else {
            this.query = new Query(this.options);
            this.options.cache.query = this.query;
        }

        if (this.options.cache.vault) {
            this.vault = this.options.cache.vault
        } else {
            this.vault = new Vault(options);
            this.options.cache.vault = this.vault;
        }
    }

    /**
     * Initialize the DCA service.
     *
     * @param {Object} args Function arguments
     * @param {EthersConnection} [args.ethersConnection] EthersConnection instance
     */
    async init({ethersConnection}={}) {
        this.logger.trace(`Initializing Cask DCA service.`);
        if (!ethersConnection) {
            this.ethersConnection = new EthersConnection(this.options);
        } else {
            this.ethersConnection = ethersConnection;
        }
        this.ethersConnection.onSwitchChain(async() => { await this._initContracts() });

        if (!this.query.ethersConnection) {
            await this.query.init({ethersConnection: this.ethersConnection});
        }
        if (!this.vault.ethersConnection) {
            await this.vault.init({ethersConnection: this.ethersConnection});
        }
        if (!ethersConnection) {
            await this.ethersConnection.init();
        }

        this.logger.info(`Cask DCA service initialization complete.`);
    }

    serviceAvailable() {
        return this.CaskDCA !== undefined;
    }

    async _initContracts() {
        let vaultReadyResolve;

        if (deployments.CaskDCA[this.ethersConnection.environment]?.[this.ethersConnection.chainId] &&
            deployments.CaskDCA[this.ethersConnection.environment][this.ethersConnection.chainId] !==
            '0x0000000000000000000000000000000000000000') {
            this.CaskDCA = contracts.CaskDCA({ethersConnection: this.ethersConnection});

            this.vault.onAssetsLoaded(async () => {
                vaultReadyResolve();
            });

            return new Promise((resolve, reject) => {
                vaultReadyResolve = resolve;
            });
        }
    }

    /**
     * Get the details of a specific DCA.
     *
     * @see The SDK guide for more details on unit formatting at {@link https://docs.cask.fi/developer-docs/javascript-sdk}
     * @param dcaId
     * @return {Promise<DCA.DCADetail>}
     */
    async get(dcaId) {
        const dcaInfo = await this.CaskDCA.getDCA(dcaId);
        if (!dcaInfo ||
            dcaInfo?.user === '0x0000000000000000000000000000000000000000')
        {
            throw new Error("DCA not found");
        }

        return {
            dcaId,
            user: dcaInfo.user,
            to: dcaInfo.to,
            router: dcaInfo.router,
            priceFeed: dcaInfo.priceFeed,
            path: dcaInfo.path,
            amount: dcaInfo.amount,
            period: dcaInfo.period,
            slippageBps: dcaInfo.slippageBps,
            status: dcaInfo.status,
            createdAt: dcaInfo.createdAt,
            processAt: dcaInfo.processAt,
            totalAmount: dcaInfo.totalAmount,
            currentAmount: dcaInfo.currentAmount,
            numBuys: dcaInfo.numBuys,
            numSkips: dcaInfo.numSkips,
            minPrice: dcaInfo.minPrice,
            maxPrice: dcaInfo.maxPrice,
        }
    }

    /**
     * Get history for a DCA
     *
     * @param {string} dcaId DCA ID
     */
    async history(dcaId, {limit=10, offset=0, orderBy="timestamp", orderDirection="desc"}={}) {
        const query = `
query Query {
    caskDCAEvents(
        where: {dcaId: "${dcaId}"}
        first: ${limit}
        skip: ${offset}
        orderBy: ${orderBy}
        orderDirection: ${orderDirection}
    ) {
        txnId
        timestamp
        type
        assetAddress
        amount
        buyQty
        skipReason
    }
}`;
        const results = await this.query.rawQuery(query);
        return results.data.caskDCAEvents;
    }

    /**
     * Get the estimated spend for a DCA for a specific period
     *
     * @param {string} address User address
     * @param {number} [period=1 month] Commitment period
     */
    async estimatedCommitment(address, period=2628000) {
        const query = `
query Query {
  caskDCAs(where: {
      user: "${address.toLowerCase()}",
      status_in: [Active]
    }
  ) {
    period
    amount
    currentQty
    currentAmount
    status
    totalAmount
  }
}`;
        const results = await this.query.rawQuery(query);

        return results.data.caskDCAs.reduce((balance, dca) => {
            return balance + (period / dca.period * parseFloat(dca.amount));
        }, 0);
    }

    /**
     * Create a new DCA.
     *
     * @param {Object} args Function arguments
     * @param {string} args.asset Address of asset to DCA
     * @return {DCA.CreateDCAResult}
     */
    async create({to, asset, amount, amountSimple, amountAsset, totalAmount=0, totalAmountSimple, totalAmountAsset,
                     period, slippageBps=100, minPrice=0, maxPrice=0})
    {
        if (!this.ethersConnection.signer) {
            throw new Error("Cannot perform transaction without ethers signer");
        }

        if (!to) {
            to = this.ethersConnection.address;
        }

        if (amountSimple) {
            amount = ethers.utils.parseUnits(amountSimple.toFixed(2), CaskUnits.BASE_ASSET_DECIMALS);
        } else if (amountAsset) {
            amount = amountAsset;
        }

        if (totalAmountSimple) {
            totalAmount = ethers.utils.parseUnits(totalAmountSimple.toFixed(2), CaskUnits.BASE_ASSET_DECIMALS);
        } else if (totalAmountAsset) {
            totalAmount = totalAmountAsset;
        }

        const assetInfo = await this.assetDefinition(asset);

        if (!assetInfo) {
            throw new Error(`Cannot get asset definition for asset ${asset}`);
        }

        const assetSpec = [
            assetInfo.router.toLowerCase(),
            assetInfo.priceFeed.toLowerCase(),
            ...assetInfo.path.map((a) => a.toLowerCase())
        ];

        const merkleProof = utils.dcaMerkleProof(this.dcaManifest.assets, assetInfo);

        const tx = await this.CaskDCA.connect(this.ethersConnection.signer).createDCA(
            assetSpec,
            merkleProof,
            to,
            amount,
            totalAmount,
            period,
            slippageBps,
            minPrice,
            maxPrice);

        const events = (await tx.wait()).events || [];
        const event = events.find((e) => e.event === "DCACreated");
        if (!event) {
            throw new Error("Could not find DCACreated after DCA creation");
        }
        return {
            tx,
            chainId: this.ethersConnection.chainId,
            dcaId: event.args.dcaId,
            user: event.args.user,
            to: event.args.to,
            inputAsset: event.args.inputAsset,
            outputAsset: event.args.outputAsset,
            amount: event.args.amount,
            totalAmount: event.args.totalAmount,
            period: event.args.period,
        }
    }

    /**
     * Pause an active DCA
     * @param {string} dcaId DCA ID
     * @return {Promise<{tx: *}>}
     */
    async pause(dcaId) {

        if (!this.ethersConnection.signer) {
            throw new Error("Cannot perform transaction without ethers signer");
        }

        const tx = await this.CaskDCA
            .connect(this.ethersConnection.signer).pauseDCA(dcaId);
        await tx.wait();
        return {tx};
    }

    /**
     * Resume a paused DCA.
     * @param {string} dcaId DCA ID
     * @return {Promise<{tx: *}>}
     */
    async resume(dcaId) {

        if (!this.ethersConnection.signer) {
            throw new Error("Cannot perform transaction without ethers signer");
        }

        const tx = await this.CaskDCA
            .connect(this.ethersConnection.signer).resumeDCA(dcaId);
        await tx.wait();
        return {tx};
    }

    /**
     * Cancel a DCA.
     * @param {string} dcaId DCA ID
     * @return {Promise<{tx: *}>}
     */
    async cancel(dcaId) {

        if (!this.ethersConnection.signer) {
            throw new Error("Cannot perform transaction without ethers signer");
        }

        const tx = await this.CaskDCA
            .connect(this.ethersConnection.signer).cancelDCA(dcaId);
        await tx.wait();
        return {tx};
    }

    /**
     * Load the DCA asset manifest.
     * @return {Promise<Object>}
     */
    async loadDCAManifest(force=false) {

        if (this.dcaManifest && !force) {
            return this.dcaManifest;
        }

        let manifestUrl = this.manifestUrl;
        if (!manifestUrl) {
            if (this.manifestBaseUrl) {
                const chainInfo = chains.lookupChain(this.ethersConnection.chainId);
                manifestUrl = `${this.manifestBaseUrl}/${chainInfo.shortName}.json`;
            }
        }

        if (manifestUrl) {
            this.logger.debug(`Loading DCA manifest from ${manifestUrl}`);
        } else {
            throw new Error("No manifestUrl configured - cannot load asset manifest");
        }

        const fetchPromise = new Promise((resolve, reject) => {
            fetch(manifestUrl)
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(err => reject(err));
        });

        this.dcaManifest = await fetchPromise;
        return this.dcaManifest;
    }

    /**
     * Get the specified asset definition from the asset manifest
     * @return {Promise<DCA.DCAAssetDefinition>}
     */
    async assetDefinition(asset) {
        await this.loadDCAManifest();

        return this.dcaManifest.assets.find((a) =>
            a.chainId === this.ethersConnection.chainId &&
            a.path[a.path.length-1].toLowerCase() === asset.toLowerCase()
        )
    }

    /**
     * Get the current price of a DCA asset denominated in the vault base asset
     * @return {Promise<BigNumber>}
     */
    async assetPrice(asset) {
        if (typeof(asset) === 'string') {
            asset = await this.assetDefinition(asset);
        }
        if (!asset?.path) {
            throw new Error(`Unable to locate asset ${asset}`);
        }

        if (!asset.priceFeed || asset.priceFeed === '0x0000000000000000000000000000000000000000') { // LP price

            const inputAsset = asset.path[0];
            const outputAsset = asset.path[asset.path.length-1];

            const router = contracts.IUniswapV2Router02({
                routerAddress: asset.router,
                ethersConnection: this.ethersConnection});

            const inputAssetInfo = this.vault.getAsset(inputAsset);
            const erc20 = contracts.ERC20({
                tokenAddress: outputAsset,
                ethersConnection: this.ethersConnection});
            const outputDecimals = await erc20.decimals();

            const oneInput = ethers.BigNumber.from(10).pow(inputAssetInfo.assetDecimals);

            const amountsOut = await router.getAmountsOut(oneInput, asset.path);
            const amountOutScaled = CaskUnits.scalePrice(
                amountsOut[amountsOut.length-1],
                outputDecimals,
                inputAssetInfo.assetDecimals);

            const outputPrice = oneInput.mul(oneInput).div(amountOutScaled);

            if (inputAsset.toLowerCase() !== this.vault.baseAsset.address.toLowerCase()) {
                const baseAssetResult = await this.vault.baseAsset.priceFeedContract.latestRoundData();

                const basePrice = CaskUnits.scalePrice(
                    outputPrice,
                    inputAssetInfo.assetDecimals,
                    this.vault.baseAsset.assetDecimals);

                const quotePrice = CaskUnits.scalePrice(
                    baseAssetResult.answer,
                    this.vault.baseAsset.priceFeedDecimals,
                    this.vault.baseAsset.assetDecimals);

                const one = ethers.BigNumber.from(10).pow(this.vault.baseAsset.assetDecimals);

                return basePrice.mul(one).div(quotePrice);
            } else {
                return outputPrice;
            }

        } else { // oracle price

            if (this.ethersConnection.oracleType() === 'band') {
                return await this.bandAssetPrice(asset);
            } else {
                return await this.chainlinkAssetPrice(asset);
            }
        }
    }

    async chainlinkAssetPrice(asset) {
        if (typeof(asset) === 'string') {
            asset = await this.assetDefinition(asset);
        }

        const assetToUSDOracle = contracts.AggregatorV3Interface({
            priceFeed: asset.priceFeed,
            ethersConnection: this.ethersConnection});

        const assetResult = await assetToUSDOracle.latestRoundData();

        const baseAssetInfo = this.vault.getAsset(this.vault.baseAsset);
        const baseAssetResult = await baseAssetInfo.priceFeedContract.latestRoundData();

        const basePrice = CaskUnits.scalePrice(
            assetResult.answer,
            await assetToUSDOracle.decimals(),
            baseAssetInfo.assetDecimals);

        const quotePrice = CaskUnits.scalePrice(
            baseAssetResult.answer,
            baseAssetInfo.priceFeedDecimals,
            baseAssetInfo.assetDecimals);

        const one = ethers.BigNumber.from(10).pow(baseAssetInfo.assetDecimals);

        return basePrice.mul(one).div(quotePrice);
    }

    async bandAssetPrice(asset) {
        if (typeof(asset) === 'string') {
            asset = await this.assetDefinition(asset);
        }

        const bandOracle = contracts.IStdReference({
            referenceAddress: asset.priceFeed,
            ethersConnection: this.ethersConnection,
        });

        const baseAssetInfo = this.vault.getAsset(this.vault.baseAsset);

        const bandAssetBaseSymbol = asset.outputAssetSymbol.replace(/\.[^.]+$/, "").toUpperCase();
        const bandAssetQuoteSymbol = baseAssetInfo.symbol.replace(/\.[^.]+$/, "").toUpperCase();

        const oracleResult = await bandOracle.getReferenceData(bandAssetBaseSymbol, bandAssetQuoteSymbol);

        return {
            updatedAt: oracleResult.lastUpdatedBase,
            price: CaskUnits.scalePrice(oracleResult.rate, 18, baseAssetInfo.assetDecimals),
        };
    }
}

export default DCA;