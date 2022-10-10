import { ethers } from "ethers";
import Logger from "../utils/Logger.js";
import contracts from "../contracts/index.js";
import chains from "../core/chains.js";
import CaskUnits from "../core/units.js";
import EthersConnection from "../core/EthersConnection.js";

/**
 * @memberOf Vault
 * @typedef {Object} Asset
 * @property {string} address Asset address
 * @property {string} priceFeed Oracle price feed address
 * @property {number} slippageBps Basis points applied as slippage on deposits and withdrawals of the asset
 * @property {number} assetDecimals Number of decimals for asset
 * @property {number} priceFeedDecimals Number of decimals used in price feed
 * @property {boolean} allowed true if asset is accepted in the Cask vault, false otherwise
 * @property {string} symbol Asset symbol
 * @property {ethers.Contract} priceFeedContract An ethers.Contract instance of the price feed oracle contract
 * @property {ethers.Contract} tokenContract an ethers.Contract instance of the ERC20 token contract
 */

/**
 * Service class to handle interacting with the Cask vault system
 */
class Vault {

    /**
     * Create an instance of the Vault service.
     *
     * @param options See CaskSDK configuration.
     * @see CaskSDK
     */
    constructor(options={}) {
        this.options = {
            ...options,
            ...options?.vault
        };

        this.logger = new Logger('CaskSDK::Vault', this.options.logLevel);

        if (!this.options?.cache) {
            this.options.cache = {};
        }
        this.options.cache.vault = this;

        /**
         * Map of asset address to Asset object for all assets supported by the vault
         *
         * @see Vault.Asset
         */
        this.assetMap = {};

        this.assetsLoaded = false;

        this.assetPriceFeed = {};

        this.onAssetsLoadedCallbacks = [];
    }

    /**
     * Initialize the vault service.
     *
     * @param {Object} args Function arguments
     * @param {EthersConnection} [args.ethersConnection] EthersConnection instance
     */
    async init({ethersConnection}={}) {
        this.logger.trace(`Initializing Cask Vault service.`);
        if (!ethersConnection) {
            this.ethersConnection = new EthersConnection(this.options);
        } else {
            this.ethersConnection = ethersConnection;
        }
        this.ethersConnection.onSwitchChain(async(chainId) => { await this._initContracts(chainId) });

        if (!ethersConnection) {
            await this.ethersConnection.init();
        }
        this.logger.info(`Cask Vault service initialization complete.`);
    }

    async _initContracts(chainId) {
        this.assetMap = {};
        this.assetsLoaded = false;

        this.CaskVault = contracts.CaskVault({ethersConnection: this.ethersConnection});

        const baseAssetPromise = this.CaskVault.getBaseAsset();
        await this.loadVaultAssets();
        this.baseAsset = this.getAsset(await baseAssetPromise);
        this.onAssetsLoadedCallbacks.map(async (handler) => { return handler() }); // dont wait for callbacks
    }

    /**
     * Register a callback to be called after the vault is (re-)connected to a blockchain and all the
     * vault assets have be (re)loaded.
     * @param handler
     */
    async onAssetsLoaded(handler) {
        if (this.assetsLoaded) {
            await handler();
        } else {
            this.onAssetsLoadedCallbacks.push(handler);
        }
    }

    /**
     * Load all the vault assets into memory
     */
    async loadVaultAssets() {
        this.assetsLoaded = false;
        this.logger.debug(`Loading vault assets.`);
        const allAssets = await this.CaskVault.getAllAssets();
        const allPromises = allAssets.map(async (asset) => {
            const vaultAsset = await this.CaskVault.getAsset(asset);
            const tokenContract = contracts.ERC20({
                tokenAddress: asset,
                ethersConnection: this.ethersConnection
            });
            this.assetMap[asset.toLowerCase()] = {
                address: asset,
                priceFeed: vaultAsset.priceFeed,
                slippageBps: vaultAsset.slippageBps,
                depositLimit: vaultAsset.depositLimit,
                assetDecimals: vaultAsset.assetDecimals,
                priceFeedDecimals: vaultAsset.priceFeedDecimals,
                allowed: vaultAsset.allowed,
                symbol: await tokenContract.symbol(),
                tokenContract,
            };
            return asset.toLowerCase();
        });
        await Promise.all(allPromises);
        this.assetsLoaded = true;
        this.logger.debug(`Loaded ${Object.keys(this.assetMap).length} vault assets.`);
    }

