import fetch from "cross-fetch";
import Logger from "../utils/Logger.js";
import contracts from "../contracts/index.js";
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

    async _initContracts() {
        let vaultReadyResolve;

        this.CaskDCA = contracts.CaskDCA({ethersConnection: this.ethersConnection});

        this.vault.onAssetsLoaded(async () => {
            vaultReadyResolve();
        });

        return new Promise((resolve, reject) => {
            vaultReadyResolve = resolve;
        });
    }

    /**
     * Get a map of DCAs for a specified address
     * @param [limit=10] Limit
     * @param [offset=0] Offset
     * @param [orderBy=createdAt] Order by
     * @param [orderDirection=asc] Order direction, one of asc or desc
     * @return {Promise<*>}
     */
    async getUserDCAList({address, limit=10, offset=0, orderBy="createdAt", orderDirection="asc"}={}) {
        address = address || this.ethersConnection.address;
        if (!address) {
            throw new Error("address not specified or detectable");
        }

        const query = `
query Query {
  caskDCA(
    where: {user: "${address.toLowerCase()}"}
    first: ${limit}
    skip: ${offset}
    orderBy: ${orderBy}
    orderDirection: ${orderDirection}
  ) {
    id
  }
}`;
        const results = await this.query.rawQuery(query);
        return results.data.caskDCA.map((record) => record.id);
    }

    /**
     * Get the current number of DCAs for an address.
     * @return {Promise<*>}
     */
    async getUserDCACount({address}={}) {
        address = address || this.ethersConnection.address;
        if (!address) {
            throw new Error("address not specified or detectable");
        }

        const query = `
query Query {
    caskConsumer(id: "${address.toLowerCase()}") {
        totalDCACount
    }
}`;
        const results = await this.query.rawQuery(query);
        return parseInt(results.data.caskConsumer.totalDCACount);
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
    async getHistory(dcaId, {limit=10, offset=0, orderBy="timestamp", orderDirection="desc"}={}) {
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

        const assetInfo = await this.getAssetDefinition(asset);

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
    async getAssetDefinition(asset) {
        await this.loadDCAManifest();

        return this.dcaManifest.assets.find((a) =>
            a.chainId === this.ethersConnection.chainId &&
            a.path[a.path.length-1].toLowerCase() === asset.toLowerCase()
        )
    }

}

export default DCA;