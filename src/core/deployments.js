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
            [chains.GNOSIS_MAINNET.chainId]: '0xD054F8866fc45c4387d56D2340dCA08d83E14A5e',
            [chains.CELO_MAINNET.chainId]: '0x7DaF9a1744Df00d0473A9A920B6A4Ea33B665360',
            [chains.ARBITRUM_MAINNET.chainId]: '0xF76BF31f0b56BD6f72E1aFeB83a51F191ec2291B',
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
            [chains.GNOSIS_MAINNET.chainId]: '0xD252A4C836C75063867f0193325b328CCe6B7306',
            [chains.CELO_MAINNET.chainId]: '0xF76BF31f0b56BD6f72E1aFeB83a51F191ec2291B',
            [chains.ARBITRUM_MAINNET.chainId]: '0xfA07af9E5835D720b3798a37f716749252F94D71',
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
    CaskSubscriptionManager: {
        [environments.TESTNET]: {
            [chains.POLYGON_MUMBAI.chainId]: "0x7F179331fDc27EFFA7620BB3fEa8B5951B623921",
            [chains.AVAX_TESTNET.chainId]: "0xEeE424F3b51b1ec62e5EAd955b5776634dc7e22e",
            [chains.CELO_TESTNET.chainId]: "0xcE1733bD8Bc301c055fa9517f384acBC5b6Fde79",
        },
        [environments.PRODUCTION]: {
            [chains.POLYGON_MAINNET.chainId]: '0xfA07af9E5835D720b3798a37f716749252F94D71',
            [chains.AVAX_MAINNET.chainId]: '0xfA07af9E5835D720b3798a37f716749252F94D71',
            [chains.FANTOM_MAINNET.chainId]: '0x17a38EA9257cf899BF9A7F6F507a1445E72F823A',
            [chains.AURORA_MAINNET.chainId]: '0x331979A83644574E56035E4b43d3ca68Ce793918',
            [chains.MOONBEAM_MAINNET.chainId]: '0x331979A83644574E56035E4b43d3ca68Ce793918',
            [chains.GNOSIS_MAINNET.chainId]: '0x331979A83644574E56035E4b43d3ca68Ce793918',
            [chains.CELO_MAINNET.chainId]: '0x17a38EA9257cf899BF9A7F6F507a1445E72F823A',
            [chains.ARBITRUM_MAINNET.chainId]: '0x7DaF9a1744Df00d0473A9A920B6A4Ea33B665360',
        },
        [environments.DEVELOPMENT]: {
            [chains.ETH_HARDHAT.chainId]: '0x63D99849deF155334210FFD443032D1230dd4c87',
        },
        [environments.INTERNAL]: {
            [chains.POLYGON_MUMBAI.chainId]: process.env.CASK_CONTRACT_SUBSCRIPTION_MANAGER ||
                '0x6fFe8913D5d9b6f1d2c6EeFa3e100Ab904a8C7a1',
            [chains.AVAX_TESTNET.chainId]: process.env.CASK_CONTRACT_SUBSCRIPTION_MANAGER ||
                '0x3431972E33F227d488E695e1ca1F3E788d4a8dcC',
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
            [chains.GNOSIS_MAINNET.chainId]: '0x3b2b4b547dAEEbf3A703288CB43650f0F287b9ff',
            [chains.CELO_MAINNET.chainId]: '0xBCcDbB0806Acc914F6746DE592f924B374190710',
            [chains.ARBITRUM_MAINNET.chainId]: '0x20151fF7fDd720b85063D02081aa5B7876aDff7B',
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
            [chains.CELO_TESTNET.chainId]: "0x43cff515Fd8338421B5570EEDCBEd86234189EcF",
        },
        [environments.PRODUCTION]: {
            [chains.POLYGON_MAINNET.chainId]: '0x733Ec5A72c38f2f3c75E98b28DffC1885aB04AF1',
            [chains.AVAX_MAINNET.chainId]: '0xb8A52a086262E1d6c7494bDCb824f884f41FC5f8',
            [chains.FANTOM_MAINNET.chainId]: '0x4C17e4F40262108F06375d727f1353e1D592B1Bf',
            [chains.AURORA_MAINNET.chainId]: '0x96d59127cCD1c0e3749E733Ee04F0DfbD2f808c8',
            [chains.MOONBEAM_MAINNET.chainId]: '0x96d59127cCD1c0e3749E733Ee04F0DfbD2f808c8',
            [chains.GNOSIS_MAINNET.chainId]: '0x96d59127cCD1c0e3749E733Ee04F0DfbD2f808c8',
            [chains.CELO_MAINNET.chainId]: '0x4C17e4F40262108F06375d727f1353e1D592B1Bf',
            [chains.ARBITRUM_MAINNET.chainId]: '0xf89418E3A57189692ADe9A25792fD986fb99C5Ca',
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
    CaskDCAManager: {
        [environments.TESTNET]: {
            [chains.POLYGON_MUMBAI.chainId]: "0x9C036b582E02717ae6523Eccc6AB0dC1Cad8755F",
            [chains.AVAX_TESTNET.chainId]: "0x67aEeD63d1F0a48054C6bf50e21D47921e3902B3",
            [chains.CELO_TESTNET.chainId]: "0x40f89BD69E634Eb1e3Cbe56D39DD15794E754CC8",
        },
        [environments.PRODUCTION]: {
            [chains.POLYGON_MAINNET.chainId]: '0xE07c2e264fb6D4dD8215feD6f3a78d70D1BF4CE2',
            [chains.AVAX_MAINNET.chainId]: '0x4898D1e6d9761B4215901817FBe9F12750238882',
            [chains.FANTOM_MAINNET.chainId]: '0xfa3ed790FD1fdC5E15c900D929c2F0527a0eC8b6',
            [chains.AURORA_MAINNET.chainId]: '0x83aA6a992Ff3ef3766679Cc90E8C60a04afcC171',
            [chains.MOONBEAM_MAINNET.chainId]: '0x83aA6a992Ff3ef3766679Cc90E8C60a04afcC171',
            [chains.GNOSIS_MAINNET.chainId]: '0x83aA6a992Ff3ef3766679Cc90E8C60a04afcC171',
            [chains.CELO_MAINNET.chainId]: '0xfa3ed790FD1fdC5E15c900D929c2F0527a0eC8b6',
            [chains.ARBITRUM_MAINNET.chainId]: '0x4C17e4F40262108F06375d727f1353e1D592B1Bf',
        },
        [environments.DEVELOPMENT]: {
            [chains.ETH_HARDHAT.chainId]: '0x398DFcAC744A629943997bd53737DaA4A5eD5b16',
        },
        [environments.INTERNAL]: {
            [chains.POLYGON_MUMBAI.chainId]: process.env.CASK_CONTRACT_DCA_MANAGER ||
                '0x920ca3c8A0C95D2402Ae254242824D16b0A19903',
            [chains.AVAX_TESTNET.chainId]: process.env.CASK_CONTRACT_DCA_MANAGER ||
                '0x58a4D10c2184179DB9cfC973A0B0181EE348D0f3',
        },
    },
    /**
     * CaskDCA contract address for a given environment/chain deployment.
     */
    CaskP2P: {
        [environments.TESTNET]: {
            [chains.POLYGON_MUMBAI.chainId]: "0x2068607e74B3ED913F920A4e9Fc922067dD825BB",
            [chains.AVAX_TESTNET.chainId]: "0x4Deb1AAe96809Fc8f05859f7A9F21F7e59e30186",
            [chains.CELO_TESTNET.chainId]: "0x8e2c338C1b470fd0cE9014bed29D5d3C5214AC0D",
        },
        [environments.PRODUCTION]: {
            [chains.POLYGON_MAINNET.chainId]: '0xB80376507Dd5d561AD3A6aB452FE17e782220501',
            [chains.AVAX_MAINNET.chainId]: '0xe2d24801A9b790f1168cCB7caBdAdC6A071912F3',
            [chains.FANTOM_MAINNET.chainId]: '0x1A4620123cfD10c73D9Cdd65879c1Fb6312ef654',
            [chains.AURORA_MAINNET.chainId]: '0xccB54bF4171bc8C11e78ca40f3a3bd3B721EF361',
            [chains.MOONBEAM_MAINNET.chainId]: '0xccB54bF4171bc8C11e78ca40f3a3bd3B721EF361',
            [chains.GNOSIS_MAINNET.chainId]: '0xccB54bF4171bc8C11e78ca40f3a3bd3B721EF361',
            [chains.CELO_MAINNET.chainId]: '0x1A4620123cfD10c73D9Cdd65879c1Fb6312ef654',
            [chains.ARBITRUM_MAINNET.chainId]: '0x775Df9836945B0E95eD5F6A3269Bf22F6b426e85',
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
    CaskP2PManager: {
        [environments.TESTNET]: {
            [chains.POLYGON_MUMBAI.chainId]: "0xC1132d3077626E16e9A799A8CbDD70E95ec6b071",
            [chains.AVAX_TESTNET.chainId]: "0x645C22Ad586509AE6B356E20a9e022C7caD18EF6",
            [chains.CELO_TESTNET.chainId]: "0x9632510b7207a6B157b83e20678Da022223e5DC4",
        },
        [environments.PRODUCTION]: {
            [chains.POLYGON_MAINNET.chainId]: '0xfA7fe9DFFd6fEd7292fdCce2677d88e1b9a9c295',
            [chains.AVAX_MAINNET.chainId]: '0xCFC9B780609A80BDF65b4676C3227d2c4c862003',
            [chains.FANTOM_MAINNET.chainId]: '0x8c4E2551542f399Af1576e9c194ea257Dcb7D926',
            [chains.AURORA_MAINNET.chainId]: '0xb8A52a086262E1d6c7494bDCb824f884f41FC5f8',
            [chains.MOONBEAM_MAINNET.chainId]: '0xb8A52a086262E1d6c7494bDCb824f884f41FC5f8',
            [chains.GNOSIS_MAINNET.chainId]: '0xb8A52a086262E1d6c7494bDCb824f884f41FC5f8',
            [chains.CELO_MAINNET.chainId]: '0x8c4E2551542f399Af1576e9c194ea257Dcb7D926',
            [chains.ARBITRUM_MAINNET.chainId]: '0x1A4620123cfD10c73D9Cdd65879c1Fb6312ef654',
        },
        [environments.DEVELOPMENT]: {
            [chains.ETH_HARDHAT.chainId]: '0x764eE2aBf3a86632C551C8c730a0034D036e1984',
        },
        [environments.INTERNAL]: {
            [chains.POLYGON_MUMBAI.chainId]: process.env.CASK_CONTRACT_P2P_MANAGER ||
                '0xbc881D779F4cBBCF3DB26311A0Dd1b0a8cD36fa6',
            [chains.AVAX_TESTNET.chainId]: process.env.CASK_CONTRACT_P2P_MANAGER ||
                '0x25feC85340eBED34A7dEb4aA19CeC0a3E2bFcf65',
        },
    },
    /**
     * CaskChainlinkTopup contract address for a given environment/chain deployment.
     */
    CaskChainlinkTopup: {
        [environments.TESTNET]: {
            [chains.POLYGON_MUMBAI.chainId]: "0xFB6edCa5E31e43572233212D3FB285465C969832",
            [chains.AVAX_TESTNET.chainId]: "0x7823a600dE066e3F037396D2A4840EeA22F1361f",
            [chains.CELO_TESTNET.chainId]: "0x0000000000000000000000000000000000000000",
        },
        [environments.PRODUCTION]: {
            [chains.POLYGON_MAINNET.chainId]: '0x0000000000000000000000000000000000000000',
            [chains.AVAX_MAINNET.chainId]: '0x0000000000000000000000000000000000000000',
            [chains.FANTOM_MAINNET.chainId]: '0x0000000000000000000000000000000000000000',
            [chains.AURORA_MAINNET.chainId]: '0x0000000000000000000000000000000000000000',
            [chains.MOONBEAM_MAINNET.chainId]: '0x0000000000000000000000000000000000000000',
            [chains.GNOSIS_MAINNET.chainId]: '0x0000000000000000000000000000000000000000',
            [chains.CELO_MAINNET.chainId]: '0x0000000000000000000000000000000000000000',
            [chains.ARBITRUM_MAINNET.chainId]: '0x0000000000000000000000000000000000000000',
        },
        [environments.DEVELOPMENT]: {
            [chains.ETH_HARDHAT.chainId]: '0x78070E0b04F82cfE5e002a1Ebf3914b478B40912',
        },
        [environments.INTERNAL]: {
            [chains.POLYGON_MUMBAI.chainId]: process.env.CASK_CONTRACT_P2P ||
            '0xFD923C9E7766457EB428A86176C05C2fD2cC33f6',
            [chains.AVAX_TESTNET.chainId]: process.env.CASK_CONTRACT_P2P ||
            '0xcdDdFfad20eAEeE9B77CB3EcEb79a05402d06c19',
        },
    },
    CaskChainlinkTopupManager: {
        [environments.TESTNET]: {
            [chains.POLYGON_MUMBAI.chainId]: "0xCD54748EBE7507847C1523abb38d93D00791Ad27",
            [chains.AVAX_TESTNET.chainId]: "0x6065db37aa5F4453fa988a5aA12b6293a11D9113",
            [chains.CELO_TESTNET.chainId]: "0x0000000000000000000000000000000000000000",
        },
        [environments.PRODUCTION]: {
            [chains.POLYGON_MAINNET.chainId]: '0x0000000000000000000000000000000000000000',
            [chains.AVAX_MAINNET.chainId]: '0x0000000000000000000000000000000000000000',
            [chains.FANTOM_MAINNET.chainId]: '0x0000000000000000000000000000000000000000',
            [chains.AURORA_MAINNET.chainId]: '0x0000000000000000000000000000000000000000',
            [chains.MOONBEAM_MAINNET.chainId]: '0x0000000000000000000000000000000000000000',
            [chains.GNOSIS_MAINNET.chainId]: '0x0000000000000000000000000000000000000000',
            [chains.CELO_MAINNET.chainId]: '0x0000000000000000000000000000000000000000',
            [chains.ARBITRUM_MAINNET.chainId]: '0x0000000000000000000000000000000000000000',
        },
        [environments.DEVELOPMENT]: {
            [chains.ETH_HARDHAT.chainId]: '0xc37ded1cEcA2929158Ed303c669172C8b28027Af',
        },
        [environments.INTERNAL]: {
            [chains.POLYGON_MUMBAI.chainId]: process.env.CASK_CONTRACT_P2P_MANAGER ||
            '0xa0E7ad1d853dfBbA56b38dd33fe1cFA19484c8a8',
            [chains.AVAX_TESTNET.chainId]: process.env.CASK_CONTRACT_P2P_MANAGER ||
            '0x1e7E32B8a17868C452eF95AeE1E1aE2Fef4bF6b1',
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
            [chains.GNOSIS_MAINNET.chainId]: "https://api.thegraph.com/subgraphs/name/caskprotocol/cask-protocol-gnosis",
            [chains.CELO_MAINNET.chainId]: "https://api.thegraph.com/subgraphs/name/caskprotocol/cask-protocol-celo",
            [chains.ARBITRUM_MAINNET.chainId]: 'https://api.thegraph.com/subgraphs/name/caskprotocol/cask-protocol-arbitrum',
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
 * Return a map of services and if they are available on the given ethersConnection (environment/chain)
 * @memberOf CaskSDK.deployments
 * @param ethersConnection
 * @return {Object}
 */
function servicesAvailable(ethersConnection) {
    const services = {
        subscriptions: false,
        subscriptionPlans: false,
        dca: false,
        p2p: false,
        chainlinkTopup: false,
    };
    if (deployments.CaskSubscriptions[ethersConnection.environment]?.[ethersConnection.chainId] &&
        deployments.CaskSubscriptions[ethersConnection.environment][ethersConnection.chainId] !==
        '0x0000000000000000000000000000000000000000') {
        services.subscriptions = true;
        services.subscriptionPlans = true;
    }
    if (deployments.CaskDCA[ethersConnection.environment]?.[ethersConnection.chainId] &&
        deployments.CaskDCA[ethersConnection.environment][ethersConnection.chainId] !==
        '0x0000000000000000000000000000000000000000') {
        services.dca = true;
    }
    if (deployments.CaskP2P[ethersConnection.environment]?.[ethersConnection.chainId] &&
        deployments.CaskP2P[ethersConnection.environment][ethersConnection.chainId] !==
        '0x0000000000000000000000000000000000000000') {
        services.p2p = true;
    }
    if (deployments.CaskChainlinkTopup[ethersConnection.environment]?.[ethersConnection.chainId] &&
        deployments.CaskChainlinkTopup[ethersConnection.environment][ethersConnection.chainId] !==
        '0x0000000000000000000000000000000000000000') {
        services.chainlinkTopup = true;
    }
    return services;
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
    servicesAvailable,
    isSupported,
}