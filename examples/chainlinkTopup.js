require('dotenv').config();
const { CaskSDK } = require('../dist');
const ethers = require("ethers");

const ethersProvider = new ethers.providers.JsonRpcProvider(process.env.EXAMPLES_PROVIDER_URL);

const cask = new CaskSDK({
    connections: {
        signer: new ethers.Wallet(process.env.CONSUMER_WALLET_PK, ethersProvider),
    },
    environment: CaskSDK.environments.DEVELOPMENT,
    // initialChainId: CaskSDK.chains.AVAX_TESTNET.chainId,
    logLevel: 'debug',
});

async function createChainlinkTopup(targetId, registry) {

    const resp = await cask.chainlinkTopup.create({
        topupAmountSimple: 10, //
        lowBalanceSimple: 6.0,
        targetId,
        registry,
        topupType: 1
    });

    console.log(`Create Response: ${JSON.stringify(resp, null, 2)}`);

    const getResp = await cask.chainlinkTopup.get(resp.chainlinkTopupId);
    console.log(`Get Response: ${JSON.stringify(getResp, null, 2)}`);
}

async function chainlinkTopupHistory(chainlinkTopupId) {
    const history = await cask.chainlinkTopup.history(chainlinkTopupId)
    console.log(`CLTU History for ${chainlinkTopupId}:`);
    console.log(JSON.stringify(history, null, 2));
}

async function chainlinkBalance(chainlinkTopupId) {
    const balance = await cask.chainlinkTopup.linkBalance(chainlinkTopupId);
    console.log(`LINK balance for ${chainlinkTopupId}: ${balance}`);
}


(async () => {
    await cask.initChainlinkTopup();

    // await createChainlinkTopup('1','0xD4388b628158a6A0b2f895CF8018AbCAc57eebA0')
    // await chainlinkTopupHistory('0x96037054b16ba1744ab6fa55703c8cb2a8feee6a886ccd954eaf11abe58cdf8f');
    await chainlinkBalance('0x96037054b16ba1744ab6fa55703c8cb2a8feee6a886ccd954eaf11abe58cdf8f');

    cask.stop();
})();