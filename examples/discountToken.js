require('dotenv').config();
const ethers = require('ethers');
const { CaskSDK } = require('../dist');


/**
 *
 * To run this example, you need:
 *
 * Local chain running: `yarn hardhat node`
 * Funded account: `yarn local fund`
 * Funds deposited (run vault.js example)
 * Subscription plans created (run subscriptionPlans.js example)
 *
 */

const ethersProvider = new ethers.providers.JsonRpcProvider(process.env.EXAMPLES_PROVIDER_URL);
const providerWallet = new ethers.Wallet(process.env.PROVIDER_WALLET_PK, ethersProvider);

const cask = new CaskSDK({
    connections: {
        signer: new ethers.Wallet(process.env.CONSUMER_WALLET_PK, ethersProvider),
    },
    ipfs: {
        pinataApiKey: process.env.PINATA_API_KEY,
        pinataApiSecret: process.env.PINATA_API_SECRET,
    },
    environment: CaskSDK.environments.DEVELOPMENT,
    logLevel: 'debug',
});


async function create() {

    const planId = 100;

    const consumerAddress = cask.currentAddress();

    const providerProfile = await cask.subscriptionPlans.loadProfile({address: providerWallet.address});

    const plan = providerProfile.getPlan(planId);
    console.log(`Using plan ${JSON.stringify(plan, null, 2)}`);

    const discounts = await cask.subscriptionPlans.findERC20BalanceDiscounts(consumerAddress);

    console.log(`Looking for ERC20 balance discounts for address ${consumerAddress}: ${discounts}`);
    if (discounts.length === 0) {
        console.log(`Unable to find a valid discount`);
        return;
    }
    const discountId = discounts[0];
    const discount = providerProfile.getDiscount(discountId);
    if (!discount) {
        console.log(`Could not load discount details for discount ${discountId}`);
    }

    const discountTokenValidator = discountId;
    const discountMetadata = CaskSDK.utils.parseERC20DiscountValidator(discountTokenValidator);
    console.log(`Discount detail: ${JSON.stringify(discountMetadata, null, 2)}`);

    if (discount?.discountTokenType === 'erc20') {
        console.log(`Token metadata: ${JSON.stringify(await cask.tokens.getERC20Info(discountMetadata.address), null, 2)}`);
    } else if (discount?.discountTokenType === 'nft') {
        console.log(`NFT metadata: ${JSON.stringify(await cask.tokens.getNFTInfo(discountMetadata.address), null, 2)}`);
    } else {
        console.log(`Unrecognized discountTokenType ${discount.discountTokenType}`);
    }

    const dueNow = providerProfile.getDueNow(planId, discountId);
    console.log(`Due now is ${dueNow}`);

    console.log(`Creating subscription to provider ${providerWallet.address} for plan ${planId} with discount ${discountId}`);

    const resp = await cask.subscriptions.create({provider: providerWallet.address, planId, discountTokenValidator});

    console.log(`response: ${JSON.stringify(resp, null, 2)}`);

    return resp;
}


async function get(subscriptionId) {

    const resp = await cask.subscriptions.get(subscriptionId);

    console.log(`response: ${JSON.stringify(resp, null, 2)}`);
}


(async () => {
    await cask.init();

    const resp = await create();
    await get(resp.subscriptionId);

    cask.stop();
})();