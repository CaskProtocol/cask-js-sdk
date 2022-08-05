require('dotenv').config();
const ethers = require('ethers');
const { CaskSDK } = require('../dist');


const ethersProvider = new ethers.providers.JsonRpcProvider(process.env.EXAMPLES_PROVIDER_URL);

const cask = new CaskSDK({
    connections: {
        rpc: ethersProvider,
    },
    ipfs: {
        pinataApiKey: process.env.PINATA_API_KEY,
        pinataApiSecret: process.env.PINATA_API_SECRET,
    },
    prices: {
        priceMaxAge: 9000,
        interval: 5000,
    },
    environment: CaskSDK.environments.DEVELOPMENT,
    logLevel: 'debug',
});

async function priceFeed() {

    await cask.init();

    const asset = 'USDC';

    cask.prices.onBalancesReady(async () => {
        console.log(`Starting price loop`);

        for (let i = 0; i < 5; i++) {
            const amount = 905 + (2345.2 * i);

            try {
                const usd = cask.prices.usdPrice({asset, amount, units: CaskSDK.units.SIMPLE});
                console.log(`${asset}: ${amount} in USD is ${usd}`);

                const balance = cask.prices.balance({asset, units: CaskSDK.units.SIMPLE});
                console.log(`Wallet balance of ${asset}: ${balance}`);

            } catch (err) {
                console.log(`Error getting price feed: ${err}`);
            }

            await new Promise(r => setTimeout(r, 2000));
        }

        cask.stop();
    });

    console.log("Scheduling signer switch");

    setTimeout(() => {
        cask.switchSigner(new ethers.Wallet(process.env.PROVIDER_WALLET_PK, ethersProvider));
    }, 3000);


}

async function priceCallbacks() {
    await cask.init();

    const asset = 'USDC';

    cask.prices.onPricesUpdated(async () => {

        const balance = cask.prices.balance({asset, units: CaskSDK.units.SIMPLE});
        console.log(`Wallet balance of ${asset}: ${balance}`);

    });

    await cask.switchSigner(new ethers.Wallet(process.env.PROVIDER_WALLET_PK, ethersProvider));

    await new Promise(r => setTimeout(r, 15000));

    cask.stop();
}

(async () => {
    await priceFeed();
    // await priceCallbacks();
})();