    /**
     * Get the details of a vault asset
     * @param asset Asset address or token name
     * @return {Vault.Asset}
     */
    getAsset(asset) {
        let foundAsset;
        if (typeof(asset) !== 'string') {
            return asset;
        } else if (asset.startsWith('0x')) {
            foundAsset = this.assetMap[asset.toLowerCase()];
        } else {
            foundAsset = Object.keys(this.assetMap).find((addr) => this.assetMap[addr].symbol.toLowerCase() ===
                asset.toLowerCase());
            foundAsset = this.assetMap[foundAsset];
        }
        if (!foundAsset) {
            throw new Error(`Unknown asset ${asset.toLowerCase()}`);
        }
        return foundAsset;
    }

    /**
     * Approve and deposit an asset into the vault.
     * @param {Object} args Function arguments
     * @param {Vault.Asset|string} args.asset Asset
     * @param {float} [args.amountSimple] Amount in float format
     * @param {string} [args.amountAsset] Amount in asset decimals format
     * @param {string} [args.to=ethersConnection.address] Address to receive deposit credit
     * @return {Promise<{tx}>}
     */
    async approveAndDeposit({asset, amountSimple, amountAsset, to}) {
        await this.approve({asset, amountSimple, amountAsset, to});
        return await this.deposit({asset, amountSimple, amountAsset, to});
    }

    /**
     * Get current allowance the vault can access of an asset for a given address.
     * @param {Object} args Function arguments
     * @param {Vault.Asset|string} args.asset Asset
     * @param {string} [args.units] Units of output
     * @param {Object} [args.unitOptions={}] Options passed to unit formatter.
     * @return {Promise<boolean>}
     */
    async allowance({asset, address, units, unitOptions}) {
        asset = this.getAsset(asset);

        address = address || this.ethersConnection.address;
        if (!address) {
            throw new Error("address not specified or detectable");
        }

        let erc20Token = contracts.ERC20({
            tokenAddress: asset.address,
            ethersConnection: this.ethersConnection,
        });

        const amount = await erc20Token.allowance(address, this.CaskVault.address);

        return CaskUnits.formatUnits({
            amount,
            asset,
            units: units || this.options.defaultUnits,
            unitOptions: unitOptions || this.options.defaultUnitOptions,
        });
    }

    /**
     * Check if an approval is needed for a certain amount of an asset before a deposit can take place.
     * @param {Object} args Function arguments
     * @param {Vault.Asset|string} args.asset Asset
     * @param {float} [args.amountSimple] Amount in float format
     * @param {string} [args.amountAsset] Amount in asset decimals format
     * @return {Promise<boolean>}
     */
    async needApproval({asset, address, amountSimple, amountAsset}) {
        asset = this.getAsset(asset);

        amountAsset = ethers.BigNumber.from(
            this.amountInAsset({asset, amountSimple, amountAsset}));

        const allowance = await this.allowance({asset, address, units: CaskUnits.ASSET});

        return ethers.BigNumber.from(allowance).lt(amountAsset);
    }

    /**
     * Approve an amount of the specified asset for the vault to make deposits.
     * @param {Object} args Function arguments
     * @param {Vault.Asset|string} args.asset Asset
     * @param {float} [args.amountSimple] Amount in float format
     * @param {string} [args.amountAsset] Amount in asset decimals format
     * @return {Promise<{tx}>}
     */
    async approve({asset, amountSimple, amountAsset}) {
        asset = this.getAsset(asset);

        if (!this.ethersConnection.signer) {
            throw new Error("Cannot perform transaction without ethers signer");
        }

        amountAsset = this.amountInAsset({asset, amountSimple, amountAsset});

        let erc20Token = contracts.ERC20({
            tokenAddress: asset.address,
            ethersConnection: this.ethersConnection,
        });

        const tx = await erc20Token.connect(this.ethersConnection.signer)
            .approve(this.CaskVault.address, amountAsset);
        await tx.wait();
        return {tx};
    }

