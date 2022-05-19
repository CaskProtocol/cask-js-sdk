import { ethers } from 'ethers';
import numeral from 'numeral';

/**
 * Units helpers and utilities
 *
 * @namespace CaskSDK.units
 */

const hour = 3600;
const day = 24 * hour;
const week = day * 7;
const month = (365/12) * day;
const year = month * 12;

const caskUnits = {
    SIMPLE: 'simple',
    NUMERAL: 'numeral',
    ASSET: 'asset_decimals',
};

/**
 * Asset decimals used by Cask base asset
 * @memberOf CaskSDK.units
 * @type {number}
 */
const BASE_ASSET_DECIMALS = 6;


const DEFAULT_FORMAT = caskUnits.SIMPLE;
const DEFAULT_NUMERAL_FORMAT = '0.00a';

/**
 * Format an amount of an asset. If no units are supplied. uses the globally configured default units from the SDK
 * initialization.
 *
 * @see The SDK guide for more details on unit formatting at {@link https://docs.cask.fi/developer-docs/javascript-sdk}
 * @memberOf CaskSDK.units
 * @param {Object} args Function arguments
 * @param {BigNumber|number|string} args.amount Amount to format
 * @param {Asset} [args.asset] Asset being formatted
 * @param {number} [args.decimals] Number of decimals for asset formatting. If not supplied, uses assetDecimals from the specified asset.
 * @param {string} [args.units] Units of output
 * @param {Object} [args.unitOptions={}] Options passed to unit formatter.
 * @return {string|number|*}
 */
function formatUnits({amount, asset, decimals, units, unitOptions={}}) {
    units = units || DEFAULT_FORMAT;
    if (!decimals) {
        decimals = asset.assetDecimals;
    }
    if (units === caskUnits.SIMPLE) {
        return parseFloat(ethers.utils.formatUnits(amount, decimals));
    } else if (units === caskUnits.NUMERAL) {
        let roundingFunction;
        if (unitOptions.roundDown) {
            roundingFunction = Math.floor;
        } else if (unitOptions.roundUp) {
            roundingFunction = Math.ceil;
        }
        return numeral(parseFloat(ethers.utils.formatUnits(amount, decimals)))
            .format(unitOptions.format || DEFAULT_NUMERAL_FORMAT, roundingFunction);
    } else if (units === caskUnits.ASSET) {
        return amount.toString();
    }
}

/**
 * Format an amount from a price feed. If no units are supplied. uses the globally configured default units from the SDK
 * initialization.
 *
 * @see The SDK guide for more details on unit formatting at {@link https://docs.cask.fi/developer-docs/javascript-sdk}
 * @memberOf CaskSDK.units
 * @param {Object} args Function arguments
 * @param {BigNumber|number|string} args.amount Amount to format
 * @param {Asset} [args.asset] Asset being formatted
 * @param {number} [args.decimals] Number of decimals for asset formatting. If not supplied, uses priceFeedDecimals from the specified asset.
 * @param {string} [args.units] Units of output
 * @param {Object} [args.unitOptions={}] Options passed to unit formatter.
 * @return {string|number|*}
 */
function formatFeedUnits({amount, asset, decimals, units, unitOptions={}}) {
    units = units || DEFAULT_FORMAT;
    if (!decimals) {
        decimals = asset.priceFeedDecimals;
    }
    if (units === caskUnits.SIMPLE) {
        return parseFloat(ethers.utils.formatUnits(amount, decimals));
    } else if (units === caskUnits.NUMERAL) {
        return numeral(parseFloat(ethers.utils.formatUnits(amount, decimals)))
            .format(unitOptions.format || DEFAULT_NUMERAL_FORMAT);
    } else if (units === caskUnits.ASSET) {
        return amount.toString();
    }
}

/**
 * Drop all but the specified digits from a floating point value.
 * @memberOf CaskSDK.units
 * @param amount Amount
 * @param digits Number of decimals to keep
 * @return {number}
 */
function roundDown(amount, digits=2) {
    return Math.floor(amount * (10**digits)) / (10**digits);
}

/**
 * Return human-friendly wording for a given period specified in seconds
 * @memberOf CaskSDK.units
 * @param seconds {number} Period in seconds
 * @return {string}
 */
function humanizePeriod(seconds) {
    if (seconds % year === 0) {
        const n = seconds / year;
        return n > 1 ? n + ' years' : 'year';
    } else if (seconds % month === 0) {
        const n = seconds / month;
        return n > 1 ? n + ' months' : 'month';
    } else if (seconds % week === 0) {
        const n = seconds / week;
        return n > 1 ? n + ' weeks' : 'week';
    } else if (seconds % week === 0) {
        const n = seconds / week;
        return n > 1 ? n + ' weeks' : 'week';
    } else if (seconds % day === 0) {
        const n = seconds / day;
        return n > 1 ? n + ' days' : 'day';
    } else if (seconds % hour === 0) {
        const n = seconds / hour;
        return n > 1 ? n + ' hours' : 'hour';
    }
    return seconds + ' seconds';
}

/**
 * Scale an amount between two different decimal formats
 * @memberOf CaskSDK.units
 * @param amount Amount to scale
 * @param amountDecimals Number of decimals to scale from
 * @param toDecimals Number of decimals to scale to
 * @return {BigNumber}
 */
function scalePrice(amount, amountDecimals, toDecimals) {
    if (amountDecimals < toDecimals) {
        return amount.mul(ethers.BigNumber.from(10).pow(toDecimals - amountDecimals));
    } else if (amountDecimals > toDecimals) {
        return amount.div(ethers.BigNumber.from(10).pow(amountDecimals - toDecimals));
    }
    return amount;
}

export default {
    ...caskUnits,
    BASE_ASSET_DECIMALS,
    DEFAULT_FORMAT,
    roundDown,
    formatUnits,
    formatFeedUnits,
    scalePrice,
    humanizePeriod,
    period: {
        year,
        month,
        week,
        day,
        hour
    },
}