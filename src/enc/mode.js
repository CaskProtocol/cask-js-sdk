/**
 * Private data encryption modes
 *
 * @namespace CaskSDK.enc.mode
 */

/**
 * @enum
 * @memberOf CaskSDK.enc.mode
 */
const mode = {
    /**
     * Data is only available to original subscription creator and the service provider.
     */
    PRIVATE: 'private',

    /**
     * Data is available to current subscription NFT owner and the service provider.
     */
    TRANSFERRABLE: 'transferrable',

    /**
     * Data is available only to the service provider.
     */
    PROVIDER: 'provider',
}

export default mode;