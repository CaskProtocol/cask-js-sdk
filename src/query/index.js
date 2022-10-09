import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client/core';
import fetch from 'cross-fetch';
import Logger from "../utils/Logger.js";
import deployments from "../core/deployments.js";

import EthersConnection from "../core/EthersConnection.js";

/**
 * Service class for querying Cask subgraph data.
 */
class Query {

    /**
     * Create an instance of the Query service.
     *
     * @param options See CaskSDK configuration.
     * @see CaskSDK
     */
    constructor(options = {}) {
        this.options = {
            ...options,
            ...options?.query
        };

        this.logger = new Logger('CaskSDK::Query', this.options.logLevel);

        this.enabledFlows = this.options.enabledFlows || ['subscriptions','dca','p2p','chainlinkTopup'];

        if (!this.options?.cache) {
            this.options.cache = {};
        }
        this.options.cache.query = this;
    }

    /**
     * Initialize the query service.
     *
     * @param {Object} args Function arguments
     * @param {EthersConnection} [args.ethersConnection] EthersConnection instance
     */
    async init({ethersConnection} = {}) {
        this.logger.trace(`Initializing Cask Query service.`);
        if (!ethersConnection) {
            this.ethersConnection = new EthersConnection(this.options);
        } else {
            this.ethersConnection = ethersConnection;
        }

        this.ethersConnection.onSwitchChain(async() => { await this._initApollo() });

        if (!ethersConnection) {
            await this.ethersConnection.init();
        }
        this.logger.info(`Cask Query service initialization complete.`);
    }

    _initApollo() {
        const subgraphUrl = this.options.subgraphUrl ||
            deployments.SubgraphUrl[this.ethersConnection.environment][this.ethersConnection.chainId];
        if (subgraphUrl) {
            this.logger.debug(`Using subgraphUrl ${subgraphUrl}`)
            this.apolloClient = new ApolloClient({
                link: new HttpLink({ uri: subgraphUrl, fetch }),
                cache: new InMemoryCache(),
                ...this.options?.apolloOptions,
            });
        } else {
            this.logger.warn(`No subgraph URL available for deployment ${this.ethersConnection.environment}/${this.ethersConnection.chainId} - no query service available`);
        }
    }

    async rawQuery(query, options={}) {
        if (!this.apolloClient) {
            throw new Error(`apolloClient not available. Current chain have a supported subgraph?`);
        }
        this.logger.debug(`Subgraph Query: ${query}`);
        this.logger.debug(`Subgraph Options: ${JSON.stringify(options, null, 2)}`);
        return this.apolloClient.query({
            query: gql(query),
            ...options
        });
    }

    async graphStatus(options={fetchPolicy: 'no-cache'}) {
        const query = `
query Query {
    _meta {
        block {
            number
            timestamp
        }
    }
}`;
        const results = await this.rawQuery(query, options);
        return results.data['_meta'];
    }

    /**
     * Get the summary metrics for a specific provider
     * @param {Object} args Function arguments
     * @param {string} [args.address=this.ethersConnection.address] Address of provider
     * @return {Promise<*>}
     */
    async providerSummary({address, options}={}) {
        address = address || this.ethersConnection.address;
        if (!address) {
            throw new Error("address not specified or detectable");
        }

        const query = `
query Query {
    caskProvider(id: "${address.toLowerCase()}") {
        appearedAt
        paymentAddress
        profileCid
        profileNonce
        totalSubscriptionCount
        activeSubscriptionCount
        trialingSubscriptionCount
        convertedSubscriptionCount
        canceledSubscriptionCount
        pausedSubscriptionCount
        pastDueSubscriptionCount
        totalPaymentsReceived
    }
}`;
        const results = await this.rawQuery(query, options);
        return results.data.caskProvider;
    }

    /**
     * Get the summary metrics for a specific provider and plan
     * @param {Object} args Function arguments
     * @param {string} [args.address=this.ethersConnection.address] Address of user
     * @param {number} args.planId Plan ID
     * @return {Promise<*>}
     */
    async providerPlanSummary({address, planId, options}={}) {
        address = address || this.ethersConnection.address;
        if (!address) {
            throw new Error("address not specified or detectable");
        }
        if (!planId) {
            throw new Error("planId not specified");
        }

        const query = `
query Query {
    caskSubscriptionPlan(id: "${address.toLowerCase()}-${planId}") {
        status
        totalSubscriptionCount
        activeSubscriptionCount
        trialingSubscriptionCount
        convertedSubscriptionCount
        canceledSubscriptionCount
        pausedSubscriptionCount
        pastDueSubscriptionCount
    }
}`;
        const results = await this.rawQuery(query, options);
        return results.data.caskSubscriptionPlan;
    }

