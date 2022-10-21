import Logger from "./utils/Logger.js";
import abi from "./core/abi.js";
import assetIcons from "./core/assetIcons.js";
import chains from "./core/chains.js";
import defaultChains from "./core/defaultChains.js";
import deployments from "./core/deployments.js";
import environments from "./core/environments.js";
import units from "./core/units.js";
import urls from "./core/urls.js";
import contracts from "./contracts/index.js";
import enc from "./enc/index.js";
import ipfs from "./ipfs/index.js";
import meta from "./meta/index.js";
import utils from "./utils/index.js";

import EthersConnection from "./core/EthersConnection.js";

import Vault from "./vault/index.js";
import Subscriptions from "./subscriptions/index.js";
import SubscriptionPlans from "./subscriptionPlans/index.js";
import Events from "./events/index.js";
import Prices from "./prices/index.js";
import Query from "./query/index.js";
import Tokens from "./tokens/index.js";
import DCA from "./dca/index.js";
import P2P from "./p2p/index.js";
import ChainlinkTopup from "./chainlinkTopup/index.js";

/**
 * @overview CaskSDK is the primary entrypoint into the Cask SDK.
 * <br/></br/>
 * The CaskSDK class contains both static helpers and, when instantiated, automatically instantiates
 * instances of various service classes to interact with the different parts of the Cask platform.
 * <br/><br/>
 *
 * For details on the SDK constructor configuration object, please see the SDK guide: {@link https://docs.cask.fi/developer-docs/javascript-sdk#configuration}
 *
 * @example
 * const provider = new ethers.providers.Web3Provider(web3.currentProvider);
 *
 * const cask = new CaskSDK({
 *     connections: {
 *         rpc: {
 *             // rpc connections are for reading from the blockchain and should have one per chain
 *             [CaskSDK.chains.POLYGON_MUMBAI]: 'https://...',
 *         },
 *         ws: {
 *             // ws connections are for listening for events on the blockchain and should have one per chain
 *             [CaskSDK.chains.POLYGON_MUMBAI]: 'wss://...',
 *         },
 *         // signer connections are for sending transactions to the blockchain and can have just one
 *         // since it can use the browser wallet (such as Metamask) which can switch chains
 *         signer: provider.getSigner(),
 *     },
 *     ipfs: {
 *         pinataApiKey: process.env.PINATA_API_KEY,
 *         pinataApiSecret: process.env.PINATA_API_SECRET,
 *     },
 *     meta: {
 *         biconomyApiKey: {
 *             [CaskSDK.chains.POLYGON_MUMBAI]: process.env.BICONOMY_API_KEY,
 *         },
 *     },
 *     environment: CaskSDK.environments.TESTNET,
 * });
 *
 * await cask.init();
 *
 *
 * @author Cask Protocol & Subverse Labs, LLC
 * @version 1.1
 * @name CaskSDK
 */

/**
 * @ignore
 */
class CaskSDK {

  static abi = abi;
  static assetIcons = assetIcons;
  static chains = chains;
  static defaultChains = defaultChains;
  static deployments = deployments;
  static environments = environments;
  static units = units;
  static urls = urls;
  static contracts = contracts;
  static enc = enc;
  static ipfs = ipfs;
  static meta = meta;
  static utils = utils;

  static fundingSource = {
    CASK: 0, // Cask wallet
    PERSONAL: 1, // personal wallet
  }

  static subscriptionStatus = {
    NONE: 0,
    TRIALING: 1,
    ACTIVE: 2,
    PAUSED: 3,
    CANCELED: 4,
    PAST_DUE: 5,
    PENDING_PAUSE: 6
  }

  static dcaStatus = {
    NONE: 0,
    ACTIVE: 1,
    PAUSED: 2,
    CANCELED: 3,
    COMPLETE: 4,
  }

  static p2pStatus = {
    NONE: 0,
    ACTIVE: 1,
    PAUSED: 2,
    CANCELED: 3,
    COMPLETE: 4,
  }

  static chainlinkTopupStatus = {
    NONE: 0,
    ACTIVE: 1,
    PAUSED: 2,
    CANCELED: 3,
  }

  static chainlinkTopupType = {
    NONE: 0,
    AUTOMATION: 1,
    VRF: 2,
    DIRECT: 3,
  }

