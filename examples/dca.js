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

const usdcAddress = '0x4F91541C5BB7b2bE0eFfc05063f77808Eb0Bf09d';
const abcAddress = '0x29B6DC0B6fBA74Da04Ff026c45f88D795516E26F';
const mockOracleAddress = '0x91F55b3d46FA66D14E34DAa8CB55C55EcCDf4BF0';
const mockRouterAddress = '0x43AE7EDaaCD6Eb97d45A24b14736047f75230114';


async function dcaManifest() {
    const manifest = await cask.dca.loadDCAManifest();
    console.log(`dcaManifest: ${JSON.stringify(manifest, null, 2)}`);

}

function manualManifest() {

    cask.dca.dcaManifest = {
        assets: [
            {
                "inputAssetSymbol": "USDC",
                "outputAssetSymbol": "ABC",
                "routerName": "MockRouter",
                "router": mockRouterAddress,
                // "priceFeed": "0x0000000000000000000000000000000000000000",
                "priceFeed": mockOracleAddress,
                "path": [usdcAddress, abcAddress],
                "chainId": cask.currentChain()
            },
            {
                "inputAssetSymbol": "USDC",
                "outputAssetSymbol": "WMATIC",
                "routerName": "MockRouter",
                "router": mockRouterAddress,
                "priceFeed": mockOracleAddress,
                "path": [usdcAddress, usdcAddress], // purposely incorrect path to have second item in manifest
                "chainId": cask.currentChain()
            }
        ]
    }
}

async function dcaMerkleRoot() {
    const merkleRoot = CaskSDK.utils.dcaMerkleRoot(cask.dca.dcaManifest.assets);
    console.log(`MerkleRoot: ${merkleRoot}`);
}

async function createDCA() {
    console.log(`Asset manifest: ${JSON.stringify(cask.dca.dcaManifest, null, 2)}`);

    const asset = await cask.dca.getAssetDefinition(abcAddress);

    console.log(`Asset definition: ${JSON.stringify(asset, null, 2)}`);

    const resp = await cask.dca.create({
        asset: abcAddress,
        amount: 10000000, //  10 usdc
        period: 86400}); // 1 day

    console.log(`Create Response: ${JSON.stringify(resp, null, 2)}`);

    const getResp = await cask.dca.get(resp.dcaId);
    console.log(`Get Response: ${JSON.stringify(getResp, null, 2)}`);
}

async function dcaHistory(dcaId) {
    const history = await cask.dca.getHistory(dcaId)
    console.log(`DCA History for ${dcaId}:`);
    console.log(JSON.stringify(history, null, 2));
}

async function dcaAssetPrice() {
    const price = await cask.dca.assetPrice(abcAddress);
    console.log(`ABC price: ${price}`);
}


(async () => {
    await cask.initDCA();

    manualManifest();
    // await dcaMerkleRoot();
    // await dcaManifest();
    // await createDCA();
    // await dcaHistory('0x6ae1adddae1df13c44052527418d75ae6659f7ed585b63d5ee87fdbca58cf3a4');
    await dcaAssetPrice();

    cask.stop();
})();