import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import Logger from "../utils/Logger.js";
import abi from "../core/abi.js";
import deployments from "../core/deployments.js";

import SubscriptionPlans from "../subscriptionPlans/index.js";


/**
 * Service class for listening to on-chain events from the subscriptions, subscription plans and vault contracts.
 */
class Events {

    /**
     * Create an instance of the Events service.
     *
     * @param options See CaskSDK configuration.
     * @see CaskSDK
     */
    constructor(options={}) {
        this.options = {
            ...options,
            ...options?.events
        };

        this.logger = new Logger('CaskSDK::Events', this.options.logLevel);

        this.listeners = {};
        this.handlers = {};
        this.listening = false;
        this.isProvider = options.isProvider;

        if (!this.options?.cache) {
            this.options.cache = {};
        }
        this.options.cache.events = this;
    }

    /**
     * Initialize the event notification service.
     *
     * @param {Object} args Function arguments
     * @param {EthersConnection} [args.ethersConnection] EthersConnection instance
     */
    async init({ethersConnection}) {
        this.logger.trace(`Initializing Cask Events service.`);
        this.ethersConnection = ethersConnection;
        this.environment = ethersConnection.environment;
        this.address = ethersConnection.address;
        this.chainId = ethersConnection.chainId;

        ethersConnection.onSwitchChain(async () => {
            await this._checkIfProvider();
            if (this.listening) {
                return this._subscribeToEvents('latest');
            }
        });
        this.logger.info(`Cask Events service initialization complete.`);
    }

    async _checkIfProvider() {
        if (this.options.enabled && this.isProvider === undefined && this.ethersConnection.address) {

            let subscriptionPlans;
            if (this.options.cache?.subscriptionPlans) {
                subscriptionPlans = this.options.cache.subscriptionPlans;
            } else {
                subscriptionPlans = new SubscriptionPlans(this.options);
                await subscriptionPlans.init({ethersConnection: this.ethersConnection});
                await subscriptionPlans.initContracts();
            }

            this.isProvider = await subscriptionPlans.hasProviderProfile();
        }
    }

    /**
     * Register a callback to be called for a specified event.
     * @param eventName Event name to listen for, or specify 'ALL' for callback to receive all event types.
     * @param handler Callback handler
     */
    registerHandler(eventName, handler) {
        if (!this.handlers[eventName]) {
            this.handlers[eventName] = [];
        }
        this.handlers[eventName].push(handler);
    }

    /**
     * Unregister handlers for a specific event name.
     * @param eventName Event name to unregister, or specify 'ALL' to unregister a wildcard callback.
     */
    removeHandlers(eventName) {
        delete this.handlers[eventName];
    }

    _triggerHandler(eventName, args) {
        this.logger.debug(`Dispatching event ${eventName} with args ${JSON.stringify(args)}`);
        if (this.handlers[eventName]?.length > 0) {
            this.handlers[eventName].forEach((handler) => {
                try {
                    handler(eventName, args);
                } catch (err) {
                    this.logger.warn(`Error in ${eventName} handler.`, err);
                }
            });
        }
        if (this.handlers['ALL']?.length > 0) {
            this.handlers['ALL'].forEach((handler) => {
                try {
                    handler(eventName, args);
                } catch (err) {
                    this.logger.warn(`Error in ALL handler for ${eventName}.`, err);
                }
            });
        }
    }

