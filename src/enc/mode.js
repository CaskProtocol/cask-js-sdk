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
     * Data is only available to original subscription creator.
     */
    PRIVATE: 'private',

    /**
     * Data is available to current subscription NFT owner.
     */
    TRANSFERRABLE: 'transferrable',
}

export default mode;