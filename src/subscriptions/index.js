import Logger from "../utils/Logger.js";
import ipfs from "../ipfs/index.js";
import contracts from "../contracts/index.js";
import enc from "../enc/index.js";
import utils from "../utils/index.js";
import CaskUnits from "../core/units.js";

import EthersConnection from "../core/EthersConnection.js";
import SubscriptionPlans from "../subscriptionPlans/index.js";

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
            this.initSubscriptionPlans = true;
            this.options.cache.subscriptionPlans = this.subscriptionPlans;
        }

        if (this.options.cache?.secureData) {
            this.secureData = this.options.cache.secureData;
        } else {
            this.secureData = new enc.SecureData(options.enc);
            this.initSecureData = true;
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

        if (this.initSubscriptionPlans) {
            await this.subscriptionPlans.init({ethersConnection: this.ethersConnection});
        }
        if (this.initSecureData) {
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
     * @param [address=ethersConnection.address] Provider address or attempts to use the blockchain connection address
     * @param [limit=10] Limit
     * @param [offset=0] Offset
     * @return {Promise<*>}
     */
    async getConsumerSubscriptions({address, limit=10, offset=0}={}) {
        address = address || this.ethersConnection.address;
        if (!address) {
            throw new Error("address not specified or detectable");
        }

        const resp = await this.CaskSubscriptions.getConsumerSubscriptions(address, limit, offset);
        return resp.map((id) => id.toHexString());
    }

    /**
     * Get the current number of subscriptions for an address.
     * @param [address=ethersConnection.address] Provider address or attempts to use the blockchain connection address
     * @return {Promise<*>}
     */
    async getConsumerSubscriptionCount({address}={}) {
        address = address || this.ethersConnection.address;
        if (!address) {
            throw new Error("address not specified or detectable");
        }

        return (await this.CaskSubscriptions.getConsumerSubscriptionCount(address)).toString();
    }

    /**
     * Get a map of subscriptions that are subscribed to a specified service provider.
     * @param [address=ethersConnection.address] Provider address or attempts to use the blockchain connection address
     * @param [limit=10] Limit
     * @param [offset=0] Offset
     * @return {Promise<*>}
     */
    async getProviderSubscriptions({address, limit=10, offset=0}={}) {
        address = address || this.ethersConnection.address;
        if (!address) {
            throw new Error("address not specified or detectable");
        }

        const resp = await this.CaskSubscriptions.getProviderSubscriptions(address, limit, offset);
        return resp.map((id) => id.toHexString());
    }

    /**
     * Get the number of subscriptions that are subscribed to a specified service provider.
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

        return (await this.CaskSubscriptions.getProviderSubscriptionCount(address, includeCanceled, planId)).toString();
    }

    /**
     * Get the details of a specific subscription.
     *
     * @see The SDK guide for more details on unit formatting at {@link https://docs.cask.fi/developer-docs/javascript-sdk}
     * @param subscriptionId
     * @param [options] Addtional Options
     * @param {boolean} [options.decryptPrivateData=false] Decrypt private data (if present)
     * @param {AuthSig} [options.authSig] Authsig for private data decryption
     * @param {string} [options.units] Units of output
     * @param {Object} [options.unitOptions={}] Options passed to unit formatter.
     * @return {Promise<Subscriptions.SubscriptionDetail>}
     */
    async get(subscriptionId, {decryptPrivateData=false, authSig={}, units, unitOptions}={}) {
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
        if (ipfsData.discount) {
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
     * Create a new subscription.
     * @param {Object} args Function arguments
     * @param {string} args.provider Address of service provider
     * @param {number} args.planId Plan ID for new subscription
     * @param {string} [args.ref] Optional bytes32 value to associate with subscription
     * @param {number} [args.cancelAt] Optional unix timestamp of when to automatically cancel subscription
     * @param {string} [args.discountCode] Discount to apply to subscription
     * @param {AuthSig} [args.authSig] AuthSig for attaching private data to subscription
     * @param {Object} [args.privateData] Private data to attach to subscription
     * @param {Object} [args.metadata] Non-encrypted data to associate with subscription
     * @return {Subscriptions.CreateSubscriptionResult}
     */
    async create({provider, planId, ref, cancelAt=0, discountCode,
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
        let discountCodeValidator;
        let discountData;
        let discountProof;

        if (discountCode) {
            discountId = utils.generateDiscountId(discountCode);
            discount = providerProfile.discounts[discountId];
            if (discount) {
                discountCodeValidator = utils.generateDiscountCodeValidator(discountCode);
                discountData = utils.encodeDiscountData(discount.value, discount.validAfter,
                    discount.expiresAt, discount.maxRedemptions, discount.planId, discount.applyPeriods,
                    discount.discountType, discount.isFixed);
            }
        }
        if (discount) {
            discountProof = utils.generateDiscountProof(
                discountCodeValidator,
                discountData,
                providerProfile.discountMerkleRoot,
                utils.discountsMerkleProof(utils.discountsList(providerProfile.discounts), discount));
        } else {
            discountProof = utils.generateDiscountProof(
                0,
                0,
                providerProfile.discountMerkleRoot);
        }

        const subscriptionData = {
            version: 1,
            image: providerProfile.metadata.iconUrl,
            chainId: this.ethersConnection.chainId,
            ref,
            planId,
            plan,
            provider,
            discountId: discount ? discountId : undefined,
            discount,
            providerMetadata: providerProfile.metadata,
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

        const tx = await this.CaskSubscriptions.connect(this.ethersConnection.signer).createSubscription(
            providerProfile.nonce,
            plansProof,
            discountProof,
            cancelAt,
            providerProfile.signedRoots,
            subscriptionCid);

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
        }
    }

    /**
     * Attach transferrable private data to a subscription.
     * @param subscriptionId
     * @param data
     * @param authSig
     * @return {Promise<{tx: *}>}
     */
    async attachData(subscriptionId, data, authSig={}) {

        const subscriptionInfo = await this.CaskSubscriptions.getSubscription(subscriptionId);
        if (!subscriptionInfo) {
            throw new Error("Subscription not found");
        }

        const encData = await this.secureData.encryptData({
            subscriptionId,
            consumer: subscriptionInfo.currentOwner,
            provider: subscriptionInfo.subscription.provider,
            privacy: enc.mode.TRANSFERRABLE,
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
     * @param authSig
     * @return {Promise<*>}
     */
    async getAttachedData(subscriptionId, authSig={}) {

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
            privacy: enc.mode.TRANSFERRABLE,
            encData: ipfsData.data,
            authSig});
    }

    /**
     * Change a subscription, such as plan change, the discount or metadata.
     * @param subscriptionId
     * @param planId
     * @param discountCode
     * @param metadata
     * @return {Promise<{ref, tx: *, provider, chainId, planId, subscriptionId, consumer: (*)}>}
     */
    async change(subscriptionId, {planId, discountCode, metadata={}}) {

        if (!this.ethersConnection.signer) {
            throw new Error("Cannot perform transaction without ethers signer");
        }

        const subscriptionInfo = await this.CaskSubscriptions.getSubscription(subscriptionId);
        if (!subscriptionInfo) {
            throw new Error("Subscription not found");
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
        let discountCodeProof;
        let discountData;
        let discountProof;

        if (discountCode) {
            discountId = utils.generateDiscountId(discountCode);
            const discount = providerProfile.discounts[discountId];
            if (discount) {
                discountCodeProof = utils.generateDiscountProof(discountCode);
                discountData = utils.encodeDiscountData(discount.value, discount.validAfter,
                    discount.expiresAt, discount.maxRedemptions, discount.planId, discount.applyPeriods,
                    discount.isFixed);
            }
        }
        if (discount) {
            discountProof = utils.generateDiscountProof(
                discountCodeProof,
                discountData,
                providerProfile.discountMerkleRoot,
                utils.discountsMerkleProof(utils.discountsList(providerProfile.discounts), discount));
        } else {
            discountProof = utils.generateDiscountProof(
                0,
                0,
                providerProfile.discountMerkleRoot);
        }

        const subscriptionData = {
            version: 1,
            image: providerProfile.metadata.iconUrl,
            chainId: this.ethersConnection.chainId,
            ref: subscriptionInfo.subscription.ref,
            plan,
            provider,
            discountId: discount ? discountId : undefined,
            providerMetadata: providerProfile.metadata,
            metadata,
        }
        const subscriptionCid = await this.ipfs.save(subscriptionData)

        const tx = await this.CaskSubscriptions.connect(this.ethersConnection.signer).changeSubscriptionPlan(
            subscriptionId,
            providerProfile.nonce,
            plansProof,
            discountProof,
            providerProfile.signedRoots,
            subscriptionCid);

        const events = (await tx.wait()).events || [];
        const event = events.find((e) =>
            e.event === "SubscriptionChangedPlan" || e.event === 'SubscriptionPendingChangePlan');
        if (!event) {
            throw new Error("Could not find SubscriptionChangedPlan or SubscriptionPendingChangePlan event after subscription change");
        }
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
        const events = (await tx.wait()).events || [];
        const event = events.find((e) => e.event === "SubscriptionPaused");
        if (!event) {
            throw new Error("Could not find SubscriptionPaused event after subscription pause");
        }
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
        const events = (await tx.wait()).events || [];
        const event = events.find((e) => e.event === "SubscriptionResumed");
        if (!event) {
            throw new Error("Could not find SubscriptionResumed event after subscription resume");
        }
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
        const events = (await tx.wait()).events || [];
        const event = events.find((e) =>
            e.event === "SubscriptionCanceled" || e.event === "SubscriptionPendingCancel");
        if (!event) {
            throw new Error("Could not find SubscriptionCanceled or SubscriptionPendingCancel event after subscription cancel");
        }
        return {tx};
    }

}

export default Subscriptions;