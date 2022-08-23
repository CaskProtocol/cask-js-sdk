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

async function commitments() {
    const subCommitment = await cask.subscriptions.estimatedCommitment('0xd9cba6fcadf21111b6a1bced5fc466c47bac7f2f');
    const dcaCommitment = await cask.dca.estimatedCommitment('0xd9cba6fcadf21111b6a1bced5fc466c47bac7f2f');
    const p2pCommitment = await cask.p2p.estimatedCommitment('0xd9cba6fcadf21111b6a1bced5fc466c47bac7f2f');
    console.log(`subCommitment: ${subCommitment} + ${dcaCommitment} + ${p2pCommitment}`);
}

async function subscription(id) {
    console.log(`Subscription: ${JSON.stringify(await cask.query.flow(id, 'subscription'), null, 2)}`);
}
async function providerSummary(address) {
    const results = await cask.query.providerSummary({address});
    console.log(`Data: ${JSON.stringify(results, null, 2)}`);
}

(async () => {
    await cask.init();

    // await transactionHistory();
    // await flows();
    // await providerSummary('0x26e730a8f03661ac1b196fa82c6b0d0ba65e3da8');
    // await subscription('0xad2b35d4b6a955e0c5305b0fdadfaac3bb70091f9ff135f8fef4a4438c5776cd');
    await commitments();

    cask.stop();
})();