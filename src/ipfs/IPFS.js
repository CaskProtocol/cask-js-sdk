import providers from "./providers.js";
import pinataSDK from "@pinata/sdk";
import fetch from "cross-fetch";

/**
 * Represents a connection to an IPFS service for both saving (pinning) and reading data.
 *
 * @namespace CaskSDK.ipfs
 */

/**
 * @memberOf CaskSDK.ipfs
 */
class IPFS {

    /**
     * Create an instance of the IPFS service.
     *
     * @param options See CaskSDK "ipfs" configuration.
     */
    constructor(options={}) {
        this.ipfsProvider = options.ipfsProvider || providers.NONE;
        this.ipfsGateway = options.ipfsGateway || 'https://ipfs.cask.fi/ipfs';

        if (options.pinataApiKey && options.pinataApiSecret) {
            this.ipfsProvider = providers.PINATA;
        }

        switch (this.ipfsProvider) {
            case providers.NONE:
                break;
            case providers.PINATA:
                this.pinata = pinataSDK(options.pinataApiKey, options.pinataApiSecret);
                break;
            default:
                throw('Invalid IPFS provider: ' + this.ipfsProvider);
        }

    }

    async _savePinata(data) {
        return new Promise((resolve, reject) => {
            this.pinata.pinJSONToIPFS(data).then((result) => {
                resolve(result.IpfsHash);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    /**
     * Pin data to IPFS using the configured provider.
     * @param {Object} data Data to pin. Will be serialized to JSON.
     */
    async save(data) {
        switch (this.ipfsProvider) {
            case providers.PINATA:
                return this._savePinata(data);
        }
    }

    /**
     * Load an IPFS CID using the configured IPFS gateway.
     * @param cid CID to load
     * @return {Promise<Object>}
     */
    async load(cid) {
        return new Promise((resolve, reject) => {
            fetch(`${this.ipfsGateway}/${cid}`)
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }

}

export default IPFS;