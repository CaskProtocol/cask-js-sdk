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
import Tokens from "../tokens/index.js";



/**
 * @memberOf DCA
 * @typedef DCADetail
 * @property {string} dcaId DCA ID
 * @property {number} status DCA status
 * @property {string} to Address which receives purchased asset
 * @property {number} swapProtocol Swap protocol used for DCA
 * @property {string} swapData Extra calldata associated with DCA used by swap protocol
 * @property {string} router Router used to perform swaps
 * @property {string} priceFeed Address of oracle price feed for the purchasing asset
 * @property {Array<string>} path Asset path for DCA swap
 * @property {number} amount Amount of vault baseAsset to spend on each DCA swap
 * @property {number} period Period (in seconds) between each asset purchase
 * @property {number} maxSlippageBps Maximum slippage (in BPS) allowed during a purchase swap attempt
 * @property {number} createdAt Unix timestamp of DCA creation time
 * @property {number} processAt Unit timestamp of next DCA purchase
 * @property {number} totalAmount Total amount of vault baseAsset value to spend across the lifetime of the DCA
 * @property {number} currentAmount Current amount of vault baseAsset value spent while the DCA has been active
 * @property {number} numBuys Number of swap purchases performed to date while the DCA has been active
 * @property {number} numSkips Number of skips due to an issue with the DCA
 * @property {number} minPrice Minimum price (in vault baseAssset value) the asset must be for the purchase swap to be attempted
 * @property {number} maxPrice Maximum price (in vault baseAssset value) the asset must be for the purchase swap to be attempted
 */

/**
 * @memberOf DCA
 * @typedef Event
 * @property {string} txnId On-chain transaction ID of event
 * @property {number} timestamp Unix timestamp of event
 * @property {string} user.id Address of user for event
 * @property {string} type Event type
 * @property {string} assetAddress Address of asset
 * @property {number} amount Amount of vault baseAsset involved in the event
 * @property {number} fee Amount of vault baseAsset fee involved in the event
 * @property {number} buyQty Amount of the purchased asset
 * @property {number} skipReason Reason why the purchase attempt was skipped
 */

/**
 * @memberOf DCA
 * @typedef CreateDCAResult
 * @property {Object} tx Create Transaction
 * @property {number} chainId Chain ID that the transaction took place on
 * @property {string} dcaId ID of newly created DCA
 * @property {string} user Owner of DCA
 * @property {string} to Address which will receive purchased assets for the DCA
 * @property {string} inputAsset Address of the input asset used for the DCA
 * @property {string} outputAsset Address of the purchased DCA asset
 * @property {string} amount Amount (in vault baseAsset value) for each purchase swap of the DCA
 * @property {string} totalAmount Total amount of vault baseAsset value to spend over the lifetime of the DCA
 * @property {number} period Period (in seconds) between each DCA purchase swap
 */

/**
 * @memberOf DCA
 * @typedef ServiceParameters
 * @property {string} assetsMerkleRoot Merkleroot of the approved assets
 * @property {number} minAmount Minimum amount of value for a new DCA
 * @property {number} minPeriod Minimum period (in seconds) for a new DCA
 * @property {number} minSlippage Minimum slippage (in BPS) allowed for a new DCA
 * @property {number} maxSkips Max number of skips allowed on an DCA before it is canceled
 * @property {number} dcaFeeBps Fee (in BPS) charged for processing an DCA
 * @property {number} dcaFeeMin Minimum fee (in vault baseAsset units) charged for processing an DCA
 * @property {number} dcaMinValue Minimum amount of value for a new DCA
 */

/**
 * @memberOf DCA
 * @typedef DCAAssetDefinition
 * @property {string} inputAssetSymbol Input asset symbol
 * @property {string} outputAssetSymbol Output asset symbol
 * @property {string} outputAssetIconUrl Output asset icon URL
 * @property {string} routerName Name of swap router
 * @property {string} router Address of swap router
 * @property {string} priceFeed Address of asset price oracle
 * @property {Array<string>} path Asset swap path
 * @property {number} chainId Chain ID
 */

/**
 * Service class to handle interacting with the Cask DCA system.
 */
class DCA {

    /**
     * Status of an DCA
     */
    static STATUS = {
        NONE: 0,
        ACTIVE: 1,
        PAUSED: 2,
        CANCELED: 3,
        COMPLETE: 4,
    }

    /**
     * Swap protocol used for DCA
     */
    static SWAP_PROTOCOL = {
        UNIV2: 0,
        UNIV3: 1,
        GMX: 2,
    }


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

