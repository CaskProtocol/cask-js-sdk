require('dotenv').config();
const ethers = require('ethers');
const { CaskSDK } = require('../dist');


const ethersProvider = new ethers.providers.JsonRpcProvider(process.env.MUMBAI_PROVIDER_URL);
const providerWallet = new ethers.Wallet(process.env.PROVIDER_WALLET_PK, ethersProvider);

const cask = new CaskSDK({
    connections: {
        signer: new ethers.Wallet(process.env.CONSUMER_WALLET_PK, ethersProvider),
    },
    ipfs: {
        pinataApiKey: process.env.PINATA_API_KEY,
        pinataApiSecret: process.env.PINATA_API_SECRET,
    },
    enc: {
        encProvider: CaskSDK.enc.providers.LIT,
        litOptions: {
            debug: true,
        },
    },
    events: {
        enabled: true,
    },
    environment: CaskSDK.environments.INTERNAL,
});


async function createSubscription() {
    await cask.init();

    cask.events.registerHandler('ALL', (eventName, args) => {
        console.log(`TEST: event: ${eventName}, args: ${JSON.stringify(args)}`);
    });

    await cask.events.listen();

    let balance;
    balance = await cask.vault.balance();
    console.log(`balance: ${balance}`);

    const provider = providerWallet.address;

    const resp = await cask.subscriptions.create({provider, planId: 100, privateData: {super: 'secret'}})
    console.log(`response: ${JSON.stringify(resp)}`);

    cask.stop();
}

async function getSubscription() {

    await cask.init();

    const subscriptionId = '0x...';

    const result = await cask.subscriptions.get(subscriptionId, {decryptPrivateData: true});
    console.log(`Subscription: ${JSON.stringify(result, null, 2)}`);

    cask.stop();
}


(async () => {
    // await createSubscription();
    await getSubscription();
})();