import Logger from "../utils/Logger.js";
import contracts from "../contracts/index.js";
import deployments from "../core/deployments.js";
import CaskUnits from "../core/units.js";

import EthersConnection from "../core/EthersConnection.js";
import {ethers} from "ethers";
import Query from "../query/index.js";
import Vault from "../vault/index.js";



/**
 * @memberOf P2P
 * @typedef P2PDetail
 * @property {string} p2pId P2P ID
 * @property {number} status P2P status
 * @property {string} to Address which receives transferred value
 * @property {number} amount Amount of vault baseAsset to send on each transfer
 * @property {number} period Period (in seconds) between each transfer
 * @property {number} createdAt Unix timestmap of P2P creation time
 * @property {number} processAt Unit timestamp of next P2P transfer
 * @property {number} totalAmount Total amount of vault baseAsset value to send across the lifetime of the P2P
 * @property {number} currentAmount Current amount of vault baseAsset value sent while the P2P has been active
 * @property {number} numPayments Number of transfers performed to date while the P2P has been active
 * @property {number} numSkips Number of skips due to an issue with the P2P
 */

/**
 * @memberOf P2P
 * @typedef Event
 * @property {string} txnId On-chain transaction ID of event
 * @property {number} timestamp Unix timestamp of event
 * @property {string} user.id Address of user for event
 * @property {string} type Event type
 * @property {number} amount Amount of vault baseAsset involved in the event
 * @property {number} fee Amount of vault baseAsset fee involved in the event
 */

/**
 * @memberOf P2P
 * @typedef CreateP2PResult
 * @property {Object} tx Create Transaction
 * @property {number} chainId Chain ID that the transaction took place on
 * @property {string} user Owner of P2P
 * @property {string} to Address which will receive the vault tokens on each transfer
 * @property {string} amount Amount (in vault baseAsset value) for each transfer
 * @property {string} totalAmount Total amount of vault baseAsset value to transfer over the lifetime of the P2P
 * @property {number} period Period (in seconds) between each P2P transfer
 */

/**
 * @memberOf P2P
 * @typedef ServiceParameters
 * @property {number} minAmount Minimum amount of value for a new P2P
 * @property {number} minPeriod Minimum period (in seconds) for a new P2P
 * @property {number} maxSkips Max number of skips allowed on an P2P before it is canceled
 * @property {number} paymentFee Fee (in vault baseAsset value) charged for processing a P2P transfer
 */

/**
 * Service class to handle interacting with the Cask P2P system
 */
class P2P {

    static STATUS = {
        NONE: 0,
        ACTIVE: 1,
        PAUSED: 2,
        CANCELED: 3,
        COMPLETE: 4,
    }

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

        if (!this.vault.ethersConnection) {
            await this.vault.init({ethersConnection: this.ethersConnection});
        }
        if (!this.query.ethersConnection) {
            await this.query.init({ethersConnection: this.ethersConnection});
        }

        if (!ethersConnection) {
            await this.ethersConnection.init();
        }

        this.logger.info(`Cask P2P service initialization complete.`);
    }

    async _initContracts() {
        if (deployments.CaskP2P[this.ethersConnection.environment]?.[this.ethersConnection.chainId] &&
            deployments.CaskP2P[this.ethersConnection.environment][this.ethersConnection.chainId] !==
            '0x0000000000000000000000000000000000000000') {
            this.CaskP2P = contracts.CaskP2P({ethersConnection: this.ethersConnection});
            this.CaskP2PManager = contracts.CaskP2PManager({ethersConnection: this.ethersConnection});
        }
    }

    /**
     * See if the P2P service is available on the currently connected chain.
     *
     * @returns {boolean}
     */
    serviceAvailable() {
        return this.CaskP2P !== undefined;
    }

    /**
     * Retrieve service configuration parameters for the P2P service.
     *
     * @returns {P2P.ServiceParameters}
     */
    serviceParameters() {
        return {
            minAmount: () => { return this.CaskP2P.minAmount() },
            minPeriod: () => { return this.CaskP2P.minPeriod() },

            maxSkips: () => { return this.CaskP2PManager.maxSkips() },
            paymentFee: () => { return this.CaskP2PManager.paymentFee() },
        }
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
     * Get history for a P2P flow.
     *
     * @param {string} p2pId P2P ID
     * @param [queryopts] Optional query options
     * @param [queryopts.limit=10] Limit
     * @param [queryopts.offset=0] Offset
     * @param [queryopts.orderBy=timestamp] Order by
     * @param [queryopts.orderDirection=desc] Order direction, one of asc or desc
     * @param [queryopts.options] Optional options to pass to apollo for graphQL
     * @return {Promise<Array<P2P.Event>>}
     */
    async history(
        p2pId,
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
    caskP2PEvents(
        where: {p2pId: "${p2pId}"}
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
        amount
        fee
    }
}`;
        const results = await this.query.rawQuery(query, options);
        return results.data.caskP2PEvents;
    }

    /**
     * Get the estimated spend for a P2P for a specific period.
     *
     * @param {string} address User address
     * @param {number} [period=1 month] Commitment period (in seconds)
     */
    async estimatedCommitment(address, period=2628000) {
        const query = `
query Query {
  caskP2Ps(where: {
     user: "${address.toLowerCase()}",
     status_in: [Active]
    }
  ) {
    period
    amount
    currentAmount
    status
    totalAmount
  }
}`;
        const results = await this.query.rawQuery(query);

        return results.data.caskP2Ps.reduce((balance, p2p) => {
            return balance + (period / p2p.period * parseFloat(p2p.amount));
        }, 0);
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
            amount = ethers.utils.parseUnits(amountSimple.toFixed(2), this.vault.baseAsset.assetDecimals);
        } else if (amountAsset) {
            amount = amountAsset;
        }

        if (totalAmountSimple) {
            totalAmount = ethers.utils.parseUnits(totalAmountSimple.toFixed(2), this.vault.baseAsset.assetDecimals);
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
     * Pause an active P2P.
     *
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
     *
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
     *
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