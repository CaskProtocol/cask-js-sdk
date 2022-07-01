export default {
  "_format": "hh-sol-artifact-1",
  "contractName": "ICaskDCA",
  "sourceName": "contracts/interfaces/ICaskDCA.sol",
  "abi": [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "dcaId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "DCACanceled",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "dcaId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "DCACompleted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "dcaId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "inputAsset",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "outputAsset",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "totalAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint32",
          "name": "period",
          "type": "uint32"
        }
      ],
      "name": "DCACreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "dcaId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "DCAPaused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "dcaId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "buyQty",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "fee",
          "type": "uint256"
        }
      ],
      "name": "DCAProcessed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "dcaId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "DCAResumed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "dcaId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "enum ICaskDCA.SkipReason",
          "name": "skipReason",
          "type": "uint8"
        }
      ],
      "name": "DCASkipped",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_dcaId",
          "type": "bytes32"
        }
      ],
      "name": "cancelDCA",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "_assetSpec",
          "type": "address[]"
        },
        {
          "internalType": "bytes32[]",
          "name": "_merkleProof",
          "type": "bytes32[]"
        },
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_totalAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint32",
          "name": "_period",
          "type": "uint32"
        },
        {
          "internalType": "uint256",
          "name": "_slippageBps",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_minPrice",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_maxPrice",
          "type": "uint256"
        }
      ],
      "name": "createDCA",
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
          "internalType": "bytes32",
          "name": "_dcaId",
          "type": "bytes32"
        }
      ],
      "name": "getDCA",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "router",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "priceFeed",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "currentAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "currentQty",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "numBuys",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "numSkips",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "slippageBps",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "maxPrice",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "minPrice",
              "type": "uint256"
            },
            {
              "internalType": "uint32",
              "name": "period",
              "type": "uint32"
            },
            {
              "internalType": "uint32",
              "name": "createdAt",
              "type": "uint32"
            },
            {
              "internalType": "uint32",
              "name": "processAt",
              "type": "uint32"
            },
            {
              "internalType": "enum ICaskDCA.DCAStatus",
              "name": "status",
              "type": "uint8"
            },
            {
              "internalType": "address[]",
              "name": "path",
              "type": "address[]"
            }
          ],
          "internalType": "struct ICaskDCA.DCA",
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
          "internalType": "address",
          "name": "_user",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_idx",
          "type": "uint256"
        }
      ],
      "name": "getUserDCA",
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
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "getUserDCACount",
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
          "internalType": "bytes32",
          "name": "_dcaId",
          "type": "bytes32"
        },
        {
          "internalType": "enum ICaskDCA.ManagerCommand",
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
          "internalType": "bytes32",
          "name": "_dcaId",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_buyQty",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_fee",
          "type": "uint256"
        }
      ],
      "name": "managerProcessed",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_dcaId",
          "type": "bytes32"
        },
        {
          "internalType": "enum ICaskDCA.SkipReason",
          "name": "_skipReason",
          "type": "uint8"
        }
      ],
      "name": "managerSkipped",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_dcaId",
          "type": "bytes32"
        }
      ],
      "name": "pauseDCA",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_dcaId",
          "type": "bytes32"
        }
      ],
      "name": "resumeDCA",
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