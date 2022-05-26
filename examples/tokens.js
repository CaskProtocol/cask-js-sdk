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
    environment: CaskSDK.environments.PRODUCTION,
    logLevel: 'debug',
});

async function erc20TokenInfo() {

    // const token = '0xb33eaad8d922b1083446dc23f610c2567fb5180f'; // UNI
    // const token = '0xdb7cb471dd0b49b29cab4a1c14d070f27216a0ab'; // BANK
    const token = '0xdC185aDe9A3362f9203191f136499fFE512527c1'; // CASK

    const info = await cask.tokens.getERC20Info(token);
    console.log(`ERC20 metadata: ${JSON.stringify(info, null, 2)}`);

}

async function nftTokenInfo() {

    // const token = '0x4bca2C2ecE9402b5D4dd031b49d48166C40B7957'; // BZC
    const token = '0xbddbd6c427d772b6d7e45de1abb192c1355b0613'; // NAL

    const info = await cask.tokens.getNFTInfo(token);
    console.log(`NFT metadata: ${JSON.stringify(info, null, 2)}`);

}


(async () => {
    await cask.init();

    await erc20TokenInfo();
    await nftTokenInfo();

    cask.stop();
})();