import environments from "./environments.js";
import chains from "./chains.js";

/**
 * Contract deployment information.
 * @example
 * CaskSDK.deployments.CaskSubscriptions[CaskSDK.environments.TESTNET][CaskSDK.chains.POLYGON_MUMBAI.chainId]
 *
 * @namespace CaskSDK.deployments
 */

/**
 * @enum
 * @memberOf CaskSDK.deployments
 */
const deployments = {
    /**
     * CaskSubscriptions contract address for a given environment/chain deployment.
     */
    CaskSubscriptions: {
        [environments.TESTNET]: {
            [chains.POLYGON_MUMBAI.chainId]: "0x7899118A8A3EAe4cDd97Cb2Ea9E52a5b78da3cB6",
            [chains.AVAX_TESTNET.chainId]: "0x28E372eff469b18Bc86Fb9f0C496b219bde39E81",
            [chains.CELO_TESTNET.chainId]: "0xB844AFd937717bf117CaE2467B12f2922afa68dB",
        },
        [environments.PRODUCTION]: {
            [chains.POLYGON_MAINNET.chainId]: '0x4A6f232552E0fd76787006Bb688bFBCB931cc3d0',
            [chains.AVAX_MAINNET.chainId]: '0x4A6f232552E0fd76787006Bb688bFBCB931cc3d0',
            [chains.FANTOM_MAINNET.chainId]: '0x7DaF9a1744Df00d0473A9A920B6A4Ea33B665360',
            [chains.AURORA_MAINNET.chainId]: '0xD054F8866fc45c4387d56D2340dCA08d83E14A5e',
            [chains.MOONBEAM_MAINNET.chainId]: '0xD054F8866fc45c4387d56D2340dCA08d83E14A5e',
        },
        [environments.DEVELOPMENT]: {
            [chains.ETH_HARDHAT.chainId]: '0xb651068Ace267cc30Ca77c91284772AD8315B4E6',
        },
        [environments.INTERNAL]: {
            [chains.POLYGON_MUMBAI.chainId]: process.env.CASK_CONTRACT_SUBSCRIPTIONS ||
                '0xaC7331DF9CB75beC251b75647AEccdeA8d336e33',
            [chains.AVAX_TESTNET.chainId]: process.env.CASK_CONTRACT_SUBSCRIPTIONS ||
                '0x921ec72BEf414D75F0C6fFee37975BB3ae80d41C',
        },
    },
    /**
     * CaskSubscriptionPlans contract address for a given environment/chain deployment.
     */
    CaskSubscriptionPlans: {
        [environments.TESTNET]: {
            [chains.POLYGON_MUMBAI.chainId]: "0x3E9B8E9D60Abc50b032cdc42Ef2F6CBaBce17983",
            [chains.AVAX_TESTNET.chainId]: "0x06bd2FD3784E1cEe11969caA67CDb0803DcF5869",
            [chains.CELO_TESTNET.chainId]: "0x6FF7EB600f4BF68e0A3f35ba2D4825BfcA031A1b",
        },
        [environments.PRODUCTION]: {
            [chains.POLYGON_MAINNET.chainId]: '0x78B5882b81AF02ebb0803eAFb4A4bf27fe35470e',
            [chains.AVAX_MAINNET.chainId]: '0x78B5882b81AF02ebb0803eAFb4A4bf27fe35470e',
            [chains.FANTOM_MAINNET.chainId]: '0xF76BF31f0b56BD6f72E1aFeB83a51F191ec2291B',
            [chains.AURORA_MAINNET.chainId]: '0xD252A4C836C75063867f0193325b328CCe6B7306',
            [chains.MOONBEAM_MAINNET.chainId]: '0xD252A4C836C75063867f0193325b328CCe6B7306',
        },
        [environments.DEVELOPMENT]: {
            [chains.ETH_HARDHAT.chainId]: '0xA80D4D3d0b2C9c38912459F2E674416973a9A161',
        },
        [environments.INTERNAL]: {
            [chains.POLYGON_MUMBAI.chainId]: process.env.CASK_CONTRACT_SUBSCRIPTION_PLANS ||
                '0x2236aFa60774a79EC15BF399767EEC87F5aeE607',
            [chains.AVAX_TESTNET.chainId]: process.env.CASK_CONTRACT_SUBSCRIPTION_PLANS ||
                '0x7d722482Cc143364B31366a2EEF0a1f096AB4BB4',
        },
    },
    /**
     * CaskVault contract address for a given environment/chain deployment.
     */
    CaskVault: {
        [environments.TESTNET]: {
            [chains.POLYGON_MUMBAI.chainId]: "0xc924CaAFe6759F92215Dadf326FF4fAb158f6C41",
            [chains.AVAX_TESTNET.chainId]: "0x9d628d298D917BF9642Bb45D594B2075f661373D",
            [chains.CELO_TESTNET.chainId]: "0xC48f1deb2E6d68aD620cA38927F4d8b1923555d0",
        },
        [environments.PRODUCTION]: {
            [chains.POLYGON_MAINNET.chainId]: '0x3b2b4b547dAEEbf3A703288CB43650f0F287b9ff',
            [chains.AVAX_MAINNET.chainId]: '0x3b2b4b547dAEEbf3A703288CB43650f0F287b9ff',
            [chains.FANTOM_MAINNET.chainId]: '0xBCcDbB0806Acc914F6746DE592f924B374190710',
            [chains.AURORA_MAINNET.chainId]: '0x3b2b4b547dAEEbf3A703288CB43650f0F287b9ff',
            [chains.MOONBEAM_MAINNET.chainId]: '0x3b2b4b547dAEEbf3A703288CB43650f0F287b9ff',
        },
        [environments.DEVELOPMENT]: {
            [chains.ETH_HARDHAT.chainId]: '0x61E53693d81A38e72AAe0B2aC5f9B2dbb2B5ac56',
        },
        [environments.INTERNAL]: {
            [chains.POLYGON_MUMBAI.chainId]: process.env.CASK_CONTRACT_VAULT ||
                '0xC040BDBBb2b1AdDaa7586962e9Fcb5585D7e66a9',
            [chains.AVAX_TESTNET.chainId]: process.env.CASK_CONTRACT_VAULT ||
                '0x5e8C289404E9B17be7FfE7FcBa673f5AC802cc06',
        },
    },
    /**
     * CaskDCA contract address for a given environment/chain deployment.
     */
    CaskDCA: {
        [environments.TESTNET]: {
            [chains.POLYGON_MUMBAI.chainId]: "0xE9E994bdaeB77B06E8b31457BAE341D8C4F081ab",
            [chains.AVAX_TESTNET.chainId]: "0x74708050c23850FDdDbd357fE504b93d4f06E901",
            [chains.CELO_TESTNET.chainId]: "0x2A591f416EecEfF7C29436957b53736826D0BCD3",
        },
        [environments.PRODUCTION]: {
            [chains.POLYGON_MAINNET.chainId]: '0x733Ec5A72c38f2f3c75E98b28DffC1885aB04AF1',
            [chains.AVAX_MAINNET.chainId]: '0xb8A52a086262E1d6c7494bDCb824f884f41FC5f8',
            [chains.FANTOM_MAINNET.chainId]: '0x4C17e4F40262108F06375d727f1353e1D592B1Bf',
            [chains.AURORA_MAINNET.chainId]: '0x96d59127cCD1c0e3749E733Ee04F0DfbD2f808c8',
            [chains.MOONBEAM_MAINNET.chainId]: '0x96d59127cCD1c0e3749E733Ee04F0DfbD2f808c8',
        },
        [environments.DEVELOPMENT]: {
            [chains.ETH_HARDHAT.chainId]: '0xF4EED3670EB74651D55EaA4f1832410eF0cbc519',
        },
        [environments.INTERNAL]: {
            [chains.POLYGON_MUMBAI.chainId]: process.env.CASK_CONTRACT_DCA ||
                '0x3183C5F1951437180A84bD005e3975C66E71b977',
            [chains.AVAX_TESTNET.chainId]: process.env.CASK_CONTRACT_DCA ||
                '0xdDCEfdE530930c573D27E4f04b7E87A2e88981B8',
        },
    },
    /**
     * CaskDCA contract address for a given environment/chain deployment.
     */
    CaskP2P: {
        [environments.TESTNET]: {
            [chains.POLYGON_MUMBAI.chainId]: "0x2068607e74B3ED913F920A4e9Fc922067dD825BB",
            [chains.AVAX_TESTNET.chainId]: "0x4Deb1AAe96809Fc8f05859f7A9F21F7e59e30186",
            [chains.CELO_TESTNET.chainId]: "0x4aAdCe807bcd419fACea62b56E084Ce54e32c312",
        },
        [environments.PRODUCTION]: {
            [chains.POLYGON_MAINNET.chainId]: '0x28bc3F4C21504c4686f88238cF424c353e3E628E',
            [chains.AVAX_MAINNET.chainId]: '0x28418B0AB2C00142a865971dcC6a4b1154DaD19E',
            [chains.FANTOM_MAINNET.chainId]: '0x1A4620123cfD10c73D9Cdd65879c1Fb6312ef654',
            [chains.AURORA_MAINNET.chainId]: '0xccB54bF4171bc8C11e78ca40f3a3bd3B721EF361',
            [chains.MOONBEAM_MAINNET.chainId]: '0xccB54bF4171bc8C11e78ca40f3a3bd3B721EF361',
        },
        [environments.DEVELOPMENT]: {
            [chains.ETH_HARDHAT.chainId]: '0xc979978f89B11A6684Cc7C6384141322001Dc6E2',
        },
        [environments.INTERNAL]: {
            [chains.POLYGON_MUMBAI.chainId]: process.env.CASK_CONTRACT_P2P ||
                '0x96636D895605c1bc5069af3c880853D6D806e259',
            [chains.AVAX_TESTNET.chainId]: process.env.CASK_CONTRACT_P2P ||
                '0x2e0B0616C5feBFa0C9f8F9DeE4c6E07A1ecCfCB8',
        },
    },
    CaskToken: {
        [environments.TESTNET]: {
            [chains.POLYGON_MUMBAI.chainId]: "0x0000000000000000000000000000000000000000",
            [chains.AVAX_TESTNET.chainId]: "0x0000000000000000000000000000000000000000",
        },
        [environments.PRODUCTION]: {
            [chains.ETH_MAINNET.chainId]: '0x0645314c1Afd4d9711d609e3e755265aBaBc95Eb',
            [chains.POLYGON_MAINNET.chainId]: '0xdc185ade9a3362f9203191f136499ffe512527c1',
            [chains.AVAX_MAINNET.chainId]: '0x0000000000000000000000000000000000000000',
        },
        [environments.DEVELOPMENT]: {
            [chains.ETH_HARDHAT.chainId]: '0x0000000000000000000000000000000000000000',
        },
        [environments.INTERNAL]: {
            [chains.POLYGON_MUMBAI.chainId]: process.env.CASK_CONTRACT_TOKEN,
            [chains.AVAX_TESTNET.chainId]: process.env.CASK_CONTRACT_TOKEN,
        },
    },
    CaskAirdrop: {
        [environments.TESTNET]: {
            [chains.POLYGON_MUMBAI.chainId]: "0x0000000000000000000000000000000000000000",
            [chains.AVAX_TESTNET.chainId]: "0x0000000000000000000000000000000000000000",
        },
        [environments.PRODUCTION]: {
            [chains.POLYGON_MAINNET.chainId]: '0x0000000000000000000000000000000000000000',
            [chains.AVAX_MAINNET.chainId]: '0x0000000000000000000000000000000000000000',
        },
        [environments.DEVELOPMENT]: {
            [chains.ETH_HARDHAT.chainId]: '0x0000000000000000000000000000000000000000',
        },
        [environments.INTERNAL]: {
            [chains.POLYGON_MUMBAI.chainId]: process.env.CASK_CONTRACT_AIRDROP,
            [chains.AVAX_TESTNET.chainId]: process.env.CASK_CONTRACT_AIRDROP,
        },
    },
    /**
     * Subgraph URLs for a given environment/chain deployment.
     */
    SubgraphUrl: {
        [environments.TESTNET]: {
            [chains.POLYGON_MUMBAI.chainId]: "https://api.thegraph.com/subgraphs/name/caskprotocol/cask-protocol-mumbai",
            [chains.AVAX_TESTNET.chainId]: "https://api.thegraph.com/subgraphs/name/caskprotocol/cask-protocol-fuji",
            [chains.CELO_TESTNET.chainId]: "https://api.thegraph.com/subgraphs/name/caskprotocol/cask-protocol-alfajores",
        },
        [environments.PRODUCTION]: {
            [chains.POLYGON_MAINNET.chainId]: "https://api.thegraph.com/subgraphs/name/caskprotocol/cask-protocol-polygon",
            [chains.AVAX_MAINNET.chainId]: "https://api.thegraph.com/subgraphs/name/caskprotocol/cask-protocol-avalanche",
            [chains.FANTOM_MAINNET.chainId]: "https://api.thegraph.com/subgraphs/name/caskprotocol/cask-protocol-fantom",
            [chains.AURORA_MAINNET.chainId]: "https://api.thegraph.com/subgraphs/name/caskprotocol/cask-protocol-aurora",
            [chains.MOONBEAM_MAINNET.chainId]: "https://api.thegraph.com/subgraphs/name/caskprotocol/cask-protocol-moonbeam",
        },
        [environments.DEVELOPMENT]: {
            [chains.ETH_HARDHAT.chainId]: null,
        },
        [environments.INTERNAL]: {
            [chains.POLYGON_MUMBAI.chainId]: "https://api.thegraph.com/subgraphs/name/caskprotocol/cask-protocol-mumbai-internal",
            [chains.AVAX_TESTNET.chainId]: "https://api.thegraph.com/subgraphs/name/caskprotocol/cask-protocol-fuji-internal",
        },
    }
}

/**
 * See if a given environment/chain pair is valid
 * @memberOf CaskSDK.deployments
 * @param environment
 * @param chainId
 * @return {boolean}
 */
function isSupported(environment, chainId) {
    return deployments.CaskVault[environment]?.[chainId] !== undefined;
}

export default {
    ...deployments,
    isSupported,
}