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
    environment: CaskSDK.environments.TESTNET,
    logLevel: 'debug',
});

async function transactionHistory() {

    await cask.init();

    let result = await cask.query.transactionHistory();
    console.log(`Transaction History: ${JSON.stringify(result, null, 2)}`);

    result = await cask.query.subscriptions({includeCanceled: true});
    console.log(`Subscriptions: ${JSON.stringify(result, null, 2)}`);

    cask.stop();
}

(async () => {
    await transactionHistory();
})();