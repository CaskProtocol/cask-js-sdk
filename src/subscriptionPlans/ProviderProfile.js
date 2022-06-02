import { ethers } from "ethers";
import Logger from "../utils/Logger.js";
import CaskUnits from "../core/units.js";
import ipfs from "../ipfs/index.js";
import utils from "../utils/index.js";

const VERSION = 1;

/**
 * A service provider profile containing all the plans and discounts for a service provider.
 *
 */
class ProviderProfile {

    /**
     * This class is meant to be instantiated from within the SubscriptionPlans service, not directly.
     *
     * @see SubscriptionPlans
     */
    constructor(options) {
        this.options = options;

        this.logger = new Logger('CaskSDK::ProviderProfile', this.options.logLevel);

        this.address = this.options.address;

        this.paymentAddress = this.options.paymentAddress || this.address;
        this.nonce = ethers.BigNumber.from(this.options.nonce || '0');
        this.ipfsNonce = 0;

        /**
         * Map of planId to Plan object.
         * @see Plan
         */
        this.plans = {};

        /**
         * Map of DiscountId to Discount object.
         * @see Discount
         */
        this.discounts = {};

        this.ipfs = new ipfs.IPFS(this.options.ipfs);
    }

    /**
     * Set payment address of provider profile
     * @param paymentAddress Address to receive subscription payments
     */
    setPaymentAddress(paymentAddress) {
        this.paymentAddress = paymentAddress;
    }

    /**
     * Set metadata for provider profile
     * @param metadata Metadata object
     */
    setMetadata(metadata={}) {
        this.metadata = metadata;
    }

    /**
     * Update the signed roots data of the provider profile.
     * @param signedRoots Signed message data of the merkleroots representing the provider profile
     */
    setSignedRoots(signedRoots) {
        this.signedRoots = signedRoots;
    }

    /**
     * Increment the internal nonce of the profile.
     */
    incrementNonce() {
        this.nonce = this.nonce.add(1);
    }

    /**
     * Get a plan from the provider profile.
     *
     * @see The SDK guide for more details on unit formatting at {@link https://docs.cask.fi/developer-docs/javascript-sdk}
     * @param {Object} args Function arguments
     * @param {number} args.planId Plan ID
     * @param {string} [args.units] Units of output
     * @param {Object} [args.unitOptions={}] Options passed to unit formatter.
     * @return {Plan}
     */
    getPlan(planId, {units, unitOptions}={}) {
        const planInfo = this.plans[planId];
        if (!planInfo) {
            throw new Error(`Unknown plan ${planId}`);
        }

        return {
            ...planInfo,
            price: CaskUnits.formatUnits({
                amount: planInfo.price,
                decimals: CaskUnits.BASE_ASSET_DECIMALS,
                units: units || this.options.defaultUnits,
                unitOptions: unitOptions || this.options.defaultUnitOptions})
        }
    }

    /**
     * Add/update a plan to the provider profile.
     *
     * @param {Object} args Function arguments
     * @param {number} args.planId Plan ID of the new or existing plan
     * @param {string} args.name Name of plan
     * @param {string} [args.price] Price of new plan, using Cask vault asset decimals (18)
     * @param {float} [args.priceSimple] Price of new plan using SIMPLE format (floating point, with only 2 decimals used)
     * @param {string} [args.priceAsset] Alias for the regular "price" argument
     * @param {number} args.period Plan period, in seconds
     * @param {number} [args.freeTrial=0] Free trial length, in seconds. Use 0 for no free trial.
     * @param {number} [args.maxActive=0] Maximum number of active subscriptions for the plan. Use 0 for unlimited.
     * @param {number} [args.minPeriods=0] Minimum number of periods before subscription can be canceled. Use 0 for no minimum period.
     * @param {number} [args.gracePeriod] Number of days for non-payment grace period, before canceling past due subscription
     * @param {boolean} [args.canPause=true] Can the consumer pause an active subscription
     * @param {boolean} [args.canTransfer=false] Can the consumer transfer the subscription NFT to another party
     * @param {Object} [args.metadata={}] Optional metadata object to attach to the subscription
     */
    setPlan({planId, name, price, priceSimple, priceAsset, period, freeTrial=0,
                maxActive=0, minPeriods=0, gracePeriod=7,
                canPause=true, canTransfer=false, metadata={}})
    {
        if (priceSimple) {
            price = ethers.utils.parseUnits(priceSimple.toFixed(2), CaskUnits.BASE_ASSET_DECIMALS);
        } else if (priceAsset) {
            price = priceAsset;
        }

        this.plans[planId] = {
            planId: parseInt(planId),
            name,
            price: price.toString(),
            period,
            freeTrial,
            maxActive,
            minPeriods,
            gracePeriod,
            canPause,
            canTransfer,
            metadata
        };
    }

