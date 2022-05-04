require('dotenv').config();
const ethers = require('ethers');
const { CaskSDK } = require('../dist');


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
    await cask.init();

    const planId = 100;

    console.log(`Creating subscription to provider ${providerWallet.address} for plan ${planId}`);

    const resp = await cask.subscriptions.create({provider: providerWallet.address, planId});

    console.log(`response: ${JSON.stringify(resp, null, 2)}`);

    cask.stop();
}


async function get() {
    await cask.init();

    const subscriptionId = '0x...';
    const resp = await cask.subscriptions.get(subscriptionId);

    console.log(`response: ${JSON.stringify(resp, null, 2)}`);

    cask.stop();
}


(async () => {
    await create();
    await get();
})();