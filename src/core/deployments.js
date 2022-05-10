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
        },
        [environments.PRODUCTION]: {
            [chains.POLYGON_MAINNET.chainId]: '0x0000000000000000000000000000000000000000',
            [chains.FANTOM_MAINNET.chainId]: '0x0000000000000000000000000000000000000000',
            [chains.AVAX_MAINNET.chainId]: '0x0000000000000000000000000000000000000000',
        },
        [environments.DEVELOPMENT]: {
            [chains.ETH_HARDHAT.chainId]: '0x9C59572eAbaED1323F685051595BF2472c9b30f1',
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
        },
        [environments.PRODUCTION]: {
            [chains.POLYGON_MAINNET.chainId]: '0x0000000000000000000000000000000000000000',
            [chains.FANTOM_MAINNET.chainId]: '0x0000000000000000000000000000000000000000',
            [chains.AVAX_MAINNET.chainId]: '0x0000000000000000000000000000000000000000',
        },
        [environments.DEVELOPMENT]: {
            [chains.ETH_HARDHAT.chainId]: '0x8630A6598Cf9E5abAB2f2a05A5C7Ad5344Ad915e',
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
        },
        [environments.PRODUCTION]: {
            [chains.POLYGON_MAINNET.chainId]: '0x0000000000000000000000000000000000000000',
            [chains.FANTOM_MAINNET.chainId]: '0x0000000000000000000000000000000000000000',
            [chains.AVAX_MAINNET.chainId]: '0x0000000000000000000000000000000000000000',
        },
        [environments.DEVELOPMENT]: {
            [chains.ETH_HARDHAT.chainId]: '0x8142e40a6e89e55C59cB339896532a0D5a64c02F',
        },
        [environments.INTERNAL]: {
            [chains.POLYGON_MUMBAI.chainId]: process.env.CASK_CONTRACT_VAULT ||
                '0xC040BDBBb2b1AdDaa7586962e9Fcb5585D7e66a9',
            [chains.AVAX_TESTNET]: process.env.CASK_CONTRACT_VAULT ||
                '0x5e8C289404E9B17be7FfE7FcBa673f5AC802cc06',
        },
    },
    CaskToken: {
        [environments.TESTNET]: {
            [chains.POLYGON_MUMBAI.chainId]: "0x0000000000000000000000000000000000000000",
        },
        [environments.PRODUCTION]: {
            [chains.ETH_MAINNET.chainId]: '0x0645314c1Afd4d9711d609e3e755265aBaBc95Eb',
            [chains.POLYGON_MAINNET.chainId]: '0xdc185ade9a3362f9203191f136499ffe512527c1',
            [chains.FANTOM_MAINNET.chainId]: '0x0000000000000000000000000000000000000000',
            [chains.AVAX_MAINNET.chainId]: '0x0000000000000000000000000000000000000000',
        },
        [environments.DEVELOPMENT]: {
            [chains.ETH_HARDHAT.chainId]: '0x9BD32FE5C1b4DEb0304CcB3fCccCe210cAd86Bc8',
        },
        [environments.INTERNAL]: {
            [chains.POLYGON_MUMBAI.chainId]: process.env.CASK_CONTRACT_TOKEN,
            [chains.AVAX_TESTNET.chainId]: process.env.CASK_CONTRACT_TOKEN,
        },
    },
    CaskAirdrop: {
        [environments.TESTNET]: {
            [chains.POLYGON_MUMBAI.chainId]: "0x0000000000000000000000000000000000000000",
        },
        [environments.PRODUCTION]: {
            [chains.POLYGON_MAINNET.chainId]: '0x0000000000000000000000000000000000000000',
            [chains.FANTOM_MAINNET.chainId]: '0x0000000000000000000000000000000000000000',
            [chains.AVAX_MAINNET.chainId]: '0x0000000000000000000000000000000000000000',
        },
        [environments.DEVELOPMENT]: {
            [chains.ETH_HARDHAT.chainId]: '0x0000000000000000000000000000000000000000',
        },
        [environments.INTERNAL]: {
            [chains.POLYGON_MUMBAI.chainId]: process.env.CASK_CONTRACT_AIRDROP,
            [chains.AVAX_TESTNET.chainId]: process.env.CASK_CONTRACT_AIRDROP,
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