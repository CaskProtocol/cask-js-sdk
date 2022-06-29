import { ethers } from "ethers";
import Logger from "../utils/Logger.js";
import deployments from "./deployments.js";
import chains from "./chains.js";
import defaultChains from "./defaultChains.js";
import environments from "./environments.js";
import meta from "../meta/index.js";

const DEFAULT_ENVIRONMENT = process.env.CASK_ENV || environments.TESTNET;

/**
 * Manage the connection(s) to the blockchain.
 *
 * <br/><br/>
 * This is an internal class and should not be used directly. All service class instances have a property
 * named `ethersConnection` which is an instance of this class. For optimization, generally the same
 * instance of this class is shared across all service class instances.
 */
class EthersConnection {

    /**
     * Create an instance of the EthersConnection class to manage the blockchain connection(s).
     *
     * @param options See CaskSDK configuration.
     * @see CaskSDK
     */
    constructor(options={}) {
        this.options = {
            ...options,
            ...options?.connection
        };

        this.logger = new Logger('CaskSDK::EthersConnection', this.options.logLevel);

        this.environment = this.options.environment || DEFAULT_ENVIRONMENT;
        this.connections = this.options.connections;
        this.onSwitchChainCallbacks = [];
        this.onSwitchSignerCallbacks = [];
        this.onEstimateGasCallback = null;

        this.meta = new meta.Meta({
            ...options.meta,
            logLevel: this.options.logLevel
        });
    }

    /**
     * Register a handler to receive a callback when the EthersConnection switches chains.
     * @param handler Callback handler
     */
    onSwitchChain(handler) {
        this.onSwitchChainCallbacks.push(handler);
    }

    /**
     * Register a handler to receive a callback when the EthersConnection switches signers.
     * @param handler Callback handler
     */
    onSwitchSigner(handler) {
        this.onSwitchSignerCallbacks.push(handler);
    }

    /**
     * Register a handler to receive a callback when the EthersConnection estimates gas.
     * @param handler Callback handler
     */
     onEstimateGas(handler) {
        this.onEstimateGasCallback = handler;
    }

    /**
     * Initialize a blockchain connection.
     * @param {Object} args Function arguments
     * @param {Object} [args.chainId] Chain ID to connect to. Defaults to the defaultChain for the environment.
     * @async
     */
    init({chainId}={}) {
        if (!chainId) {
            chainId = this.options?.initialChainId;
        }
        if (!chainId) {
            chainId = defaultChains[this.environment].chainId;
        }
        return this.switchChain(chainId);
    }

    /**
     * Switch signer to use for write transactions.
     * @param signer New signer to use
     */
    async switchSigner(signer) {
        try {
            if (ethers.Signer.isSigner(signer)) {
                this.address = await signer.getAddress();
                this.signer = signer;
                await this.meta.init(this);
            }
        } catch {
            this.address = undefined;
            this.signer = undefined;
        }
        this.logger.trace(`Switching signer to wallet ${this.address}.`);
        const promises = this.onSwitchSignerCallbacks.map(async (handler) => {
            return handler(this.signer, this.address)
        });
        await Promise.all(promises);
        this.logger.debug(`Switch to signer ${this.address} complete.`);
    }

    /**
     * Switch connected chain.
     * @param chainId Chain ID to switch to
     * @param [signer] Optional signer to switch to as well
     */
    async switchChain(chainId, signer=undefined) {
        if (!chainId || this.chainId === chainId) {
            return;
        }

        if (!deployments.CaskVault[this.environment]?.[chainId]){
            throw new Error(`Cannot use chain ${chainId} in evironment ${this.environment}`);
        }

        this.logger.debug(`Switching to chain ${chainId}.`);

        if (!signer) {
            let configuredSigner = this.connections?.signer?.[chainId];
            if (!configuredSigner) {
                configuredSigner = this.connections?.signer;
            }
            if (configuredSigner) {
                signer = loadEthersProvider(configuredSigner);
            }
        }
        if (signer) {
            try {
                if (ethers.Signer.isSigner(signer)) {
                    this.address = await signer.getAddress();
                    this.signer = signer;
                }
            } catch {
                this.address = undefined;
                this.signer = undefined;
            }
        }

        let configuredProvider = this.connections?.rpc?.[chainId];
        if (!configuredProvider) {
            configuredProvider = this.connections?.rpc;
        }
        if (configuredProvider) {
            this.provider = loadEthersProvider(configuredProvider);
        } else {
            if (this.signer?.provider) {
                this.provider = this.signer?.provider;
            } else {
                const chainInfo = chains.lookupChain(chainId);
                this.provider = loadEthersProvider(chainInfo.defaultRpcUrl);
            }
        }

        if (!this.provider) {
            throw new Error(`Cannot find ethers provider for chain ${chainId}`);
        }

        const providerChainId = (await this.provider.getNetwork()).chainId;
        if (chainId !== providerChainId) {
            throw new Error(`Unable to switch chain to ${chainId} - provider reported chain ${providerChainId}`);
        }

        this.chainId = chainId;

        await this.meta.init(this);

        const promises = this.onSwitchChainCallbacks.map(async (handler) => {
            return handler(this.chainId, this.signer, this.address)
        });
        await Promise.all(promises);
        this.logger.debug(`Switching to chain ${chainId} using address ${this.address} is complete.`);
    }

    /**
     * Sign a message with the currently configured signer.
     * @param message Message to sign
     * @return {string} Signed message data
     * @async
     */
    signMessage(message) {
        if (!this.signer) {
            throw new Error("Cannot sign without a signer");
        }
        return this.signer.signMessage(message)
    }

    /**
     * Send a transaction with the currently configured signer.
     * @param transaction Transaction to send
     * @return {string} TransactionResponse
     * @async
     */
    async sendTransaction(transaction) {
        if (!this.signer) {
            throw new Error("Cannot send transaction without a signer");
        }
        return await this.signer.sendTransaction({...transaction, gasLimit: this.estimateGas(transaction)});
    }

    /**
     * Estimate gas for a transaction.
     * @param request Object of args passed to sendTransaction
     * @return {number} Estimated amount of gas needed
     * @async
     */
    async estimateGas(request) {
        if (!this.signer) {
            throw new Error("Cannot estimate gas without a signer");
        }
        let gas = await this.signer.estimateGas(request);

        if (this.onEstimateGasCallback) {
            this.logger.debug(`Executing onEstimateGas callback.`);
            gas = await this.onEstimateGasCallback(request, gas);
        }

        return gas;
    }
}

function loadEthersProvider(urlOrProvider) {
    if (typeof(urlOrProvider) != 'string') {
        return urlOrProvider;
    } else if (urlOrProvider.startsWith('http')) {
        return new ethers.providers.JsonRpcProvider(urlOrProvider)
    } else if (urlOrProvider.startsWith('ws')) {
        return new ethers.providers.WebSocketProvider(urlOrProvider)
    } else {
        throw new Error(`Unsupported ethers provider URL`);
    }
}

export default EthersConnection;