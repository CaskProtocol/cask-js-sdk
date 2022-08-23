import { ethers } from "ethers";
import Logger from "../utils/Logger.js";
import ipfs from "../ipfs/index.js";
import contracts from "../contracts/index.js";
import enc from "../enc/index.js";
import utils from "../utils/index.js";
import CaskUnits from "../core/units.js";
import Query from "../query/index.js";

import EthersConnection from "../core/EthersConnection.js";
import SubscriptionPlans from "../subscriptionPlans/index.js";
import meta from "../meta";

/**
 * @memberOf Subscriptions
 * @typedef SubscriptionDetail
 * @property {string} subscriptionId Subscription ID
 * @property {number} planId ID of plan that subscription is subscribed to
 * @property {number} status Subscription status
 * @property {number} createdAt Unix timestamp of subscription creation time
 * @property {number} renewAt Unix timestamp of next subscription renewal time
 * @property {number} minTermAt Unix timestamp of when subscription minimum term is over, 0 if no minimum term
 * @property {number} cancelAt Unix timestamp of when subscription is scheduled to be canceled
 * @property {string} cid IPFS cid of subscription data
 * @property {string} discountId Discount applied to subscription
 * @property {Plan} plan Plan that subscription is subscribed to
 * @property {string} consumer Address of current subscription holder
 * @property {string} image URL to service provider logo
 * @property {Object} metadata Subscription metadata
 */

/**
 * @memberOf Subscriptions
 * @typedef CreateSubscriptionResult
 * @property {Object} tx Create Transaction
 * @property {string} consumer Consumer address
 * @property {number} planId Plan ID
 * @property {string} ref Bytes32 data associated with subscription
 * @property {number} chainId Chain ID that the transacrtion took place on
 * @property {string} subscriptionId ID of newly created subscription
 */

/**
 * Service class to handle interacting with the Cask subscriptions system
 */
class Subscriptions {

    /**
     * Create an instance of the Subscriptions service.
     *
     * @param options See CaskSDK configuration.
     * @see CaskSDK
     */
    constructor(options={}) {
        this.options = {
            ...options,
            ...options?.subscriptions
        };

        this.logger = new Logger('CaskSDK::Subscriptions', this.options.logLevel);

        if (!this.options?.cache) {
            this.options.cache = {};
        }
        this.options.cache.subscriptions = this;

        if (this.options.cache?.subscriptionPlans) {
            this.subscriptionPlans = this.options.cache?.subscriptionPlans;
        } else {
            this.subscriptionPlans = new SubscriptionPlans(this.options);
            this.options.cache.subscriptionPlans = this.subscriptionPlans;
        }

        if (this.options.cache?.query) {
            this.query = this.options.cache?.query;
        } else {
            this.query = new Query(this.options);
            this.options.cache.query = this.query;
        }

        if (this.options.cache?.secureData) {
            this.secureData = this.options.cache.secureData;
        } else {
            this.secureData = new enc.SecureData(options.enc);
            this.options.cache.secureData = this.secureData;
        }

        if (this.options.cache?.ipfs) {
            this.ipfs = this.options.cache.ipfs;
        } else {
            this.ipfs = new ipfs.IPFS(options.ipfs);
            this.options.cache.ipfs = this.ipfs;
        }
    }

    /**
     * Initialize the subscription service.
     *
     * @param {Object} args Function arguments
     * @param {EthersConnection} [args.ethersConnection] EthersConnection instance
     */
    async init({ethersConnection}={}) {
        this.logger.trace(`Initializing Cask Subscription service.`);
        if (!ethersConnection) {
            this.ethersConnection = new EthersConnection(this.options);
        } else {
            this.ethersConnection = ethersConnection;
        }
        this.ethersConnection.onSwitchChain(async(chainId) => { await this._initContracts(chainId) });

        if (!this.subscriptionPlans.ethersConnection) {
            await this.subscriptionPlans.init({ethersConnection: this.ethersConnection});
        }
        if (!this.query.ethersConnection) {
            await this.query.init({ethersConnection: this.ethersConnection});
        }
        if (!this.secureData.ethersConnection) {
            await this.secureData.init({ethersConnection: this.ethersConnection});
        }

        if (!ethersConnection) {
            await this.ethersConnection.init();
        }
        this.logger.info(`Cask Subscription service initialization complete.`);
    }