    /**
     * Get the summary metrics for a specific consumer
     * @param {Object} args Function arguments
     * @param {string} [args.address=this.ethersConnection.address] Address of consumer
     * @return {Promise<*>}
     */
    async consumerSummary({address, options}={}) {
        address = address || this.ethersConnection.address;
        if (!address) {
            throw new Error("address not specified or detectable");
        }

        const query = `
query Query {
    caskConsumer(id: "${address.toLowerCase()}") {
        balance
        appearedAt
        depositAmount
        depositCount
        withdrawAmount
        withdrawCount
        activeSubscriptionCount
        totalSubscriptionCount
        activeDCACount
        totalDCACount
        activeP2PCount
        totalP2PCount
    }
}`;
        const results = await this.rawQuery(query, options);
        return results.data.caskConsumer;
    }

    /**
     * Get the specified flow of a specific type
     * @param {string} id flow ID
     * @param {string} type Flow type (subscription, dca or p2p)
     * @param {Object} [options] query options
     * @return {Promise<*>}
     */
    async flow(id, type, options={}) {
        if (type === 'subscription') {
            return this.subscription(id, options);
        } else if (type === 'dca') {
            return this.dca(id, options);
        } else if (type === 'p2p') {
            return this.p2p(id, options);
        }
        throw new Error(`Unknown flow type ${type}`);
    }

    /**
     * Get all flows for an address
     * @param {Object} args Function arguments
     * @param {string} [args.address=this.ethersConnection.address] Address of user
     * @return {Promise<*>}
     */
    async flows({address, options}={}) {
        address = address || this.ethersConnection.address;
        if (!address) {
            throw new Error("address not specified or detectable");
        }

        const outboundFlowQueries = [];

        if (this.enabledFlows.includes('subscriptions')) {
            outboundFlowQueries.push(`
caskSubscriptions(
    where: {currentOwner: "${address.toLowerCase()}"}
  ) {
    id
    createdAt
    status
    cid
    cancelAt
    currentOwner {
      id
    }
    discountId
    plan {
      planId
      status
    }
    price
    period
    freeTrial
    maxActive
    minPeriods
    gracePeriod
    canPause
    canTransfer
    provider {
      id
    }
    ref
    renewAt
    renewCount
    lastRenewedAt
    pausedAt
    pastDueAt
    canceledAt
  }`);}

        if (this.enabledFlows.includes('dca')) {
            outboundFlowQueries.push(`
caskDCAs(where: {user: "${address.toLowerCase()}"}) {
    id
    createdAt
    period
    amount
    maxPrice
    minPrice
    numBuys
    numSkips
    outputAsset
    currentQty
    currentAmount
    processAt
    lastProcessedAt
    lastSkippedAt
    pausedAt
    canceledAt
    completedAt
    slippageBps
    status
    to
    totalAmount
  }`);}

        if (this.enabledFlows.includes('p2p')) {
            outboundFlowQueries.push(`
caskP2Ps(where: {user: "${address.toLowerCase()}"}) {
    id
    user {
       id
    }
    period
    createdAt
    amount
    currentAmount
    numPayments
    numSkips
    status
    to
    totalAmount
    processAt
    lastProcessedAt
    lastSkippedAt
    pausedAt
    canceledAt
    completedAt
  }`);}

        if (this.enabledFlows.includes('chainlinkTopup')) {
            outboundFlowQueries.push(`
caskChainlinkTopups(where: {user: "${address.toLowerCase()}"}) {
    id
    user {
       id
    }
    targetId
    registry
    topupType
    createdAt
    currentAmount
    currentBuyQty
    currentFees
    numTopups
    numSkips
    status
    lowBalance
    topupAmount
    lastProcessedAt
    lastSkippedAt
    pausedAt
    canceledAt
  }`);}

        const query = `
query Query {
${outboundFlowQueries.join('')}
}`
        const resultsOutbound = await this.rawQuery(query, options);

        const inboundFlowQueries = [];

        if (this.enabledFlows.includes('p2p')) {
            inboundFlowQueries.push(`
caskP2Ps(where: {to: "${address.toLowerCase()}"}) {
    id
    user {
       id
    }
    period
    createdAt
    amount
    currentAmount
    numPayments
    numSkips
    status
    to
    totalAmount
    processAt
    lastProcessedAt
    lastSkippedAt
    pausedAt
    canceledAt
    completedAt
  }`);}

        const queryInbound = `
query Query {
    ${inboundFlowQueries.join('')}  
}`
        const resultsInbound = await this.rawQuery(queryInbound, options);

        const result = {};
        if (this.enabledFlows.includes('subscriptions')) {
            result['caskSubscriptions'] = resultsOutbound.data.caskSubscriptions
        }
        if (this.enabledFlows.includes('dca')) {
            result['caskDCAs'] = resultsOutbound.data.caskDCAs
        }
        if (this.enabledFlows.includes('p2p')) {
            result['caskP2Ps'] = [...resultsOutbound.data.caskP2Ps, ...resultsInbound.data.caskP2Ps]
        }
        if (this.enabledFlows.includes('chainlinkTopup')) {
            result['caskChainlinkTopups'] = resultsOutbound.data.caskChainlinkTopups
        }

        return result;
    }

