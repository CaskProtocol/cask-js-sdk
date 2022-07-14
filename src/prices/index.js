import { ethers } from "ethers";
import Logger from "../utils/Logger.js";
import CaskUnits from "../core/units.js";

import EthersConnection from "../core/EthersConnection.js";
import Vault from "../vault/index.js";

/**
 * Service class for getting asset price and wallet balances.
 */
class Prices {

    /**
     * Create an instance of the Prices service.
     *
     * @param options See CaskSDK configuration.
     * @see CaskSDK
     */
    constructor(options={}) {
        this.options = {
            ...options,
            ...options?.prices
        };

        this.logger = new Logger('CaskSDK::Prices', this.options.logLevel);

        this.walletAddress = this.options.walletAddress;
        this.priceMaxAge = this.options.priceMaxAge || 0;

        if (!this.options?.cache) {
            this.options.cache = {};
        }
        this.options.cache.prices = this;

        if (this.options.cache.vault) {
            this.vault = this.options.cache.vault
        } else {
            this.vault = new Vault(options);
            this.initVault = true;
            this.options.cache.vault = this.vault;
        }

        this.onPricesReadyCallbacks = [];
        this.onBalancesReadyCallbacks = [];
        this.onPricesUpdatedCallbacks = [];
    }

    /**
     * Initialize the price feed service.
     *
     * @param {Object} args Function arguments
     * @param {EthersConnection} [args.ethersConnection] EthersConnection instance
     */
    async init({ethersConnection}={}) {
        this.logger.trace(`Initializing Cask Prices service.`);
        if (!ethersConnection) {
            this.ethersConnection = new EthersConnection(this.options);
        } else {
            this.ethersConnection = ethersConnection;
        }

        this.ethersConnection.onSwitchChain(async() => { await this._initFeed() });
        this.ethersConnection.onSwitchSigner(async() => { await this._signerChanged() });

        if (this.initVault) {
            await this.vault.init({ethersConnection: this.ethersConnection});
        }
        if (!ethersConnection) {
            await this.ethersConnection.init();
        }
        this.logger.info(`Cask Prices service initialization complete.`);
    }

    _initFeed() {
        let vaultReadyResolve;

        this.vault.onAssetsLoaded(async () => {
            if (this.options.interval > 0) {
                this.logger.info(`Starting price refreshing at interval ${this.options.interval}`);
                if (this.timer) {
                    clearInterval(this.timer);
                }
                this.timer = setInterval(() => {
                    try {
                        this.refreshData();
                    } catch(err) {
                        this.logger.error(`Error refreshing price/balance data.`, err);
                    }
                }, this.options.interval);
            }
            await this.refreshData();

            this.onPricesReadyCallbacks.map(async (handler) => { return handler() }); // dont wait for callbacks
            if (this.currentWalletAddress()) {
                this.onBalancesReadyCallbacks.map(async (handler) => { return handler(this.currentWalletAddress()) }); // dont wait for callbacks
            }

            vaultReadyResolve();
        });

        return new Promise((resolve, reject) => {
            vaultReadyResolve = resolve;
        });
    }

    async _signerChanged() {
        await this.refreshData();
        if (this.currentWalletAddress()) {
            this.onBalancesReadyCallbacks.map(async (handler) => { return handler(this.currentWalletAddress()) }); // dont wait for callbacks
        }
    }

    /**
     * Register a callback to be called after the price feed is ready
     * @param handler
     */
    async onPricesReady(handler) {
        this.onPricesReadyCallbacks.push(handler);
    }

    /**
     * Register a callback to be called after the wallet balances are available. Is called both when the price
     * feed is first loaded if there is a wallet address, or after the signer changes.
     * @param handler
     */
    async onBalancesReady(handler) {
        this.onBalancesReadyCallbacks.push(handler);
    }

    /**
     * Register a callback to be called after prices/balances have been refreshed
     * @param handler
     */
    async onPricesUpdated(handler) {
        this.onPricesUpdatedCallbacks.push(handler);
    }

    /**
     * Get current wallet being monitored for balances.
     * @return {string}
     */
    currentWalletAddress() {
        let walletAddress = this.walletAddress;
        if (!walletAddress && this.ethersConnection.address) {
            walletAddress = this.ethersConnection.address;
        }
        return walletAddress;
    }