    async _initContracts(chainId) {
        this.CaskSubscriptions = contracts.CaskSubscriptions({ethersConnection: this.ethersConnection});
    }

    /**
     * Get a map of subscriptions for a specified address
     * @deprecated use query service
     * @param [address=ethersConnection.address] Provider address or attempts to use the blockchain connection address
     * @param [limit=10] Limit
     * @param [offset=0] Offset
     * @param [orderBy=createdAt] Order by
     * @param [orderDirection=asc] Order direction, one of asc or desc
     * @return {Promise<*>}
     */
    async getConsumerSubscriptions({address, limit=10, offset=0, orderBy="createdAt", orderDirection="asc"}={}) {
        address = address || this.ethersConnection.address;
        if (!address) {
            throw new Error("address not specified or detectable");
        }

        const query = `
query Query {
  caskSubscriptions(
    where: {currentOwner: "${address.toLowerCase()}"}
    first: ${limit}
    skip: ${offset}
    orderBy: ${orderBy}
    orderDirection: ${orderDirection}
  ) {
    id
  }
}`;
        const results = await this.query.rawQuery(query);
        return results.data.caskSubscriptions.map((record) => record.id);
    }

    /**
     * Get the current number of subscriptions for an address.
     * @deprecated use query service
     * @param [address=ethersConnection.address] Provider address or attempts to use the blockchain connection address
     * @return {Promise<*>}
     */
    async getConsumerSubscriptionCount({address}={}) {
        address = address || this.ethersConnection.address;
        if (!address) {
            throw new Error("address not specified or detectable");
        }

        const query = `
query Query {
    caskConsumer(id: "${address.toLowerCase()}") {
        totalSubscriptionCount
    }
}`;
        const results = await this.query.rawQuery(query);
        return parseInt(results.data.caskConsumer?.totalSubscriptionCount) || 0;
    }

    /**
     * Get a map of subscriptions that are subscribed to a specified service provider.
     * @deprecated use query service
     * @param [address=ethersConnection.address] Provider address or attempts to use the blockchain connection address
     * @param [limit=10] Limit
     * @param [offset=0] Offset
     * @param [orderBy=createdAt] Order by
     * @param [orderDirection=asc] Order direction, one of asc or desc
     * @return {Promise<*>}
     */
    async getProviderSubscriptions({address, limit=10, offset=0, orderBy="createdAt",
                                       orderDirection="asc", includeCanceled=false}={})
    {
        address = address || this.ethersConnection.address;
        if (!address) {
            throw new Error("address not specified or detectable");
        }

        const query = `
query Query {
  caskSubscriptions(
    where: {provider: "${address.toLowerCase()}"}
    first: ${limit}
    skip: ${offset}
    orderBy: ${orderBy}
    orderDirection: ${orderDirection}
  ) {
    id
  }
}`;
        const results = await this.query.rawQuery(query);
        return results.data.caskSubscriptions.map((record) => record.id);
    }

    /**
     * Get the number of subscriptions that are subscribed to a specified service provider.
     * @deprecated use query service
     * @param [address=ethersConnection.address] Provider address or attempts to use the blockchain connection address
     * @param [includeCanceled=false] Also include canceled subscriptions
     * @param planId Plan ID
     * @return {Promise<*>}
     */
    async getProviderSubscriptionCount({address, includeCanceled=false, planId=0}={}) {
        address = address || this.ethersConnection.address;
        if (!address) {
            throw new Error("address not specified or detectable");
        }

        const query = `
query Query {
    caskProvider(id: "${address.toLowerCase()}") {
        totalSubscriptionCount
    }
}`;
        const results = await this.query.rawQuery(query);
        return parseInt(results.data.caskProvider?.totalSubscriptionCount) || 0;
    }

