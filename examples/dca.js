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

async function dcaMerkleRoot() {
    const merkleRoot = CaskSDK.utils.dcaMerkleRoot(cask.dca.dcaManifest);
    console.log(`MerkleRoot: ${merkleRoot}`);
}

async function createDCA() {
    console.log(`Asset manifest: ${JSON.stringify(cask.dca.dcaManifest, null, 2)}`);

    const assetAddress = '0xa6f94eDa23569bdceDf0C9c14EbE08cb5162A811';

    const asset = await cask.dca.getAssetDefinition(assetAddress);

    console.log(`Asset definition: ${JSON.stringify(asset, null, 2)}`);

    const resp = await cask.dca.create({
        asset: assetAddress,
        amount: 10000000,
        period: 86400});

    console.log(`Create Response: ${JSON.stringify(resp, null, 2)}`);


    const getResp = await cask.dca.get(resp.dcaId);
    console.log(`Get Response: ${JSON.stringify(getResp, null, 2)}`);
}

async function dcaHistory(dcaId) {
    const history = await cask.dca.getHistory(dcaId)
    console.log(`DCA History for ${dcaId}:`);
    console.log(JSON.stringify(history, null, 2));
}

(async () => {
    await cask.initDCA();

    cask.dca.dcaManifest = [
        {
            "inputAssetSymbol": "USDC",
            "outputAssetSymbol": "ABC",
            "routerName": "MockRouter",
            "router": "0x8954afa98594b838bda56fe4c12a09d7739d179b",
            "priceFeed": "0x0FCAa9c899EC5A91eBc3D5Dd869De833b06fB046",
            "path": ["0xFA126fc0cd23Db1f634C914C54306769585Aa1EB","0xa6f94eDa23569bdceDf0C9c14EbE08cb5162A811"],
            "chainId": 80001
        },
        {
            "inputAssetSymbol": "USDC",
            "outputAssetSymbol": "WMATIC",
            "routerName": "MockRouter",
            "router": "0x8954afa98594b838bda56fe4c12a09d7739d179b",
            "priceFeed": "0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada",
            "path": ["0xFA126fc0cd23Db1f634C914C54306769585Aa1EB","0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889"],
            "chainId": 80001
        }
    ];

    // await dcaMerkleRoot();
    // await createDCA();
    await dcaHistory('0x6ae1adddae1df13c44052527418d75ae6659f7ed585b63d5ee87fdbca58cf3a4');

    cask.stop();
})();