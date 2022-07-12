export default {
  "_format": "hh-sol-artifact-1",
  "contractName": "ICaskP2P",
  "sourceName": "contracts/interfaces/ICaskP2P.sol",
  "abi": [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "p2pId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "P2PCanceled",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "p2pId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "P2PCompleted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "p2pId",
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
      "name": "P2PCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "p2pId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "P2PPaused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "p2pId",
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
          "name": "fee",
          "type": "uint256"
        }
      ],
      "name": "P2PProcessed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "p2pId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "P2PResumed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "p2pId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "P2PSkipped",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_p2pId",
          "type": "bytes32"
        }
      ],
      "name": "cancelP2P",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
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
        }
      ],
      "name": "createP2P",
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
          "name": "_p2pId",
          "type": "bytes32"
        }
      ],
      "name": "getP2P",
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
              "name": "numPayments",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "numSkips",
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
              "internalType": "enum ICaskP2P.P2PStatus",
              "name": "status",
              "type": "uint8"
            }
          ],
          "internalType": "struct ICaskP2P.P2P",
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
      "name": "getUserP2P",
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
      "name": "getUserP2PCount",
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
          "name": "_p2pId",
          "type": "bytes32"
        },
        {
          "internalType": "enum ICaskP2P.ManagerCommand",
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
          "name": "_p2pId",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "amount",
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
          "name": "_p2pId",
          "type": "bytes32"
        }
      ],
      "name": "pauseP2P",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_p2pId",
          "type": "bytes32"
        }
      ],
      "name": "resumeP2P",
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