    /**
     * Remove a plan from the provider profile.
     *
     * @param planId Plan ID
     */
    removePlan(planId) {
        delete this.plans[planId];
    }

    /**
     * Get a discount from the provider profile.
     *
     * @see The SDK guide for more details on unit formatting at {@link https://docs.cask.fi/developer-docs/javascript-sdk}
     * @param {Object} args Function arguments
     * @param {string} args.discountId Discount ID
     * @param {string} [args.units] Units of output
     * @param {Object} [args.unitOptions={}] Options passed to unit formatter.
     * @return {Plan}
     */
    getDiscount(discountId, {units, unitOptions}={}) {
        let discountInfo = this.discounts[discountId];
        if (!discountInfo) {
            throw new Error(`Unknown discount ${discountId}`);
        }

        let value = discountInfo.value;
        if (discountInfo.isFixed) {
            value = CaskUnits.formatUnits({
                amount: value,
                decimals: CaskUnits.BASE_ASSET_DECIMALS,
                units: units || this.options.defaultUnits,
                unitOptions: unitOptions || this.options.defaultUnitOptions})
        }

        return {
            ...discountInfo,
            value,
        }
    }

    /**
     * Add/update a discount in the profile. Specify either the discountId or raw discountCode for the new discount.
     * Must specify the discount identified as one of `discountId`, `discountCode`, 'discountNFTAddress'
     * or `discountERC20Address`.
     *
     * @param {Object} args Function arguments
     * @param {string} [args.discountId] Discount ID of the new or existing discount
     * @param {string} [args.discountCode] Specify the raw Discount Code for discount instead of discountId
     * @param {string} [args.discountNFTAddress] Contract address of token for NFT discount
     * @param {string} [args.discountERC20Address] Contract address of token for ERC20 balance discount
     * @param {number} [args.discountERC20Decimals=0] Number of decimals of token for ERC20 balance discount
     * @param {number} [args.discountERC20MinBalance=1] Min number of tokens required to be held for ERC20 balance discount
     * @param {string} [args.discountCode] Specify the raw Discount Code for discount instead of discountId
     * @param {string} [args.description] Human readable description of the discount to be displayed to end users
     * @param {number} [args.value] Either the BPS (basis points) or fixed value of the discount, depending on isFixed parameter
     * @param {number} [args.valueSimple] If using fixed discount, amount can be alternatively specified using valueSimple or valueAsset
     * @param {number} [args.valueAsset] If using fixed discount, amount can be alternatively specified using valueSimple or valueAsset
     * @param {number} [args.validAfter=0] Timestamp at which point discount becomes redeemable. Use 0 to allow immediate redemption.
     * @param {number} [args.expiresAt=0] Timestamp at which point discount becomes non-redeemable. Use 0 for no expiration.
     * @param {number} [args.maxRedemptions=0] Max number of redemptions (per chain). 0 allows unlimited redemptions.
     * @param {number} [args.planId=0] Limit discount to a specific plan ID. 0 allows redemption from any plan.
     * @param {number} [args.applyPeriods=0] Number of periods discount applies for. Use 0 to set a discount that applies for the lifetime of the subscription.
     * @param {number} [args.discountType=1] Discount type - 1 = code discount, 2 = ERC20 balance discount.
     * @param {bool} [args.isFixed=false] Set to true for value to be a fixed amount discount, false for value to represent a basis point percentage.
     * @param {Object} [args.metadata] Optional metadata object to attach to the discount definition.
     */
    setDiscount({discountId, discountCode, description="",
                    discountERC20Address, discountERC20Decimals = 0, discountERC20MinBalance = 1,
                    discountNFTAddress, discountTokenType=null,
                    value, valueSimple, valueAsset, validAfter=0, expiresAt=0,
                    maxRedemptions=0, planId=0, applyPeriods=0, discountType = 1, isFixed=false, metadata={}})
    {
        if (!discountId) {
            if (discountCode) {
                discountId = utils.generateDiscountId(discountCode);
            } else if (discountERC20Address) {
                discountId = utils.generateERC20DiscountValidator(discountERC20Address, discountERC20Decimals,
                    discountERC20MinBalance);
                discountType = 2;
                discountTokenType = 'erc20';
            } else if (discountNFTAddress) {
                discountId = utils.generateERC20DiscountValidator(discountNFTAddress, 0, 1);
                discountType = 2;
                discountTokenType = 'nft';
            } else {
                throw new Error(`Unable to determine ID for discount`)
            }
        }

        if (isFixed && valueSimple) {
            value = ethers.utils.parseUnits(valueSimple.toFixed(2), CaskUnits.BASE_ASSET_DECIMALS);
        } else if (isFixed && valueAsset) {
            value = valueAsset;
        }
        let erc20Discount = {};
        if (discountType === 2) {
            erc20Discount = utils.parseERC20DiscountValidator(discountId);
        }

        this.discounts[discountId] = {
            discountId,
            description,
            value: value.toString(),
            validAfter,
            expiresAt,
            maxRedemptions,
            planId,
            applyPeriods,
            discountType,
            discountTokenType,
            isFixed,
            metadata,
            erc20Discount,
        };
    }

