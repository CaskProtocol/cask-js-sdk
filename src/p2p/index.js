import Logger from "../utils/Logger.js";
import contracts from "../contracts/index.js";
import CaskUnits from "../core/units.js";

import EthersConnection from "../core/EthersConnection.js";
import {ethers} from "ethers";
import Query from "../query";



/**
 * @memberOf P2P
 * @typedef P2PDetail
 * @property {string} p2pId P2P ID
 * @property {number} status P2P status
 * @property {number} createdAt Unix timestamp of P2P creation time
 */

/**
 * @memberOf P2P
 * @typedef CreateP2PResult
 * @property {Object} tx Create Transaction
 * @property {number} chainId Chain ID that the transaction took place on
 * @property {string} p2pId ID of newly created P2P
 */

/**
 * @memberOf P2P
 * @typedef P2PAssetDefinition
 * @property {string} outputAssetSymbol Outut asset symbol
 */

/**
 * Service class to handle interacting with the Cask P2P system
 */
class P2P {

    /**
     * Create an instance of the P2P service.
     *
     * @param options See CaskSDK configuration.
     * @see CaskSDK
     */
    constructor(options={}) {
        this.options = {
            ...options,
            ...options?.p2p
        };

        this.logger = new Logger('CaskSDK::P2P', this.options.logLevel);

        if (!this.options?.cache) {
            this.options.cache = {};
        }
        this.options.cache.p2p = this;

        if (this.options.cache?.query) {
            this.query = this.options.cache?.query;
        } else {
            this.query = new Query(this.options);
            this.initQuery = true;
            this.options.cache.query = this.query;
        }

    }

    /**
     * Initialize the P2P service.
     *
     * @param {Object} args Function arguments
     * @param {EthersConnection} [args.ethersConnection] EthersConnection instance
     */
    async init({ethersConnection}={}) {
        this.logger.trace(`Initializing Cask P2P service.`);
        if (!ethersConnection) {
            this.ethersConnection = new EthersConnection(this.options);
        } else {
            this.ethersConnection = ethersConnection;
        }
        this.ethersConnection.onSwitchChain(async() => { await this._initContracts() });

        if (this.initQuery) {
            await this.query.init({ethersConnection: this.ethersConnection});
        }

        if (!ethersConnection) {
            await this.ethersConnection.init();
        }

        this.logger.info(`Cask P2P service initialization complete.`);
    }

    async _initContracts() {
        this.CaskP2P = contracts.CaskP2P({ethersConnection: this.ethersConnection});
    }


    /**
     * Get a map of P2Ps for a specified address
     * @param [limit=10] Limit
     * @param [offset=0] Offset
     * @param [orderBy=createdAt] Order by
     * @param [orderDirection=asc] Order direction, one of asc or desc
     * @return {Promise<*>}
     */
    async getUserP2PList({address, limit=10, offset=0, orderBy="createdAt", orderDirection="asc"}={}) {
        address = address || this.ethersConnection.address;
        if (!address) {
            throw new Error("address not specified or detectable");
        }

        const query = `
query Query {
  caskP2P(
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
        return results.data.caskP2P.map((record) => record.id);
    }

    /**
     * Get the current number of P2Ps for an address.
     * @return {Promise<*>}
     */
    async getUserP2PCount({address}={}) {
        address = address || this.ethersConnection.address;
        if (!address) {
            throw new Error("address not specified or detectable");
        }

        const query = `
query Query {
    caskConsumer(id: "${address.toLowerCase()}") {
        totalP2PCount
    }
}`;
        const results = await this.query.rawQuery(query);
        return parseInt(results.data.caskConsumer.totalP2PCount);
    }

    /**
     * Get the details of a specific P2P flow.
     *
     * @see The SDK guide for more details on unit formatting at {@link https://docs.cask.fi/developer-docs/javascript-sdk}
     * @param p2pId
     * @return {Promise<P2P.P2PDetail>}
     */
    async get(p2pId) {
        const p2pInfo = await this.CaskP2P.getP2P(p2pId);
        if (!p2pInfo ||
            p2pInfo?.user === '0x0000000000000000000000000000000000000000')
        {
            throw new Error("P2P flow not found");
        }

        return {
            p2pId,
            user: p2pInfo.user,
            to: p2pInfo.to,
            amount: p2pInfo.amount,
            period: p2pInfo.period,
            status: p2pInfo.status,
            createdAt: p2pInfo.createdAt,
            processAt: p2pInfo.processAt,
            totalAmount: p2pInfo.totalAmount,
            currentAmount: p2pInfo.currentAmount,
            numPayments: p2pInfo.numPayments,
            numSkips: p2pInfo.numSkips,
        }
    }

    /**
     * Get history for a P2P flow
     *
     * @param {string} dcaId P2P ID
     */
    async getHistory(p2pId, {limit=10, offset=0, orderBy="timestamp", orderDirection="desc"}={}) {
        const query = `
query Query {
    caskP2PEvents(
        where: {p2pId: "${p2pId}"}
        first: ${limit}
        skip: ${offset}
        orderBy: ${orderBy}
        orderDirection: ${orderDirection}
    ) {
        txnId
        timestamp
        type
        amount
    }
}`;
        const results = await this.query.rawQuery(query);
        return results.data.caskP2PEvents;
    }

    /**
     * Create a new P2P.
     *
     * @param {Object} args Function arguments
     * @param {string} args.asset Address of asset to P2P
     * @return {P2P.CreateP2PResult}
     */
    async create({to, amount, amountSimple, amountAsset,
                     totalAmount=0, totalAmountSimple, totalAmountAsset, period})
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

        const tx = await this.CaskP2P.connect(this.ethersConnection.signer).createP2P(
            to,
            amount,
            totalAmount,
            period);

        const events = (await tx.wait()).events || [];
        const event = events.find((e) => e.event === "P2PCreated");
        if (!event) {
            throw new Error("Could not find P2PCreated after P2P flow creation");
        }
        return {
            tx,
            chainId: this.ethersConnection.chainId,
            p2pId: event.args.p2pId,
            user: event.args.user,
            to: event.args.to,
            amount: event.args.amount,
            totalAmount: event.args.totalAmount,
            period: event.args.period,
        }
    }

    /**
     * Pause an active P2P
     * @param {string} p2pId P2P ID
     * @return {Promise<{tx: *}>}
     */
    async pause(p2pId) {

        if (!this.ethersConnection.signer) {
            throw new Error("Cannot perform transaction without ethers signer");
        }

        const tx = await this.CaskP2P
            .connect(this.ethersConnection.signer).pauseP2P(p2pId);
        await tx.wait();
        return {tx};
    }

    /**
     * Resume a paused P2P.
     * @param {string} p2pId P2P ID
     * @return {Promise<{tx: *}>}
     */
    async resume(p2pId) {

        if (!this.ethersConnection.signer) {
            throw new Error("Cannot perform transaction without ethers signer");
        }

        const tx = await this.CaskP2P
            .connect(this.ethersConnection.signer).resumeP2P(p2pId);
        await tx.wait();
        return {tx};
    }

    /**
     * Cancel a P2P.
     * @param {string} p2pId P2P ID
     * @return {Promise<{tx: *}>}
     */
    async cancel(p2pId) {

        if (!this.ethersConnection.signer) {
            throw new Error("Cannot perform transaction without ethers signer");
        }

        const tx = await this.CaskP2P
            .connect(this.ethersConnection.signer).cancelP2P(p2pId);
        await tx.wait();
        return {tx};
    }

}

export default P2P;