    /**
     * Get the details of a specific subscription.
     *
     * @see The SDK guide for more details on unit formatting at {@link https://docs.cask.fi/developer-docs/javascript-sdk}
     * @param subscriptionId
     * @param [options] Additional Options
     * @param {boolean} [options.decryptPrivateData=false] Decrypt private data (if present)
     * @param {AuthSig} [options.authSig] Authsig for private data decryption
     * @param {string} [options.units] Units of output
     * @param {Object} [options.unitOptions={}] Options passed to unit formatter.
     * @return {Promise<Subscriptions.SubscriptionDetail>}
     */
    async get(subscriptionId, {decryptPrivateData=false, authSig={}, units, unitOptions}={}) {
        const subscriptionInfo = await this.CaskSubscriptions.getSubscription(subscriptionId);
        if (!subscriptionInfo ||
            subscriptionInfo?.subscription?.provider === '0x0000000000000000000000000000000000000000')
        {
            throw new Error("Subscription not found");
        }

        let ipfsData = {};
        if (subscriptionInfo.subscription?.cid) {
            ipfsData = await this.ipfs.load(subscriptionInfo.subscription.cid);
            if (!ipfsData) {
                throw new Error("Unable to load IPFS subscription data");
            }
        }
        if (!ipfsData?.plan?.planId) {
            throw new Error("Invalid plan found in IPFS data");
        }

        if (decryptPrivateData && ipfsData?.privateData?.data) {
            ipfsData.privateData = await this.secureData.decryptData({
                consumer: subscriptionInfo.currentOwner,
                provider: subscriptionInfo.subscription.provider,
                privacy: enc.mode.PRIVATE,
                encData: ipfsData.privateData?.data,
                authSig});
        }

        let discount;
        if (ipfsData.discount &&
            subscriptionInfo.subscription.discountId !==
            '0x0000000000000000000000000000000000000000000000000000000000000000')
        {
            discount = ipfsData.discount;
            if (discount.isFixed) {
                discount.value = CaskUnits.formatUnits({
                    amount: discount.value,
                    decimals: CaskUnits.BASE_ASSET_DECIMALS,
                    units: units || this.options.defaultUnits,
                    unitOptions: unitOptions || this.options.defaultUnitOptions})
            }
        }

        return {
            ...ipfsData,
            subscriptionId,
            ref: subscriptionInfo.subscription.ref,
            status: subscriptionInfo.subscription.status,
            createdAt: subscriptionInfo.subscription.createdAt,
            renewAt: subscriptionInfo.subscription.renewAt,
            minTermAt: subscriptionInfo.subscription.minTermAt,
            cancelAt: subscriptionInfo.subscription.cancelAt,
            cid: subscriptionInfo.subscription.cid,
            discountId: discount ? subscriptionInfo.subscription.discountId : undefined,
            discount,
            // network: utils.parseNetworkData(subscriptionInfo.subscription.networkData),
            planId: subscriptionInfo.subscription.planId,
            plan: {
                ...ipfsData.plan,
                price: CaskUnits.formatUnits({
                    amount: ipfsData.plan.price,
                    decimals: CaskUnits.BASE_ASSET_DECIMALS,
                    units: units || this.options.defaultUnits,
                    unitOptions: unitOptions || this.options.defaultUnitOptions})
            },
            consumer: subscriptionInfo.currentOwner,
        }
    }

    /**
     * Get history for a subscription
     *
     * @param {string} subscriptionId Subscription ID
     */
    async history(subscriptionId, {limit=10, offset=0, orderBy="timestamp", orderDirection="desc"}={}) {
        subscriptionId = ethers.BigNumber.from(subscriptionId);

        const query = `
query Query {
    caskSubscriptionEvents(
        where: {subscriptionId: "${subscriptionId.toString()}"}
        first: ${limit}
        skip: ${offset}
        orderBy: ${orderBy}
        orderDirection: ${orderDirection}
    ) {
        txnId
        timestamp
        type
        provider {
           id
        }
        planId
    }
}`;
        const results = await this.query.rawQuery(query);
        return results.data.caskSubscriptionEvents;
    }

    /**
     * Get the estimated spend by a consumer on all subscriptions for a specific period
     *
     * @param {string} address Consumer address
     * @param {number} [period=1 month] Commitment period
     */
    async estimatedCommitment(address, period=2628000) {
        const query = `
query Query {
  caskSubscriptions(
    where: {
      currentOwner: "${address.toLowerCase()}",
      status_in: [Active]
    }
  ) {
    status
    cancelAt
    discountId
    price
    period
  }
}`;
        const results = await this.query.rawQuery(query);

        return results.data.caskSubscriptions.reduce((balance, sub) => {
            return balance + (period / sub.period * parseFloat(sub.price));
        }, 0);
    }

