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

        this.walletAddress = this.options.walletAddress;

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

    /**
     * Get the wallet our current connection represents.
     * @return {string}
     */
    currentWalletAddress() {
        let walletAddress = this.walletAddress;
        if (!walletAddress && this.ethersConnection.address) {
            walletAddress = this.ethersConnection.address;
        }
        return walletAddress;
    }

    async rawQuery(query, options={}) {
        if (!this.apolloClient) {
            throw new Error(`apolloClient not available. Current chain have a supported subgraph?`);
        }
        this.logger.debug(`Subgraph Query: ${query}`);
        return this.apolloClient.query({
            query: gql(query),
            ...options
        });
    }

    /**
     * Get all flows for an address
     * @param {Object} args Function arguments
     * @param {string} [args.address=this.ethersConnection.address] Address of user
     * @return {Promise<*>}
     */
    async flows({address}={}) {
        address = address || this.ethersConnection.address;
        if (!address) {
            throw new Error("address not specified or detectable");
        }

        const query = `
query Query {
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
    cancelAt
    processAt
    slippageBps
    status
    to
    totalAmount
  }
  caskP2Ps(where: {user: "${address.toLowerCase()}"}) {
    id
    period
    createdAt
    amount
    cancelAt
    currentAmount
    numPayments
    numSkips
    status
    to
    totalAmount
  }
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
    period
    plan {
      planId
    }
    price
    provider {
      id
    }
    ref
    renewAt
    renewCount
  }
}
`
        const results = await this.rawQuery(query);
        return results.data
    }

    transactionHistory({
                           first=10,
                           skip=0,
                           where={},
                           orderBy='timestamp',
                           orderDirection='desc'
                       }={})
    {
        const whereString = Object.keys( where ).map( key => `${key}:"${where[key]}"`).join( ',' );

        return this.rawQuery(`
query Query {
    caskTransactions(
        first: ${first}, 
        skip: ${skip}, 
        orderBy: ${orderBy}, 
        orderDirection: ${orderDirection},
        where: {${whereString}}
    ) {
        id
        type
        timestamp
        amount
        assetAddress
        consumer {
            id
        }
        provider {
            id
        }
    }
}`);
    }

    subscriptions({
                      first=10,
                      skip=0,
                      where={},
                      orderBy='createdAt',
                      orderDirection='desc',
                      includeCanceled = false,
                      status,
                  }={})
    {
        where = {
            currentOwner: this.currentWalletAddress().toLowerCase(),
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
        });
    }

    subscribers({
                      first=10,
                      skip=0,
                      where={},
                      orderBy='createdAt',
                      orderDirection='desc',
                      includeCanceled = false,
                      status,
                  }={})
    {

        where = {
            provider: this.currentWalletAddress().toLowerCase(),
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
        })
    }

    subscriptionQuery({
                    first=10,
                    skip=0,
                    where={},
                    orderBy='createdAt',
                    orderDirection='desc',
                    includeCanceled = false,
                    status,
                }={})
    {
        let whereStatus;
        if (status) {
            if (Array.isArray(status)) {
                whereStatus = `status_in:[${status.join(',')}]`;
            } else {
                whereStatus = status;
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
    currentOwner {
        id
    }
    provider {
        id
    }
    plan {
        id
        planId
    }
    price
    period
    status
    createdAt
    renewAt
    discountId
  }
}`);
    }
}

export default Query;