    /**
     * Deposit an asset into the vault.
     * @param {Object} args Function arguments
     * @param {Vault.Asset|string} args.asset Asset
     * @param {float} [args.amountSimple] Amount in float format
     * @param {string} [args.amountAsset] Amount in asset decimals format
     * @param {string} [args.to=ethersConnection.address] Address to receive deposit credit
     * @return {Promise<{tx}>}
     */
    async deposit({asset, amountSimple, amountAsset, to}) {
        asset = this.getAsset(asset);

        if (!this.ethersConnection.signer) {
            throw new Error("Cannot perform transaction without ethers signer");
        }

        amountAsset = this.amountInAsset({asset, amountSimple, amountAsset});

        let tx;
        if (this.ethersConnection.metaEnabled()) {
            if (to) {
                tx = await this.ethersConnection.sendTransaction(
                    await this.CaskVault.connect(this.ethersConnection.signer).populateTransaction.depositTo(to, asset.address, amountAsset)
                );
            } else {
                tx = await this.ethersConnection.sendTransaction(
                    await this.CaskVault.connect(this.ethersConnection.signer).populateTransaction.deposit(asset.address, amountAsset)
                );
            }
        } else {
            if (to) {
                tx = await this.CaskVault.connect(this.ethersConnection.signer).depositTo(to, asset.address, amountAsset);
            } else {
                tx = await this.CaskVault.connect(this.ethersConnection.signer).deposit(asset.address, amountAsset);
            }
        }

        await tx.wait();
        return {tx};
    }

    /**
     * Withdraw an asset from the vault.
     * @param {Object} args Function arguments
     * @param {Vault.Asset|string} args.asset Asset
     * @param {float} [args.amountSimple] Amount in float format
     * @param {string} [args.amountAsset] Amount in asset decimals format
     * @param {string} [args.to=ethersConnection.address] Address to receive withdrawn assets
     * @return {Promise<{tx}>}
     */
    async withdraw({asset, amountSimple, amountAsset, to}) {
        asset = this.getAsset(asset);

        if (!this.ethersConnection.signer) {
            throw new Error("Cannot perform transaction without ethers signer");
        }

        let shares = ethers.BigNumber.from(await this.sharesForAmount({asset, amountSimple, amountAsset}));
        const currentShares = await this.CaskVault.balanceOf(this.ethersConnection.address);
        if (shares.gt(currentShares)) {
            this.logger.warn(`Calculated shares ${shares} is more than address balance ${currentShares} - adjusting withdraw down.`);
            shares = currentShares;
        }
        this.logger.debug(`Withdrawing ${shares} shares from vault into asset ${asset.symbol}.`);

        let tx;
        if (to) {
            tx = await this.CaskVault.connect(this.ethersConnection.signer)
                .withdrawTo(to, asset.address, shares);
        } else {
            tx = await this.CaskVault.connect(this.ethersConnection.signer)
                .withdraw(asset.address, shares);
        }
        await tx.wait();
        return {tx};
    }

    /**
     * Get the total value that an address owns in the vault.
     *
     * @see The SDK guide for more details on unit formatting at {@link https://docs.cask.fi/developer-docs/javascript-sdk}
     * @param {Object} args Function arguments
     * @param {number} [args.address=ethersConnection.address] Address for balance inquery
     * @param {string} [args.units] Units of output
     * @param {Object} [args.unitOptions={}] Options passed to unit formatter.
     * @return {Promise<number|*>}
     */
    async balance({address, units, unitOptions}={}) {
        address = address || this.ethersConnection.address;
        if (!address) {
            throw new Error("address not specified or detectable");
        }

        return CaskUnits.formatUnits({
            amount: await this.CaskVault.currentValueOf(address),
            asset: this.baseAsset,
            units: units || this.options.defaultUnits,
            unitOptions: unitOptions || this.options.defaultUnitOptions,
        });
    }

