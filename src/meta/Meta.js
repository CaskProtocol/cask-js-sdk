import providers from "./providers.js";
import {Biconomy} from "@biconomy/mexa";
import chains from "../core/chains.js";
import Logger from "../utils/Logger.js";

/**
 * Represents a connection to a service for relaying meta transactions.
 *
 * @namespace CaskSDK.meta
 */

/**
 * @memberOf CaskSDK.meta
 */
class Meta {

    /**
     * Create an instance of the Meta service.
     *
     * @param options See CaskSDK "meta" configuration.
     */
    constructor(options={}) {
        this.options = options;
        this.metaProvider = providers.NONE;

        if (options.biconomyApiKey) {
            this.metaProvider = providers.BICONOMY;
        }

        this.logger = new Logger('CaskSDK::Meta', options.logLevel);
    }

    async init(ethersConnection) {
        this.logger.info(`Initializing Cask Meta service.`);
        if (!ethersConnection) {
            this.logger.info("Cannot perform meta transactions without a connection");
            return;
        }
        if (!ethersConnection.signer) {
            this.logger.info("Cannot perform meta transactions without signer");
            return;
        }

        switch (this.metaProvider) {
            case providers.NONE:
                break;
            case providers.BICONOMY:
                const chainInfo = chains.lookupChain(ethersConnection.chainId);
                if (!chainInfo?.biconomyEnabled) {
                    this.logger.info(`Biconomy meta transactions not supported on current chain ${ethersConnection.chainId}.`);
                    break;
                }
                if (!this.options.biconomyApiKey[ethersConnection.chainId]) {
                    this.logger.info(`Biconomy API Key not provided for current chain ${ethersConnection.chainId}.`);
                    break;
                }
                if (ethersConnection.signer?.provider?.provider?.isBiconomy) {
                    // already setup
                    this.logger.info(`Biconomy already initalized.`);
                    return;
                }

                try {
                    this.biconomy = new Biconomy(ethersConnection.signer.provider.provider, {
                        walletProvider: ethersConnection.signer.provider.provider,
                        apiKey: this.options.biconomyApiKey[ethersConnection.chainId],
                        debug: this.options.logLevel === 'debug',
                    });
                    this.logger.info(`Biconomy instantiated.`);
                } catch (error) {
                    console.dir(error)
                }

                ethersConnection.signer = this.biconomy.getEthersProvider().getSigner();
                this.logger.info(`Cask Meta service successfully integrated with Biconomy.`);
                break;
            default:
                throw('Invalid Meta provider: ' + this.metaProvider);
        }

        this.logger.info(`Cask Meta service initialization complete.`);
    }
}

export default Meta;