        if (this.options.cache?.tokens) {
            this.tokens = this.options.cache?.tokens;
        } else {
            this.tokens = new Tokens(this.options);
            this.options.cache.tokens = this.tokens;
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

        if (!this.vault.ethersConnection) {
            await this.vault.init({ethersConnection: this.ethersConnection});
        }
        if (!this.query.ethersConnection) {
            await this.query.init({ethersConnection: this.ethersConnection});
        }
        if (!this.tokens.ethersConnection) {
            await this.tokens.init({ethersConnection: this.ethersConnection});
        }
        if (!ethersConnection) {
            await this.ethersConnection.init();
        }

        this.logger.info(`Cask DCA service initialization complete.`);
    }

    async _initContracts() {
        let vaultReadyResolve;

        if (deployments.CaskDCA[this.ethersConnection.environment]?.[this.ethersConnection.chainId] &&
            deployments.CaskDCA[this.ethersConnection.environment][this.ethersConnection.chainId] !==
            '0x0000000000000000000000000000000000000000') {
            this.CaskDCA = contracts.CaskDCA({ethersConnection: this.ethersConnection});
            this.CaskDCAManager = contracts.CaskDCAManager({ethersConnection: this.ethersConnection});

            this.vault.onAssetsLoaded(async () => {
                vaultReadyResolve();
            });

            return new Promise((resolve, reject) => {
                vaultReadyResolve = resolve;
            });
        }
    }

    /**
     * See if the DCA service is available on the currently connected chain.
     *
     * @returns {boolean}
     */
    serviceAvailable() {
        return this.CaskDCA !== undefined;
    }

