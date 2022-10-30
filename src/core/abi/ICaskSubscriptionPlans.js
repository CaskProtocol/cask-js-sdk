export default {
  "_format": "hh-sol-artifact-1",
  "contractName": "ICaskSubscriptionPlans",
  "sourceName": "contracts/interfaces/ICaskSubscriptionPlans.sol",
  "abi": [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "provider",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint32",
          "name": "planId",
          "type": "uint32"
        }
      ],
      "name": "PlanDisabled",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "provider",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint32",
          "name": "planId",
          "type": "uint32"
        }
      ],
      "name": "PlanEnabled",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "provider",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint32",
          "name": "planId",
          "type": "uint32"
        },
        {
          "indexed": false,
          "internalType": "uint32",
          "name": "retireAt",
          "type": "uint32"
        }
      ],
      "name": "PlanRetired",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "provider",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "paymentAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "nonce",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "cid",
          "type": "string"
        }
      ],
      "name": "ProviderSetProfile",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint32",
          "name": "_planId",
          "type": "uint32"
        }
      ],
      "name": "disablePlan",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint32",
          "name": "_planId",
          "type": "uint32"
        }
      ],
      "name": "enablePlan",
      "outputs": [],
      "stateMutability": "nonpayable",
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
          "internalType": "bytes32",
          "name": "_discountValidator",
          "type": "bytes32"
        }
      ],
      "name": "erc20DiscountCurrentlyApplies",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
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
          "internalType": "uint32",
          "name": "_planId",
          "type": "uint32"
        },
        {
          "internalType": "bytes32",
          "name": "_discountId",
          "type": "bytes32"
        }
      ],
      "name": "getDiscountRedemptions",
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
          "internalType": "uint32",
          "name": "_planId",
          "type": "uint32"
        }
      ],
      "name": "getPlanEOL",
      "outputs": [
        {
          "internalType": "uint32",
          "name": "",
          "type": "uint32"
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
          "internalType": "uint32",
          "name": "_planId",
          "type": "uint32"
        }
      ],
      "name": "getPlanStatus",
      "outputs": [
        {
          "internalType": "enum ICaskSubscriptionPlans.PlanStatus",
          "name": "",
          "type": "uint8"
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
        }
      ],
      "name": "getProviderProfile",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "paymentAddress",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "nonce",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "cid",
              "type": "string"
            }
          ],
          "internalType": "struct ICaskSubscriptionPlans.Provider",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint32",
          "name": "_planId",
          "type": "uint32"
        },
        {
          "internalType": "uint32",
          "name": "_retireAt",
          "type": "uint32"
        }
      ],
      "name": "retirePlan",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_paymentAddress",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_cid",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_nonce",
          "type": "uint256"
        }
      ],
      "name": "setProviderProfile",
      "outputs": [],
      "stateMutability": "nonpayable",
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
          "internalType": "address",
          "name": "_provider",
          "type": "address"
        },
        {
          "internalType": "uint32",
          "name": "_planId",
          "type": "uint32"
        },
        {
          "internalType": "bytes32[]",
          "name": "_discountProof",
          "type": "bytes32[]"
        }
      ],
      "name": "verifyAndConsumeDiscount",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "nonpayable",
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
          "internalType": "address",
          "name": "_provider",
          "type": "address"
        },
        {
          "internalType": "uint32",
          "name": "_planId",
          "type": "uint32"
        },
        {
          "internalType": "bytes32[]",
          "name": "_discountProof",
          "type": "bytes32[]"
        }
      ],
      "name": "verifyDiscount",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_network",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "_networkData",
          "type": "bytes32"
        },
        {
          "internalType": "bytes",
          "name": "_networkSignature",
          "type": "bytes"
        }
      ],
      "name": "verifyNetworkData",
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
          "internalType": "bytes32",
          "name": "_planData",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "_merkleRoot",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32[]",
          "name": "_merkleProof",
          "type": "bytes32[]"
        }
      ],
      "name": "verifyPlan",
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
          "name": "_provider",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_nonce",
          "type": "uint256"
        },
        {
          "internalType": "bytes32",
          "name": "_planMerkleRoot",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "_discountMerkleRoot",
          "type": "bytes32"
        },
        {
          "internalType": "bytes",
          "name": "_providerSignature",
          "type": "bytes"
        }
      ],
      "name": "verifyProviderSignature",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "linkReferences": {},
  "deployedLinkReferences": {}
}