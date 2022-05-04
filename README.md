# Overview

The Cask SDK is a lower level API for interacting with the [Cask Protocol](https://www.cask.fi) using javascript.

For a simple to use, fully functional checkout widget, see the [Cask Widgets](https://github.com/CaskProtocol/cask-widgets) repository.

# Installation

```shell
npm install --save @caskprotocol/sdk

# OR

yarn add @caskprotocol/sdk
```

# Setup

```javascript
// require
const { CaskSDK } = require('@caskprotocol/sdk');

// modules
import { CaskSDK } from '@caskprotocol/sdk';
```

# Usage

## Quick Start

```javascript

import { CaskSDK } from '@caskprotocol/sdk';

// setup cask instance using web3 connections provided by the signer 
const cask = new CaskSDK({
    environment: CaskSDK.environments.TESTNET,
    connections: {
        signer: web3Provider,
    },
    ipfs: {
        pinataApiKey: process.env.PINATA_API_KEY,
        pinataApiSecret: process.env.PINATA_API_SECRET,
    }
});

// initialize cask connections to the default chain for the testnet
await cask.init();

// show current balance of spendable USDC in Cask 
console.log(`Current Cask balance: ${await cask.vault.balance()}`);

// deposit 100 USDC to Cask balance
await cask.vault.approveAndDeposit({asset: 'USDC', amountSimple: 100});


const providerAddress = '0x....';
const planId = 12345;

const providerProfile = await cask.subscriptionPlans.loadProfile({address: providerAddress});
const planInfo = providerProfile.getPlan(planId);

console.log(`Subscribing to plan ${planInfo.name}`)


// subscribe to the specified service provider's plan 12345
const resp = await cask.subscriptions.create({provider: providerAddress, planId});
console.log(`Created subscription ${resp.subscriptionId}`);

cask.stop();

```


## Static Utilities

The `CaskSDK` is both a constructor that creates a stateful instance to the set of Cask functionality as well as a namespaced set of utilities and helpers.

The full details of the various helpers and utilities be found in the [SDK reference](https://caskprotocol.github.io/cask-js-sdk/). 
Each namespace below is a link to the reference documentation for that helper/utility.


| Name                                                                                           |                                              Description                                               |
|------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------:|
| [CaskSDK.abi](https://caskprotocol.github.io/cask-js-sdk/CaskSDK.abi.html)                     |                                 Access the various Cask contract ABIs                                  |
| [CaskSDK.chains](https://caskprotocol.github.io/cask-js-sdk/CaskSDK.chains.html)               |                  Information about the various chains supported by the Cask protocol                   |
| [CaskSDK.defaultChains](https://caskprotocol.github.io/cask-js-sdk/CaskSDK.defaultChains.html) | Contains the map of which chains are supported in the various enviroments (testnet, production, etc..) |
| [CaskSDK.deployments](https://caskprotocol.github.io/cask-js-sdk/CaskSDK.deployments.html)     |         Contains the addresses of the Cask protocol contracts on a given environment and chain         |
| [CaskSDK.environments](https://caskprotocol.github.io/cask-js-sdk/CaskSDK.environments.html)   |                                       Cask protocol environments                                       |
| [CaskSDK.units](https://caskprotocol.github.io/cask-js-sdk/CaskSDK.units.html)                 |                    Utilities and constants that represent financial unit formatting                    |
| [CaskSDK.contracts](https://caskprotocol.github.io/cask-js-sdk/CaskSDK.contracts.html)         |           Helpers to create ethers.Contract instances of the various Cask protocol contracts           |
| [CaskSDK.enc](https://caskprotocol.github.io/cask-js-sdk/CaskSDK.env.html)                     |                                            Data encryption                                             |
| [CaskSDK.ipfs](https://caskprotocol.github.io/cask-js-sdk/CaskSDK.ipfs.html)                   |                                          IPFS reading/writing                                          |
| [CaskSDK.utils](https://caskprotocol.github.io/cask-js-sdk/CaskSDK.utils.html)                 |                         Low level utilities such as data encoding and signing                          |


## Configuration

The top-level `CaskSDK` instance accepts a configuration object that is shared among all the provided services. This is also where
the blockchain connections are established including the read-only and read-write (for sending txns) and websockets (for event listeners)
are configured.

The top-level configuration keys are:

| Name         |                         Description                         |
|--------------|:-----------------------------------------------------------:|
| environment  | Which Cask environment to run in (testnet, production, etc) |
| connections  | Ethers/web3 connections for read, read/write and websockets |
| ipfs         |             Configure which IPFS service to use             |
| enc          |          Data encryption configuration (if using)           |
| events       |                Event listener configuration                 |
| prices       |                  Price feed configuration                   |
| defaultUnits |            Default unit formatting configuration            |


### environment

Configure which Cask protocol environment in which to interact.

The `environment` can be one of:
* `CaskSDK.environments.TESTNET`
* `CaskSDK.environments.PRODUCTION`
* `CaskSDK.environments.DEVELOPMENT`

### connections

`connections` has 3 sub-objects with keys `rpc`, `signer` and `ws` with the value being a map of Chain ID to provider/signer configurations:

```javascript
connections: {
    rpc: ...,
    signer: ...,
    ws:...
}
```

The value for an `rpc` configuration can be a string of an http(s) URL or an instance of an ethers `Provider` such as `ethers.providers.JsonRpcProvider`.

The value for a `signer` configuration must be an ethers `Signer` such as an `ethers.Wallet`.

The value for a `ws` (websocket) configuration should be a string to a wss URL. The `ws` entries are only required if using the `events` service.

If desired, `rpc` can be omitted, and any read-only operations will be done via the `provider` associated with the `signer` instead.

If no `signer` is provided, the SDK will be limited to read-only actions.

Any service method that expects an `address` will use the `signer` instead, if the address is not supplied.

**Example:**

```javascript
connections: {
  rpc: {
    [CaskSDK.chains.POLYGON_MUMBAI.chainId]: process.env.MUMBAI_PROVIDER_URL,
    [CaskSDK.chains.AVAX_TESTNET.chainId]: process.env.FUJI_PROVIDER_URL,
  },
  signer: {
    [CaskSDK.chains.POLYGON_MUMBAI.chainId]: new ethers.Wallet(process.env.WALLET_PK, process.env.MUMBAI_PROVIDER_URL),
    [CaskSDK.chains.AVAX_TESTNET.chainId]: new ethers.Wallet(process.env.WALLET_PK, process.env.FUJI_PROVIDER_URL),
  },
  ws: {
    [CaskSDK.chains.POLYGON_MUMBAI.chainId]: process.env.MUMBAI_WEBSOCKET_URL,
    [CaskSDK.chains.AVAX_TESTNET.chainId]: process.env.FUJI_WEBSOCKET_URL,
  }
}
```


### ipfs

Configure where IPFS read and write operations are performed.

Keys are:

* `ipfsProvider` - Valid values are one from `CaskSDK.ipfs.providers.<PROVIDER>` and defaults to `CaskSDK.ipfs.providers.PINATA`.
* `ipfsGateway` - URL to IPFS gateway used for read operations, with the default being Cask's IPFS gateway.

Any additional configuration items are provider-specific.

**`PINATA` IPFS provider configuration**:

* `pinataApiKey` - Pinata API key
* `pinataApiSecret` - Pinata API secret

**Example:**

```javascript
ipfs: {
  pinataApiKey: process.env.PINATA_API_KEY,
  pinataApiSecret: process.env.PINATA_API_SECRET,
}
```

### enc

TODO...


### events

Configure the event listener.

Keys are:

* `enabled` - [true/false] - Enable/disable the event listener. Default is `false`.
* `debug` - [true/false] - Enable event debugging to console logging. Default is `false`.


### prices

Configure the price/balance service. To enable, configure the `interval`, and all assets in the Cask protocol vault will be 
tracked. See the `cask.prices.balance()` and `cask.prices.usdPrice()` methods to read prices and balances.

Keys are:

* `walletAddress` - Address to perform balance checks on. If not supplied and a `signer` was supplied in the `connections`, the address will be detected from there.
* `interval` - Interval (in ms) in which to refresh prices/balances.
* `priceMaxAge` - Max age (in seconds) for valid price data. If set, and a read is performed on an asset and the last asset price was acquired more than `priceMaxAge` seconds ago, an exception will be raised.


## Units

Any method that accepts an amount or price accepts it with a suffix on the variable name with either:

* `Asset` - Amount is expected to be a string containing the full asset decimals per its ERC-20 configuration
* `Simple` - Expected to be a simple javascript floating point value, irrespective of the ERC-20 decimals.

For example, the `cask.vault.deposit()` method can accept either `amountSimple` or `amountAsset`.

Any method that returns a value can accept two input parameters of `units` and `unitFormat`. The `units` can be one of: 

* `CaskSDK.units.SIMPLE` - Basic floating point representation of values
* `CaskSDK.units.ASSET` - String representation of values with the full decimals as defined by the ERC-20 asset.
* `CaskSDK.units.NUMERAL` - Formatted value using the javascript `numeraljs` package with a default format using abbreviations and 2 decimals.

And the `unitFormat` is dependent on the format type. For `CaskSDK.units.NUMERAL`, the valid parameters are:
* `format` - The `numeraljs` format to use to format the amount. The default can be found in `CaskSDK.units.DEFAULT_NUMERAL_FORMAT`.

**Example:**

```javascript
// deposit 25.75 USDC into vault
cask.vault.deposit({asset: 'USDC', amountSimple: 25.75});

// return balance is NumeralJS string with three decimals and no abbreviation
const currentBalance = await cask.vault.balance({unit: CaskSDK.units.NUMERAL, unitFormat: {format: '0,0.000'}});
```


## Services

The instance returned from instantiating an `CaskSDK` object contains all the services needed to interact with the Cask platform.

The full details of the API of each service can be found in the [SDK reference](https://caskprotocol.github.io/cask-js-sdk/).
Each service below is a link to the reference documentation for that service.

| Name                                                                                    |                                                        Description                                                        |
|-----------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------:|
| [cask.vault](https://caskprotocol.github.io/cask-js-sdk/Vault.html)                     |                           Interact with the Cask vault such as depositing and withdrawing funds                           |
| [cask.subscriptions](https://caskprotocol.github.io/cask-js-sdk/Subscriptions.html)     | Interact with the Cask subscriptions service such as creating a new subscription, canceling an existing subscription, etc |
| [cask.subscriptionPlans](https://caskprotocol.github.io/cask-js-sdk/Subscriptions.html) |           Interact with the Cask subscription plans such as becoming a service provider, setting up plans, etc            |
| [cask.events](https://caskprotocol.github.io/cask-js-sdk/Events.html)                   |                       A service to register event listeners on the various Cask protocol contracts                        |
| [cask.prices](https://caskprotocol.github.io/cask-js-sdk/Prices.html)                   |                                A service to efficiently get asset prices and user balances                                |


# Testing

To run the SDK tests you need to have the Cask contracts running. In addition, you need to fund the test accounts
with the mock stablecoins so they have funds for deposits, subscriptions, etc.

From within the `cask-contracts` repo:
```shell
yarn hardhat node # starts local blockchain running in the foreground

# in another shell, fund the test users with stables
yarn local fund
```

Then from within this repo:
```shell
yarn test
```
