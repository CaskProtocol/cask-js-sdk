import fetch from "cross-fetch";
import Logger from "../utils/Logger.js";
import contracts from "../contracts/index.js";
import utils from "../utils/index.js";
import CaskUnits from "../core/units.js";

import EthersConnection from "../core/EthersConnection.js";
import Vault from "../vault";
import {ethers} from "ethers";



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

        this.manifestUrl = this.options.manifestUrl || 'https://dcamanifest.cask.fi/';

        if (!this.options?.cache) {
            this.options.cache = {};
        }
        this.options.cache.dca = this;

        if (this.options.cache.vault) {
            this.vault = this.options.cache.vault
        } else {
            this.vault = new Vault(options);
            this.initVault = true;
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

        if (this.initVault) {
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
     * @param [address=ethersConnection.address] Provider address or attempts to use the blockchain connection address
     * @param [limit=10] Limit
     * @param [offset=0] Offset
     * @return {Promise<*>}
     */
    getUserDCAList({address, limit=10, offset=0}={}) {
        address = address || this.ethersConnection.address;
        if (!address) {
            throw new Error("address not specified or detectable");
        }

        return this.CaskDCA.getUserDCAList(address, limit, offset);
    }

    /**
     * Get the current number of DCAs for an address.
     * @param [address=ethersConnection.address] Provider address or attempts to use the blockchain connection address
     * @return {Promise<*>}
     */
    async getUserDCACount({address}={}) {
        address = address || this.ethersConnection.address;
        if (!address) {
            throw new Error("address not specified or detectable");
        }

        return (await this.CaskDCA.getUserDCACount(address)).toString();
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

        const merkleProof = utils.dcaMerkleProof(this.dcaManifest, assetInfo);

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

        if (!this.manifestUrl) {
            throw new Error("No manifestUrl configured - cannot load asset manifest");
        }

        const fetchPromise = new Promise((resolve, reject) => {
            fetch(this.manifestUrl)
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

        return this.dcaManifest.find((a) =>
            a.chainId === this.ethersConnection.chainId &&
            a.path[a.path.length-1].toLowerCase() === asset.toLowerCase()
        )
    }

}

export default DCA;