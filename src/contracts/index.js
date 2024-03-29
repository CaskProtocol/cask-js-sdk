import { ethers } from 'ethers';
import abi from "../core/abi.js";
import deployments from "../core/deployments.js";

/**
 * Create instances of Cask contracts as an ethers.Contract. Creating a Cask contract automatically
 * looks up the address from the environment and current connected chain.
 *
 * @namespace CaskSDK.contracts
 */

/**
 * @enum
 * @memberOf CaskSDK.contracts
 */
const contracts = {
    /**
     * Cask vault contract.
     * @type ethers.Contract
     */
    CaskVault: ({ethersConnection}) => {
        return new ethers.Contract(
            deployments.CaskVault[ethersConnection.environment][ethersConnection.chainId],
            abi.CaskVault,
            ethersConnection.provider);
    },
    /**
     * Cask subscriptions contract.
     * @type ethers.Contract
     */
    CaskSubscriptions: ({ethersConnection}) => {
        return new ethers.Contract(
            deployments.CaskSubscriptions[ethersConnection.environment][ethersConnection.chainId],
            abi.CaskSubscriptions,
            ethersConnection.provider);
    },
    /**
     * Cask subscription plans contract.
     * @type ethers.Contract
     */
    CaskSubscriptionPlans: ({ethersConnection}) => {
        return new ethers.Contract(
            deployments.CaskSubscriptionPlans[ethersConnection.environment][ethersConnection.chainId],
            abi.CaskSubscriptionPlans,
            ethersConnection.provider);
    },
    /**
     * Cask subscription manager contract.
     * @type ethers.Contract
     */
    CaskSubscriptionManager: ({ethersConnection}) => {
        return new ethers.Contract(
            deployments.CaskSubscriptionManager[ethersConnection.environment][ethersConnection.chainId],
            abi.CaskSubscriptionManager,
            ethersConnection.provider);
    },
    /**
     * Cask DCA contract.
     * @type ethers.Contract
     */
    CaskDCA: ({ethersConnection}) => {
        return new ethers.Contract(
            deployments.CaskDCA[ethersConnection.environment][ethersConnection.chainId],
            abi.CaskDCA,
            ethersConnection.provider);
    },
    /**
     * Cask DCA Manager contract.
     * @type ethers.Contract
     */
    CaskDCAManager: ({ethersConnection}) => {
        return new ethers.Contract(
            deployments.CaskDCAManager[ethersConnection.environment][ethersConnection.chainId],
            abi.CaskDCAManager,
            ethersConnection.provider);
    },
    /**
     * Cask P2P contract.
     * @type ethers.Contract
     */
    CaskP2P: ({ethersConnection}) => {
        return new ethers.Contract(
            deployments.CaskP2P[ethersConnection.environment][ethersConnection.chainId],
            abi.CaskP2P,
            ethersConnection.provider);
    },
    /**
     * Cask P2P Manager contract.
     * @type ethers.Contract
     */
    CaskP2PManager: ({ethersConnection}) => {
        return new ethers.Contract(
            deployments.CaskP2PManager[ethersConnection.environment][ethersConnection.chainId],
            abi.CaskP2PManager,
            ethersConnection.provider);
    },
    /**
     * Cask ChainlinkTopup contract.
     * @type ethers.Contract
     */
    CaskChainlinkTopup: ({ethersConnection}) => {
        return new ethers.Contract(
            deployments.CaskChainlinkTopup[ethersConnection.environment][ethersConnection.chainId],
            abi.CaskChainlinkTopup,
            ethersConnection.provider);
    },
    /**
     * Cask ChainlinkTopup Manager contract.
     * @type ethers.Contract
     */
    CaskChainlinkTopupManager: ({ethersConnection}) => {
        return new ethers.Contract(
            deployments.CaskChainlinkTopupManager[ethersConnection.environment][ethersConnection.chainId],
            abi.CaskChainlinkTopupManager,
            ethersConnection.provider);
    },
    /**
     * Chainlink price oracle. Uses either the supplied provider, or the connection from the ethersConnection.
     * @type ethers.Contract
     */
    AggregatorV3Interface: ({priceFeed, ethersConnection, provider}) => {
        return new ethers.Contract(
            priceFeed,
            abi.AggregatorV3Interface,
            provider || ethersConnection.provider);
    },
    /**
     * Get an ERC20 token instance. Uses either the supplied provider, or the connection from the ethersConnection.
     * @type ethers.Contract
     */
    ERC20: ({tokenAddress, ethersConnection, provider}) => {
        return new ethers.Contract(
            tokenAddress,
            abi.ERC20,
            provider || ethersConnection.provider);
    },
    /**
     * Get an ERC721 token instance. Uses either the supplied provider, or the connection from the ethersConnection.
     * @type ethers.Contract
     */
    ERC721: ({tokenAddress, ethersConnection, provider}) => {
        return new ethers.Contract(
            tokenAddress,
            abi.ERC721,
            provider || ethersConnection.provider);
    },
    /**
     * Get an IUniswapV2Router02 router instance. Uses either the supplied provider, or the connection from the ethersConnection.
     * @type ethers.Contract
     */
    IUniswapV2Router02: ({routerAddress, ethersConnection, provider}) => {
        return new ethers.Contract(
            routerAddress,
            abi.IUniswapV2Router02,
            provider || ethersConnection.provider);
    },
    /**
     * Band price oracle. Uses either the supplied provider, or the connection from the ethersConnection.
     * @type ethers.Contract
     */
    IStdReference: ({referenceAddress, ethersConnection, provider}) => {
        return new ethers.Contract(
            referenceAddress,
            abi.IStdReference,
            provider || ethersConnection.provider);
    },
    /**
     * Chainlink Automation registry instance.
     * @type ethers.Contract
     */
    AutomationRegistry: ({registryAddress, ethersConnection, provider}) => {
        return new ethers.Contract(
            registryAddress,
            abi.AutomationRegistryBaseInterface,
            provider || ethersConnection.provider);
    },
    /**
     * Chainlink VRF coordinator instance.
     * @type ethers.Contract
     */
    VRFCoordinator: ({coordinatorAddress, ethersConnection, provider}) => {
        return new ethers.Contract(
            coordinatorAddress,
            abi.VRFCoordinatorV2Interface,
            provider || ethersConnection.provider);
    },
}

export default contracts;