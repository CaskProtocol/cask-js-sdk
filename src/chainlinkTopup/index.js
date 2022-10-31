import Logger from "../utils/Logger.js";
import contracts from "../contracts/index.js";
import deployments from "../core/deployments.js";
import CaskUnits from "../core/units.js";

import EthersConnection from "../core/EthersConnection.js";
import {ethers} from "ethers";
import Query from "../query/index.js";


/**
 * @memberOf ChainlinkTopup
 * @typedef ChainlinkTopupDetail
 * @property {string} chainlinkTopupId ChainlinkTopup ID
 * @property {number} status ChainlinkTopup status
 * @property {number} createdAt Unix timestamp of ChainlinkTopup creation time
 */

/**
 * @memberOf ChainlinkTopup
 * @typedef CreateChainlinkTopupResult
 * @property {Object} tx Create Transaction
 * @property {number} chainId Chain ID that the transaction took place on
 * @property {string} chainlinkTopupId ID of newly created ChainlinkTopup
 */


/**
 * Service class to handle interacting with the Cask ChainlinkTopup system
 */
class ChainlinkTopup {

    static STATUS = {
        NONE: 0,
        ACTIVE: 1,
        PAUSED: 2,
        CANCELED: 3,
    }

    static TOPUP_TYPE = {
        NONE: 0,
        AUTOMATION: 1,
        VRF: 2,
        DIRECT: 3,
    }

    /**
     * Create an instance of the ChainlinkTopup service.
     *
     * @param options See CaskSDK configuration.
     * @see CaskSDK
     */
    constructor(options={}) {
        this.options = {
            ...options,
            ...options?.chainlinkTopup
        };

        this.logger = new Logger('CaskSDK::ChainlinkTopup', this.options.logLevel);

        if (!this.options?.cache) {
            this.options.cache = {};
        }
        this.options.cache.chainlinkTopup = this;

        if (this.options.cache?.query) {
            this.query = this.options.cache?.query;
        } else {
            this.query = new Query(this.options);
            this.options.cache.query = this.query;
        }

    }

    /**
     * Initialize the ChainlinkTopup service.
     *
     * @param {Object} args Function arguments
     * @param {EthersConnection} [args.ethersConnection] EthersConnection instance
     */
    async init({ethersConnection}={}) {
        this.logger.trace(`Initializing Cask ChainlinkTopup service.`);
        if (!ethersConnection) {
            this.ethersConnection = new EthersConnection(this.options);
        } else {
            this.ethersConnection = ethersConnection;
        }
        this.ethersConnection.onSwitchChain(async(chainId) => { await this._initContracts() });

        if (!this.query.ethersConnection) {
            await this.query.init({ethersConnection: this.ethersConnection});
        }
        if (!ethersConnection) {
            await this.ethersConnection.init();
        }

        this.logger.info(`Cask ChainlinkTopup service initialization complete.`);
    }

    async _initContracts(chainId) {
        if (deployments.CaskChainlinkTopup[this.ethersConnection.environment]?.[this.ethersConnection.chainId] &&
            deployments.CaskChainlinkTopup[this.ethersConnection.environment][this.ethersConnection.chainId] !==
            '0x0000000000000000000000000000000000000000') {
            this.CaskChainlinkTopup = contracts.CaskChainlinkTopup({ethersConnection: this.ethersConnection});
            this.CaskChainlinkTopupManager = contracts.CaskChainlinkTopupManager({ethersConnection: this.ethersConnection});
        }
    }

    serviceAvailable() {
        return this.CaskChainlinkTopup !== undefined;
    }

    serviceParameters() {
        return {
            minTopupAmount: () => { return this.CaskChainlinkTopup.minTopupAmount() },

            maxSkips: () => { return this.CaskChainlinkTopupManager.maxSkips() },
            topupFeeBps: () => { return this.CaskChainlinkTopupManager.topupFeeBps() },
            topupFeeMin: () => { return this.CaskChainlinkTopupManager.topupFeeMin() },
            maxPriceFeedAge: () => { return this.CaskChainlinkTopupManager.maxPriceFeedAge() },
            maxSwapSlippageBps: () => { return this.CaskChainlinkTopupManager.maxSwapSlippageBps() },
            feeDistributor: () => { return this.CaskChainlinkTopupManager.feeDistributor() },
        }
    }