  /**
   * Create an instance of the CaskSDK
   * @param options
   */
  constructor(options = {}) {
    this.options = options;

    this.logger = new Logger('CaskSDK', this.options.logLevel);

    this.options.cache = {};

    /**
     * Query service instance.
     * @type {Query}
     */
    this.query = new Query(this.options);

    /**
     * Vault service instance.
     * @type {Vault}
     */
    this.vault = new Vault(this.options);

    /**
     * Events service instance.
     * @type {Events}
     */
    this.events = new Events(this.options);

    /**
     * Subscription Plans service instance.
     * @type {SubscriptionPlans}
     */
    this.subscriptionPlans = new SubscriptionPlans(this.options);

    /**
     * Subscriptions service instance.
     * @type {Subscriptions}
     */
    this.subscriptions = new Subscriptions(this.options);

    /**
     * Prices service instance.
     * @type {Prices}
     */
    this.prices = new Prices(this.options);

    /**
     * Token metadata service instance.
     * @type {Tokens}
     */
    this.tokens = new Tokens(this.options);

    /**
     * DCA service instance.
     * @type {DCA}
     */
    this.dca = new DCA(this.options);

    /**
     * P2P service instance.
     * @type {P2P}
     */
    this.p2p = new P2P(this.options);

    /**
     * ChainlinkTopup service instance.
     * @type {ChainlinkTopup}
     */
    this.chainlinkTopup = new ChainlinkTopup(this.options);
  }

  /**
   * Initialize the blockchain connection(s).
   *
   * @param {Object} args Function arguments
   * @param {EthersConnection} [args.ethersConnection] EthersConnection instance to use instead of creating a new one.
   * @param {number} [args.chainId=options.environment] ID of chain to use.
   * @param {Signer} [args.signer=options.connections.signer] Signer to use on new chain.
   */
  async init({ ethersConnection, chainId , signer} = {}) {
    this.logger.info(`Initializing Cask SDK.`);

    if (ethersConnection) {
      this.ethersConnection = ethersConnection;
    } else {
      this.ethersConnection = new EthersConnection(this.options);
    }

    const promises = [];

    promises.push(this.query.init({ ethersConnection: this.ethersConnection }));
    promises.push(this.vault.init({ ethersConnection: this.ethersConnection }));
    promises.push(this.subscriptionPlans.init({ ethersConnection: this.ethersConnection }));
    promises.push(this.subscriptions.init({ ethersConnection: this.ethersConnection }));
    promises.push(this.dca.init({ ethersConnection: this.ethersConnection }));
    promises.push(this.p2p.init({ ethersConnection: this.ethersConnection }));
    promises.push(this.chainlinkTopup.init({ ethersConnection: this.ethersConnection }));
    promises.push(this.events.init({ ethersConnection: this.ethersConnection }));
    promises.push(this.prices.init({ ethersConnection: this.ethersConnection }));

    promises.push(this.tokens.init({ ethersConnection: this.ethersConnection }));

    await Promise.all(promises);

    if (!ethersConnection) {
      await this.ethersConnection.init({chainId, signer});
    }
    this.logger.info(`Cask SDK initialization complete.`);
  }

  /**
   * Initialize the blockchain connection(s).
   *
   * @param {Object} args Function arguments
   * @param {EthersConnection} [args.ethersConnection] EthersConnection instance
   * @param {number} [args.chainId=options.environment] ID of chain to use
   * @param {Signer} [args.signer=options.connections.signer] Signer to use on new chain.
   */
  async initSubscription({ ethersConnection, chainId , signer} = {}) {
    this.logger.info(`Initializing Cask SDK.`);

    if (ethersConnection) {
      this.ethersConnection = ethersConnection;
    } else {
      this.ethersConnection = new EthersConnection(this.options);
    }

    const promises = [];

    promises.push(this.query.init({ ethersConnection: this.ethersConnection }));
    promises.push(this.vault.init({ ethersConnection: this.ethersConnection }));
    promises.push(this.subscriptionPlans.init({ ethersConnection: this.ethersConnection }));
    promises.push(this.subscriptions.init({ ethersConnection: this.ethersConnection }));
    promises.push(this.events.init({ ethersConnection: this.ethersConnection }));
    promises.push(this.prices.init({ ethersConnection: this.ethersConnection }));
    promises.push(this.tokens.init({ ethersConnection: this.ethersConnection }));

    await Promise.all(promises);

    if (!ethersConnection) {
      await this.ethersConnection.init({ chainId, signer });
    }
    this.logger.info(`Cask SDK initialization complete.`);
  }