    /**
     * Remove a discount from the profile.
     * @param discountId Discount ID
     */
    removeDiscount(discountId) {
        delete this.discounts[discountId];
    }

    getDueNow(planId, discountId=null, {units, unitOptions}={}) {
        const planInfo = this.plans[planId];

        let discountInfo;
        if (discountId) {
            discountInfo = this.discounts[discountId];
            if (!discountInfo) {
                throw new Error(`Unknown discount`);
            }
            if (discountInfo.planId !== 0 && discountInfo.planId !== planId) {
                throw new Error(`The specified discount is not applicable for the specified plan`);
            }
        }

        let price = '0';
        if (planInfo.freeTrial === 0) {
            price = ethers.BigNumber.from(planInfo.price);
            if (discountInfo && discountInfo.isFixed) {
                const discountVal = ethers.BigNumber.from(discountInfo.value);
                if (price.gt(discountVal)) {
                    price = price.sub(discountVal);
                } else {
                    price = ethers.BigNumber.from('0');
                }
            } else if (discountInfo) {
                const discountVal = ethers.BigNumber.from(discountInfo.value);
                price = price.sub(price.mul(discountVal).div('10000'));
            }
        }

        return CaskUnits.formatUnits({
            amount: price,
            decimals: CaskUnits.BASE_ASSET_DECIMALS,
            units: units || this.options.defaultUnits,
            unitOptions: unitOptions || this.options.defaultUnitOptions})
    }