    /**
     * Return the number of active/trialing subscriptions a consumer has to a specific provider and plan.
     *
     * @param {string} consumer Consumer address
     * @param {string} provider Provider address
     * @param {number} [planId] Plan ID
     */
    async activeSubscriptionCount(consumer, provider, planId) {
        const resp = await this.CaskSubscriptions.getActiveSubscriptionCount(consumer, provider, planId);
        return parseInt(resp) || 0;
    }

    /**
     * Create a new subscription.
     *
     * @param {Object} args Function arguments
     * @param {string} args.provider Address of service provider
     * @param {number} args.planId Plan ID for new subscription
     * @param {string} [args.ref] Optional bytes32 value to associate with subscription
     * @param {number} [args.cancelAt] Optional unix timestamp of when to automatically cancel subscription
     * @param {string} [args.name] Name for NFT - defaults to auto generated name
     * @param {string} [args.description] Description for NFT - defaults to auto generated description
     * @param {string} [args.image] URL for NFT image - defaults to provider icon URL if not supplied
     * @param {string} [args.external_url] URL for NFT - defaults to provider website URL if not supplied
     * @param {Array} [args.attributes] Array of attributes to store with IPFS NFT data
     * @param {string} [args.discountCode] Discount code of discount to apply to subscription
     * @param {string} [args.discountTokenValidator] Discount token validator for token discount to apply to subscription
     * @param {AuthSig} [args.authSig] AuthSig for attaching private data to subscription
     * @param {Object} [args.privateData] Private data to attach to subscription
     * @param {Object} [args.metadata] Non-encrypted data to associate with subscription
     * @return {Subscriptions.CreateSubscriptionResult}
     */
    async create({provider, planId, ref, cancelAt=0, image, external_url, attributes=[], name, description,
                     discountCode, discountTokenValidator,
                     authSig={}, privateData={}, metadata={}})
    {
        if (!this.ethersConnection.signer) {
            throw new Error("Cannot perform transaction without ethers signer");
        }

        const providerProfile = await this.subscriptionPlans.loadProfile({address: provider});
        if (!providerProfile) {
            throw new Error("Unable to locate provider profile");
        }

        const plan = providerProfile.plans[planId];
        if (!plan) {
            throw new Error(`Unable to locate plan ${planId} in provider plans`);
        }

        const origRef = ref;
        if (ref && !ref.startsWith('0x')) {
            ref = utils.stringToRef(ref);
        } else if (!ref) {
            ref = utils.stringToRef('');
        }

        const planData = utils.encodePlanData(planId, plan.price, plan.period, plan.freeTrial, plan.maxActive,
            plan.minPeriods, plan.gracePeriod, plan.canPause, plan.canTransfer);

        const plansProof = utils.generatePlanProof(
            provider,
            ref,
            planData,
            providerProfile.planMerkleRoot,
            utils.plansMerkleProof(utils.plansList(providerProfile.plans), plan));

        let discountId;
        let discount;
        let discountValidator;
        let discountProof;

        if (discountTokenValidator) {
            discountId = discountTokenValidator;
            discountValidator = discountTokenValidator;
        } else if (discountCode) {
            discountId = utils.generateDiscountId(discountCode);
            discountValidator = utils.generateDiscountCodeValidator(discountCode);
        }
        discount = providerProfile.discounts[discountId];
        if (discount) {
            const discountData = utils.encodeDiscountData(discount.value, discount.validAfter,
                discount.expiresAt, discount.maxRedemptions, discount.planId, discount.applyPeriods,
                discount.discountType, discount.isFixed);

            discountProof = utils.generateDiscountProof(
                discountValidator,
                discountData,
                providerProfile.discountMerkleRoot,
                utils.discountsMerkleProof(utils.discountsList(providerProfile.discounts), discount));

            if (!await this.subscriptionPlans.verifyDiscount(planId, discountId)) {
                discount = null;
                discountProof = utils.generateDiscountProof(0, 0, providerProfile.discountMerkleRoot);
            }

        } else {
            discountProof = utils.generateDiscountProof(0, 0, providerProfile.discountMerkleRoot);
        }

        attributes = [
            ...attributes,
            {
                trait_type: "Provider Address",
                value: provider
            },
            {
                trait_type: "Provider Name",
                value: providerProfile?.metadata?.name
            },
            {
                trait_type: "Plan ID",
                value: planId
            },
            {
                trait_type: "Plan Name",
                value: plan.name
            },
        ];
        if (origRef) {
            attributes.push({
                trait_type: "Ref",
                value: origRef
            });
        }
        const subscriptionData = {
            version: 1,
            image: image || providerProfile?.metadata?.iconUrl,
            name: name || `Subscription to ${providerProfile?.metadata?.name}`,
            description: description || `Subscription to ${providerProfile?.metadata?.name} for plan ${plan.name}. Powered by Cask Protocol - https://www.cask.fi`,
            external_url: external_url || providerProfile?.metadata?.websiteUrl,
            attributes,
            chainId: this.ethersConnection.chainId,
            ref,
            planId,
            plan,
            provider,
            discountId: discount ? discountId : undefined,
            discount,
            providerMetadata: providerProfile?.metadata,
            metadata,
        }

        if (Object.keys(privateData).length > 0) {
            const encData = await this.secureData.encryptData({
                consumer: this.ethersConnection.address,
                provider: provider,
                privacy: enc.mode.PRIVATE,
                data: privateData,
                authSig});

            subscriptionData.privateData = {
                version: 1,
                encryptionProvider: this.secureData.encProvider,
                data: encData,
            }
        }

        const subscriptionCid = await this.ipfs.save(subscriptionData)

        let tx;
        if (this.ethersConnection.metaEnabled()) {
            tx = await this.ethersConnection.sendTransaction(
                await this.CaskSubscriptions.connect(this.ethersConnection.signer).populateTransaction.createSubscription(
                    providerProfile.nonce,
                    plansProof,
                    discountProof,
                    cancelAt,
                    providerProfile.signedRoots,
                    subscriptionCid
                )
            );
        } else {
            tx = await this.CaskSubscriptions.connect(this.ethersConnection.signer).createSubscription(
                providerProfile.nonce,
                plansProof,
                discountProof,
                cancelAt,
                providerProfile.signedRoots,
                subscriptionCid);
        }

        const events = (await tx.wait()).events || [];
        const event = events.find((e) => e.event === "SubscriptionCreated");
        if (!event) {
            throw new Error("Could not find SubscriptionCreated after subscription creation");
        }
        return {
            tx,
            consumer: this.ethersConnection.address,
            provider,
            planId,
            ref,
            chainId: this.ethersConnection.chainId,
            subscriptionId: event.args.subscriptionId.toHexString(),
            discountId: event.args.discountId,
        }
    }

