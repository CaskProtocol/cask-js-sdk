import Logger from "../utils/Logger.js";
import contracts from "../contracts/index.js";
import chains from "../core/chains.js";
import fetch from "cross-fetch";


import EthersConnection from "../core/EthersConnection.js";

/**
 * Service class for obtaining metadata information about ERC20/NFT tokens.
 */
class Tokens {

    /**
     * Create an instance of the Tokens service.
     *
     * @param options See CaskSDK configuration.
     * @see CaskSDK
     */
    constructor(options = {}) {
        this.options = {
            ...options,
            ...options?.tokens
        };

        this.logger = new Logger('CaskSDK::Tokens', this.options.logLevel);

        this.alchemyUrls = this.options.alchemyUrls || {};
        this.walletAddress = this.options.walletAddress;

        if (!this.options?.cache) {
            this.options.cache = {};
        }
        this.options.cache.tokens = this;
    }

    /**
     * Initialize the tokens service.
     *
     * @param {Object} args Function arguments
     * @param {EthersConnection} [args.ethersConnection] EthersConnection instance
     */
    async init({ethersConnection} = {}) {
        this.logger.trace(`Initializing Cask Tokens service.`);
        if (!ethersConnection) {
            this.ethersConnection = new EthersConnection(this.options);
        } else {
            this.ethersConnection = ethersConnection;
        }

        this.ethersConnection.onSwitchChain(async(chainId) => { await this._initContracts(chainId) });

        if (!ethersConnection) {
            await this.ethersConnection.init();
        }
        this.logger.info(`Cask Tokens service initialization complete.`);
    }

    async _initContracts(chainId) {
        this.CaskSubscriptions = contracts.CaskSubscriptions({ethersConnection: this.ethersConnection});
    }


    /**
     * Get the wallet our current connection represents.
     * @return {string}
     */
    currentWalletAddress() {
        let walletAddress = this.walletAddress;
        if (!walletAddress && this.ethersConnection.address) {
            walletAddress = this.ethersConnection.address;
        }
        return walletAddress;
    }

    async getERC20Info(tokenAddress) {
        const erc20 = contracts.ERC20({tokenAddress, ethersConnection: this.ethersConnection});
        const symbol = await erc20.symbol();
        const name = await erc20.name();
        const decimals = await erc20.decimals();
        return {name, symbol, decimals};
    }

    async getNFTInfo(tokenAddress) {
        const erc721 = contracts.ERC721({tokenAddress, ethersConnection: this.ethersConnection});
        const symbol = await erc721.symbol();
        const name = await erc721.name();
        return {name, symbol};
    }

}

export default Tokens;