    subscriptions({
                      consumer,
                      first=10,
                      skip=0,
                      where={},
                      orderBy='createdAt',
                      orderDirection='desc',
                      includeCanceled = false,
                      status,
                      options
                  }={})
    {
        consumer = consumer || this.ethersConnection.address;
        if (!consumer) {
            throw new Error("consumer not specified or detectable");
        }

        where = {
            currentOwner: consumer.toLowerCase(),
            ...where
        }

        return this.subscriptionQuery({
            first,
            skip,
            where,
            orderBy,
            orderDirection,
            includeCanceled,
            status,
            options
        });
    }

    subscribers({
                    provider,
                    first=10,
                    skip=0,
                    where={},
                    orderBy='createdAt',
                    orderDirection='desc',
                    includeCanceled = false,
                    status,
                    options
                }={})
    {
        provider = provider || this.ethersConnection.address;
        if (!provider) {
            throw new Error("provider not specified or detectable");
        }

        where = {
            provider: provider.toLowerCase(),
            ...where
        }

        return this.subscriptionQuery({
            first,
            skip,
            where,
            orderBy,
            orderDirection,
            includeCanceled,
            status,
            options
        })
    }

    async subscription(id, options={}) {
        const result = await this.subscriptionQuery({where: {id}, includeCanceled: true, options});
        return result?.data?.caskSubscriptions?.[0];
    }

    subscriptionQuery({
                          first=10,
                          skip=0,
                          where={},
                          orderBy='createdAt',
                          orderDirection='desc',
                          includeCanceled = false,
                          status,
                          options
                      }={})
    {
        let whereStatus;
        if (status) {
            if (Array.isArray(status)) {
                whereStatus = `status_in:[${status.join(',')}]`;
            } else {
                whereStatus = `status: ${status}`;
            }
        } else {
            whereStatus = includeCanceled ? '' : ', status_not_in: [Canceled]';
        }

        const whereString = Object.keys( where ).map( key => `${key}:"${where[key]}"`).join( ',' );

        return this.rawQuery(`
query Query {
  caskSubscriptions(
    first: ${first}
    skip: ${skip}
    orderBy: ${orderBy}
    orderDirection: ${orderDirection}
    where: {${whereString}${whereString ? `, ${whereStatus}` : whereStatus}}
  ) {
    id
    createdAt
    status
    cid
    cancelAt
    currentOwner {
      id
    }
    discountId
    plan {
      planId
      status
    }
    price
    period
    freeTrial
    maxActive
    minPeriods
    gracePeriod
    canPause
    canTransfer
    provider {
      id
    }
    ref
    renewAt
    renewCount
    lastRenewedAt
    pausedAt
    pastDueAt
    canceledAt
  }
}`, options);
    }

    async dca(id, options={}) {
        const result = await this.dcaQuery({where: {id}, includeCanceled: true, options});
        return result?.data?.caskDCAs?.[0];
    }

    dcaQuery({
                 first=10,
                 skip=0,
                 where={},
                 orderBy='createdAt',
                 orderDirection='desc',
                 includeCanceled = false,
                 status,
                 options
             }={})
    {
        let whereStatus = '';
        if (status) {
            if (Array.isArray(status)) {
                whereStatus = `status_in:[${status.join(',')}]`;
            } else {
                whereStatus = `status: ${status}`;
            }
        } else {
            whereStatus = includeCanceled ? '' : ', status_not_in: [Canceled]';
        }

        const whereString = Object.keys( where ).map( key => `${key}:"${where[key]}"`).join( ',' );

        return this.rawQuery(`
query Query {
  caskDCAs(
    first: ${first}
    skip: ${skip}
    orderBy: ${orderBy}
    orderDirection: ${orderDirection}
    where: {${whereString}${whereString ? `, ${whereStatus}` : whereStatus}}
  ) {
    id
    user {
       id
    }
    createdAt
    period
    amount
    maxPrice
    minPrice
    numBuys
    numSkips
    outputAsset
    currentQty
    currentAmount
    currentFees
    processAt
    lastProcessedAt
    lastSkippedAt
    pausedAt
    canceledAt
    completedAt
    slippageBps
    status
    to
    totalAmount
  }
}`, options);
    }