    /**
     * Start listening for Cask contract events.
     *
     * @param {Object} args Function arguments
     * @param {string|number} [args.fromBlock=latest] Listen for events starting at this block
     * @param {string[]} [args.subscriptionEvents] List of subscription event names to listen for. Defaults to all subscription events.
     * @param {Object} [args.subscriptionFilter] Filter for subscription events
     * @param {string[]} [args.vaultAssetEvents] List of vault event names to listen for. Defaults to all vault asset events.
     * @param {Object} [args.vaultAssetFilter] Filter for subscription events
     * @param {string[]} [args.vaultPaymentEvents] List of vault payment event names to listen for. Defaults to all vault payment events.
     * @param {Object} [args.vaultPaymentFilter] Filter for subscription events
     * @param {string[]} [args.subscriptionPlanEvents] List of subscription plans event names to listen for. Defaults to all subscription plans events.
     * @param {Object} [args.subscriptionPlanFilter] Filter for subscription events
     */
    async listen({fromBlock='latest',
                     subscriptionEvents, subscriptionFilter,
                     vaultAssetEvents, vaultAssetFilter,
                     vaultPaymentEvents, vaultPaymentFilter,
                     subscriptionPlanEvents, subscriptionPlanFilter}={})
    {
        this.listening = true;

        if (!subscriptionEvents) {
            subscriptionEvents = [
                'SubscriptionCreated', 'SubscriptionChangedPlan', 'SubscriptionPendingChangePlan',
                'SubscriptionPaused', 'SubscriptionResumed', 'SubscriptionPendingCancel',
                'SubscriptionCanceled', 'SubscriptionRenewed', 'SubscriptionTrialEnded',
                'SubscriptionPastDue', 'SubscriptionPendingPause'
            ];
        }
        if (!subscriptionFilter) {
            subscriptionFilter = {consumer: this.address};
            if (this.isProvider) {
                subscriptionFilter = [subscriptionFilter, {provider: this.address}];
            }
        }
        if (!vaultAssetEvents) {
            vaultAssetEvents = ['AssetDeposited','AssetWithdrawn'];
        }
        if (!vaultAssetFilter) {
            vaultAssetFilter = {participant: this.address};
        }
        if (!vaultPaymentEvents) {
            vaultPaymentEvents = ['Payment','TransferValue'];
        }
        if (!vaultPaymentFilter) {
            vaultPaymentFilter = [{from: this.address}, {to: this.address}];
        }
        if (!subscriptionPlanEvents) {
            subscriptionPlanEvents = ['ProviderSetProfile'];
        }
        if (!subscriptionPlanFilter) {
            if (this.isProvider) {
                subscriptionPlanFilter = {provider: this.address};
            }
        }

        this.subscriptionEvents = subscriptionEvents;
        this.subscriptionFilter = subscriptionFilter;
        this.vaultAssetEvents = vaultAssetEvents;
        this.vaultAssetFilter = vaultAssetFilter;
        this.vaultPaymentEvents = vaultPaymentEvents;
        this.vaultPaymentFilter = vaultPaymentFilter;
        this.subscriptionPlanEvents = subscriptionPlanEvents;
        this.subscriptionPlanFilter = subscriptionPlanFilter;

        return this._subscribeToEvents(fromBlock);
    }
    
    async _subscribeToEvents(fromBlock) {
        if (!this.options.enabled) {
            return;
        }

        this.chainId = this.ethersConnection.chainId;

        if (this.options.debug) {
            this.logger.debug(`Starting event listeners:`);
            this.logger.debug(`   subscriptionFilter: ${JSON.stringify(this.subscriptionFilter)}`);
            this.logger.debug(`   vaultAssetFilter: ${JSON.stringify(this.vaultAssetFilter)}`);
            this.logger.debug(`   vaultPaymentFilter: ${JSON.stringify(this.vaultPaymentFilter)}`);
            this.logger.debug(`   subscriptionPlanFilter: ${JSON.stringify(this.subscriptionPlanFilter)}`);
        }

        if (!deployments.CaskVault[this.environment][this.chainId]) {
            throw new Error(`Chain ${this.chainId} is not supported for environment ${this.environment}`);
        }

        const wssProvider = this.options?.connections?.ws?.[this.chainId];
        if (!wssProvider) {
            this.logger.debug(`No WebSocket connection available for chain ${this.chainId} - not listening for events`);
            return;
        }

        this.web3 = createAlchemyWeb3(wssProvider);

        this.CaskVault = new this.web3.eth.Contract(
            abi.CaskVault[this.environment],
            deployments.CaskVault[this.environment][this.chainId]);

        this.CaskSubscriptions = new this.web3.eth.Contract(
            abi.CaskSubscriptions[this.environment],
            deployments.CaskSubscriptions[this.environment][this.chainId]);

        this.CaskSubscriptionPlans = new this.web3.eth.Contract(
            abi.CaskSubscriptionPlans[this.environment],
            deployments.CaskSubscriptionPlans[this.environment][this.chainId]);


        if (this.subscriptionEvents && this.subscriptionFilter) {
            this.subscriptionEvents.forEach((evt) => {
                this._registerEvent(this.CaskSubscriptions, evt, fromBlock, this.subscriptionFilter)
            });
        }

        if (this.vaultAssetEvents && this.vaultAssetFilter) {
            this.vaultAssetEvents.forEach((evt) => {
                this._registerEvent(this.CaskVault, evt, fromBlock, this.vaultAssetFilter)
            });
        }

        if (this.vaultPaymentEvents && this.vaultPaymentFilter) {
            this.vaultPaymentEvents.forEach((evt) => {
                this._registerEvent(this.CaskVault, evt, fromBlock, this.vaultPaymentFilter)
            });
        }

        if (this.subscriptionPlanEvents && this.subscriptionPlanFilter) {
            this.subscriptionPlanEvents.forEach((evt) => {
                this._registerEvent(this.CaskSubscriptionPlans, evt, fromBlock, this.subscriptionPlanFilter)
            });
        }
    }

    _registerEvent(contract, eventName, fromBlock, filter) {
        this.listeners[eventName]?.unsubscribe();
        this.listeners[eventName] =
            contract.events[eventName]({fromBlock: fromBlock, filter: filter})
                .on('data', async (event) => { this._triggerHandler(event.event, event.returnValues) });
    }

    /**
     * Stop listening for events.
     */
    stop() {
        if (this.web3?.currentProvider) {
            this.web3.currentProvider.disconnect();
        }
    }
}

export default Events;