    /**
     * Retrieve service configuration parameters for the DCA service.
     *
     * @returns {DCA.ServiceParameters}
     */
    serviceParameters() {
        return {
            assetsMerkleRoot: () => { return this.CaskDCA.assetsMerkleRoot() },
            minAmount: () => { return this.CaskDCA.minAmount() },
            minPeriod: () => { return this.CaskDCA.minPeriod() },
            minSlippage: () => { return this.CaskDCA.minSlippage() },

            maxSkips: () => { return this.CaskDCAManager.maxSkips() },
            dcaFeeBps: () => { return this.CaskDCAManager.dcaFeeBps() },
            dcaFeeMin: () => { return this.CaskDCAManager.dcaFeeMin() },
            dcaMinValue: () => { return this.CaskDCAManager.dcaMinValue() },
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
            swapProtocol: dcaInfo.swapProtocol,
            swapData: dcaInfo.swapData,
            router: dcaInfo.router,
            priceFeed: dcaInfo.priceFeed,
            path: dcaInfo.path,
            amount: dcaInfo.amount,
            period: dcaInfo.period,
            maxSlippageBps: dcaInfo.maxSlippageBps,
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
     * Get history for a DCA flow.
     *
     * @param {string} dcaId DCA ID
     * @param [queryopts] Optional query options
     * @param [queryopts.limit=10] Limit
     * @param [queryopts.offset=0] Offset
     * @param [queryopts.orderBy=timestamp] Order by
     * @param [queryopts.orderDirection=desc] Order direction, one of asc or desc
     * @param [queryopts.options] Optional options to pass to apollo for graphQL
     * @return {Promise<Array<DCA.Event>>}
     */
    async history(
        dcaId,
        {
            limit=10,
            offset=0,
            orderBy="timestamp",
            orderDirection="desc",
            options
        }={})
    {
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
        user {
           id
        }
        type
        assetAddress
        amount
        fee
        buyQty
        skipReason
    }
}`;
        const results = await this.query.rawQuery(query, options);
        return results.data.caskDCAEvents;
    }

    /**
     * Get the estimated spend for a DCA for a specific period.
     *
     * @param {string} address User address
     * @param {number} [period=1 month] Commitment period (in seconds)
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
     * @param {float} [args.amountSimple] Amount of vault baseAsset value to spend per DCA purchase swap (simple format)
     * @param {string} [args.amountAsset] Amount of vault baseAsset value to spend per DCA purchase swap (asset format)
     * @param {string} [args.amount] Alias for `amountAsset`
     * @param {float} [args.totalAmountSimple] Total amount of vault baseAsset value to spend over the lifetime of the DCA (simple format)
     * @param {string} [args.totalAmountAsset] Total amount of vault baseAsset value to spend over the lifetime of the DCA (asset format)
     * @param {string} [args.totalAmount] Alias for `totalAmountAsset`
     * @param {float} [args.minPriceSimple] Minimum price (in vault baseAssset value) the asset must be for the purchase swap to be attempted (simple format)
     * @param {string} [args.minPriceAsset] Minimum price (in vault baseAssset value) the asset must be for the purchase swap to be attempted (asset format)
     * @param {string} [args.minPrice] Alias for `minPriceAsset`
     * @param {float} [args.maxPriceSimple] Maximum price (in vault baseAssset value) the asset must be for the purchase swap to be attempted (simple format)
     * @param {string} [args.maxPriceAsset] Maximum price (in vault baseAssset value) the asset must be for the purchase swap to be attempted (asset format)
     * @param {string} [args.maxPrice] Alias for `maxPriceAsset`
     * @param {number} args.period Period (in seconds) of each DCA purchase swap
     * @param {number} args.maxSlippageBps Maximum slippage (in BPS) to allow during a purchase swap attempt
     * @return {DCA.CreateDCAResult}
     */
    async create({
                     to,
                     asset,
                     amount = '0', amountSimple, amountAsset,
                     totalAmount='0', totalAmountSimple, totalAmountAsset,
                     minPrice='0', minPriceSimple, minPriceAsset,
                     maxPrice='0', maxPriceSimple, maxPriceAsset,
                     period,
                     maxSlippageBps=100
    }) {
        if (!this.ethersConnection.signer) {
            throw new Error("Cannot perform transaction without ethers signer");
        }

        const assetInfo = await this.assetDefinition(asset);
        if (!assetInfo) {
            throw new Error(`Cannot get asset definition for asset ${asset}`);
        }

        const erc20Info = await this.tokens.getERC20Info(asset);
        if (!erc20Info) {
            throw new Error(`Cannot get erc20 info for asset ${asset}`);
        }

        if (!to) {
            to = this.ethersConnection.address;
        }

        if (amountSimple) {
            amount = ethers.utils.parseUnits(amountSimple.toFixed(2), this.vault.baseAsset.assetDecimals);
        } else if (amountAsset) {
            amount = amountAsset;
        }

        if (minPriceSimple) {
            minPrice = ethers.utils.parseUnits(minPriceSimple.toFixed(6), erc20Info.decimals);
        } else if (minPriceAsset) {
            minPrice = minPriceAsset;
        }

        if (maxPriceSimple) {
            maxPrice = ethers.utils.parseUnits(maxPriceSimple.toFixed(6), erc20Info.decimals);
        } else if (maxPriceAsset) {
            maxPrice = maxPriceAsset;
        }

        if (totalAmountSimple) {
            totalAmount = ethers.utils.parseUnits(totalAmountSimple.toFixed(2), this.vault.baseAsset.assetDecimals);
        } else if (totalAmountAsset) {
            totalAmount = totalAmountAsset;
        }

        const assetSpec = utils.dcaAssetspec(assetInfo);
        const merkleProof = utils.dcaMerkleProof(this.dcaManifest.assets, assetInfo);
        const priceSpec = utils.dcaPricespec(period, amount, totalAmount, maxSlippageBps, minPrice, maxPrice);

        const tx = await this.CaskDCA.connect(this.ethersConnection.signer).createDCA(
            assetSpec,
            merkleProof,
            assetInfo.swapProtocol || 0,
            assetInfo.swapData || '0x',
            to,
            priceSpec);

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
     * Pause an active DCA.
     *
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
     *
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
     *
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
     *
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
     * Get the specified asset definition from the asset manifest.
     *
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
     * Get the current price of a DCA asset denominated in the vault base asset.
     *
     * @return {Promise<string>}
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

            const chainInfo = chains.lookupChain(this.ethersConnection.chainId);
            const oracleType = this.options?.oracleType || chainInfo?.oracleType || 'chainlink';

            if (oracleType === 'band') {
                return await this._bandAssetPrice(asset);
            } else {
                return await this._chainlinkAssetPrice(asset);
            }
        }
    }

    async _chainlinkAssetPrice(asset) {
        if (typeof(asset) === 'string') {
            asset = await this.assetDefinition(asset);
        }

        const assetToUSDOracle = contracts.AggregatorV3Interface({
            priceFeed: asset.priceFeed,
            ethersConnection: this.ethersConnection});

        const assetResult = await assetToUSDOracle.latestRoundData();

        const baseAssetInfo = this.vault.getAsset(this.vault.baseAsset);
        const baseAssetResult = await this.vault.currentPrice(this.vault.baseAsset);

        const basePrice = CaskUnits.scalePrice(
            assetResult.answer,
            await assetToUSDOracle.decimals(),
            baseAssetInfo.assetDecimals);

        const quotePrice = CaskUnits.scalePrice(
            baseAssetResult.price,
            baseAssetResult.decimals,
            baseAssetInfo.assetDecimals);

        const one = ethers.BigNumber.from(10).pow(baseAssetInfo.assetDecimals);

        return basePrice.mul(one).div(quotePrice);
    }

    async _bandAssetPrice(asset) {
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

        return CaskUnits.scalePrice(oracleResult.rate, 18, baseAssetInfo.assetDecimals);
    }
}

export default DCA;