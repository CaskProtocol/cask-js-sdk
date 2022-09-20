require('dotenv').config();
const { CaskSDK } = require('../dist');
const ethers = require("ethers");

const ethersProvider = new ethers.providers.JsonRpcProvider(process.env.EXAMPLES_PROVIDER_URL);

const cask = new CaskSDK({
    connections: {
        signer: new ethers.Wallet(process.env.CONSUMER_WALLET_PK, ethersProvider),
    },
    environment: CaskSDK.environments.PRODUCTION,
    initialChainId: 1313161554,
    logLevel: 'debug',
});


(async () => {
    await cask.init();

    console.log(`P2P enabled: ${cask.p2p.serviceAvailable()}`);
    console.log(`P2P minAmount: ${await cask.p2p.serviceParameters().minAmount()}`);
    console.log(`P2P minPeriod: ${await cask.p2p.serviceParameters().minPeriod()}`);

    cask.stop();
})();