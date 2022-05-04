import Logger from "../utils/Logger.js";
import {ethers} from 'ethers';
import contracts from "../contracts/index.js";
import EthersConnection from "../core/EthersConnection.js";
import ProviderProfile from "./ProviderProfile.js";


/**
 * @typedef {Object} Plan
 * @property {number} planId Plan ID
 * @property {BigNumber|string} price Plan price
 * @property {number} period Plan period in seconds
 * @property {number} freeTrial Free trial length in seconds, 0 for no trial
 * @property {number} maxActive Maximum number of active subscribers on the plan, 0 for unlimited
 * @property {number} gracePeriod Number of days until a past due subscription is canceled
 * @property {boolean} canPause Can subscribers pause their subscription
 * @property {boolean} canTransfer Can subscribers transfer their subscription NFT
 */

/**
 * @typedef {Object} Discount
 * @property {BigNumber|string|number} value Value of discount, either fixed amount or basis points depending on isFixed
 * @property {number} validAfter Unix timestamp of when discount becomes available for redemption, 0 for immediate
 * @property {number} expiresAt Unix timestamp of when discount expires, 0 for no expiration
 * @property {number} maxRedemptions Maximum number of redemptions, 0 for unlimited
 * @property {number} planId Limit discount to a single plan, 0 to allow redemption by all plans
 * @property {number} gracePeriod Number of days until a past due subscription is canceled
 * @property {number} applyPeriods Number of periods the discount applies for, 0 for the lifetime of the subscription
 * @property {boolean} isFixed true if value is a fixed discount, false if value is a percentage in basis points
 */

/**
 * Service class to handle interacting with the Cask subscription plans system
 */
class SubscriptionPlans {

    /**
     * Create an instance of the SubscriptionPlans service.
     *
     * @param options See CaskSDK configuration.
     * @see CaskSDK
     */
    constructor(options={}) {
        this.options = {
            ...options,
            ...options?.subscriptionPlans
        };

        this.logger = new Logger('CaskSDK::SubscriptionPlans', this.options.logLevel);

        if (!this.options?.cache) {
            this.options.cache = {};
        }
        this.options.cache.subscriptionPlans = this;
    }

    /**
     * Initialize the subscription plans service.
     *
     * @param {Object} args Function arguments
     * @param {EthersConnection} [args.ethersConnection] EthersConnection instance
     */
    async init({ethersConnection}={}) {
        this.logger.trace(`Initializing Cask SubscriptionPlans service.`);
        if (!ethersConnection) {
            this.ethersConnection = new EthersConnection(this.options);
        } else {
            this.ethersConnection = ethersConnection;
        }
        this.ethersConnection.onSwitchChain(async(chainId) => { await this._initContracts(chainId) });

        if (!ethersConnection) {
            await this.ethersConnection.init();
        }
        this.logger.info(`Cask SubscriptionPlans service initialization complete.`);
    }

    async _initContracts(chainId) {
        this.CaskSubscriptionPlans = contracts.CaskSubscriptionPlans({ethersConnection: this.ethersConnection});
    }

    /**
     * Check if a given address is registered as a service provider.
     * @param address
     * @return {Promise<boolean>}
     */
    async hasProviderProfile({address}={}) {
        address = address || this.ethersConnection.address;
        if (!address) {
            throw new Error("address not specified or detectable");
        }
        const providerProfile = await this.CaskSubscriptionPlans.getProviderProfile(address);
        return providerProfile.cid !== '';
    }

    /**
     * Load the (or create a new non-published) service provider profile for an address.
     * @param [address=ethersConnection.address] Provider address or attempts to use the blockchain connection address
     * @return {Promise<ProviderProfile>}
     */
    async loadProfile({address}={}) {
        address = address || this.ethersConnection.address;
        if (!address) {
            throw new Error("address not specified or detectable");
        }

        const providerProfile = await this.CaskSubscriptionPlans.getProviderProfile(address);

        if (providerProfile?.cid) {
            this.providerProfile = new ProviderProfile({
                ipfs: this.options.ipfs,
                address,
                nonce: providerProfile.nonce,
                registered: true,
                debug: this.options.debug,
            });
            await this.providerProfile.loadFromIPFS(providerProfile.cid);
        } else {
            this.providerProfile = new ProviderProfile({
                ipfs: this.options.ipfs,
                address,
                registered: false,
                debug: this.options.debug,
            });
        }

        return this.providerProfile;
    }

    /**
     * Get the number of redemptions a specific plan/discountId has already had.
     * @param planId Plan ID
     * @param discountId Discount ID
     * @return {Promise<string>}
     */
    async getDiscountRedemptions(planId, discountId) {
        const redemptions = await this.CaskSubscriptionPlans
            .getDiscountRedemptions(this.providerProfile.address, planId, discountId);
        return redemptions.toString();
    }

