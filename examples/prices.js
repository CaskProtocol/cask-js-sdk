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
        priceMaxAge: 900,
        interval: 5000,
    },
    environment: CaskSDK.environments.DEVELOPMENT,
    logLevel: 'debug',
});

async function priceFeed() {

    await cask.init();

    cask.prices.onBalancesReady(async () => {
        console.log(`Starting price loop`);

        for (let i = 0; i < 5; i++) {
            const dai = 905 + (2345.2 * i);

            try {
                const usd = cask.prices.usdPrice({
                    asset: 'DAI',
                    amount: dai,
                    units: CaskSDK.units.SIMPLE
                });
                console.log(`DAI: ${dai} in USD is ${usd}`);

                const balance = cask.prices.balance({
                    asset: 'USDC',
                    units: CaskSDK.units.SIMPLE
                });

                console.log(`Wallet balance of USDC: ${balance}`);

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

    cask.prices.onPricesUpdated(async () => {

        const balance = cask.prices.balance({
            asset: 'USDC',
            units: CaskSDK.units.SIMPLE
        });

        console.log(`Wallet balance of USDC: ${balance}`);

    });

    await cask.switchSigner(new ethers.Wallet(process.env.PROVIDER_WALLET_PK, ethersProvider));

    await new Promise(r => setTimeout(r, 15000));

    cask.stop();
}

(async () => {
    // await priceFeed();
    await priceCallbacks();
})();