    /**
     * Transfer an amount of value from one cask wallet to another cask wallet.
     * @param {Object} args Function arguments
     * @param {float} [args.amountSimple] Amount in float format
     * @param {string} [args.amountAsset] Amount in vault decimals format
     * @param {string} args.to Address to receive the transfer
     * @return {Promise<{tx}>}
     */
    async transfer({ amountSimple, amountAsset, to}) {

        if (!this.ethersConnection.signer) {
            throw new Error("Cannot perform transaction without ethers signer");
        }

        let shares = ethers.BigNumber.from(await this.sharesForAmount({asset: this.baseAsset, amountSimple, amountAsset}));
        const currentShares = await this.CaskVault.balanceOf(this.ethersConnection.address);
        if (shares.gt(currentShares)) {
            this.logger.warn(`Calculated shares ${shares} is more than address balance ${currentShares} - adjusting transfer down.`);
            shares = currentShares;
        }

        const tx = await this.CaskVault.connect(this.ethersConnection.signer).transfer(to, shares);
        await tx.wait();
        return {tx};
    }

    /**
     * Set funding source of current signer to use for vault payments.
     * @param {Object} args Function arguments
     * @param {number} args.fundingSource Funding source
     * @param {Vault.Asset|string} args.asset Asset
     * @return {Promise<{tx}>}
     */
    async setFundingSource({fundingSource, asset=this.baseAsset}) {
        asset = this.getAsset(asset);

        if (!this.ethersConnection.signer) {
            throw new Error("Cannot perform transaction without ethers signer");
        }

        let tx;
        if (this.ethersConnection.metaEnabled()) {
            tx = await this.ethersConnection.sendTransaction(
                await this.CaskVault.connect(this.ethersConnection.signer).populateTransaction.setFundingSource(fundingSource, asset.address)
            );
        } else {
            tx = await this.CaskVault.connect(this.ethersConnection.signer).setFundingSource(fundingSource, asset.address);
        }

        await tx.wait();
        return {tx};
    }

    /**
     * Get funding source for an address.
     * @param {Object} args Function arguments
     * @param {string} [args.address=this.ethersConnection.address] Address
     * @return {Promise<{*}>}
     */
    async getFundingSource({address}={}) {
        address = address || this.ethersConnection.address;
        if (!address) {
            throw new Error("address not specified or detectable");
        }

        return await this.CaskVault.fundingSource(address);
    }

    /**
     * Get the total value held of a specified asset in the vault.
     *
     * @see The SDK guide for more details on unit formatting at {@link https://docs.cask.fi/developer-docs/javascript-sdk}
     * @param {Object} args Function arguments
     * @param {Vault.Asset|string} args.asset Asset
     * @param {string} [args.units] Units of output
     * @param {Object} [args.unitOptions={}] Options passed to unit formatter.
     * @return {Promise<number|*>}
     */
    async totalAssetBalance({asset, units, unitOptions}={}) {
        asset = this.getAsset(asset);

        return CaskUnits.formatUnits({
            amount: await this.CaskVault.totalAssetBalance(asset.address),
            asset,
            units: units || this.options.defaultUnits,
            unitOptions: unitOptions || this.options.defaultUnitOptions,
        });
    }

    /**
     * Calculate the number of shares that represent specified amount in the vault.
     *
     * @see The SDK guide for more details on unit formatting at {@link https://docs.cask.fi/developer-docs/javascript-sdk}
     * @param {Object} args Function arguments
     * @param {Vault.Asset|string} [args.asset=baseAsset] Asset
     * @param {float} [args.amountSimple] Amount in float format
     * @param {string} [args.amountAsset] Amount in asset decimals format
     * @return {Promise<string>}
     */
    async sharesForAmount({asset, amountSimple, amountAsset}) {
        asset = this.getAsset(asset || this.baseAsset);

        amountAsset = this.amountInAsset({asset, amountSimple, amountAsset});
        if (asset.address !== this.baseAsset.address) {
            amountAsset = await this.convertAmount({
                asset,
                toAsset: this.baseAsset,
                amountAsset,
                units: CaskUnits.ASSET
            });
        }

        const pricePerShare = await this.CaskVault.pricePerShare();

        return ethers.BigNumber.from(amountAsset.toString())
            .mul(ethers.BigNumber.from(10).pow(this.baseAsset.assetDecimals))
            .div(pricePerShare).toString();
    }