    /**
     * Attach transferrable private data to a subscription.
     * @param subscriptionId
     * @param data
     * @param [options] Additional Options
     * @param {object} [authSig] LIT authsig
     * @param [privacy=enc.mode.TRANSFERRABLE] privacy setting for attached data.
     * @return {Promise<{tx: *}>}
     */
    async attachData(subscriptionId, data, {authSig={}, privacy=enc.mode.TRANSFERRABLE}={}) {

        const subscriptionInfo = await this.CaskSubscriptions.getSubscription(subscriptionId);
        if (!subscriptionInfo) {
            throw new Error("Subscription not found");
        }

        const encData = await this.secureData.encryptData({
            subscriptionId,
            consumer: subscriptionInfo.currentOwner,
            provider: subscriptionInfo.subscription.provider,
            privacy,
            data,
            authSig});

        const ipfsData = {
            version: 1,
            encryptionProvider: this.secureData.encProvider,
            data: encData,
        }

        const attachedDataCid = await this.ipfs.save(ipfsData);

        const tx = await this.CaskSubscriptions.connect(this.ethersConnection.signer)
            .attachData(subscriptionId, attachedDataCid);
        await tx.wait();
        return {tx};
    }

    /**
     * Get the transferrable private data attached to a subscription.
     * @param subscriptionId
     * @param [options] Additional Options
     * @param {object} [authSig] LIT authsig
     * @param [privacy=enc.mode.TRANSFERRABLE] privacy setting for attached data.
     * @return {Promise<*>}
     */
    async attachedData(subscriptionId, {authSig={}, privacy=enc.mode.TRANSFERRABLE}={}) {

        const subscriptionInfo = await this.CaskSubscriptions.getSubscription(subscriptionId);
        if (!subscriptionInfo) {
            throw new Error("Subscription not found");
        }
        if (!subscriptionInfo.subscription.dataCid) {
            throw new Error("No data CID on subscription. Is data attached?");
        }

        const ipfsData = await this.ipfs.load(subscriptionInfo.subscription.dataCid);
        if (!ipfsData) {
            throw new Error("Unable to load IPFS data for attached data");
        }

        return await this.secureData.decryptData({
            subscriptionId,
            consumer: subscriptionInfo.currentOwner,
            provider: subscriptionInfo.subscription.provider,
            privacy,
            encData: ipfsData.data,
            authSig});
    }

