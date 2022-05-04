import environments from "./environments.js";
import chains from "./chains.js";

/**
 * Default chain for each environment.
 *
 * @namespace CaskSDK.defaultChains
 */


/**
 * @enum
 * @memberof CaskSDK.defaultChains
 */
const defaultChains = {
    /**
     * Default development chain
     */
    [environments.DEVELOPMENT]: chains.ETH_HARDHAT,

    /**
     * Default testnet chain
     */
    [environments.TESTNET]: chains.POLYGON_MUMBAI,

    /**
     * Default production chain
     */
    [environments.PRODUCTION]: chains.POLYGON_MAINNET,
    [environments.INTERNAL]: chains.POLYGON_MUMBAI,
}

export default defaultChains;