require('dotenv').config();
const { CaskSDK } = require('../dist');

const cask = new CaskSDK({
    connections: {
        rpc: {
            [CaskSDK.chains.POLYGON_MUMBAI.chainId]: process.env.MUMBAI_PROVIDER_URL,
            [CaskSDK.chains.AVAX_TESTNET.chainId]: process.env.FUJI_PROVIDER_URL,
        },
        ws: {
            [CaskSDK.chains.POLYGON_MUMBAI.chainId]: process.env.MUMBAI_WEBSOCKET_URL,
            [CaskSDK.chains.AVAX_TESTNET.chainId]: process.env.FUJI_WEBSOCKET_URL,
        },
        signer: {
            // [CaskSDK.chains.POLYGON_MUMBAI.chainId]: new ethers.Wallet('...'),
        }
    },
    ipfs: {
        pinataApiKey: process.env.PINATA_API_KEY,
        pinataApiSecret: process.env.PINATA_API_SECRET,
    },
    enc: {
        encProvider: CaskSDK.enc.providers.LIT,
    },
    events: {
        enabled: true,
    },
    environment: CaskSDK.environments.TESTNET,
});

await cask.init();



/************** Vault Example ***************/

let balance;

balance = await cask.vault.balance();
console.log(`Initial balance: ${balance}`);

const depositAmount = 23.45;

const quote = await cask.vault.quoteDeposit({asset: 'USDC', amountSimple: depositAmount})
console.log(`quoteDeposit: ${quote}`);

await cask.vault.approveAndDeposit({asset: 'USDC', amountSimple: depositAmount});

balance = await cask.vault.balance();
console.log(`Updated balance: ${balance}`);



/************** Subscribe Example ***************/

const provider = '0x...';

const resp = await cask.subscriptions.create({provider, planId: 100})
console.log(`response: ${JSON.stringify(resp)}`);




/************** Provider Example ***************/

const providerProfile = await cask.subscriptionPlans.loadProfile();
console.log(`Current profile CID ${providerProfile.cid}`);

providerProfile.setMetadata({
    name: "Acme Co",
    iconUrl: "https://uploads-ssl.webflow.com/621d95f4db3c83a0dbe84889/6221292671dd275593b129e8_traderwit-icon.png",
});

providerProfile.addPlan({
    planId: 100,
    name: "Gold",
    priceSimple: 10.45,
    period: 84600 * 7
});

providerProfile.addPlan({
    planId: 101,
    name: "Platinum",
    priceSimple: 20.45,
    period: 84600 * 7,
    metadata: {
        internalId: 1234,
    }
});

await cask.subscriptionPlans.publishProfile();

console.log(`New profile CID ${providerProfile.cid}`);