  async initDCA({ ethersConnection, chainId , signer} = {}) {
    this.logger.info(`Initializing Cask DCA SDK.`);

    if (ethersConnection) {
      this.ethersConnection = ethersConnection;
    } else {
      this.ethersConnection = new EthersConnection(this.options);
    }

    const promises = [];

    promises.push(this.query.init({ ethersConnection: this.ethersConnection }));
    promises.push(this.vault.init({ ethersConnection: this.ethersConnection }));
    promises.push(this.dca.init({ ethersConnection: this.ethersConnection }));

    await Promise.all(promises);

    if (!ethersConnection) {
      await this.ethersConnection.init({ chainId, signer });
    }
    this.logger.info(`Cask DCA SDK initialization complete.`);
  }

  async initP2P({ ethersConnection, chainId , signer} = {}) {
    this.logger.info(`Initializing Cask P2P SDK.`);

    if (ethersConnection) {
      this.ethersConnection = ethersConnection;
    } else {
      this.ethersConnection = new EthersConnection(this.options);
    }

    const promises = [];

    promises.push(this.query.init({ ethersConnection: this.ethersConnection }));
    promises.push(this.vault.init({ ethersConnection: this.ethersConnection }));
    promises.push(this.p2p.init({ ethersConnection: this.ethersConnection }));

    await Promise.all(promises);

    if (!ethersConnection) {
      await this.ethersConnection.init({ chainId, signer });
    }
    this.logger.info(`Cask P2P SDK initialization complete.`);
  }

  async initChainlinkTopup({ ethersConnection, chainId , signer} = {}) {
    this.logger.info(`Initializing Cask ChainlinkTopup SDK.`);

    if (ethersConnection) {
      this.ethersConnection = ethersConnection;
    } else {
      this.ethersConnection = new EthersConnection(this.options);
    }

    const promises = [];

    promises.push(this.query.init({ ethersConnection: this.ethersConnection }));
    promises.push(this.vault.init({ ethersConnection: this.ethersConnection }));
    promises.push(this.chainlinkTopup.init({ ethersConnection: this.ethersConnection }));

    await Promise.all(promises);

    if (!ethersConnection) {
      await this.ethersConnection.init({ chainId, signer });
    }
    this.logger.info(`Cask ChainlinkTopup SDK initialization complete.`);
  }

  /**
   * Switch signer of current connection.
   * @param signer signer
   */
  switchSigner(signer) {
    return this.ethersConnection.switchSigner(signer);
  }

  /**
   * Get current Cask environment
   * @returns environment
   */
  environment() {
    return this.ethersConnection.environment;
  }

  /**
   * Get chain ID of current connection
   * @returns chain ID
   */
  currentChain() {
    return this.ethersConnection.chainId;
  }

  /**
   * Get address from signer of current connection
   * @returns address
   */
  currentAddress() {
    return this.ethersConnection.address;
  }

  /**
   * Get ethers provider of current connection
   * @returns provider
   */
  currentProvider() {
    return this.ethersConnection.provider;
  }

  /**
   * Get ethers signer of current connection
   * @returns signer
   */
  currentSigner() {
    return this.ethersConnection.signer;
  }

  /**
   * Sign a message using the current connection signer
   * @param message Message to sign
   * @returns signature
   */
  signMessage(message) {
    return this.ethersConnection.signMessage(message);
  }

  /**
   * Switch current chain
   * @param chainId Chain ID
   * @param signer Ethers signer
   */
  switchChain(chainId, signer = undefined) {
    return this.ethersConnection.switchChain(chainId, signer);
  }

  /**
   * Return a map of services and if they are available based on the current ethersConnection
   * @returns {Object}
   */
  servicesAvailable() {
    return deployments.servicesAvailable(this.ethersConnection);
  }

  /**
   * Shutdown connections for background services
   */
  stop() {
    this.logger.debug(`Stopping Cask SDK.`);
    this.events.stop();
    this.prices.stop();
    this.logger.info(`Cask SDK stopped.`);
  }
}


export {
    CaskSDK,
    EthersConnection,
    Subscriptions,
    SubscriptionPlans,
    Events,
    Prices,
    Vault,
    Query,
    Tokens,
    DCA,
    P2P,
}