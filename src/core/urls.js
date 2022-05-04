import environments from "./environments.js";

/**
 * Cask URLs for each environment.
 *
 * @example
 * CaskSDK.urls.appUrl[CaskSDK.environments.TESTNET]
 *
 * @namespace CaskSDK.urls
 */

/**
 * Map of url type/environment to the URL.
 * @enum
 * @memberOf CaskSDK.urls
 */
const urls = {

    /**
     * App URLs
     */
    appUrl: {
        [environments.DEVELOPMENT]: `http://localhost:${ process.env.CASK_APP_PORT || '3000' }`,
        [environments.PRODUCTION]: 'https://app.cask.fi',
        [environments.TESTNET]: 'https://app.testnet.cask.fi',
        [environments.INTERNAL]: 'https://app.internal.cask.fi',
    },
    /**
     * Javascript URLs
     */
    jsUrl: {
        [environments.DEVELOPMENT]: `http://localhost:${ process.env.CASK_APP_PORT || '3000' }/js/index.js`,
        [environments.PRODUCTION]: 'https://js.cask.fi/v1/index.js',
        [environments.TESTNET]: 'https://js.testnet.cask.fi/v1/index.js',
        [environments.INTERNAL]: 'https://js.internal.cask.fi/v1/index.js',
    }
}

export default urls;