    async p2p(id, options={}) {
        const result = await this.p2pQuery({where: {id}, includeCanceled: true, options});
        return result?.data?.caskP2Ps?.[0];
    }

    p2pQuery({
                 first=10,
                 skip=0,
                 where={},
                 orderBy='createdAt',
                 orderDirection='desc',
                 includeCanceled = false,
                 status,
                 options
             }={})
    {
        let whereStatus = '';
        if (status) {
            if (Array.isArray(status)) {
                whereStatus = `status_in:[${status.join(',')}]`;
            } else {
                whereStatus = `status: ${status}`;
            }
        } else {
            whereStatus = includeCanceled ? '' : ', status_not_in: [Canceled]';
        }

        const whereString = Object.keys( where ).map( key => `${key}:"${where[key]}"`).join( ',' );

        return this.rawQuery(`
query Query {
  caskP2Ps(
    first: ${first}
    skip: ${skip}
    orderBy: ${orderBy}
    orderDirection: ${orderDirection}
    where: {${whereString}${whereString ? `, ${whereStatus}` : whereStatus}}
  ) {
    id
    user {
       id
    }
    period
    createdAt
    amount
    currentAmount
    currentFees
    numPayments
    numSkips
    status
    to
    totalAmount
    processAt
    lastProcessedAt
    lastSkippedAt
    pausedAt
    canceledAt
    completedAt
  }
}`, options);
    }

    async chainlinkTopup(id, options={}) {
        const result = await this.chainlinkTopupQuery({where: {id}, includeCanceled: true, options});
        return result?.data?.caskChainlinkTopups?.[0];
    }

    chainlinkTopupQuery({
                 first=10,
                 skip=0,
                 where={},
                 orderBy='createdAt',
                 orderDirection='desc',
                 includeCanceled = false,
                 status,
                 options
             }={})
    {
        let whereStatus = '';
        if (status) {
            if (Array.isArray(status)) {
                whereStatus = `status_in:[${status.join(',')}]`;
            } else {
                whereStatus = `status: ${status}`;
            }
        } else {
            whereStatus = includeCanceled ? '' : ', status_not_in: [Canceled]';
        }

        const whereString = Object.keys( where ).map( key => `${key}:"${where[key]}"`).join( ',' );

        return this.rawQuery(`
query Query {
  caskChainlinkTopups(
    first: ${first}
    skip: ${skip}
    orderBy: ${orderBy}
    orderDirection: ${orderDirection}
    where: {${whereString}${whereString ? `, ${whereStatus}` : whereStatus}}
  ) {
    id
    user {
       id
    }
    createdAt
    currentAmount
    currentBuyQty
    currentFees
    numTopups
    numSkips
    status
    lowBalance
    topupAmount
    lastProcessedAt
    lastSkippedAt
    pausedAt
    canceledAt
  }
}`, options);
    }

    /**
     * Get wallet history for the connected user
     *
     */
    async walletHistory({address, limit=10, offset=0, orderBy="timestamp", orderDirection="desc"}={}) {
        if (!address) {
            address = this.ethersConnection.address;
        }
        if (!address) {
            throw new Error("Cannot perform query without connection address");
        }

        const query = `
query Query {
    caskWalletEvents(
        where: {user: "${this.ethersConnection.address.toLowerCase()}"}
        first: ${limit}
        skip: ${offset}
        orderBy: ${orderBy}
        orderDirection: ${orderDirection}
    ) {
        id
        txnId
        timestamp
        user {
           id
        }
        to {
           id
        }
        type
        assetAddress
        amount
        fundingSource
    }
}`;
        const results = await this.rawQuery(query);

        const queryInbound = `
query Query {
    caskWalletEvents(
        where: {to: "${this.ethersConnection.address.toLowerCase()}"}
        first: ${limit}
        skip: ${offset}
        orderBy: ${orderBy}
        orderDirection: ${orderDirection}
    ) {
        id
        txnId
        timestamp
        user {
           id
        }
        to {
           id
        }
        type
        assetAddress
        amount
        fundingSource
    }
}`;
        const resultsInbound = await this.rawQuery(queryInbound);

        return [...results.data.caskWalletEvents, ...resultsInbound.data.caskWalletEvents];
    }
}

export default Query;
