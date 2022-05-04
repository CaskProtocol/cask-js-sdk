import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client/core';
import fetch from 'cross-fetch';
import Logger from "../utils/Logger.js";
import Chains from "../core/chains.js";

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
        const chainInfo = Chains.lookupChain(this.ethersConnection.chainId);
        if (this.options.subgraphUrl || chainInfo.subgraphUrl) {
            this.apolloClient = new ApolloClient({
                link: new HttpLink({ uri: this.options.subgraphUrl || chainInfo.subgraphUrl, fetch }),
                cache: new InMemoryCache(),
                ...this.options?.apolloOptions,
            });
        } else {
            this.logger.warn(`No subgraphUrl available for chain ${this.ethersConnection.chainId} - no query service available`);
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

    transactionHistory({
                           first=10,
                           skip=0,
                           where='',
                           orderBy='timestamp',
                           orderDirection='desc'
                       }={})
    {

        if (typeof(where) === 'object') {
            where = Object.keys( where ).map( key => `${key}:"${where[key]}"`).join( ',' );
        }

        return this.rawQuery(`
query Query {
    caskTransactions(
        first: ${first}, 
        skip: ${skip}, 
        orderBy: ${orderBy}, 
        orderDirection: ${orderDirection},
        where: {${where}}
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
                      where='',
                      orderBy='createdAt',
                      orderDirection='desc',
                      includeCanceled = false
                  }={})
    {
        const whereStatus = includeCanceled ? '' : ', status_not_in: [Canceled]';

        if (!where) {
            where = {currentOwner: this.currentWalletAddress().toLowerCase()};
        }
        if (typeof(where) === 'object') {
            where = Object.keys( where ).map( key => `${key}:"${where[key]}"`).join( ',' );
        }

        return this.rawQuery(`
query Query {
  caskSubscriptions(
    first: ${first}
    skip: ${skip}
    orderBy: ${orderBy}
    orderDirection: ${orderDirection}
    where: {${where}${whereStatus}}
  ) {
    id
    currentOwner {
        id
    }
    provider {
        id
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

    subscribers({
                      first=10,
                      skip=0,
                      where='',
                      orderBy='createdAt',
                      orderDirection='desc',
                      includeCanceled = false
                  }={})
    {
        const whereStatus = includeCanceled ? '' : ', status_not_in: [Canceled]';

        if (!where) {
            where = {provider: this.currentWalletAddress().toLowerCase()};
        }
        if (typeof(where) === 'object') {
            where = Object.keys( where ).map( key => `${key}:"${where[key]}"`).join( ',' );
        }

        return this.rawQuery(`
query Query {
  caskSubscriptions(
    first: ${first}
    skip: ${skip}
    orderBy: ${orderBy}
    orderDirection: ${orderDirection}
    where: {${where}${whereStatus}}
  ) {
    id
    currentOwner {
        id
    }
    provider {
        id
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