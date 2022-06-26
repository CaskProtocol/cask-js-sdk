require('dotenv').config();
const { CaskSDK } = require('../dist');
const ethers = require("ethers");

const ethersProvider = new ethers.providers.JsonRpcProvider(process.env.EXAMPLES_PROVIDER_URL);

const cask = new CaskSDK({
    connections: {
        signer: new ethers.Wallet(process.env.CONSUMER_WALLET_PK, ethersProvider),
    },
    dca: {
        manifestUrl: '',
    },
    environment: CaskSDK.environments.DEVELOPMENT,
    logLevel: 'debug',
});

async function startDCA() {
    console.log(`Asset manifest: ${JSON.stringify(cask.dca.dcaManifest, null, 2)}`);

    const assetAddress = '0x1fA4E417Ed8B4497D0D1C73cb54C5e2704055Bf7';

    const asset = await cask.dca.getAssetDefinition(assetAddress);

    console.log(`Asset definition: ${JSON.stringify(asset, null, 2)}`);

    const resp = await cask.dca.create({
        asset: assetAddress,
        amount: 10000000,
        period: 86400*7});

    console.log(`Create Response: ${JSON.stringify(resp, null, 2)}`);


    const getResp = await cask.dca.get(resp.dcaId);
    console.log(`Get Response: ${JSON.stringify(getResp, null, 2)}`);

}



(async () => {
    await cask.initDCA();

    cask.dca.dcaManifest = [
        {
            "inputAssetSymbol": "USDC",
            "outputAssetSymbol": "WMATIC",
            "routerName": "MockRouter",
            "router": "0x44a32Fd68d62069EDDBdca8ba84Eb947A662a034",
            "priceFeed": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
            "path": ["0x2791bca1f2de4661ed88a30c99a7a9449aa84174","0x2791bca1f2de4661ed88a30c99a7a9449aa84174"],
            "chainId": 31337
        },
        {
            "inputAssetSymbol": "USDC",
            "outputAssetSymbol": "ABC",
            "routerName": "MockRouter",
            "router": "0x44a32Fd68d62069EDDBdca8ba84Eb947A662a034",
            "priceFeed": "0x43AE7EDaaCD6Eb97d45A24b14736047f75230114",
            "path": ["0x4F91541C5BB7b2bE0eFfc05063f77808Eb0Bf09d","0x1fA4E417Ed8B4497D0D1C73cb54C5e2704055Bf7"],
            "chainId": 31337
        }
    ];

    await startDCA();

    cask.stop();
})();