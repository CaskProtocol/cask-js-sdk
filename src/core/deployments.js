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
            // [chains.AVAX_TESTNET.chainId]: "0x28E372eff469b18Bc86Fb9f0C496b219bde39E81",
        },
        [environments.PRODUCTION]: {
            [chains.POLYGON_MAINNET.chainId]: '0x4A6f232552E0fd76787006Bb688bFBCB931cc3d0',
            // [chains.AVAX_MAINNET.chainId]: '0x4A6f232552E0fd76787006Bb688bFBCB931cc3d0',
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
            // [chains.AVAX_TESTNET.chainId]: "0x06bd2FD3784E1cEe11969caA67CDb0803DcF5869",
        },
        [environments.PRODUCTION]: {
            [chains.POLYGON_MAINNET.chainId]: '0x78B5882b81AF02ebb0803eAFb4A4bf27fe35470e',
            // [chains.AVAX_MAINNET.chainId]: '0x78B5882b81AF02ebb0803eAFb4A4bf27fe35470e',
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
            // [chains.AVAX_TESTNET.chainId]: "0x9d628d298D917BF9642Bb45D594B2075f661373D",
        },
        [environments.PRODUCTION]: {
            [chains.POLYGON_MAINNET.chainId]: '0x3b2b4b547dAEEbf3A703288CB43650f0F287b9ff',
            // [chains.AVAX_MAINNET.chainId]: '0x3b2b4b547dAEEbf3A703288CB43650f0F287b9ff',
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
            [chains.POLYGON_MUMBAI.chainId]: "",
            // [chains.AVAX_TESTNET.chainId]: "",
        },
        [environments.PRODUCTION]: {
            [chains.POLYGON_MAINNET.chainId]: '',
        },
        [environments.DEVELOPMENT]: {
            [chains.ETH_HARDHAT.chainId]: '0xF4EED3670EB74651D55EaA4f1832410eF0cbc519',
        },
        [environments.INTERNAL]: {
            [chains.POLYGON_MUMBAI.chainId]: process.env.CASK_CONTRACT_DCA ||
                '0x41Eb18BA90c2c955f1987BD3AeA6feb0F70e0e49',
            [chains.AVAX_TESTNET.chainId]: process.env.CASK_CONTRACT_DCA ||
                '0x02b5953b90087d5e0A8e9a74364a3e60cfbc9872',
        },
    },
    /**
     * CaskDCA contract address for a given environment/chain deployment.
     */
    CaskP2P: {
        [environments.TESTNET]: {
            [chains.POLYGON_MUMBAI.chainId]: "",
            // [chains.AVAX_TESTNET.chainId]: "",
        },
        [environments.PRODUCTION]: {
            [chains.POLYGON_MAINNET.chainId]: '',
        },
        [environments.DEVELOPMENT]: {
            [chains.ETH_HARDHAT.chainId]: '0xc979978f89B11A6684Cc7C6384141322001Dc6E2',
        },
        [environments.INTERNAL]: {
            [chains.POLYGON_MUMBAI.chainId]: process.env.CASK_CONTRACT_P2P ||
                '0x92b34C07bD6B77A88d91919469c540a7e1b269e4',
            [chains.AVAX_TESTNET.chainId]: process.env.CASK_CONTRACT_P2P ||
                '0xDa70B55FEF2Ad61a289eC57d27E8e9f85144A298',
        },
    },
    CaskToken: {
        [environments.TESTNET]: {
            [chains.POLYGON_MUMBAI.chainId]: "0x0000000000000000000000000000000000000000",
            // [chains.AVAX_TESTNET.chainId]: "0x0000000000000000000000000000000000000000",
        },
        [environments.PRODUCTION]: {
            [chains.ETH_MAINNET.chainId]: '0x0645314c1Afd4d9711d609e3e755265aBaBc95Eb',
            [chains.POLYGON_MAINNET.chainId]: '0xdc185ade9a3362f9203191f136499ffe512527c1',
            // [chains.AVAX_MAINNET.chainId]: '0x0000000000000000000000000000000000000000',
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
            // [chains.AVAX_TESTNET.chainId]: "0x0000000000000000000000000000000000000000",
        },
        [environments.PRODUCTION]: {
            [chains.POLYGON_MAINNET.chainId]: '0x0000000000000000000000000000000000000000',
            // [chains.AVAX_MAINNET.chainId]: '0x0000000000000000000000000000000000000000',
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
            // [chains.AVAX_TESTNET.chainId]: "https://api.thegraph.com/subgraphs/name/caskprotocol/cask-protocol-fuji",
        },
        [environments.PRODUCTION]: {
            [chains.POLYGON_MAINNET.chainId]: "https://api.thegraph.com/subgraphs/name/caskprotocol/cask-protocol-polygon",
            // [chains.AVAX_MAINNET.chainId]: "https://api.thegraph.com/subgraphs/name/caskprotocol/cask-protocol-avalanche",
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