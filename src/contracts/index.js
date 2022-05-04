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
            abi.CaskVault[ethersConnection.environment],
            ethersConnection.provider);
    },
    /**
     * Cask subscriptions contract.
     * @type ethers.Contract
     */
    CaskSubscriptions: ({ethersConnection}) => {
        return new ethers.Contract(
            deployments.CaskSubscriptions[ethersConnection.environment][ethersConnection.chainId],
            abi.CaskSubscriptions[ethersConnection.environment],
            ethersConnection.provider);
    },
    /**
     * Cask subscription plans contract.
     * @type ethers.Contract
     */
    CaskSubscriptionPlans: ({ethersConnection}) => {
        return new ethers.Contract(
            deployments.CaskSubscriptionPlans[ethersConnection.environment][ethersConnection.chainId],
            abi.CaskSubscriptionPlans[ethersConnection.environment],
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
}

export default contracts;