    /**
     * Change a subscription, such as plan change, the discount or metadata.
     * @param subscriptionId ID of subscription to change
     * @param {Object} args change function options
     * @param {number} args.planId Plan ID for new subscription
     * @param {string} [args.discountCode] Discount code of discount to apply to subscription
     * @param {string} [args.discountTokenValidator] Discount token validator for token discount to apply to subscription
     * @param {string} [args.name] Name for NFT - defaults to auto generated name
     * @param {string} [args.description] Description for NFT - defaults to auto generated description
     * @param {string} [args.image] URL for NFT image - defaults to provider icon URL if not supplied
     * @param {string} [args.external_url] URL for NFT - defaults to provider website URL if not supplied
     * @param {Array} [args.attributes] Array of attributes to store with IPFS NFT data
     * @param {Object} [args.metadata] Non-encrypted data to associate with subscription
     * @return {Promise<{ref, tx: *, provider, chainId, planId, subscriptionId, consumer: (*)}>}
     */
    async change(subscriptionId, {planId, discountCode, discountTokenValidator,
        image, external_url, attributes=[], name, description, metadata={}})
    {

        if (!this.ethersConnection.signer) {
            throw new Error("Cannot perform transaction without ethers signer");
        }

        const subscriptionInfo = await this.CaskSubscriptions.getSubscription(subscriptionId);
        if (!subscriptionInfo) {
            throw new Error("Subscription not found");
        }

        let ipfsData = {};
        if (subscriptionInfo.subscription?.cid) {
            ipfsData = await this.ipfs.load(subscriptionInfo.subscription.cid);
            if (!ipfsData) {
                throw new Error("Unable to load IPFS subscription data");
            }
        }

        const providerProfile = await this.subscriptionPlans
            .loadProfile({address: subscriptionInfo.subscription.provider});
        if (!providerProfile) {
            throw new Error("Unable to locate provider profile");
        }

        const plan = providerProfile.plans[planId];
        if (!plan) {
            throw new Error(`Unable to locate plan ${planId} in provider plans`);
        }

        const planData = utils.encodePlanData(planId, plan.price, plan.period, plan.freeTrial, plan.maxActive,
            plan.minPeriods, plan.gracePeriod, plan.canPause, plan.canTransfer);

        const plansProof = utils.generatePlanProof(
            subscriptionInfo.subscription.provider,
            subscriptionInfo.subscription.ref,
            planData,
            providerProfile.planMerkleRoot,
            utils.plansMerkleProof(utils.plansList(providerProfile.plans), plan));

        let discountId;
        let discount;
        let discountValidator;
        let discountProof;

        if (discountTokenValidator) {
            discountId = discountTokenValidator;
            discountValidator = discountTokenValidator;
        } else if (discountCode) {
            discountId = utils.generateDiscountId(discountCode);
            discountValidator = utils.generateDiscountCodeValidator(discountCode);
        }
        discount = providerProfile.discounts[discountId];
        if (discount) {
            const discountData = utils.encodeDiscountData(discount.value, discount.validAfter,
                discount.expiresAt, discount.maxRedemptions, discount.planId, discount.applyPeriods,
                discount.discountType, discount.isFixed);

            discountProof = utils.generateDiscountProof(
                discountValidator,
                discountData,
                providerProfile.discountMerkleRoot,
                utils.discountsMerkleProof(utils.discountsList(providerProfile.discounts), discount));

            if (!await this.subscriptionPlans.verifyDiscount(planId, discountId)) {
                discount = null;
                discountProof = utils.generateDiscountProof(0, 0, providerProfile.discountMerkleRoot);
            }

        } else {
            discountProof = utils.generateDiscountProof(0, 0, providerProfile.discountMerkleRoot);
        }

        attributes = [
            ...attributes,
            {
                trait_type: "Provider Address",
                value: provider
            },
            {
                trait_type: "Provider Name",
                value: providerProfile?.metadata?.name
            },
            {
                trait_type: "Plan ID",
                value: planId
            },
            {
                trait_type: "Plan Name",
                value: plan.name
            },
        ];
        if (subscriptionInfo.subscription.ref) {
            attributes.push({
                trait_type: "Ref",
                value: subscriptionInfo.subscription.ref
            });
        }

        const subscriptionData = {
            version: 1,
            image: image || ipfsData.image || providerProfile?.metadata?.iconUrl,
            name: name || ipfsData.name || `Subscription to ${providerProfile?.metadata?.name}`,
            description: description || ipfsData.description || `Subscription to ${providerProfile?.metadata?.name} for plan ${plan.name}. Powered by Cask Protocol - https://www.cask.fi`,
            external_url: external_url || ipfsData.external_url || providerProfile?.metadata?.websiteUrl,
            attributes,
            chainId: this.ethersConnection.chainId,
            ref: subscriptionInfo.subscription.ref,
            plan,
            provider,
            discountId: discount ? discountId : undefined,
            providerMetadata: providerProfile?.metadata,
            metadata,
        }
        const subscriptionCid = await this.ipfs.save(subscriptionData);

        const tx = await this.CaskSubscriptions.connect(this.ethersConnection.signer).changeSubscriptionPlan(
            subscriptionId,
            providerProfile.nonce,
            plansProof,
            discountProof,
            providerProfile.signedRoots,
            subscriptionCid);
        await tx.wait();
        return {
            tx,
            consumer: this.ethersConnection.address,
            provider: subscriptionInfo.subscription.provider,
            planId,
            ref: subscriptionInfo.subscription.ref,
            chainId: this.ethersConnection.chainId,
            subscriptionId: subscriptionId,
        }
    }

