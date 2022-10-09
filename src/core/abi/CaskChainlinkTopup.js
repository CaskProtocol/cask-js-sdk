export default {
  "_format": "hh-sol-artifact-1",
  "contractName": "CaskChainlinkTopup",
  "sourceName": "contracts/chainlink_topup/CaskChainlinkTopup.sol",
  "abi": [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "chainlinkTopupId",
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
          "name": "targetId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "registry",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "enum ICaskChainlinkTopup.TopupType",
          "name": "topupType",
          "type": "uint8"
        }
      ],
      "name": "ChainlinkTopupCanceled",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "chainlinkTopupId",
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
          "name": "lowBalance",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "topupAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "targetId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "registry",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "enum ICaskChainlinkTopup.TopupType",
          "name": "topupType",
          "type": "uint8"
        }
      ],
      "name": "ChainlinkTopupCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "chainlinkTopupGroupId",
          "type": "uint256"
        }
      ],
      "name": "ChainlinkTopupGroupProcessed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "chainlinkTopupId",
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
          "name": "targetId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "registry",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "enum ICaskChainlinkTopup.TopupType",
          "name": "topupType",
          "type": "uint8"
        }
      ],
      "name": "ChainlinkTopupPaused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "chainlinkTopupId",
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
          "name": "targetId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "registry",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "enum ICaskChainlinkTopup.TopupType",
          "name": "topupType",
          "type": "uint8"
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
      "name": "ChainlinkTopupProcessed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "chainlinkTopupId",
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
          "name": "targetId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "registry",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "enum ICaskChainlinkTopup.TopupType",
          "name": "topupType",
          "type": "uint8"
        }
      ],
      "name": "ChainlinkTopupResumed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "chainlinkTopupId",
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
          "name": "targetId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "registry",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "enum ICaskChainlinkTopup.TopupType",
          "name": "topupType",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "enum ICaskChainlinkTopup.SkipReason",
          "name": "skipReason",
          "type": "uint8"
        }
      ],
      "name": "ChainlinkTopupSkipped",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Paused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Unpaused",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "backfillGroups",
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
          "name": "_chainlinkTopupId",
          "type": "bytes32"
        }
      ],
      "name": "cancelChainlinkTopup",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "chainlinkTopupManager",
      "outputs": [
        {
          "internalType": "contract ICaskChainlinkTopupManager",
          "name": "",
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
          "name": "_lowBalance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_topupAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_targetId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_registry",
          "type": "address"
        },
        {
          "internalType": "enum ICaskChainlinkTopup.TopupType",
          "name": "_topupType",
          "type": "uint8"
        }
      ],
      "name": "createChainlinkTopup",
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
      "inputs": [],
      "name": "currentGroup",
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
          "name": "_chainlinkTopupId",
          "type": "bytes32"
        }
      ],
      "name": "getChainlinkTopup",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "groupId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "lowBalance",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "topupAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "currentAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "currentBuyQty",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "numTopups",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "numSkips",
              "type": "uint256"
            },
            {
              "internalType": "uint32",
              "name": "createdAt",
              "type": "uint32"
            },
            {
              "internalType": "uint256",
              "name": "targetId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "registry",
              "type": "address"
            },
            {
              "internalType": "enum ICaskChainlinkTopup.TopupType",
              "name": "topupType",
              "type": "uint8"
            },
            {
              "internalType": "enum ICaskChainlinkTopup.ChainlinkTopupStatus",
              "name": "status",
              "type": "uint8"
            }
          ],
          "internalType": "struct ICaskChainlinkTopup.ChainlinkTopup",
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
          "internalType": "uint256",
          "name": "_chainlinkTopupGroupId",
          "type": "uint256"
        }
      ],
      "name": "getChainlinkTopupGroup",
      "outputs": [
        {
          "components": [
            {
              "internalType": "bytes32[]",
              "name": "chainlinkTopups",
              "type": "bytes32[]"
            },
            {
              "internalType": "uint32",
              "name": "processAt",
              "type": "uint32"
            }
          ],
          "internalType": "struct ICaskChainlinkTopup.ChainlinkTopupGroup",
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
      "name": "getUserChainlinkTopup",
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
      "name": "getUserChainlinkTopupCount",
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
      "inputs": [],
      "name": "groupSize",
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
          "internalType": "uint256",
          "name": "_groupSize",
          "type": "uint256"
        }
      ],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "forwarder",
          "type": "address"
        }
      ],
      "name": "isTrustedForwarder",
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
          "name": "_chainlinkTopupId",
          "type": "bytes32"
        },
        {
          "internalType": "enum ICaskChainlinkTopup.ManagerCommand",
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
          "name": "_chainlinkTopupId",
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
          "internalType": "uint256",
          "name": "_chainlinkTopupGroupId",
          "type": "uint256"
        },
        {
          "internalType": "uint32",
          "name": "_nextProcessAt",
          "type": "uint32"
        }
      ],
      "name": "managerProcessedGroup",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_chainlinkTopupId",
          "type": "bytes32"
        },
        {
          "internalType": "enum ICaskChainlinkTopup.SkipReason",
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
      "inputs": [],
      "name": "minTopupAmount",
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
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_chainlinkTopupId",
          "type": "bytes32"
        }
      ],
      "name": "pauseChainlinkTopup",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paused",
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
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_chainlinkTopupId",
          "type": "bytes32"
        }
      ],
      "name": "resumeChainlinkTopup",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_chainlinkTopupManager",
          "type": "address"
        }
      ],
      "name": "setManager",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_minTopupAmount",
          "type": "uint256"
        }
      ],
      "name": "setMinTopupAmount",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_forwarder",
          "type": "address"
        }
      ],
      "name": "setTrustedForwarder",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "trustedForwarder",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "unpause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "versionRecipient",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    }
  ],
  "bytecode": "0x60806040523480156200001157600080fd5b50600054610100900460ff166200002f5760005460ff161562000039565b62000039620000de565b620000a15760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840160405180910390fd5b600054610100900460ff16158015620000c4576000805461ffff19166101011790555b8015620000d7576000805461ff00191690555b5062000102565b6000620000f630620000fc60201b620015231760201c565b15905090565b3b151590565b61212d80620001126000396000f3fe608060405234801561001057600080fd5b50600436106101da5760003560e01c80639d44ac9411610104578063cb3e5eca116100a2578063da74222811610071578063da7422281461040e578063f19d6a4d14610421578063f2fde38b14610434578063fe4b84df1461044757600080fd5b8063cb3e5eca146103c2578063d0ebdbe7146103d5578063d4c359da146103e8578063d89816bb146103fb57600080fd5b8063aa5bd0a2116100de578063aa5bd0a21461035c578063b4cbc9e41461037c578063ba844dc91461038f578063c68f5eb3146103a257600080fd5b80639d44ac941461032d578063a00b774214610340578063a3d5b5591461034957600080fd5b80635c975abb1161017c578063715018a61161014b578063715018a6146102e75780637da0a877146102ef5780638456cb59146103145780638da5cb5b1461031c57600080fd5b80635c975abb1461029757806363b635ea146102a257806367594c6c146102ab5780636f978f6c146102d457600080fd5b80633f735d6a116101b85780633f735d6a14610218578063486ff0cd1461022b578063572b6c05146102525780635ba581cd1461028457600080fd5b80630dff2d0c146101df5780632a74cbb5146101fb5780633f4ba83a14610210575b600080fd5b6101e8609e5481565b6040519081526020015b60405180910390f35b61020e610209366004611ba6565b61045a565b005b61020e61052d565b61020e610226366004611bd6565b610580565b60408051808201825260058152640322e322e360dc1b602082015290516101f29190611c04565b610274610260366004611c70565b6097546001600160a01b0391821691161490565b60405190151581526020016101f2565b61020e610292366004611ba6565b61060f565b60655460ff16610274565b6101e8609f5481565b6101e86102b9366004611c70565b6001600160a01b03166000908152609a602052604090205490565b6101e86102e2366004611c92565b610771565b61020e6107ae565b6097546001600160a01b03165b6040516001600160a01b0390911681526020016101f2565b61020e610801565b6033546001600160a01b03166102fc565b61020e61033b366004611cbc565b610852565b6101e8609c5481565b6101e8610357366004611cbc565b610978565b61036f61036a366004611cbc565b610999565b6040516101f29190611cd5565b61020e61038a366004611d37565b610a28565b61020e61039d366004611cbc565b610b2f565b6103b56103b0366004611cbc565b610c55565b6040516101f29190611dac565b6098546102fc906001600160a01b031681565b61020e6103e3366004611c70565b610d73565b61020e6103f6366004611cbc565b610dde565b61020e610409366004611cbc565b610f33565b61020e61041c366004611c70565b610f81565b6101e861042f366004611e6d565b610feb565b61020e610442366004611c70565b611398565b61020e610455366004611cbc565b61144f565b6098546001600160a01b031661046e611529565b6001600160a01b03161461049d5760405162461bcd60e51b815260040161049490611ec1565b60405180910390fd5b600082815260996020526040812060078101805491926001926104c1908490611ef6565b909155505080546009820154600a8301546040516001600160a01b039384169387937e374955e503c1cb80274d04743ac516c7954db106b4f57f594b216b75e0ad8593610520939192811691600160a01b90910460ff16908990611f0e565b60405180910390a3505050565b610535611529565b6001600160a01b03166105506033546001600160a01b031690565b6001600160a01b0316146105765760405162461bcd60e51b815260040161049490611f4b565b61057e611538565b565b6098546001600160a01b0316610594611529565b6001600160a01b0316146105ba5760405162461bcd60e51b815260040161049490611ec1565b6000828152609b602052604080822060018101805463ffffffff191663ffffffff86161790559051909184917f68f9737cc6ec0f4eea133dcbeea5c906c17926d82d6c5b5e19c4711491f4c9169190a2505050565b6098546001600160a01b0316610623611529565b6001600160a01b0316146106495760405162461bcd60e51b815260040161049490611ec1565b6000828152609960205260409020600282600281111561066b5761066b611d69565b14156106db57600a8101805460ff60a81b198116600160a91b1791829055825460098401546040516001600160a01b039283169488947fde6232c9da3e9160ca0f56ea30d25de77f313c765456b2f059566bae7ddddb4e946105209493911691600160a01b900460ff1690611f80565b60018260028111156106ef576106ef611d69565b141561076c57600a8101805460ff60a81b1916600360a81b179055610713836115d1565b80546009820154600a8301546040516001600160a01b039384169387937f27edcd358ef2b53bc526b57370e2e080ffa9c6e3d6fd210e390b05ac82b4db4193610520939192811691600160a01b90910460ff1690611f80565b505050565b6001600160a01b0382166000908152609a6020526040812080548390811061079b5761079b611fad565b9060005260206000200154905092915050565b6107b6611529565b6001600160a01b03166107d16033546001600160a01b031690565b6001600160a01b0316146107f75760405162461bcd60e51b815260040161049490611f4b565b61057e600061172e565b610809611529565b6001600160a01b03166108246033546001600160a01b031690565b6001600160a01b03161461084a5760405162461bcd60e51b815260040161049490611f4b565b61057e611780565b60008181526099602052604090205481906001600160a01b0316610874611529565b6001600160a01b03161461089a5760405162461bcd60e51b815260040161049490611ec1565b60008281526099602052604090206001600a820154600160a81b900460ff1660038111156108ca576108ca611d69565b146109055760405162461bcd60e51b815260206004820152600b60248201526a214e4f545f41435449564560a81b6044820152606401610494565b61090e836115d1565b600a8101805460ff60a81b198116600160a91b1791829055825460098401546040516001600160a01b039283169488947fde6232c9da3e9160ca0f56ea30d25de77f313c765456b2f059566bae7ddddb4e946105209493911691600160a01b900460ff1690611f80565b609d818154811061098857600080fd5b600091825260209091200154905081565b604080518082018252606080825260006020808401829052858252609b81529084902084518154928302810184018652948501828152939493909284928491840182828015610a0757602002820191906000526020600020905b8154815260200190600101908083116109f3575b50505091835250506001919091015463ffffffff1660209091015292915050565b6098546001600160a01b0316610a3c611529565b6001600160a01b031614610a625760405162461bcd60e51b815260040161049490611ec1565b600084815260996020526040812060048101805491928692610a85908490611ef6565b9250508190555082816005016000828254610aa09190611ef6565b925050819055506001816006016000828254610abc9190611ef6565b909155505080546009820154600a8301546040516001600160a01b039384169389937f18b6d1bde03ff595fa39cebb5f8528d44bcbd97f09a8d99a9ed966e5b8cc1e5293610b20939192811691600160a01b90910460ff16908b908b908b90611fc3565b60405180910390a35050505050565b60008181526099602052604090205481906001600160a01b0316610b51611529565b6001600160a01b031614610b775760405162461bcd60e51b815260040161049490611ec1565b60008281526099602052604090206002600a820154600160a81b900460ff166003811115610ba757610ba7611d69565b14610be25760405162461bcd60e51b815260206004820152600b60248201526a085393d517d4105554d15160aa1b6044820152606401610494565b610beb836117fc565b600a8101805460ff60a81b198116600160a81b1791829055825460098401546040516001600160a01b039283169488947ff357ce53e83696815ee1632d0f04267d8feff645a8b4f7c5befc32376b899707946105209493911691600160a01b900460ff1690611f80565b610c5d611b09565b60008281526099602090815260409182902082516101a08101845281546001600160a01b039081168252600183015493820193909352600280830154948201949094526003820154606082015260048201546080820152600582015460a0820152600682015460c0820152600782015460e0820152600882015463ffffffff166101008201526009820154610120820152600a820154928316610140820152929091610160840191600160a01b90910460ff1690811115610d2057610d20611d69565b6002811115610d3157610d31611d69565b8152602001600a820160159054906101000a900460ff166003811115610d5957610d59611d69565b6003811115610d6a57610d6a611d69565b90525092915050565b610d7b611529565b6001600160a01b0316610d966033546001600160a01b031690565b6001600160a01b031614610dbc5760405162461bcd60e51b815260040161049490611f4b565b609880546001600160a01b0319166001600160a01b0392909216919091179055565b60008181526099602052604090205481906001600160a01b0316610e00611529565b6001600160a01b031614610e265760405162461bcd60e51b815260040161049490611ec1565b60008281526099602052604090206001600a820154600160a81b900460ff166003811115610e5657610e56611d69565b1480610e8157506002600a820154600160a81b900460ff166003811115610e7f57610e7f611d69565b145b610ec05760405162461bcd60e51b815260206004820152601060248201526f21494e56414c4944287374617475732960801b6044820152606401610494565b610ec9836115d1565b600a8101805460ff60a81b198116600360a81b1791829055825460098401546040516001600160a01b039283169488947f27edcd358ef2b53bc526b57370e2e080ffa9c6e3d6fd210e390b05ac82b4db41946105209493911691600160a01b900460ff1690611f80565b610f3b611529565b6001600160a01b0316610f566033546001600160a01b031690565b6001600160a01b031614610f7c5760405162461bcd60e51b815260040161049490611f4b565b609e55565b610f89611529565b6001600160a01b0316610fa46033546001600160a01b031690565b6001600160a01b031614610fca5760405162461bcd60e51b815260040161049490611f4b565b609780546001600160a01b0319166001600160a01b03831617905550565b50565b6000609e548510156110375760405162461bcd60e51b815260206004820152601560248201527421494e56414c494428746f707570416d6f756e742960581b6044820152606401610494565b600182600281111561104b5761104b611d69565b14806110685750600282600281111561106657611066611d69565b145b6110aa5760405162461bcd60e51b815260206004820152601360248201527221494e56414c494428746f707570547970652960681b6044820152606401610494565b60985460405163d5f59fb960e01b81526001600160a01b0385811660048301529091169063d5f59fb99060240160206040518083038186803b1580156110ef57600080fd5b505afa158015611103573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111279190612005565b6111685760405162461bcd60e51b815260206004820152601260248201527121494e56414c49442872656769737472792960701b6044820152606401610494565b6000611172611529565b6040516bffffffffffffffffffffffff19606092831b81166020830152603482018890529186901b909116605482015243606882015242608882015260a80160408051601f1981840301815291815281516020928301206000818152609990935291209091506111e0611529565b81546001600160a01b03199081166001600160a01b0392831617835560028084018b9055600384018a905560088401805463ffffffff19164263ffffffff1617905560098401899055600a840180549283169389169384178155879390926001600160a81b0319161790600160a01b90849081111561126157611261611d69565b0217905550600a8101805460ff60a81b1916600160a81b179055609a6000611287611529565b6001600160a01b0316815260208082019290925260400160009081208054600181018255908252919020018290556112be826117fc565b6001600a820154600160a81b900460ff1660038111156112e0576112e0611d69565b1461131e5760405162461bcd60e51b815260206004820152600e60248201526d21554e50524f4345535341424c4560901b6044820152606401610494565b8054600282015460038301546009840154600a8501546040516001600160a01b039586169588957fe26548496d0e88951d526ea185b82864689467851bf69d0218e2cf1b949850269561138595919490939192811691600160a01b90910460ff1690612027565b60405180910390a3509695505050505050565b6113a0611529565b6001600160a01b03166113bb6033546001600160a01b031690565b6001600160a01b0316146113e15760405162461bcd60e51b815260040161049490611f4b565b6001600160a01b0381166114465760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610494565b610fe88161172e565b600054610100900460ff1661146a5760005460ff161561146e565b303b155b6114d15760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610494565b600054610100900460ff161580156114f3576000805461ffff19166101011790555b6114fb611905565b61150361193c565b6001609c55609f829055801561151f576000805461ff00191690555b5050565b3b151590565b6000611533611973565b905090565b60655460ff166115815760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b6044820152606401610494565b6065805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa6115b4611529565b6040516001600160a01b03909116815260200160405180910390a1565b60008181526099602090815260408083206001810154808552609b90935290832054909281905b8281101561164e576000848152609b6020526040902080548791908390811061162357611623611fad565b9060005260206000200154141561163c5780915061164e565b8061164681612064565b9150506115f8565b50818110156116f5576000838152609b6020526040902061167060018461207f565b8154811061168057611680611fad565b9060005260206000200154609b600085815260200190815260200160002060000182815481106116b2576116b2611fad565b6000918252602080832090910192909255848152609b909152604090208054806116de576116de612096565b600190038181906000526020600020016000905590555b5050609d80546001810182556000919091527fd26e832454299e9fabb89e0e5fffdc046d4e14431bc1bf607ffb2e8a1ddecf7b01555050565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b60655460ff16156117c65760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b6044820152606401610494565b6065805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586115b4611529565b60006118066119a7565b9050600081116118475760405162461bcd60e51b815260206004820152600c60248201526b10a3a927aaa82fa2a92927a960a11b6044820152606401610494565b60008281526099602090815260408083206001808201869055858552609b84529184208054808401825581865293909420909201859055825491929114156118ff5760018101805463ffffffff19164263ffffffff16179055609854604051630650760d60e31b8152600481018590526001600160a01b0390911690633283b06890602401600060405180830381600087803b1580156118e657600080fd5b505af11580156118fa573d6000803e3d6000fd5b505050505b50505050565b600054610100900460ff1661192c5760405162461bcd60e51b8152600401610494906120ac565b611934611a78565b61057e611a9f565b600054610100900460ff166119635760405162461bcd60e51b8152600401610494906120ac565b61196b611a78565b61057e611ad6565b60006014361080159061199057506097546001600160a01b031633145b156119a2575060131936013560601c90565b503390565b609d54600090819015611a0d57609d80546119c49060019061207f565b815481106119d4576119d4611fad565b90600052602060002001549050609d8054806119f2576119f2612096565b60019003818190600052602060002001600090559055611a12565b50609c545b609c548114158015611a345750609f546000828152609b602052604090205410155b15611a3e5750609c545b609f546000828152609b602052604090205410611a73576001609c6000828254611a689190611ef6565b9091555050609c5490505b919050565b600054610100900460ff1661057e5760405162461bcd60e51b8152600401610494906120ac565b600054610100900460ff16611ac65760405162461bcd60e51b8152600401610494906120ac565b61057e611ad1611529565b61172e565b600054610100900460ff16611afd5760405162461bcd60e51b8152600401610494906120ac565b6065805460ff19169055565b604051806101a0016040528060006001600160a01b0316815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600063ffffffff1681526020016000815260200160006001600160a01b0316815260200160006002811115611b8d57611b8d611d69565b81526020016000905290565b60038110610fe857600080fd5b60008060408385031215611bb957600080fd5b823591506020830135611bcb81611b99565b809150509250929050565b60008060408385031215611be957600080fd5b82359150602083013563ffffffff81168114611bcb57600080fd5b600060208083528351808285015260005b81811015611c3157858101830151858201604001528201611c15565b81811115611c43576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b0381168114611a7357600080fd5b600060208284031215611c8257600080fd5b611c8b82611c59565b9392505050565b60008060408385031215611ca557600080fd5b611cae83611c59565b946020939093013593505050565b600060208284031215611cce57600080fd5b5035919050565b6020808252825160408383015280516060840181905260009291820190839060808601905b80831015611d1a5783518252928401926001929092019190840190611cfa565b5063ffffffff848801511660408701528094505050505092915050565b60008060008060808587031215611d4d57600080fd5b5050823594602084013594506040840135936060013592509050565b634e487b7160e01b600052602160045260246000fd5b60038110610fe857610fe8611d69565b611d9881611d7f565b9052565b60048110611d9857611d98611d69565b81516001600160a01b031681526101a081016020830151602083015260408301516040830152606083015160608301526080830151608083015260a083015160a083015260c083015160c083015260e083015160e083015261010080840151611e1c8285018263ffffffff169052565b50506101208381015190830152610140808401516001600160a01b03169083015261016080840151611e5082850182611d8f565b505061018080840151611e6582850182611d9c565b505092915050565b600080600080600060a08688031215611e8557600080fd5b853594506020860135935060408601359250611ea360608701611c59565b91506080860135611eb381611b99565b809150509295509295909350565b60208082526005908201526404282aaa8960db1b604082015260600190565b634e487b7160e01b600052601160045260246000fd5b60008219821115611f0957611f09611ee0565b500190565b8481526001600160a01b038416602082015260808101611f2d84611d7f565b836040830152611f3c83611d7f565b82606083015295945050505050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b8381526001600160a01b038316602082015260608101611f9f83611d7f565b826040830152949350505050565b634e487b7160e01b600052603260045260246000fd5b8681526001600160a01b038616602082015260c08101611fe286611d7f565b8560408301528460608301528360808301528260a0830152979650505050505050565b60006020828403121561201757600080fd5b81518015158114611c8b57600080fd5b85815260208101859052604081018490526001600160a01b038316606082015260a0810161205483611d7f565b8260808301529695505050505050565b600060001982141561207857612078611ee0565b5060010190565b60008282101561209157612091611ee0565b500390565b634e487b7160e01b600052603160045260246000fd5b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b60608201526080019056fea26469706673582212204a95d2a4d3728d7136847ee7ead51ec880677fa07f16a328ace02306a8cd8c3964736f6c63430008090033",
  "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106101da5760003560e01c80639d44ac9411610104578063cb3e5eca116100a2578063da74222811610071578063da7422281461040e578063f19d6a4d14610421578063f2fde38b14610434578063fe4b84df1461044757600080fd5b8063cb3e5eca146103c2578063d0ebdbe7146103d5578063d4c359da146103e8578063d89816bb146103fb57600080fd5b8063aa5bd0a2116100de578063aa5bd0a21461035c578063b4cbc9e41461037c578063ba844dc91461038f578063c68f5eb3146103a257600080fd5b80639d44ac941461032d578063a00b774214610340578063a3d5b5591461034957600080fd5b80635c975abb1161017c578063715018a61161014b578063715018a6146102e75780637da0a877146102ef5780638456cb59146103145780638da5cb5b1461031c57600080fd5b80635c975abb1461029757806363b635ea146102a257806367594c6c146102ab5780636f978f6c146102d457600080fd5b80633f735d6a116101b85780633f735d6a14610218578063486ff0cd1461022b578063572b6c05146102525780635ba581cd1461028457600080fd5b80630dff2d0c146101df5780632a74cbb5146101fb5780633f4ba83a14610210575b600080fd5b6101e8609e5481565b6040519081526020015b60405180910390f35b61020e610209366004611ba6565b61045a565b005b61020e61052d565b61020e610226366004611bd6565b610580565b60408051808201825260058152640322e322e360dc1b602082015290516101f29190611c04565b610274610260366004611c70565b6097546001600160a01b0391821691161490565b60405190151581526020016101f2565b61020e610292366004611ba6565b61060f565b60655460ff16610274565b6101e8609f5481565b6101e86102b9366004611c70565b6001600160a01b03166000908152609a602052604090205490565b6101e86102e2366004611c92565b610771565b61020e6107ae565b6097546001600160a01b03165b6040516001600160a01b0390911681526020016101f2565b61020e610801565b6033546001600160a01b03166102fc565b61020e61033b366004611cbc565b610852565b6101e8609c5481565b6101e8610357366004611cbc565b610978565b61036f61036a366004611cbc565b610999565b6040516101f29190611cd5565b61020e61038a366004611d37565b610a28565b61020e61039d366004611cbc565b610b2f565b6103b56103b0366004611cbc565b610c55565b6040516101f29190611dac565b6098546102fc906001600160a01b031681565b61020e6103e3366004611c70565b610d73565b61020e6103f6366004611cbc565b610dde565b61020e610409366004611cbc565b610f33565b61020e61041c366004611c70565b610f81565b6101e861042f366004611e6d565b610feb565b61020e610442366004611c70565b611398565b61020e610455366004611cbc565b61144f565b6098546001600160a01b031661046e611529565b6001600160a01b03161461049d5760405162461bcd60e51b815260040161049490611ec1565b60405180910390fd5b600082815260996020526040812060078101805491926001926104c1908490611ef6565b909155505080546009820154600a8301546040516001600160a01b039384169387937e374955e503c1cb80274d04743ac516c7954db106b4f57f594b216b75e0ad8593610520939192811691600160a01b90910460ff16908990611f0e565b60405180910390a3505050565b610535611529565b6001600160a01b03166105506033546001600160a01b031690565b6001600160a01b0316146105765760405162461bcd60e51b815260040161049490611f4b565b61057e611538565b565b6098546001600160a01b0316610594611529565b6001600160a01b0316146105ba5760405162461bcd60e51b815260040161049490611ec1565b6000828152609b602052604080822060018101805463ffffffff191663ffffffff86161790559051909184917f68f9737cc6ec0f4eea133dcbeea5c906c17926d82d6c5b5e19c4711491f4c9169190a2505050565b6098546001600160a01b0316610623611529565b6001600160a01b0316146106495760405162461bcd60e51b815260040161049490611ec1565b6000828152609960205260409020600282600281111561066b5761066b611d69565b14156106db57600a8101805460ff60a81b198116600160a91b1791829055825460098401546040516001600160a01b039283169488947fde6232c9da3e9160ca0f56ea30d25de77f313c765456b2f059566bae7ddddb4e946105209493911691600160a01b900460ff1690611f80565b60018260028111156106ef576106ef611d69565b141561076c57600a8101805460ff60a81b1916600360a81b179055610713836115d1565b80546009820154600a8301546040516001600160a01b039384169387937f27edcd358ef2b53bc526b57370e2e080ffa9c6e3d6fd210e390b05ac82b4db4193610520939192811691600160a01b90910460ff1690611f80565b505050565b6001600160a01b0382166000908152609a6020526040812080548390811061079b5761079b611fad565b9060005260206000200154905092915050565b6107b6611529565b6001600160a01b03166107d16033546001600160a01b031690565b6001600160a01b0316146107f75760405162461bcd60e51b815260040161049490611f4b565b61057e600061172e565b610809611529565b6001600160a01b03166108246033546001600160a01b031690565b6001600160a01b03161461084a5760405162461bcd60e51b815260040161049490611f4b565b61057e611780565b60008181526099602052604090205481906001600160a01b0316610874611529565b6001600160a01b03161461089a5760405162461bcd60e51b815260040161049490611ec1565b60008281526099602052604090206001600a820154600160a81b900460ff1660038111156108ca576108ca611d69565b146109055760405162461bcd60e51b815260206004820152600b60248201526a214e4f545f41435449564560a81b6044820152606401610494565b61090e836115d1565b600a8101805460ff60a81b198116600160a91b1791829055825460098401546040516001600160a01b039283169488947fde6232c9da3e9160ca0f56ea30d25de77f313c765456b2f059566bae7ddddb4e946105209493911691600160a01b900460ff1690611f80565b609d818154811061098857600080fd5b600091825260209091200154905081565b604080518082018252606080825260006020808401829052858252609b81529084902084518154928302810184018652948501828152939493909284928491840182828015610a0757602002820191906000526020600020905b8154815260200190600101908083116109f3575b50505091835250506001919091015463ffffffff1660209091015292915050565b6098546001600160a01b0316610a3c611529565b6001600160a01b031614610a625760405162461bcd60e51b815260040161049490611ec1565b600084815260996020526040812060048101805491928692610a85908490611ef6565b9250508190555082816005016000828254610aa09190611ef6565b925050819055506001816006016000828254610abc9190611ef6565b909155505080546009820154600a8301546040516001600160a01b039384169389937f18b6d1bde03ff595fa39cebb5f8528d44bcbd97f09a8d99a9ed966e5b8cc1e5293610b20939192811691600160a01b90910460ff16908b908b908b90611fc3565b60405180910390a35050505050565b60008181526099602052604090205481906001600160a01b0316610b51611529565b6001600160a01b031614610b775760405162461bcd60e51b815260040161049490611ec1565b60008281526099602052604090206002600a820154600160a81b900460ff166003811115610ba757610ba7611d69565b14610be25760405162461bcd60e51b815260206004820152600b60248201526a085393d517d4105554d15160aa1b6044820152606401610494565b610beb836117fc565b600a8101805460ff60a81b198116600160a81b1791829055825460098401546040516001600160a01b039283169488947ff357ce53e83696815ee1632d0f04267d8feff645a8b4f7c5befc32376b899707946105209493911691600160a01b900460ff1690611f80565b610c5d611b09565b60008281526099602090815260409182902082516101a08101845281546001600160a01b039081168252600183015493820193909352600280830154948201949094526003820154606082015260048201546080820152600582015460a0820152600682015460c0820152600782015460e0820152600882015463ffffffff166101008201526009820154610120820152600a820154928316610140820152929091610160840191600160a01b90910460ff1690811115610d2057610d20611d69565b6002811115610d3157610d31611d69565b8152602001600a820160159054906101000a900460ff166003811115610d5957610d59611d69565b6003811115610d6a57610d6a611d69565b90525092915050565b610d7b611529565b6001600160a01b0316610d966033546001600160a01b031690565b6001600160a01b031614610dbc5760405162461bcd60e51b815260040161049490611f4b565b609880546001600160a01b0319166001600160a01b0392909216919091179055565b60008181526099602052604090205481906001600160a01b0316610e00611529565b6001600160a01b031614610e265760405162461bcd60e51b815260040161049490611ec1565b60008281526099602052604090206001600a820154600160a81b900460ff166003811115610e5657610e56611d69565b1480610e8157506002600a820154600160a81b900460ff166003811115610e7f57610e7f611d69565b145b610ec05760405162461bcd60e51b815260206004820152601060248201526f21494e56414c4944287374617475732960801b6044820152606401610494565b610ec9836115d1565b600a8101805460ff60a81b198116600360a81b1791829055825460098401546040516001600160a01b039283169488947f27edcd358ef2b53bc526b57370e2e080ffa9c6e3d6fd210e390b05ac82b4db41946105209493911691600160a01b900460ff1690611f80565b610f3b611529565b6001600160a01b0316610f566033546001600160a01b031690565b6001600160a01b031614610f7c5760405162461bcd60e51b815260040161049490611f4b565b609e55565b610f89611529565b6001600160a01b0316610fa46033546001600160a01b031690565b6001600160a01b031614610fca5760405162461bcd60e51b815260040161049490611f4b565b609780546001600160a01b0319166001600160a01b03831617905550565b50565b6000609e548510156110375760405162461bcd60e51b815260206004820152601560248201527421494e56414c494428746f707570416d6f756e742960581b6044820152606401610494565b600182600281111561104b5761104b611d69565b14806110685750600282600281111561106657611066611d69565b145b6110aa5760405162461bcd60e51b815260206004820152601360248201527221494e56414c494428746f707570547970652960681b6044820152606401610494565b60985460405163d5f59fb960e01b81526001600160a01b0385811660048301529091169063d5f59fb99060240160206040518083038186803b1580156110ef57600080fd5b505afa158015611103573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111279190612005565b6111685760405162461bcd60e51b815260206004820152601260248201527121494e56414c49442872656769737472792960701b6044820152606401610494565b6000611172611529565b6040516bffffffffffffffffffffffff19606092831b81166020830152603482018890529186901b909116605482015243606882015242608882015260a80160408051601f1981840301815291815281516020928301206000818152609990935291209091506111e0611529565b81546001600160a01b03199081166001600160a01b0392831617835560028084018b9055600384018a905560088401805463ffffffff19164263ffffffff1617905560098401899055600a840180549283169389169384178155879390926001600160a81b0319161790600160a01b90849081111561126157611261611d69565b0217905550600a8101805460ff60a81b1916600160a81b179055609a6000611287611529565b6001600160a01b0316815260208082019290925260400160009081208054600181018255908252919020018290556112be826117fc565b6001600a820154600160a81b900460ff1660038111156112e0576112e0611d69565b1461131e5760405162461bcd60e51b815260206004820152600e60248201526d21554e50524f4345535341424c4560901b6044820152606401610494565b8054600282015460038301546009840154600a8501546040516001600160a01b039586169588957fe26548496d0e88951d526ea185b82864689467851bf69d0218e2cf1b949850269561138595919490939192811691600160a01b90910460ff1690612027565b60405180910390a3509695505050505050565b6113a0611529565b6001600160a01b03166113bb6033546001600160a01b031690565b6001600160a01b0316146113e15760405162461bcd60e51b815260040161049490611f4b565b6001600160a01b0381166114465760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610494565b610fe88161172e565b600054610100900460ff1661146a5760005460ff161561146e565b303b155b6114d15760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610494565b600054610100900460ff161580156114f3576000805461ffff19166101011790555b6114fb611905565b61150361193c565b6001609c55609f829055801561151f576000805461ff00191690555b5050565b3b151590565b6000611533611973565b905090565b60655460ff166115815760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b6044820152606401610494565b6065805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa6115b4611529565b6040516001600160a01b03909116815260200160405180910390a1565b60008181526099602090815260408083206001810154808552609b90935290832054909281905b8281101561164e576000848152609b6020526040902080548791908390811061162357611623611fad565b9060005260206000200154141561163c5780915061164e565b8061164681612064565b9150506115f8565b50818110156116f5576000838152609b6020526040902061167060018461207f565b8154811061168057611680611fad565b9060005260206000200154609b600085815260200190815260200160002060000182815481106116b2576116b2611fad565b6000918252602080832090910192909255848152609b909152604090208054806116de576116de612096565b600190038181906000526020600020016000905590555b5050609d80546001810182556000919091527fd26e832454299e9fabb89e0e5fffdc046d4e14431bc1bf607ffb2e8a1ddecf7b01555050565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b60655460ff16156117c65760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b6044820152606401610494565b6065805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586115b4611529565b60006118066119a7565b9050600081116118475760405162461bcd60e51b815260206004820152600c60248201526b10a3a927aaa82fa2a92927a960a11b6044820152606401610494565b60008281526099602090815260408083206001808201869055858552609b84529184208054808401825581865293909420909201859055825491929114156118ff5760018101805463ffffffff19164263ffffffff16179055609854604051630650760d60e31b8152600481018590526001600160a01b0390911690633283b06890602401600060405180830381600087803b1580156118e657600080fd5b505af11580156118fa573d6000803e3d6000fd5b505050505b50505050565b600054610100900460ff1661192c5760405162461bcd60e51b8152600401610494906120ac565b611934611a78565b61057e611a9f565b600054610100900460ff166119635760405162461bcd60e51b8152600401610494906120ac565b61196b611a78565b61057e611ad6565b60006014361080159061199057506097546001600160a01b031633145b156119a2575060131936013560601c90565b503390565b609d54600090819015611a0d57609d80546119c49060019061207f565b815481106119d4576119d4611fad565b90600052602060002001549050609d8054806119f2576119f2612096565b60019003818190600052602060002001600090559055611a12565b50609c545b609c548114158015611a345750609f546000828152609b602052604090205410155b15611a3e5750609c545b609f546000828152609b602052604090205410611a73576001609c6000828254611a689190611ef6565b9091555050609c5490505b919050565b600054610100900460ff1661057e5760405162461bcd60e51b8152600401610494906120ac565b600054610100900460ff16611ac65760405162461bcd60e51b8152600401610494906120ac565b61057e611ad1611529565b61172e565b600054610100900460ff16611afd5760405162461bcd60e51b8152600401610494906120ac565b6065805460ff19169055565b604051806101a0016040528060006001600160a01b0316815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600063ffffffff1681526020016000815260200160006001600160a01b0316815260200160006002811115611b8d57611b8d611d69565b81526020016000905290565b60038110610fe857600080fd5b60008060408385031215611bb957600080fd5b823591506020830135611bcb81611b99565b809150509250929050565b60008060408385031215611be957600080fd5b82359150602083013563ffffffff81168114611bcb57600080fd5b600060208083528351808285015260005b81811015611c3157858101830151858201604001528201611c15565b81811115611c43576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b0381168114611a7357600080fd5b600060208284031215611c8257600080fd5b611c8b82611c59565b9392505050565b60008060408385031215611ca557600080fd5b611cae83611c59565b946020939093013593505050565b600060208284031215611cce57600080fd5b5035919050565b6020808252825160408383015280516060840181905260009291820190839060808601905b80831015611d1a5783518252928401926001929092019190840190611cfa565b5063ffffffff848801511660408701528094505050505092915050565b60008060008060808587031215611d4d57600080fd5b5050823594602084013594506040840135936060013592509050565b634e487b7160e01b600052602160045260246000fd5b60038110610fe857610fe8611d69565b611d9881611d7f565b9052565b60048110611d9857611d98611d69565b81516001600160a01b031681526101a081016020830151602083015260408301516040830152606083015160608301526080830151608083015260a083015160a083015260c083015160c083015260e083015160e083015261010080840151611e1c8285018263ffffffff169052565b50506101208381015190830152610140808401516001600160a01b03169083015261016080840151611e5082850182611d8f565b505061018080840151611e6582850182611d9c565b505092915050565b600080600080600060a08688031215611e8557600080fd5b853594506020860135935060408601359250611ea360608701611c59565b91506080860135611eb381611b99565b809150509295509295909350565b60208082526005908201526404282aaa8960db1b604082015260600190565b634e487b7160e01b600052601160045260246000fd5b60008219821115611f0957611f09611ee0565b500190565b8481526001600160a01b038416602082015260808101611f2d84611d7f565b836040830152611f3c83611d7f565b82606083015295945050505050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b8381526001600160a01b038316602082015260608101611f9f83611d7f565b826040830152949350505050565b634e487b7160e01b600052603260045260246000fd5b8681526001600160a01b038616602082015260c08101611fe286611d7f565b8560408301528460608301528360808301528260a0830152979650505050505050565b60006020828403121561201757600080fd5b81518015158114611c8b57600080fd5b85815260208101859052604081018490526001600160a01b038316606082015260a0810161205483611d7f565b8260808301529695505050505050565b600060001982141561207857612078611ee0565b5060010190565b60008282101561209157612091611ee0565b500390565b634e487b7160e01b600052603160045260246000fd5b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b60608201526080019056fea26469706673582212204a95d2a4d3728d7136847ee7ead51ec880677fa07f16a328ace02306a8cd8c3964736f6c63430008090033",
  "linkReferences": {},
  "deployedLinkReferences": {}
}