    /**
     * Quote how much vault value will be given for depositing the specified amount of a given asset.
     *
     * @see The SDK guide for more details on unit formatting at {@link https://docs.cask.fi/developer-docs/javascript-sdk}
     * @param {Object} args Function arguments
     * @param {Vault.Asset|string} args.asset Asset
     * @param {float} [args.amountSimple] Amount in float format
     * @param {string} [args.amountAsset] Amount in asset decimals format
     * @param {string} [args.units] Units of output
     * @param {Object} [args.unitOptions={}] Options passed to unit formatter.
     * @return {Promise<number|*>}
     */
    async quoteDeposit({asset, amountSimple, amountAsset, units, unitOptions}) {
        asset = this.getAsset(asset);

        amountAsset = this.amountInAsset({asset, amountSimple, amountAsset});

        let toAmount = ethers.BigNumber.from(await this.convertAmount({
            asset,
            toAsset: this.baseAsset,
            amountAsset,
            units: CaskUnits.ASSET,
        }));

        if (asset.slippageBps.gt(0)) {
            toAmount = toAmount.sub(toAmount.mul(asset.slippageBps).div(10000));
        }

        return CaskUnits.formatUnits({
            amount: toAmount,
            asset: this.baseAsset,
            units: units || this.options.defaultUnits,
            unitOptions: unitOptions || this.options.defaultUnitOptions,
        });
    }

    /**
     * Quote how much of the specified asset will be given for withdrawing an amount of value from the vault.
     *
     * @see The SDK guide for more details on unit formatting at {@link https://docs.cask.fi/developer-docs/javascript-sdk}
     * @param {Object} args Function arguments
     * @param {Vault.Asset|string} args.asset Asset
     * @param {float} [args.amountSimple] Amount in float format
     * @param {string} [args.amountAsset] Amount in asset decimals format
     * @param {string} [args.units] Units of output
     * @param {Object} [args.unitOptions={}] Options passed to unit formatter.
     * @return {Promise<number|*>}
     */
    async quoteWithdrawal({asset, amountSimple, amountAsset, units, unitOptions}) {
        asset = this.getAsset(asset);

        amountAsset = this.amountInAsset({asset: this.baseAsset, amountSimple, amountAsset});

        if (asset.slippageBps.gt(0)) {
            amountAsset = ethers.BigNumber.from(amountAsset);
            amountAsset = amountAsset.sub(amountAsset.mul(asset.slippageBps).div(10000));
        }

        let toAmount = await this.convertAmount({
            asset: this.baseAsset,
            toAsset: asset,
            amountAsset,
            units: CaskUnits.ASSET,
        });
        toAmount = ethers.BigNumber.from(toAmount);

        return CaskUnits.formatUnits({
            amount: toAmount,
            asset,
            units: units || this.options.defaultUnits,
            unitOptions: unitOptions || this.options.defaultUnitOptions,
        });
    }