    /**
     * Pause an active subscription.
     * @param {string} subscriptionId Subscription ID
     * @return {Promise<{tx: *}>}
     */
    async pause(subscriptionId) {

        if (!this.ethersConnection.signer) {
            throw new Error("Cannot perform transaction without ethers signer");
        }

        const tx = await this.CaskSubscriptions
            .connect(this.ethersConnection.signer).pauseSubscription(subscriptionId);
        await tx.wait();
        return {tx};
    }

    /**
     * Resume a paused subscription.
     * @param {string} subscriptionId Subscription ID
     * @return {Promise<{tx: *}>}
     */
    async resume(subscriptionId) {

        if (!this.ethersConnection.signer) {
            throw new Error("Cannot perform transaction without ethers signer");
        }

        const tx = await this.CaskSubscriptions
            .connect(this.ethersConnection.signer).resumeSubscription(subscriptionId);
        await tx.wait();
        return {tx};
    }

    /**
     * Cancel (or schedule to be canceled) a subscription.
     * @param {string} subscriptionId Subscription ID
     * @param {number} cancelAt Unix timestamp for scheduled cancellation, use 0 to turn off a scheduled cancellation.
     * @return {Promise<{tx: *}>}
     */
    async cancel(subscriptionId, cancelAt=0) {

        if (!this.ethersConnection.signer) {
            throw new Error("Cannot perform transaction without ethers signer");
        }

        const tx = await this.CaskSubscriptions
            .connect(this.ethersConnection.signer).cancelSubscription(subscriptionId, cancelAt);
        await tx.wait();
        return {tx};
    }

}

export default Subscriptions;