    /**
     * Refresh the current asset prices and token balances. Called automatically if the price service
     * was constructed with a refresh interval.
     */
    async refreshData() {
        const walletAddress = this.currentWalletAddress();
        this.logger.trace(`Refreshing ${Object.keys(this.vault.assetMap).length} asset prices.`);
        if (walletAddress) {
            this.logger.trace(`Also refreshing asset balances for wallet ${walletAddress}.`);
        }
        const promises = Object.keys(this.vault.assetMap).map(async (asset) => {
            const assetInfo = this.vault.getAsset(asset);
            assetInfo.latestRoundData = await assetInfo.priceFeedContract.latestRoundData();

            if (walletAddress) {
                assetInfo.balance = await assetInfo.tokenContract.balanceOf(walletAddress);
            } else {
                delete assetInfo.balance;
            }
        });
        await Promise.all(promises);
        this.onPricesUpdatedCallbacks.map(async (handler) => { return handler() }); // dont wait for callbacks
        this.logger.debug(`Finished refreshing prices and balances.`);
    }

    /**
     * Current price of an asset in the raw price feed asset decimal format.
     * @param {Vault.Asset} asset Asset
     * @return {string}
     */
    currenRawPrice(asset) {
        const assetInfo = this.vault.getAsset(asset);
        if (!assetInfo) {
            throw new Error(`Unknown asset ${asset} - is it in the vault?`);
        }
        const now = ethers.BigNumber.from(parseInt(Date.now()/1000));
        const updatedAt = assetInfo?.latestRoundData?.updatedAt;
        if (!updatedAt) {
            throw new Error(`latestRoundData unavailable for asset ${assetInfo.symbol} - prices loaded yet?`);
        }
        const age = now.sub(updatedAt);
        if (this.priceMaxAge > 0 && updatedAt.gt(0) && age.gt(this.priceMaxAge)) {
            throw new Error(`Price feed is too old - age: ${age}`);
        }
        return assetInfo?.latestRoundData?.answer.toString();
    }

    /**
     * Current balance of an asset in the monitored address represented in the native decimals of the asset.
     * @param {Asset} asset Asset
     * @return {string}
     */
    currentRawBalance(asset) {
        const assetInfo = this.vault.getAsset(asset);
        if (!assetInfo) {
            throw new Error(`Unknown asset ${asset} - is it in the vault?`);
        }
        if (assetInfo?.balance === undefined) {
            throw new Error(`balance unavailable for asset ${assetInfo.symbol} - prices loaded yet?`);
        }
        return assetInfo?.balance.toString();
    }

    /**
     * Get the current balance of a specified asset for a given address (or the address of the connected signer).
     *
     * @see The SDK guide for more details on unit formatting at {@link https://docs.cask.fi/developer-docs/javascript-sdk}
     * @param {Object} args Function arguments
     * @param {Vault.Asset} args.asset Asset for balance lookup
     * @param {string} [args.units] Units of output
     * @param {Object} [args.unitOptions={}] Options passed to unit formatter.
     * @return {string|number|*}
     */
    balance({asset, units, unitOptions={}}) {
        if (!this.currentWalletAddress()) {
            throw new Error("No wallet address in which to get a balance");
        }
        const assetInfo = this.vault.getAsset(asset);
        const amount = this.currentRawBalance(assetInfo);

        return CaskUnits.formatUnits({
            amount,
            asset: assetInfo,
            units: units || this.options.defaultUnits,
            unitOptions: unitOptions || this.options.defaultUnitOptions,
        });
    }

    /**
     * Convert an amount of a specified asset into its current USD price.
     *
     * @see The SDK guide for more details on unit formatting at {@link https://docs.cask.fi/developer-docs/javascript-sdk}
     * @param {Object} args Function arguments
     * @param {BigNumber|number|string} [args.amount=1] Amount to format
     * @param {Vault.Asset} args.asset Asset for price lookup
     * @param {string} [args.units=SIMPLE] Units of output
     * @param {Object} [args.unitOptions={}] Options passed to unit formatter.
     * @return {string|number|*}
     */
    usdPrice({asset, amount=1, units=CaskUnits.SIMPLE, unitOptions={}}) {
        const assetInfo = this.vault.getAsset(asset);
        const current = this.currenRawPrice(assetInfo);
        const amountFeedDecimals = ethers.utils.parseUnits(
            CaskUnits.roundDown(amount).toFixed(2),
            assetInfo.priceFeedDecimals);

        const result = amountFeedDecimals
            .mul(ethers.BigNumber.from(current))
            .div(ethers.BigNumber.from(10).pow(assetInfo.priceFeedDecimals));

        return CaskUnits.formatFeedUnits({
            amount: result,
            asset: assetInfo,
            units,
            unitOptions,
        });
    }

    /**
     * Stop automatically refreshing price data.
     */
    stop() {
        this.logger.info(`Stopping prices service.`)
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = undefined;
        }
    }

}

export default Prices;