    /**
     * Update profile merkleroots using current profile plans/discounts.
     */
    updateMerkleRoots() {
        if (Object.keys(this.plans).length > 0) {
            this.planMerkleRoot = utils.plansMerkleRoot(utils.plansList(this.plans));
        } else {
            this.planMerkleRoot = '0x0000000000000000000000000000000000000000000000000000000000000000';
        }
        if (Object.keys(this.discounts).length > 0) {
            this.discountMerkleRoot = utils.discountsMerkleRoot(utils.discountsList(this.discounts));
        } else {
            this.discountMerkleRoot = '0x0000000000000000000000000000000000000000000000000000000000000000';
        }
    }

    /**
     * Sign the profile merkleroots using the provided signer.
     * @param signer Signer to use
     * @return {Promise<string>}
     */
    async signMerkleRoots(signer) {
        if (Object.keys(this.plans).length > 0) {
            if (this.ipfsNonce && this.nonce.gt('0') && this.nonce.lte(this.ipfsNonce)) {
                throw new Error(`Cannot sign outdated nonce - call incrementNonce()?. IPFS nonce: ${this.ipfsNonce.toString()}, local nonce: ${this.nonce.toString()}`);
            }
            this.signedRoots = await utils.signMerkleRoots(signer, this.nonce, this.planMerkleRoot, this.discountMerkleRoot);
        } else {
            this.signedRoots = '0x0000000000000000000000000000000000000000000000000000000000000000';
        }
        return this.signedRoots;
    }

    /**
     * Convert the profile into an Object suitable for serializing to IPFS.
     * @return {Object}
     */
    asProfileObject() {
        return {
            version: VERSION,
            plans: this.plans,
            discounts: this.discounts,
            nonce: this.nonce.toString(),
            planMerkleRoot: this.planMerkleRoot,
            discountMerkleRoot: this.discountMerkleRoot,
            signedRoots: this.signedRoots,
            metadata: this.metadata,
        }
    }

    /**
     * Merkle commitment of profile.
     * @return {string}
     */
    merkleCommitment() {
        return utils.generateMerkleCommitment(
            this.nonce,
            this.planMerkleRoot,
            this.discountMerkleRoot);
    }

    /**
     * Check if the profile has unpublished changes.
     * @return {boolean}
     */
    needsPublish() {
        return this.ipfsNonce && this.nonce.gt('0') && this.nonce.gt(this.ipfsNonce);
    }

    /**
     * Saves current profile data to IPFS.
     */
    async saveToIPFS() {
        if (this.ipfsNonce && this.nonce.gt('0') && this.nonce.lte(this.ipfsNonce)) {
            throw new Error(`Cannot publish outdated nonce - call incrementNonce()?. IPFS nonce: ${this.ipfsNonce.toString()}, local nonce: ${this.nonce.toString()}`);
        }
        this.logger.trace(`Saving provider profile to IPFS with nonce ${this.nonce.toString()}.`);
        this.cid = await this.ipfs.save(this.asProfileObject());
        this.logger.debug(`Saved provider profile to IPFS CID ${this.cid}.`);
        return this.cid;
    }

    /**
     * Load a profile from a given IPFS CID.
     * @param cid IPFS CID.
     */
    async loadFromIPFS(cid) {
        this.logger.trace(`Loading provider profile from IPFS CID ${cid}.`);
        const ipfsProfile = await this.ipfs.load(cid);
        this.cid = cid;
        this.ipfsNonce = ethers.BigNumber.from(ipfsProfile.nonce || '0');
        this.version = ipfsProfile.version;
        this.plans = ipfsProfile.plans;
        this.discounts = ipfsProfile.discounts;
        this.planMerkleRoot = ipfsProfile.planMerkleRoot;
        this.discountMerkleRoot = ipfsProfile.discountMerkleRoot;
        this.signedRoots = ipfsProfile.signedRoots;
        this.metadata = ipfsProfile.metadata;
        this.logger.debug(`Loaded provider profile at nonce ${this.ipfsNonce.toString()}.`);
    }

}

export default ProviderProfile;