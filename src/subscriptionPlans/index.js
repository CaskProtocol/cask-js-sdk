import Logger from "../utils/Logger.js";
import {ethers} from 'ethers';
import contracts from "../contracts/index.js";
import EthersConnection from "../core/EthersConnection.js";
import ProviderProfile from "./ProviderProfile.js";
import utils from "../utils/index.js";
import Query from "../query";


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
 * @property {number} discountType Specifies the type of discount. 1 = code, 2 = ERC-20 balance, 3 = ERC-721 holding
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

        if (this.options.cache?.query) {
            this.query = this.options.cache?.query;
        } else {
            this.query = new Query(this.options);
            this.options.cache.query = this.query;
        }
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

        if (!this.query.ethersConnection) {
            await this.query.init({ethersConnection: this.ethersConnection});
        }

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
     * @param [force=false] Force reloading profile even if it was previously loaded
     * @return {Promise<ProviderProfile>}
     */
    async loadProfile({address, includePlanStatus=false, force=false}={}) {
        address = address || this.ethersConnection.address;
        if (!address) {
            throw new Error("address not specified or detectable");
        }

        if (this.providerProfile && !force) {
            return this.providerProfile;
        }

        const providerProfile = await this.CaskSubscriptionPlans.getProviderProfile(address);

        if (providerProfile?.cid) {
            this.providerProfile = new ProviderProfile({
                ipfs: this.options.ipfs,
                address,
                nonce: providerProfile.nonce,
                registered: true,
                logLevel: this.options.logLevel,
                defaultUnits: this.options.defaultUnits,
                defaultUnitOptions: this.options.defaultUnitOptions,
            });
            await this.providerProfile.loadFromIPFS(providerProfile.cid);
            if (includePlanStatus) {
                await this.mergePlanStatus(this.providerProfile);
            }
            this.providerProfile.plans['testme'] = {key: 'why'};
        } else {
            this.providerProfile = new ProviderProfile({
                ipfs: this.options.ipfs,
                address,
                registered: false,
                logLevel: this.options.logLevel,
                defaultUnits: this.options.defaultUnits,
                defaultUnitOptions: this.options.defaultUnitOptions,
            });
        }

        return this.providerProfile;
    }

    async mergePlanStatus(profile) {

        const query = `
query Query {
  caskSubscriptionPlans(where: {provider: "${profile.address.toLowerCase()}"}) {
    planId
    status
  }
}`;
        const results = await this.query.rawQuery(query);
        results.data.caskSubscriptionPlans.forEach((p) => {
            if (profile.plans[p.planId]) {
                profile.plans[p.planId].status = p.status;
            }
        });

        Object.keys(profile.plans).forEach((planId) => {
            if (!profile.plans[planId].status) {
                profile.plans[planId].status = 'Enabled';
            }
        });
    }

    /**
     * Get the provider profile for an address.
     * @param address Provider address
     * @param {Object} options Options
     * @param [options.force=false] Force re-fetching profile even if it was previously loaded
     * @return {Promise<ProviderProfile|null>}
     */
    async getProfile(address, {includePlanStatus=false, force=false}={}) {

        if (!this.providerProfileCache) {
            this.providerProfileCache = {};
        }

        if (this.providerProfileCache[address] && !force) {
            if (includePlanStatus) {
                await this.mergeStatus(this.providerProfileCache[address]);
            }
            return this.providerProfileCache[address];
        }

        const profile = await this.CaskSubscriptionPlans.getProviderProfile(address);

        if (!profile?.cid) {
            return null;
        }

        const newProfile = new ProviderProfile({
            ipfs: this.options.ipfs,
            address,
            nonce: profile.nonce,
            registered: true,
            logLevel: this.options.logLevel,
            defaultUnits: this.options.defaultUnits,
            defaultUnitOptions: this.options.defaultUnitOptions,
        });

        await newProfile.loadFromIPFS(profile.cid);
        if (includePlanStatus) {
            await this.mergePlanStatus(newProfile);
        }

        this.providerProfileCache[address] = newProfile;

        return this.providerProfileCache[address];
    }

    /**
     * Get the number of redemptions a specific plan/discountId has already had.
     * @param discountId Discount ID
     * @return {Promise<string>}
     */
    async getDiscountRedemptions(discountId) {
        if (!this.providerProfile) {
            throw new Error("No providerProfile loaded - call loadProfile() first.");
        }

        const discount = this.providerProfile.discounts[discountId];
        if (!discount) {
            throw new Error("Unknown discount");
        }

        const redemptions = await this.CaskSubscriptionPlans
            .getDiscountRedemptions(this.providerProfile.address, discount.planId, discountId);
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
        if (!this.providerProfile) {
            throw new Error("No providerProfile loaded - call loadProfile() first.");
        }

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
            const redemptions = await this.getDiscountRedemptions(discountId);
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
        await tx.wait();
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
        await tx.wait();
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
        await tx.wait();
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

        await tx.wait();
        return {tx};
    }

    async findERC20BalanceDiscounts(address, planId) {
        if (!this.providerProfile) {
            throw new Error("No providerProfile loaded - call loadProfile() first.");
        }

        const promises = Object.keys(this.providerProfile.discounts).map(async (discountId) => {
            const discountInfo = this.providerProfile.discounts[discountId];
            if ((discountInfo.planId === 0 || planId === discountInfo.planId) && discountInfo.discountType === 2) {
                const erc20DiscountInfo = utils.parseERC20DiscountValidator(discountId);
                if (await this.checkERC20DiscountCurrentlyApplies(erc20DiscountInfo, address)) {
                    return discountId;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        });

        const results = await Promise.all(promises);

        return results.filter((r) => r != null);
    }

    async checkERC20DiscountCurrentlyApplies(erc20DiscountInfo, address) {

        const contract = contracts.ERC20({
            tokenAddress: erc20DiscountInfo.address,
            ethersConnection: this.ethersConnection
        });

        try {
            let decimals = erc20DiscountInfo.decimals;
            if (decimals === 255) {
                decimals = await contract.decimals();
            }

            let balance = await contract.balanceOf(address);
            if (decimals > 0) {
                balance = balance.div(ethers.BigNumber.from('10').pow(decimals));
            }

            this.logger.debug(`Balance of ${balance} found for ERC20 discount on contract ${erc20DiscountInfo.address} for address ${address}`);

            return balance.gte(ethers.BigNumber.from(erc20DiscountInfo.minBalance.toString()));

        } catch (err) {
            this.logger.warn(`Could not get balance for ERC20 discount on contract ${erc20DiscountInfo.address} for address ${address}`);
            return false;
        }
    }

}

export default SubscriptionPlans;