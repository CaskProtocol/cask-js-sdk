import { ethers } from "ethers";
import LitSDK from "lit-js-sdk";
import chains from "../core/chains.js";
import deployments from "../core/deployments.js";
import providers from "./providers.js";
import mode from "./mode.js";

const LIT_AUTH_MESSAGE = "Cask Protocol Data Access";

/**
 * Handle data encryption for data attached to a subscription. Data can be `private`, which means it does not
 * transfer to a new owner if the subscription is transferred, or `transferrable` which means the new
 * owner of a subscription will be able to access the data.
 *
 * @memberOf CaskSDK.enc
 */
class SecureData {
  constructor(options={}) {
    this.options = options;

    this.encProvider = this.options.encProvider || providers.NONE;

    switch (this.encProvider) {
      case providers.NONE:
        break;
      case providers.LIT:
        this.lit = new LitSDK.LitNodeClient({
          alertWhenUnauthorized: false,
          ...this.options?.litOptions,
        });
        break;
      default:
        throw "Invalid encryption provider: " + this.encProvider;
    }
  }

  async init({ ethersConnection }) {
    this.ethersConnection = ethersConnection;

    switch (this.encProvider) {
      case providers.LIT:
        await this.lit.connect();
    }
  }

  async generateAuthSig({ signer, message } = {}) {
    if (!signer) {
      signer = this.ethersConnection.signer;
    }
    if (!signer) {
      throw new Error("Cannot generate authsig without signer");
    }
    if (!message) {
      message = LIT_AUTH_MESSAGE;
    }
    return {
      signature: await signer.signMessage(message),
      message: message,
      address: signer.address,
    };
  }

  encryptData({
    subscriptionId,
    consumer,
    provider,
    data,
    privacy = mode.PRIVATE,
    authSig = {},
  }) {
    switch (this.encProvider) {
      case providers.LIT:
        return this.litEncryptData({
          subscriptionId,
          consumer,
          provider,
          data,
          privacy,
          authSig,
        });
    }
  }

  decryptData({
    subscriptionId,
    consumer,
    provider,
    encData,
    privacy = mode.PRIVATE,
    authSig = {},
  }) {
    switch (this.encProvider) {
      case providers.LIT:
        return this.litDecryptData({
          subscriptionId,
          consumer,
          provider,
          encData,
          privacy,
          authSig,
        });
    }
  }

  async litEncryptData({
    subscriptionId,
    consumer,
    provider,
    data,
    privacy = mode.PRIVATE,
    authSig = {},
  }) {
    const chainInfo = chains.lookupChain(this.ethersConnection.chainId);
    if (!chainInfo?.litName) {
      throw new Error(`LIT data decryption not supported on current chain ${this.ethersConnection.chainId}`);
    }
    if (!this.ethersConnection.signer) {
      throw new Error("Cannot perform encryption without signer");
    }

    let litAuthSig;
    if (authSig?.signature) {
      litAuthSig = {
        sig: authSig.signature,
        derivedVia: "web3.eth.personal.sign",
        signedMessage: authSig.message || LIT_AUTH_MESSAGE,
        address: authSig.address,
      };
    } else {
      litAuthSig = {
        sig: await this.ethersConnection.signMessage(LIT_AUTH_MESSAGE),
        derivedVia: "web3.eth.personal.sign",
        signedMessage: LIT_AUTH_MESSAGE,
        address: this.ethersConnection.signer.address,
      };
    }

    let accessControlConditions;
    if (privacy === mode.PRIVATE) {
      accessControlConditions = this.litACCPrivate(
        chainInfo.litName,
        consumer,
        provider
      );
    } else if (privacy === mode.TRANSFERRABLE) {
      accessControlConditions = this.litACCTransferrable(
        chainInfo.litName,
        subscriptionId,
        provider
      );
    }

    try {
      const { encryptedString, symmetricKey } = await LitSDK.encryptString(JSON.stringify(data));

      const encryptedSymmetricKey = await this.lit.saveEncryptionKey({
        accessControlConditions,
        symmetricKey,
        chain: chainInfo.litName,
        authSig: litAuthSig,
      });

      return {
        encryptedData: ethers.utils.hexlify(new Uint8Array(await encryptedString.arrayBuffer())),
        encryptedKey: ethers.utils.hexlify(encryptedSymmetricKey),
      };
    } catch (err) {
      throw new Error("Unable to encrypt data: " + err);
    }
  }

  async litDecryptData({
    subscriptionId,
    consumer,
    provider,
    encData,
    privacy = mode.PRIVATE,
    authSig = {},
  }) {
    const chainInfo = chains.lookupChain(this.ethersConnection.chainId);
    if (!chainInfo?.litName) {
      throw new Error(`LIT data decryption not supported on current chain ${this.ethersConnection.chainId}`);
    }
    if (!this.ethersConnection.signer) {
      throw new Error("Cannot perform decryption without signer");
    }

    let litAuthSig;
    if (authSig?.signature) {
      litAuthSig = {
        sig: authSig.signature,
        derivedVia: "web3.eth.personal.sign",
        signedMessage: authSig.message || LIT_AUTH_MESSAGE,
        address: authSig.address,
      };
    } else {
      litAuthSig = {
        sig: await this.ethersConnection.signMessage(LIT_AUTH_MESSAGE),
        derivedVia: "web3.eth.personal.sign",
        signedMessage: LIT_AUTH_MESSAGE,
        address: this.ethersConnection.signer.address,
      };
    }

    let accessControlConditions;
    if (privacy === mode.PRIVATE) {
      accessControlConditions = this.litACCPrivate(
        chainInfo.litName,
        consumer,
        provider
      );
    } else if (privacy === mode.TRANSFERRABLE) {
      accessControlConditions = this.litACCTransferrable(
        chainInfo.litName,
        subscriptionId,
        provider
      );
    }

    try {
      const symmetricKey = await this.lit.getEncryptionKey({
        accessControlConditions,
        toDecrypt: encData.encryptedKey.substring(2), // strip leading '0x'
        chain: chainInfo.litName,
        authSig: litAuthSig,
      });

      const decryptedString = await LitSDK.decryptString(
        new Blob([ethers.utils.arrayify(encData.encryptedData).buffer]),
        symmetricKey
      );

      return JSON.parse(decryptedString);
    } catch (err) {
      throw new Error("Unable to decrypt data: " + err);
    }
  }

  litACCPrivate(chain, consumer, provider) {
    return [
      {
        contractAddress: "",
        standardContractType: "",
        chain,
        method: "",
        parameters: [":userAddress"],
        returnValueTest: {
          comparator: "=",
          value: consumer,
        },
      },
      { operator: "or" },
      {
        contractAddress: "",
        standardContractType: "",
        chain,
        method: "",
        parameters: [":userAddress"],
        returnValueTest: {
          comparator: "=",
          value: provider,
        },
      },
    ];
  }

  litACCTransferrable(chain, subscriptionId, provider) {
    const caskSubscriptions =
      deployments.CaskSubscriptions[this.ethersConnection.environment][
        this.ethersConnection.chainId
      ];
    return [
      {
        contractAddress: caskSubscriptions,
        standardContractType: "ERC721",
        chain,
        method: "ownerOf",
        parameters: [ethers.BigNumber.from(subscriptionId).toString()],
        returnValueTest: {
          comparator: "=",
          value: ":userAddress",
        },
      },
      { operator: "or" },
      {
        contractAddress: "",
        standardContractType: "",
        chain,
        method: "",
        parameters: [":userAddress"],
        returnValueTest: {
          comparator: "=",
          value: provider,
        },
      },
    ];
  }
}

export default SecureData;