    /**
     * Get the details of a specific ChainlinkTopup.
     *
     * @see The SDK guide for more details on unit formatting at {@link https://docs.cask.fi/developer-docs/javascript-sdk}
     * @param chainlinkTopupId
     * @return {Promise<ChainlinkTopup.ChainlinkTopupDetail>}
     */
    async get(chainlinkTopupId) {
        const cltuInfo = await this.CaskChainlinkTopup.getChainlinkTopup(chainlinkTopupId);
        if (!cltuInfo ||
            cltuInfo?.user === '0x0000000000000000000000000000000000000000')
        {
            throw new Error("ChainlinkTopup not found");
        }

        return {
            chainlinkTopupId,
            user: cltuInfo.user,
            lowBalance: cltuInfo.lowBalance,
            topupAmount: cltuInfo.topupAmount,
            status: cltuInfo.status,
            createdAt: cltuInfo.createdAt,
            currentAmount: cltuInfo.currentAmount,
            currentBuyQty: cltuInfo.currentBuyQty,
            numTopups: cltuInfo.numTopups,
            numSkips: cltuInfo.numSkips,
        }
    }

    /**
     * Get history for a chainlink topup flow
     *
     * @param {string} chainlinkTopupId Chainlink Topup ID
     * @param [queryopts] Optional query options
     * @param [queryopts.limit=10] Limit
     * @param [queryopts.offset=0] Offset
     * @param [queryopts.orderBy=timestamp] Order by
     * @param [queryopts.orderDirection=desc] Order direction, one of asc or desc
     * @param [queryopts.options=asc] Optional options to pass to apollo for graphQL
     * @return {Promise<*>}
     */
    async history(
        chainlinkTopupId,
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
    caskChainlinkTopupEvents(
        where: {chainlinkTopupId: "${chainlinkTopupId}"}
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
        targetId
        registry
        topupType
        amount
        fee
        buyQty
        skipReason
    }
}`;
        const results = await this.query.rawQuery(query, options);
        return results.data.caskChainlinkTopupEvents;
    }

    /**
     * Create a new ChainlinkTopup.
     *
     * @param {Object} args Function arguments
     * @param {string} args.asset Address of asset to ChainlinkTopup
     * @return {ChainlinkTopup.CreateChainlinkTopupResult}
     */
    async create({topupAmount, topupAmountSimple, lowBalance, lowBalanceSimple,
                     targetId, registry, topupType})
    {
        if (!this.ethersConnection.signer) {
            throw new Error("Cannot perform transaction without ethers signer");
        }

        if (topupAmountSimple) {
            topupAmount = ethers.utils.parseUnits(topupAmountSimple.toFixed(2), CaskUnits.BASE_ASSET_DECIMALS);
        }
        if (lowBalanceSimple) {
            const linkFundingToken = await this.CaskChainlinkTopupManager.linkFundingToken();
            const link = contracts.ERC20({tokenAddress: linkFundingToken, ethersConnection: this.ethersConnection});
            lowBalance = ethers.utils.parseUnits(lowBalanceSimple.toFixed(6), await link.decimals());
        }

        const tx = await this.CaskChainlinkTopup.connect(this.ethersConnection.signer).createChainlinkTopup(
            lowBalance,
            topupAmount,
            targetId,
            registry,
            topupType);

        const events = (await tx.wait()).events || [];
        const event = events.find((e) => e.event === "ChainlinkTopupCreated");
        if (!event) {
            throw new Error("Could not find ChainlinkTopupCreated after ChainlinkTopup creation");
        }
        return {
            tx,
            chainId: this.ethersConnection.chainId,
            chainlinkTopupId: event.args.chainlinkTopupId,
            user: event.args.user,
        }
    }

    /**
     * Pause an active ChainlinkTopup
     * @param {string} chainlinkTopupId ChainlinkTopup ID
     * @return {Promise<{tx: *}>}
     */
    async pause(chainlinkTopupId) {

        if (!this.ethersConnection.signer) {
            throw new Error("Cannot perform transaction without ethers signer");
        }

        const tx = await this.CaskChainlinkTopup
            .connect(this.ethersConnection.signer).pauseChainlinkTopup(chainlinkTopupId);
        await tx.wait();
        return {tx};
    }

    /**
     * Resume a paused ChainlinkTopup.
     * @param {string} chainlinkTopupId ChainlinkTopup ID
     * @return {Promise<{tx: *}>}
     */
    async resume(chainlinkTopupId) {

        if (!this.ethersConnection.signer) {
            throw new Error("Cannot perform transaction without ethers signer");
        }

        const tx = await this.CaskChainlinkTopup
            .connect(this.ethersConnection.signer).resumeChainlinkTopup(chainlinkTopupId);
        await tx.wait();
        return {tx};
    }

    /**
     * Cancel a ChainlinkTopup.
     * @param {string} chainlinkTopupId ChainlinkTopup ID
     * @return {Promise<{tx: *}>}
     */
    async cancel(chainlinkTopupId) {

        if (!this.ethersConnection.signer) {
            throw new Error("Cannot perform transaction without ethers signer");
        }

        const tx = await this.CaskChainlinkTopup
            .connect(this.ethersConnection.signer).cancelChainlinkTopup(chainlinkTopupId);
        await tx.wait();
        return {tx};
    }

    /**
     * Get the LINK token used by the ChainlinkTopup service.
     * @return {Promise<{*}>}
     */
    async linkToken() {
        const linkFundingToken = await this.CaskChainlinkTopupManager.linkFundingToken();
        return contracts.ERC20({tokenAddress: linkFundingToken, ethersConnection: this.ethersConnection});
    }

    /**
     * Get the link balance for the underlying service from a ChainlinkTopup.
     * @param {string} chainlinkTopupId ChainlinkTopup ID
     * @return {Promise<{tx: *}>}
     */
    async linkBalance(chainlinkTopupId, {units, unitOptions={}}={}) {

        const cltuInfo = await this.CaskChainlinkTopup.getChainlinkTopup(chainlinkTopupId);
        if (!cltuInfo ||
            cltuInfo?.user === '0x0000000000000000000000000000000000000000')
        {
            throw new Error("ChainlinkTopup not found");
        }

        const linkFundingToken = await this.CaskChainlinkTopupManager.linkFundingToken();
        const link = contracts.ERC20({
            tokenAddress: linkFundingToken,
            ethersConnection: this.ethersConnection});

        if (cltuInfo.topupType === ChainlinkTopup.TOPUP_TYPE.AUTOMATION) {
            const registry = contracts.AutomationRegistry({
                registryAddress: cltuInfo.registry,
                ethersConnection: this.ethersConnection
            });
            const result = await registry.getUpkeep(cltuInfo.targetId);
            return CaskUnits.formatUnits({
                amount: result.balance,
                decimals: await link.decimals(),
                units: units || this.options.defaultUnits,
                unitOptions: unitOptions || this.options.defaultUnitOptions,
            });

        } else if (cltuInfo.topupType === ChainlinkTopup.TOPUP_TYPE.VRF) {
            const registry = contracts.VRFCoordinator({
                coordinatorAddress: cltuInfo.registry,
                ethersConnection: this.ethersConnection
            });
            const result = await registry.getSubscription(cltuInfo.targetId);
            return CaskUnits.formatUnits({
                amount: result.balance,
                decimals: await link.decimals(),
                units: units || this.options.defaultUnits,
                unitOptions: unitOptions || this.options.defaultUnitOptions,
            });

        } else if (cltuInfo.topupType === ChainlinkTopup.TOPUP_TYPE.DIRECT) {
            const result = await link.balanceOf(cltuInfo.registry);
            return CaskUnits.formatUnits({
                amount: result,
                decimals: await link.decimals(),
                units: units || this.options.defaultUnits,
                unitOptions: unitOptions || this.options.defaultUnitOptions,
            });

        } else {
            throw new Error("Unknown ChainlinkTopup type");
        }

    }

}

export default ChainlinkTopup;