    /**
     * Convert an amount from one vault asset into another asset using oracle price feeds.
     *
     * @see The SDK guide for more details on unit formatting at {@link https://docs.cask.fi/developer-docs/javascript-sdk}
     * @param {Object} args Function arguments
     * @param {Vault.Asset|string} args.asset Asset being converted
     * @param {Vault.Asset|string} args.toAsset Asset the amount is being converted into
     * @param {float} [args.amountSimple] Amount in float format
     * @param {string} [args.amountAsset] Amount in asset decimals format
     * @param {string} [args.units] Units of output
     * @param {Object} [args.unitOptions={}] Options passed to unit formatter.
     * @return {Promise<number|*>}
     */
    async convertAmount({asset, toAsset, amountSimple, amountAsset, units, unitOptions}) {
        asset = this.getAsset(asset);
        toAsset = this.getAsset(toAsset);

        amountAsset =
            ethers.BigNumber.from(this.amountInAsset({asset, amountSimple, amountAsset}));

        const fromOracleData = await this.currentPrice(asset);
        const toOracleData = await this.currentPrice(toAsset);

        let toAmount;

        if (asset.priceFeedDecimals !== toAsset.priceFeedDecimals) {
            // since oracle precision is different, scale everything
            // to toAsset precision and do conversion
            toAmount = CaskUnits.scalePrice(amountAsset, asset.assetDecimals, toAsset.assetDecimals)
                .mul(CaskUnits.scalePrice(fromOracleData.price, asset.priceFeedDecimals, toAsset.assetDecimals))
                .div(CaskUnits.scalePrice(toOracleData.price, toAsset.priceFeedDecimals, toAsset.assetDecimals))
                .toString();
        } else {
            // oracles are already in same precision, so just scale fromAmountAssetDecimals to oracle precision,
            // do the price conversion and convert back to toAsset precision
            toAmount = CaskUnits.scalePrice(
                CaskUnits.scalePrice(amountAsset, asset.assetDecimals, toAsset.priceFeedDecimals)
                    .mul(fromOracleData.price).div(toOracleData.price),
                toAsset.priceFeedDecimals,
                toAsset.assetDecimals)
                .toString();
        }
        return CaskUnits.formatUnits({
            amount: toAmount,
            asset: toAsset,
            units: units || this.options.defaultUnits,
            unitOptions: unitOptions || this.options.defaultUnitOptions,
        });
    }

    async currentPrice(asset) {
        asset = this.getAsset(asset);

        const chainInfo = chains.lookupChain(this.ethersConnection.chainId);
        const oracleType = this.options?.oracleType || chainInfo?.oracleType || 'chainlink';

        if (oracleType === 'band') {
            return this.currentPriceBand(asset);
        }

        if (!this.assetPriceFeed[asset.address]) {
            this.assetPriceFeed[asset.address] = contracts.AggregatorV3Interface({
                priceFeed: asset.priceFeed,
                ethersConnection: this.ethersConnection,
            });
        }

        const oracleDecimals = await this.assetPriceFeed[asset.address].decimals();
        const oracleResult = await this.assetPriceFeed[asset.address].latestRoundData();
        return {
            updatedAt: oracleResult.updatedAt,
            price: oracleResult.answer,
            decimals: oracleDecimals,
        };
    }

    async currentPriceBand(asset) {
        asset = this.getAsset(asset);


        const bandOracle = contracts.IStdReference({
            referenceAddress: asset.priceFeed,
            ethersConnection: this.ethersConnection,
        });

        const bandAssetSymbol = asset.symbol.replace(/\.[^.]+$/, "").toUpperCase();

        const oracleResult = await bandOracle.getReferenceData(bandAssetSymbol, "USD");
        return {
            updatedAt: oracleResult.lastUpdatedBase,
            price: oracleResult.rate,
            decimals: 18,
        };
    }

    /**
     * Format the specified amount into the native format of the specified asset.
     *
     * @param {Object} args Function arguments
     * @param {Vault.Asset|string} args.asset Asset
     * @param {float} [args.amountSimple] Amount in float format
     * @param {string} [args.amountAsset] Amount in asset decimals format
     * @return {string}
     */
    amountInAsset({asset, amountSimple, amountAsset}) {
        asset = this.getAsset(asset);

        if (!amountSimple && !amountAsset) {
            throw new Error("Must specify amount in either amountSimple or amountAsset");
        }
        if (amountAsset) {
            return amountAsset.toString();
        } else {
            return ethers.utils.parseUnits(CaskUnits.roundDown(amountSimple).toFixed(2), asset.assetDecimals).toString();
        }
    }

}

export default Vault;