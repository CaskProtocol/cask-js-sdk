require('dotenv').config();
const ethers = require('ethers');
const { CaskSDK } = require('../dist');


const ethersProvider = new ethers.providers.JsonRpcProvider(process.env.EXAMPLES_PROVIDER_URL);

const cask = new CaskSDK({
    connections: {
        signer: new ethers.Wallet(process.env.CONSUMER_WALLET_PK, ethersProvider),
    },
    ipfs: {
        pinataApiKey: process.env.PINATA_API_KEY,
        pinataApiSecret: process.env.PINATA_API_SECRET,
    },
    environment: CaskSDK.environments.INTERNAL,
    logLevel: 'debug',
});

async function transactionHistory() {
    let result = await cask.query.transactionHistory();
    console.log(`Transaction History: ${JSON.stringify(result, null, 2)}`);

    result = await cask.query.subscriptions({includeCanceled: true});
    console.log(`Subscriptions: ${JSON.stringify(result, null, 2)}`);
}

async function flows() {
    const results = await cask.query.flows();
    console.log(`Data: ${JSON.stringify(results, null, 2)}`);
}

async function providerSummary(address) {
    const results = await cask.query.providerSummary({address});
    console.log(`Data: ${JSON.stringify(results, null, 2)}`);
}

(async () => {
    await cask.init();

    // await transactionHistory();
    // await flows();
    await providerSummary('0x26e730a8f03661ac1b196fa82c6b0d0ba65e3da8');

    cask.stop();
})();