export default {
  "_format": "hh-sol-artifact-1",
  "contractName": "ICaskSubscriptions",
  "sourceName": "contracts/interfaces/ICaskSubscriptions.sol",
  "abi": [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "consumer",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "provider",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "subscriptionId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "ref",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint32",
          "name": "planId",
          "type": "uint32"
        }
      ],
      "name": "SubscriptionCanceled",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "consumer",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "provider",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "subscriptionId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "ref",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint32",
          "name": "prevPlanId",
          "type": "uint32"
        },
        {
          "indexed": false,
          "internalType": "uint32",
          "name": "planId",
          "type": "uint32"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "discountId",
          "type": "bytes32"
        }
      ],
      "name": "SubscriptionChangedPlan",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "consumer",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "provider",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "subscriptionId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "ref",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint32",
          "name": "planId",
          "type": "uint32"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "discountId",
          "type": "bytes32"
        }
      ],
      "name": "SubscriptionCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "consumer",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "provider",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "subscriptionId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "ref",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint32",
          "name": "planId",
          "type": "uint32"
        }
      ],
      "name": "SubscriptionPastDue",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "consumer",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "provider",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "subscriptionId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "ref",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint32",
          "name": "planId",
          "type": "uint32"
        }
      ],
      "name": "SubscriptionPaused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "consumer",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "provider",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "subscriptionId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "ref",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint32",
          "name": "planId",
          "type": "uint32"
        },
        {
          "indexed": false,
          "internalType": "uint32",
          "name": "cancelAt",
          "type": "uint32"
        }
      ],
      "name": "SubscriptionPendingCancel",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "consumer",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "provider",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "subscriptionId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "ref",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint32",
          "name": "prevPlanId",
          "type": "uint32"
        },
        {
          "indexed": false,
          "internalType": "uint32",
          "name": "planId",
          "type": "uint32"
        }
      ],
      "name": "SubscriptionPendingChangePlan",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "consumer",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "provider",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "subscriptionId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "ref",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint32",
          "name": "planId",
          "type": "uint32"
        }
      ],
      "name": "SubscriptionPendingPause",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "consumer",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "provider",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "subscriptionId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "ref",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint32",
          "name": "planId",
          "type": "uint32"
        }
      ],
      "name": "SubscriptionRenewed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "consumer",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "provider",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "subscriptionId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "ref",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint32",
          "name": "planId",
          "type": "uint32"
        }
      ],
      "name": "SubscriptionResumed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "consumer",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "provider",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "subscriptionId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "ref",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint32",
          "name": "planId",
          "type": "uint32"
        }
      ],
      "name": "SubscriptionTrialEnded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_subscriptionId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_dataCid",
          "type": "string"
        }
      ],
      "name": "attachData",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_subscriptionId",
          "type": "uint256"
        },
        {
          "internalType": "uint32",
          "name": "_cancelAt",
          "type": "uint32"
        }
      ],
      "name": "cancelSubscription",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_subscriptionId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_nonce",
          "type": "uint256"
        },
        {
          "internalType": "bytes32[]",
          "name": "_planProof",
          "type": "bytes32[]"
        },
        {
          "internalType": "bytes32[]",
          "name": "_discountProof",
          "type": "bytes32[]"
        },
        {
          "internalType": "bytes",
          "name": "_providerSignature",
          "type": "bytes"
        },
        {
          "internalType": "string",
          "name": "_cid",
          "type": "string"
        }
      ],
      "name": "changeSubscriptionPlan",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_nonce",
          "type": "uint256"
        },
        {
          "internalType": "bytes32[]",
          "name": "_planProof",
          "type": "bytes32[]"
        },
        {
          "internalType": "bytes32[]",
          "name": "_discountProof",
          "type": "bytes32[]"
        },
        {
          "internalType": "bytes32",
          "name": "_networkData",
          "type": "bytes32"
        },
        {
          "internalType": "uint32",
          "name": "_cancelAt",
          "type": "uint32"
        },
        {
          "internalType": "bytes",
          "name": "_providerSignature",
          "type": "bytes"
        },
        {
          "internalType": "bytes",
          "name": "_networkSignature",
          "type": "bytes"
        },
        {
          "internalType": "string",
          "name": "_cid",
          "type": "string"
        }
      ],
      "name": "createNetworkSubscription",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_nonce",
          "type": "uint256"
        },
        {
          "internalType": "bytes32[]",
          "name": "_planProof",
          "type": "bytes32[]"
        },
        {
          "internalType": "bytes32[]",
          "name": "_discountProof",
          "type": "bytes32[]"
        },
        {
          "internalType": "uint32",
          "name": "_cancelAt",
          "type": "uint32"
        },
        {
          "internalType": "bytes",
          "name": "_providerSignature",
          "type": "bytes"
        },
        {
          "internalType": "string",
          "name": "_cid",
          "type": "string"
        }
      ],
      "name": "createSubscription",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_consumer",
          "type": "address"
        }
      ],
      "name": "getConsumerSubscriptionCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_consumer",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "limit",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "offset",
          "type": "uint256"
        }
      ],
      "name": "getConsumerSubscriptions",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_subscriptionId",
          "type": "uint256"
        }
      ],
      "name": "getPendingPlanChange",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_provider",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "_includeCanceled",
          "type": "bool"
        },
        {
          "internalType": "uint32",
          "name": "_planId",
          "type": "uint32"
        }
      ],
      "name": "getProviderSubscriptionCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_provider",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "limit",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "offset",
          "type": "uint256"
        }
      ],
      "name": "getProviderSubscriptions",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_subscriptionId",
          "type": "uint256"
        }
      ],
      "name": "getSubscription",
      "outputs": [
        {
          "components": [
            {
              "internalType": "bytes32",
              "name": "planData",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "networkData",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "discountId",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "discountData",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "ref",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "provider",
              "type": "address"
            },
            {
              "internalType": "enum ICaskSubscriptions.SubscriptionStatus",
              "name": "status",
              "type": "uint8"
            },
            {
              "internalType": "uint32",
              "name": "planId",
              "type": "uint32"
            },
            {
              "internalType": "uint32",
              "name": "createdAt",
              "type": "uint32"
            },
            {
              "internalType": "uint32",
              "name": "renewAt",
              "type": "uint32"
            },
            {
              "internalType": "uint32",
              "name": "minTermAt",
              "type": "uint32"
            },
            {
              "internalType": "uint32",
              "name": "cancelAt",
              "type": "uint32"
            },
            {
              "internalType": "string",
              "name": "cid",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "dataCid",
              "type": "string"
            }
          ],
          "internalType": "struct ICaskSubscriptions.Subscription",
          "name": "subscription",
          "type": "tuple"
        },
        {
          "internalType": "address",
          "name": "currentOwner",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_subscriptionId",
          "type": "uint256"
        },
        {
          "internalType": "enum ICaskSubscriptions.ManagerCommand",
          "name": "_command",
          "type": "uint8"
        }
      ],
      "name": "managerCommand",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_subscriptionId",
          "type": "uint256"
        }
      ],
      "name": "pauseSubscription",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_subscriptionId",
          "type": "uint256"
        }
      ],
      "name": "resumeSubscription",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "_approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "linkReferences": {},
  "deployedLinkReferences": {}
}
