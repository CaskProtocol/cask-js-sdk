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
    environment: CaskSDK.environments.TESTNET,
    initialChainId: 43113,
    logLevel: 'debug',
});

const abcAddress = '0x08AE14e01Eecf6D7A556ad4F6255aF2c5fBa6309';


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
                "outputAssetIconUrl": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI2LjUuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzBFNkVBRjt9Cgkuc3Qxe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+CjxjaXJjbGUgY2xhc3M9InN0MCIgY3g9IjI1NS45IiBjeT0iMjQ3LjUiIHI9IjI0Ny41Ii8+CjxnPgoJPGc+CgkJPGc+CgkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yOTcuNiwxODYuM2wtMjkuMy04MC4yYy0xLTMtMi43LTUuMy01LTdjLTQuNi0zLjQtMTAuNy0zLjItMTUuMSwwYy0yLjIsMS43LTMuOSw0LTQuOSw2LjlMMjE0LjIsMTg2CgkJCQljLTEuNiwzLjctMC45LDYuNywwLDguNWMxLjIsMi40LDMuMiw0LjEsNS42LDQuOWwzLjEsMC41YzEuNiwwLDMuMS0wLjQsNC41LTEuMmMyLjMtMS4yLDQtMy4yLDUuMS01LjlsOC42LTIzLjZoMjkuNWw4LjYsMjMuOAoJCQkJYzEsMi40LDIuNiw0LjQsNS40LDUuOWMxLjMsMC41LDIuNiwwLjgsMy45LDAuOGwzLjItMC41YzIuNS0wLjgsNC41LTIuNiw1LjYtNUMyOTguNCwxOTEuOSwyOTguNSwxODkuMiwyOTcuNiwxODYuM3oKCQkJCSBNMjQ3LjksMTUwLjZsNy45LTIxLjZsNy45LDIxLjZIMjQ3Ljl6Ii8+CgkJPC9nPgoJPC9nPgoJPGc+CgkJPGc+CgkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yMDYuOSwzMTQuNmMtMS40LTIuMS0zLjEtNC01LjEtNS42YzEtMS4yLDEuOS0yLjYsMi43LTMuOWMyLjQtNCwzLjYtOC42LDMuNi0xMy42YzAtNy42LTIuNC0xNC4yLTcuMi0xOS42CgkJCQljLTUuNC02LTEyLjUtOS0yMS4yLTloLTI2LjNjLTUuNCwwLTkuOSwyLTEzLjEsNS43Yy0yLjgsMy4yLTQuMiw3LjItNC4yLDExLjl2NjQuM2MwLDQuNiwxLjQsOC41LDQuMiwxMS44CgkJCQljMy4yLDMuNyw3LjcsNS42LDEzLjEsNS42aDI4YzkuNSwwLDE3LjItMy4zLDIzLTkuN2M1LjEtNS43LDcuNy0xMi43LDcuNy0yMC45QzIxMi4xLDMyNS4yLDIxMC40LDMxOS40LDIwNi45LDMxNC42egoJCQkJIE0xNTQuNSwyODEuN2wwLjIsMEgxNzl2MGM0LjIsMCw2LjEsMS42LDcuMiwyLjljMS43LDEuOCwyLjQsNCwyLjQsNi44YzAsMi43LTAuOCw0LjgtMi41LDYuOGMtMS43LDItNCwyLjktNy4xLDIuOWgtMjMuNgoJCQkJTDE1NC41LDI4MS43eiBNMTg5LjgsMzM5LjljLTIuMSwyLjQtNC44LDMuNS04LjQsMy41bC0yNS44LDAuOXYtMjQuNmgyNS4yYzMuOCwwLDYuNywxLjEsOC45LDMuNmMyLDIuMywzLDUsMyw4LjMKCQkJCUMxOTIuNywzMzUsMTkxLjcsMzM3LjcsMTg5LjgsMzM5Ljl6Ii8+CgkJPC9nPgoJPC9nPgoJPGc+CgkJPGc+CgkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zNzguNCwzMjQuMmMtMS40LTIuMi0zLjYtMy43LTYuMi00LjNsLTIuNC0wLjNjLTEuNywwLTMuMywwLjQtNC45LDEuM2MtMi41LDEuNC00LjEsMy45LTQuNyw2LjcKCQkJCWMtMS40LDYuNS00LDExLjMtNy42LDE0Yy0zLjIsMi40LTcuNywzLjYtMTMuMywzLjZjLTcuNCwwLTEzLTIuNC0xNy4zLTcuNGMtNC44LTUuNy03LjMtMTQuMy03LjMtMjUuNGMwLTEwLjksMi41LTE5LjQsNy4zLTI1LjIKCQkJCWM0LjQtNS4yLDEwLjEtNy43LDE3LjMtNy43YzUuNSwwLDEwLjEsMS4yLDEzLjYsMy42YzMuNywyLjYsNS45LDYuNCw3LDExLjVjMC43LDMuOSwyLjcsNiw0LjIsN2MxLjYsMS4xLDMuNCwxLjcsNS4zLDEuNwoJCQkJbDIuMi0wLjNjMi41LTAuNiw0LjYtMiw2LjEtNC4xYzEuNC0yLjIsMi00LjcsMS42LTcuNWMtMS43LTguOS01LjYtMTYuMi0xMS44LTIxLjZjLTcuMS02LjEtMTYuNi05LjItMjguMS05LjIKCQkJCWMtMTMuMSwwLTIzLjksNC45LTMyLDE0LjZjLTgsOS40LTEyLjEsMjEuOS0xMi4xLDM3LjFjMCwxNS41LDQuMSwyOCwxMi4xLDM3LjNjOCw5LjUsMTguOCwxNC4zLDMyLDE0LjNjMTEuNiwwLDIxLTMuMywyOC4xLTkuOQoJCQkJYzUuOS01LjQsMTAuMS0xMi43LDEyLjItMjEuOUMzODAuNiwzMjguNiwzNzkuNSwzMjUuOCwzNzguNCwzMjQuMnoiLz4KCQk8L2c+Cgk8L2c+Cgk8Zz4KCQk8Zz4KCQkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTQxMiwyMjIuOEgzNDdWNzUuM2MwLTkuNi03LjgtMTcuNC0xNy40LTE3LjRIMTgyLjFjLTkuNiwwLTE3LjQsNy44LTE3LjQsMTcuNHYxNDcuNUg5OS43CgkJCQljLTkuNiwwLTE3LjQsNy44LTE3LjQsMTcuNHYxNDcuNWMwLDkuNiw3LjgsMTcuNCwxNy40LDE3LjRINDEyYzkuNiwwLDE3LjQtNy44LDE3LjQtMTcuNFYyNDAuMgoJCQkJQzQyOS40LDIzMC42LDQyMS42LDIyMi44LDQxMiwyMjIuOHogTTI0Ny4yLDM4Ny43SDk5LjdWMjQwLjJoODIuNGg2NS4xVjM4Ny43eiBNMTgyLjEsMjIyLjhWNzUuM2gxNDcuNXYxNDcuNWgtNjUuMWgtMTcuNAoJCQkJTDE4Mi4xLDIyMi44TDE4Mi4xLDIyMi44eiBNNDEyLDM4Ny43SDI2NC41VjI0MC4yaDY1LjFINDEyVjM4Ny43eiIvPgoJCTwvZz4KCTwvZz4KPC9nPgo8L3N2Zz4K",
                "routerName": "UniswapV2",
                "swapProtocol": 0,
                "swapData": "0x",
                "router": "0xd7f655E3376cE2D7A2b08fF01Eb3B1023191A901",
                "priceFeed": "0x0000000000000000000000000000000000000000",
                "path": [
                    "0x73F95e25EbEb2Cf013632eF4D8fa1DB6C0785B4B",
                    "0x08AE14e01Eecf6D7A556ad4F6255aF2c5fBa6309"
                ],
                "chainId": 43113
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

    const asset = await cask.dca.assetDefinition(abcAddress);

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
    await dcaMerkleRoot();
    await dcaManifest();
    await createDCA();
    // await dcaHistory('0x6ae1adddae1df13c44052527418d75ae6659f7ed585b63d5ee87fdbca58cf3a4');
    await dcaAssetPrice();

    cask.stop();
})();