    /**
     * Verify the given plan/discountId is currently valid. Throws an error if is not currently valid
     * that includes the reason.
     * @param planId Plan ID
     * @param discountId Discount ID
     * @return {Promise<boolean>}
     */
    async verifyDiscount(planId, discountId) {

        const discount = this.providerProfile.discounts[discountId];
        if (!discount) {
            throw new Error("Unknown discount");
        }

        const now = Date.now()/1000;

        if (discount.planId !== 0 && discount.planId !== planId) {
            throw new Error("Discount does not apply to the specified plan");
        }

        if (discount.validAfter > 0 && now < discount.validAfter) {
            throw new Error("Discount not valid yet");
        }

        if (discount.expiresAt > 0 && now >= discount.expiresAt) {
            throw new Error("Discount expired");
        }

        if (discount.maxRedemptions > 0){
            const redemptions = await this.getDiscountRedemptions(planId, discountId);
            if (ethers.BigNumber.from(redemptions).gte(discount.maxRedemptions)) {
                throw new Error("No remaining discount redemptions")
            }
        }

        return true;
    }

    /**
     * Get the current plan status of a specific plan.
     * @param planId Plan ID
     * @return {Promise<number>}
     */
    async planStatus(planId) {
        if (!this.providerProfile) {
            throw new Error("No providerProfile loaded - call loadProfile() first.");
        }
        if (!this.providerProfile.plans[planId]) {
            throw new Error(`Unknown plan ${planId}`);
        }

        return await this.CaskSubscriptionPlans.getPlanStatus(this.providerProfile.address, planId);
    }

    /**
     * Disable a plan from accepting any new subscriptions. No existing subscriptions are canceled.
     * @param planId Plan ID
     * @return {Promise<{tx:*}>}
     */
    async disablePlan(planId) {
        if (!this.providerProfile) {
            throw new Error("No providerProfile loaded - call loadProfile() first.");
        }
        if (!this.providerProfile.plans[planId]) {
            throw new Error(`Unknown plan ${planId}`);
        }
        if (!this.ethersConnection.signer) {
            throw new Error("Cannot perform transaction without ethers signer");
        }

        const tx = await this.CaskSubscriptionPlans.connect(this.ethersConnection.signer).disablePlan(planId);

        return {tx};
    }

    /**
     * Re-enable a previously disabled plan to be able to accept new subscriptions again.
     * @param planId Plan ID
     * @return {Promise<{tx: *}>}
     */
    async enablePlan(planId) {
        if (!this.providerProfile) {
            throw new Error("No providerProfile loaded - call loadProfile() first.");
        }
        if (!this.providerProfile.plans[planId]) {
            throw new Error(`Unknown plan ${planId}`);
        }
        if (!this.ethersConnection.signer) {
            throw new Error("Cannot perform transaction without ethers signer");
        }

        const tx = await this.CaskSubscriptionPlans.connect(this.ethersConnection.signer).enablePlan(planId);

        return {tx};
    }

    /**
     * Permanently retire a specific plan. Any active subscriptions to the plan will be canceled at their
     * next renewal date. This cannot be undone.
     * @param planId Plan ID
     * @param [retireAt=now] Unix timestamp of when to retire plan, defaults to now.
     * @return {Promise<{tx: *}>}
     */
    async retirePlan(planId, retireAt=undefined) {
        if (!this.providerProfile) {
            throw new Error("No providerProfile loaded - call loadProfile() first.");
        }
        if (!this.providerProfile.plans[planId]) {
            throw new Error(`Unknown plan ${planId}`);
        }
        if (!this.ethersConnection.signer) {
            throw new Error("Cannot perform transaction without ethers signer");
        }
        if (!retireAt) {
            retireAt = parseInt(Date.now()/1000);
        }

        const tx = await this.CaskSubscriptionPlans.connect(this.ethersConnection.signer).retirePlan(planId, retireAt);

        return {tx};
    }

    /**
     * Publish a provider profile. Uploads profile to IPFS and performs a blockchain transaction to store the
     * new provider CID on-chain.
     *
     * @return {Promise<{tx: *}>}
     */
    async publishProfile() {

        if (!this.providerProfile) {
            throw new Error("No providerProfile loaded - call loadProfile() first.");
        }
        if (!this.ethersConnection.signer) {
            throw new Error("Cannot perform transaction without ethers signer");
        }

        this.providerProfile.updateMerkleRoots();
        this.providerProfile.incrementNonce();

        await this.providerProfile.signMerkleRoots(this.ethersConnection.signer);
        await this.providerProfile.saveToIPFS();

        const tx = await this.CaskSubscriptionPlans.connect(this.ethersConnection.signer).setProviderProfile(
            this.providerProfile.paymentAddress,
            this.providerProfile.cid,
            this.providerProfile.nonce);

        this.providerProfile.registered = true;

        return {tx};
    }

}

export default SubscriptionPlans;