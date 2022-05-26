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

    const planId = 100;

    console.log(`Creating subscription to provider ${providerWallet.address} for plan ${planId}`);

    const resp = await cask.subscriptions.create({provider: providerWallet.address, planId});

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