export default {
  "_format": "hh-sol-artifact-1",
  "contractName": "CaskDCA",
  "sourceName": "contracts/dca/CaskDCA.sol",
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
          "internalType": "address",
          "name": "newAdmin",
          "type": "address"
        }
      ],
      "name": "AssetAdminChange",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "prevRoot",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "newRoot",
          "type": "bytes32"
        }
      ],
      "name": "AssetsMerkleRootChanged",
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
      "inputs": [],
      "name": "assetsAdmin",
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
      "name": "assetsMerkleRoot",
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
          "internalType": "enum ICaskDCA.SwapProtocol",
          "name": "_swapProtocol",
          "type": "uint8"
        },
        {
          "internalType": "bytes",
          "name": "_swapData",
          "type": "bytes"
        },
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256[]",
          "name": "_priceSpec",
          "type": "uint256[]"
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
      "inputs": [],
      "name": "dcaManager",
      "outputs": [
        {
          "internalType": "contract ICaskDCAManager",
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
              "name": "maxSlippageBps",
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
          "internalType": "bytes32",
          "name": "_dcaId",
          "type": "bytes32"
        }
      ],
      "name": "getSwapInfo",
      "outputs": [
        {
          "components": [
            {
              "internalType": "enum ICaskDCA.SwapProtocol",
              "name": "swapProtocol",
              "type": "uint8"
            },
            {
              "internalType": "bytes",
              "name": "swapData",
              "type": "bytes"
            }
          ],
          "internalType": "struct ICaskDCA.SwapInfo",
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
          "name": "_assetsMerkleRoot",
          "type": "bytes32"
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
      "inputs": [],
      "name": "minAmount",
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
      "name": "minPeriod",
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
      "inputs": [],
      "name": "minSlippage",
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
      "name": "prevAssetsMerkleRoot",
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
          "name": "_dcaId",
          "type": "bytes32"
        }
      ],
      "name": "resumeDCA",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_assetsAdmin",
          "type": "address"
        }
      ],
      "name": "setAssetsAdmin",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_assetsMerkleRoot",
          "type": "bytes32"
        }
      ],
      "name": "setAssetsMerkleRoot",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_dcaManager",
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
          "name": "_minAmount",
          "type": "uint256"
        }
      ],
      "name": "setMinAmount",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint32",
          "name": "_minPeriod",
          "type": "uint32"
        }
      ],
      "name": "setMinPeriod",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_minSlippage",
          "type": "uint256"
        }
      ],
      "name": "setMinSlippage",
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
  "bytecode": "0x60806040523480156200001157600080fd5b50600054610100900460ff166200002f5760005460ff161562000039565b62000039620000de565b620000a15760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840160405180910390fd5b600054610100900460ff16158015620000c4576000805461ffff19166101011790555b8015620000d7576000805461ff00191690555b5062000102565b6000620000f630620000fc60201b62001c4a1760201c565b15905090565b3b151590565b612b2e80620001126000396000f3fe608060405234801561001057600080fd5b50600436106102115760003560e01c80638da5cb5b11610125578063c0677c47116100ad578063da7422281161007c578063da7422281461048b578063e3e01f9f1461049e578063f2fde38b146104b1578063f7b7159f146104c4578063ffd49c84146104d757600080fd5b8063c0677c4714610453578063c453824f1461045c578063d0ebdbe71461046f578063d26c167f1461048257600080fd5b8063abcfd154116100f4578063abcfd154146103f4578063b4cbc9e414610407578063b4e38a8d1461041a578063bc78e9161461042d578063bd78b2b31461044057600080fd5b80638da5cb5b146103a757806392c65f4b146103b85780639498bd71146103d85780639b2cb5d8146103eb57600080fd5b8063572b6c05116101a8578063715018a611610177578063715018a6146103605780637da0a877146103685780638456cb591461037957806387eb01bf14610381578063897b06371461039457600080fd5b8063572b6c05146102e55780635ba581cd146103175780635c975abb1461032a5780636a82763c1461033557600080fd5b80632d3d0405116101e45780632d3d04051461029a5780633f4ba83a146102ad578063486ff0cd146102b55780634b51dd22146102dc57600080fd5b806316ef2c41146102165780632a74cbb5146102525780632ce17578146102675780632d0fc6b41461027a575b600080fd5b61023f6102243660046122a6565b6001600160a01b03166000908152609a602052604090205490565b6040519081526020015b60405180910390f35b6102656102603660046122c8565b6104fc565b005b6102656102753660046122fc565b6105f5565b61028d6102883660046122fc565b610678565b604051610249919061238c565b61023f6102a836600461245d565b61075e565b610265610e7d565b60408051808201825260058152640322e322e360dc1b60208201529051610249919061254b565b61023f609b5481565b6103076102f33660046122a6565b6097546001600160a01b0391821691161490565b6040519015158152602001610249565b61026561032536600461255e565b610ed0565b60655460ff16610307565b609854610348906001600160a01b031681565b6040516001600160a01b039091168152602001610249565b610265610ffb565b6097546001600160a01b0316610348565b61026561104e565b61026561038f3660046122fc565b61109f565b6102656103a23660046122fc565b6111c0565b6033546001600160a01b0316610348565b6103cb6103c63660046122fc565b61120e565b60405161024991906125db565b6102656103e63660046122fc565b611398565b61023f609c5481565b6102656104023660046122fc565b6114b0565b610265610415366004612727565b611671565b61023f610428366004612759565b611812565b61026561043b3660046122a6565b61184f565b61026561044e3660046122fc565b6118e2565b61023f609e5481565b61026561046a366004612783565b611a0b565b61026561047d3660046122a6565b611a70565b61023f60a05481565b6102656104993660046122a6565b611adb565b6102656104ac3660046122fc565b611b45565b6102656104bf3660046122a6565b611b93565b60a154610348906001600160a01b031681565b609d546104e79063ffffffff1681565b60405163ffffffff9091168152602001610249565b6098546001600160a01b0316610510611c50565b6001600160a01b03161461053f5760405162461bcd60e51b8152600401610536906127a9565b60405180910390fd5b6000828152609960205260409020600d81015461056c9063ffffffff80821691600160401b9004166127de565b81600d0160086101000a81548163ffffffff021916908363ffffffff16021790555060018160090160008282546105a39190612806565b909155505080546040516001600160a01b039091169084907f39e94fc57f494ff14c5e6240aaa121bb05346a3baf4434132df8f9075d587491906105e890869061281e565b60405180910390a3505050565b60a1546001600160a01b0316610609611c50565b6001600160a01b03161461062f5760405162461bcd60e51b8152600401610536906127a9565b609b805460a08190559082905560408051918252602082018390527f5215e49387517b606aec376216c289f200ca6ce6ff98bbbfd0976914cc2b3cfb910160405180910390a150565b6106806120be565b6000828152609f60205260409081902081518083019092528054829060ff1660028111156106b0576106b0612315565b60028111156106c1576106c1612315565b81526020016001820180546106d590612838565b80601f016020809104026020016040519081016040528092919081815260200182805461070190612838565b801561074e5780601f106107235761010080835404028352916020019161074e565b820191906000526020600020905b81548152906001019060200180831161073157829003601f168201915b5050505050815250509050919050565b600061076c60655460ff1690565b156107895760405162461bcd60e51b815260040161053690612873565b60048a10156107d05760405162461bcd60e51b815260206004820152601360248201527221494e56414c4944286173736574537065632960681b6044820152606401610536565b600682146108165760405162461bcd60e51b815260206004820152601360248201527221494e56414c4944287072696365537065632960681b6044820152606401610536565b609d5463ffffffff1683836000816108305761083061289d565b9050602002013510156108785760405162461bcd60e51b815260206004820152601060248201526f21494e56414c494428706572696f642960801b6044820152606401610536565b609c548383600181811061088e5761088e61289d565b9050602002013510156108d65760405162461bcd60e51b815260206004820152601060248201526f21494e56414c494428616d6f756e742960801b6044820152606401610536565b609e54838360038181106108ec576108ec61289d565b9050602002013510156109415760405162461bcd60e51b815260206004820152601860248201527f21494e56414c4944286d6178536c6970706167654270732900000000000000006044820152606401610536565b6109508787878e8e8e8e611c5f565b6109925760405162461bcd60e51b815260206004820152601360248201527221494e56414c4944286173736574537065632960681b6044820152606401610536565b600061099c611c50565b8888888f8f898943426040516020016109be9a999897969594939291906128e0565b60408051601f1981840301815291815281516020928301206000818152609990935291209091506109ed611c50565b81546001600160a01b03199081166001600160a01b039283161783556001830180549091169188169190911790558c8c600081610a2c57610a2c61289d565b9050602002016020810190610a4191906122a6565b6002820180546001600160a01b0319166001600160a01b03929092169190911790558c8c6001818110610a7657610a7661289d565b9050602002016020810190610a8b91906122a6565b8160030160006101000a8154816001600160a01b0302191690836001600160a01b031602179055508c8c6002908092610ac69392919061297a565b610ad491600e8401916120d9565b5084846001818110610ae857610ae861289d565b602002919091013560048301555084846002818110610b0957610b0961289d565b60200291909101356005830155508484600081610b2857610b2861289d565b9050602002013581600d0160006101000a81548163ffffffff021916908363ffffffff16021790555084846004818110610b6457610b6461289d565b6020029190910135600c8301555084846005818110610b8557610b8561289d565b6020029190910135600b8301555084846003818110610ba657610ba661289d565b6020029190910135600a83015550600d810180546bffffffffffffffff0000000019166401000000004263ffffffff1690810263ffffffff60401b191691909117600160401b91909102178082556001919060ff60601b1916600160601b8302179055506000828152609f6020526040902080548a90829060ff19166001836002811115610c3657610c36612315565b0217905550610c49600182018a8a61213c565b50609a6000610c56611c50565b6001600160a01b0390811682526020808301939093526040918201600090812080546001810182559082529390209092018590556098549051637d0c250f60e11b81526004810186905291169063fa184a1e90602401600060405180830381600087803b158015610cc657600080fd5b505af1158015610cda573d6000803e3d6000fd5b5060019250610ce7915050565b600d830154600160601b900460ff166004811115610d0757610d07612315565b14610d455760405162461bcd60e51b815260206004820152600e60248201526d21554e50524f4345535341424c4560901b6044820152606401610536565b8160080154600114610d8a5760405162461bcd60e51b815260206004820152600e60248201526d21554e50524f4345535341424c4560901b6044820152606401610536565b60018201548254600e840180546001600160a01b03938416939092169186917f9d1e5b985dd0611bc11e93d5075cdea08f64d1d51dd07489e6f288c20cd6669091600090610dda57610dda61289d565b600091825260209091200154600e870180546001600160a01b0390921691610e04906001906129a8565b81548110610e1457610e1461289d565b60009182526020918290200154600489015460058a0154600d8b0154604080516001600160a01b039788168152969094169486019490945291840152606083015263ffffffff16608082015260a00160405180910390a450909c9b505050505050505050505050565b610e85611c50565b6001600160a01b0316610ea06033546001600160a01b031690565b6001600160a01b031614610ec65760405162461bcd60e51b8152600401610536906129bf565b610ece611d85565b565b6098546001600160a01b0316610ee4611c50565b6001600160a01b031614610f0a5760405162461bcd60e51b8152600401610536906127a9565b60008281526099602052604090206003826003811115610f2c57610f2c612315565b1415610f8557600d8101805460ff60601b1916600160611b17905580546040516001600160a01b039091169084907f3d63c73b75a797c741bcfc0ae2644bc392388e97ea718a8731d44f47da2b23a490600090a3505050565b6001826003811115610f9957610f99612315565b1415610ff657600d810180546003919060ff60601b1916600160601b835b021790555080546040516001600160a01b039091169084907f5d3baeac0d91b82fe19cca4c28f0768ed59c65d7f64d48d53f166f9ec0f099c090600090a35b505050565b611003611c50565b6001600160a01b031661101e6033546001600160a01b031690565b6001600160a01b0316146110445760405162461bcd60e51b8152600401610536906129bf565b610ece6000611e1e565b611056611c50565b6001600160a01b03166110716033546001600160a01b031690565b6001600160a01b0316146110975760405162461bcd60e51b8152600401610536906129bf565b610ece611e70565b60008181526099602052604090205481906001600160a01b03166110c1611c50565b6001600160a01b0316146110e75760405162461bcd60e51b8152600401610536906127a9565b60655460ff161561110a5760405162461bcd60e51b815260040161053690612873565b60008281526099602052604090206001600d820154600160601b900460ff16600481111561113a5761113a612315565b148061116557506002600d820154600160601b900460ff16600481111561116357611163612315565b145b6111a45760405162461bcd60e51b815260206004820152601060248201526f21494e56414c4944287374617475732960801b6044820152606401610536565b600d810180546003919060ff60601b1916600160601b83610fb7565b6111c8611c50565b6001600160a01b03166111e36033546001600160a01b031690565b6001600160a01b0316146112095760405162461bcd60e51b8152600401610536906129bf565b609c55565b6112166121b0565b60008281526099602090815260409182902082516102408101845281546001600160a01b03908116825260018301548116938201939093526002820154831693810193909352600381015490911660608301526004808201546080840152600582015460a0840152600682015460c0840152600782015460e084015260088201546101008401526009820154610120840152600a820154610140840152600b820154610160840152600c820154610180840152600d82015463ffffffff8082166101a0860152640100000000820481166101c0860152600160401b8204166101e0850152610200840191600160601b90910460ff169081111561131b5761131b612315565b600481111561132c5761132c612315565b8152602001600e820180548060200260200160405190810160405280929190818152602001828054801561074e57602002820191906000526020600020905b81546001600160a01b0316815260019091019060200180831161136b575050505050815250509050919050565b600054610100900460ff166113b35760005460ff16156113b7565b303b155b61141a5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610536565b600054610100900460ff1615801561143c576000805461ffff19166101011790555b611444611ec9565b61144c611f00565b609b82905560a08290556001609c55609d805463ffffffff191662015180179055600a609e5561147a611c50565b60a180546001600160a01b0319166001600160a01b039290921691909117905580156114ac576000805461ff00191690555b5050565b60008181526099602052604090205481906001600160a01b03166114d2611c50565b6001600160a01b0316146114f85760405162461bcd60e51b8152600401610536906127a9565b60655460ff161561151b5760405162461bcd60e51b815260040161053690612873565b60008281526099602052604090206002600d820154600160601b900460ff16600481111561154b5761154b612315565b146115865760405162461bcd60e51b815260206004820152600b60248201526a085393d517d4105554d15160aa1b6044820152606401610536565b600d8101805460ff60601b1916600160601b179081905563ffffffff428116600160401b9092041610156115d557600d8101805463ffffffff60401b1916600160401b4263ffffffff16021790555b609854604051637d0c250f60e11b8152600481018590526001600160a01b039091169063fa184a1e90602401600060405180830381600087803b15801561161b57600080fd5b505af115801561162f573d6000803e3d6000fd5b505082546040516001600160a01b0390911692508591507f0d04c91a4cb25e87e66b2337207d34bd31384c15371c944d543b0d90c866e32c90600090a3505050565b6098546001600160a01b0316611685611c50565b6001600160a01b0316146116ab5760405162461bcd60e51b8152600401610536906127a9565b6000848152609960205260409020600d8101546116d89063ffffffff80821691600160401b9004166127de565b81600d0160086101000a81548163ffffffff021916908363ffffffff1602179055508381600601600082825461170e9190612806565b92505081905550828160070160008282546117299190612806565b9250508190555060018160080160008282546117459190612806565b9091555050805460408051868152602081018690529081018490526001600160a01b039091169086907f2cd977fbc4930a01c7a1d2d4f59916c67f5e443ee1b3efc3cf295b30b95499289060600160405180910390a3600081600501541180156117b757508060050154816006015410155b1561180b57600d8101805460ff60601b1916600160621b17905580546040516001600160a01b039091169086907fe91db046d37f56c01a0949ac11e488007e1e26ea683caaee32d54c4cea5d851b90600090a35b5050505050565b6001600160a01b0382166000908152609a6020526040812080548390811061183c5761183c61289d565b9060005260206000200154905092915050565b611857611c50565b6001600160a01b03166118726033546001600160a01b031690565b6001600160a01b0316146118985760405162461bcd60e51b8152600401610536906129bf565b60a180546001600160a01b0319166001600160a01b0383169081179091556040517f3a99482b294ac192dccc0f45604a8e3a48889930e9e8c089bb0f434bbfd1e55990600090a250565b60008181526099602052604090205481906001600160a01b0316611904611c50565b6001600160a01b03161461192a5760405162461bcd60e51b8152600401610536906127a9565b60655460ff161561194d5760405162461bcd60e51b815260040161053690612873565b60008281526099602052604090206001600d820154600160601b900460ff16600481111561197d5761197d612315565b146119b85760405162461bcd60e51b815260206004820152600b60248201526a214e4f545f41435449564560a81b6044820152606401610536565b600d8101805460ff60601b1916600160611b17905580546040516001600160a01b039091169084907f3d63c73b75a797c741bcfc0ae2644bc392388e97ea718a8731d44f47da2b23a490600090a3505050565b611a13611c50565b6001600160a01b0316611a2e6033546001600160a01b031690565b6001600160a01b031614611a545760405162461bcd60e51b8152600401610536906129bf565b609d805463ffffffff191663ffffffff92909216919091179055565b611a78611c50565b6001600160a01b0316611a936033546001600160a01b031690565b6001600160a01b031614611ab95760405162461bcd60e51b8152600401610536906129bf565b609880546001600160a01b0319166001600160a01b0392909216919091179055565b611ae3611c50565b6001600160a01b0316611afe6033546001600160a01b031690565b6001600160a01b031614611b245760405162461bcd60e51b8152600401610536906129bf565b609780546001600160a01b0319166001600160a01b03831617905550565b50565b611b4d611c50565b6001600160a01b0316611b686033546001600160a01b031690565b6001600160a01b031614611b8e5760405162461bcd60e51b8152600401610536906129bf565b609e55565b611b9b611c50565b6001600160a01b0316611bb66033546001600160a01b031690565b6001600160a01b031614611bdc5760405162461bcd60e51b8152600401610536906129bf565b6001600160a01b038116611c415760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610536565b611b4281611e1e565b3b151590565b6000611c5a611f37565b905090565b60008088888888886000818110611c7857611c7861289d565b9050602002016020810190611c8d91906122a6565b89896001818110611ca057611ca061289d565b9050602002016020810190611cb591906122a6565b611cc28a6002818e61297a565b604051602001611cd897969594939291906129f4565b604051602081830303815290604052805190602001209050611d3184848080602002602001604051908101604052809392919081815260200183836020028082843760009201919091525050609b549150849050611f6b565b80611d785750611d788484808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152505060a0549150849050611f6b565b9998505050505050505050565b60655460ff16611dce5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b6044820152606401610536565b6065805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa611e01611c50565b6040516001600160a01b03909116815260200160405180910390a1565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b60655460ff1615611e935760405162461bcd60e51b815260040161053690612873565b6065805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258611e01611c50565b600054610100900460ff16611ef05760405162461bcd60e51b815260040161053690612a92565b611ef8611f81565b610ece611fa8565b600054610100900460ff16611f275760405162461bcd60e51b815260040161053690612a92565b611f2f611f81565b610ece611fdf565b600060143610801590611f5457506097546001600160a01b031633145b15611f66575060131936013560601c90565b503390565b600082611f788584612012565b14949350505050565b600054610100900460ff16610ece5760405162461bcd60e51b815260040161053690612a92565b600054610100900460ff16611fcf5760405162461bcd60e51b815260040161053690612a92565b610ece611fda611c50565b611e1e565b600054610100900460ff166120065760405162461bcd60e51b815260040161053690612a92565b6065805460ff19169055565b600081815b84518110156120b65760008582815181106120345761203461289d565b602002602001015190508083116120765760408051602081018590529081018290526060016040516020818303038152906040528051906020012092506120a3565b60408051602081018390529081018490526060016040516020818303038152906040528051906020012092505b50806120ae81612add565b915050612017565b509392505050565b604080518082019091528060005b8152602001606081525090565b82805482825590600052602060002090810192821561212c579160200282015b8281111561212c5781546001600160a01b0319166001600160a01b038435161782556020909201916001909101906120f9565b50612138929150612275565b5090565b82805461214890612838565b90600052602060002090601f01602090048101928261216a576000855561212c565b82601f106121835782800160ff1982351617855561212c565b8280016001018555821561212c579182015b8281111561212c578235825591602001919060010190612195565b60405180610240016040528060006001600160a01b0316815260200160006001600160a01b0316815260200160006001600160a01b0316815260200160006001600160a01b03168152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600063ffffffff168152602001600063ffffffff168152602001600063ffffffff168152602001600060048111156120cc576120cc612315565b5b808211156121385760008155600101612276565b80356001600160a01b03811681146122a157600080fd5b919050565b6000602082840312156122b857600080fd5b6122c18261228a565b9392505050565b600080604083850312156122db57600080fd5b823591506020830135600681106122f157600080fd5b809150509250929050565b60006020828403121561230e57600080fd5b5035919050565b634e487b7160e01b600052602160045260246000fd5b6003811061233b5761233b612315565b9052565b6000815180845260005b8181101561236557602081850181015186830182015201612349565b81811115612377576000602083870101525b50601f01601f19169290920160200192915050565b6020815261239e60208201835161232b565b600060208301516040808401526123b8606084018261233f565b949350505050565b60008083601f8401126123d257600080fd5b50813567ffffffffffffffff8111156123ea57600080fd5b6020830191508360208260051b850101111561240557600080fd5b9250929050565b8035600381106122a157600080fd5b60008083601f84011261242d57600080fd5b50813567ffffffffffffffff81111561244557600080fd5b60208301915083602082850101111561240557600080fd5b60008060008060008060008060008060c08b8d03121561247c57600080fd5b8a3567ffffffffffffffff8082111561249457600080fd5b6124a08e838f016123c0565b909c509a5060208d01359150808211156124b957600080fd5b6124c58e838f016123c0565b909a5098508891506124d960408e0161240c565b975060608d01359150808211156124ef57600080fd5b6124fb8e838f0161241b565b909750955085915061250f60808e0161228a565b945060a08d013591508082111561252557600080fd5b506125328d828e016123c0565b915080935050809150509295989b9194979a5092959850565b6020815260006122c1602083018461233f565b6000806040838503121561257157600080fd5b823591506020830135600481106122f157600080fd5b6005811061233b5761233b612315565b600081518084526020808501945080840160005b838110156125d05781516001600160a01b0316875295820195908201906001016125ab565b509495945050505050565b602081526125f56020820183516001600160a01b03169052565b6000602083015161261160408401826001600160a01b03169052565b5060408301516001600160a01b03811660608401525060608301516001600160a01b038116608084015250608083015160a08381019190915283015160c08084019190915283015160e08084019190915283015161010080840191909152830151610120808401919091528301516101408084019190915283015161016080840191909152830151610180808401919091528301516101a0808401919091528301516101c06126c78185018363ffffffff169052565b84015190506101e06126e08482018363ffffffff169052565b84015190506102006126f98482018363ffffffff169052565b840151905061022061270d84820183612587565b8401516102408481015290506123b8610260840182612597565b6000806000806080858703121561273d57600080fd5b5050823594602084013594506040840135936060013592509050565b6000806040838503121561276c57600080fd5b6127758361228a565b946020939093013593505050565b60006020828403121561279557600080fd5b813563ffffffff811681146122c157600080fd5b60208082526005908201526404282aaa8960db1b604082015260600190565b634e487b7160e01b600052601160045260246000fd5b600063ffffffff8083168185168083038211156127fd576127fd6127c8565b01949350505050565b60008219821115612819576128196127c8565b500190565b602081016006831061283257612832612315565b91905290565b600181811c9082168061284c57607f821691505b6020821081141561286d57634e487b7160e01b600052602260045260246000fd5b50919050565b60208082526010908201526f14185d5cd8589b194e881c185d5cd95960821b604082015260600190565b634e487b7160e01b600052603260045260246000fd5b60006001600160fb1b038311156128c957600080fd5b8260051b8083863760009401938452509192915050565b6bffffffffffffffffffffffff198b60601b168152600060038b1061290757612907612315565b8a60f81b6014830152888a60158401376000828a0160150181815289915b89811015612953576001600160a01b0361293e8461228a565b16825260209283019290910190600101612925565b5061295f81888a6128b3565b95865250505050602082015260400198975050505050505050565b6000808585111561298a57600080fd5b8386111561299757600080fd5b5050600583901b0193919092039150565b6000828210156129ba576129ba6127c8565b500390565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b6129fe818961232b565b6000602060a0818401528760a0840152878960c0850137600060c089850181018290526001600160a01b0389811660408701528881166060870152601f8b01601f191686018681038301608088015291820187905287929160e0015b87831015612a815781612a6c8561228a565b16815292840192600192909201918401612a5a565b9d9c50505050505050505050505050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b6000600019821415612af157612af16127c8565b506001019056fea26469706673582212208cee799f46a4fd8c4076bb0ef609a904d6cd00b28c7387e043abe91d59fac5b864736f6c63430008090033",
  "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106102115760003560e01c80638da5cb5b11610125578063c0677c47116100ad578063da7422281161007c578063da7422281461048b578063e3e01f9f1461049e578063f2fde38b146104b1578063f7b7159f146104c4578063ffd49c84146104d757600080fd5b8063c0677c4714610453578063c453824f1461045c578063d0ebdbe71461046f578063d26c167f1461048257600080fd5b8063abcfd154116100f4578063abcfd154146103f4578063b4cbc9e414610407578063b4e38a8d1461041a578063bc78e9161461042d578063bd78b2b31461044057600080fd5b80638da5cb5b146103a757806392c65f4b146103b85780639498bd71146103d85780639b2cb5d8146103eb57600080fd5b8063572b6c05116101a8578063715018a611610177578063715018a6146103605780637da0a877146103685780638456cb591461037957806387eb01bf14610381578063897b06371461039457600080fd5b8063572b6c05146102e55780635ba581cd146103175780635c975abb1461032a5780636a82763c1461033557600080fd5b80632d3d0405116101e45780632d3d04051461029a5780633f4ba83a146102ad578063486ff0cd146102b55780634b51dd22146102dc57600080fd5b806316ef2c41146102165780632a74cbb5146102525780632ce17578146102675780632d0fc6b41461027a575b600080fd5b61023f6102243660046122a6565b6001600160a01b03166000908152609a602052604090205490565b6040519081526020015b60405180910390f35b6102656102603660046122c8565b6104fc565b005b6102656102753660046122fc565b6105f5565b61028d6102883660046122fc565b610678565b604051610249919061238c565b61023f6102a836600461245d565b61075e565b610265610e7d565b60408051808201825260058152640322e322e360dc1b60208201529051610249919061254b565b61023f609b5481565b6103076102f33660046122a6565b6097546001600160a01b0391821691161490565b6040519015158152602001610249565b61026561032536600461255e565b610ed0565b60655460ff16610307565b609854610348906001600160a01b031681565b6040516001600160a01b039091168152602001610249565b610265610ffb565b6097546001600160a01b0316610348565b61026561104e565b61026561038f3660046122fc565b61109f565b6102656103a23660046122fc565b6111c0565b6033546001600160a01b0316610348565b6103cb6103c63660046122fc565b61120e565b60405161024991906125db565b6102656103e63660046122fc565b611398565b61023f609c5481565b6102656104023660046122fc565b6114b0565b610265610415366004612727565b611671565b61023f610428366004612759565b611812565b61026561043b3660046122a6565b61184f565b61026561044e3660046122fc565b6118e2565b61023f609e5481565b61026561046a366004612783565b611a0b565b61026561047d3660046122a6565b611a70565b61023f60a05481565b6102656104993660046122a6565b611adb565b6102656104ac3660046122fc565b611b45565b6102656104bf3660046122a6565b611b93565b60a154610348906001600160a01b031681565b609d546104e79063ffffffff1681565b60405163ffffffff9091168152602001610249565b6098546001600160a01b0316610510611c50565b6001600160a01b03161461053f5760405162461bcd60e51b8152600401610536906127a9565b60405180910390fd5b6000828152609960205260409020600d81015461056c9063ffffffff80821691600160401b9004166127de565b81600d0160086101000a81548163ffffffff021916908363ffffffff16021790555060018160090160008282546105a39190612806565b909155505080546040516001600160a01b039091169084907f39e94fc57f494ff14c5e6240aaa121bb05346a3baf4434132df8f9075d587491906105e890869061281e565b60405180910390a3505050565b60a1546001600160a01b0316610609611c50565b6001600160a01b03161461062f5760405162461bcd60e51b8152600401610536906127a9565b609b805460a08190559082905560408051918252602082018390527f5215e49387517b606aec376216c289f200ca6ce6ff98bbbfd0976914cc2b3cfb910160405180910390a150565b6106806120be565b6000828152609f60205260409081902081518083019092528054829060ff1660028111156106b0576106b0612315565b60028111156106c1576106c1612315565b81526020016001820180546106d590612838565b80601f016020809104026020016040519081016040528092919081815260200182805461070190612838565b801561074e5780601f106107235761010080835404028352916020019161074e565b820191906000526020600020905b81548152906001019060200180831161073157829003601f168201915b5050505050815250509050919050565b600061076c60655460ff1690565b156107895760405162461bcd60e51b815260040161053690612873565b60048a10156107d05760405162461bcd60e51b815260206004820152601360248201527221494e56414c4944286173736574537065632960681b6044820152606401610536565b600682146108165760405162461bcd60e51b815260206004820152601360248201527221494e56414c4944287072696365537065632960681b6044820152606401610536565b609d5463ffffffff1683836000816108305761083061289d565b9050602002013510156108785760405162461bcd60e51b815260206004820152601060248201526f21494e56414c494428706572696f642960801b6044820152606401610536565b609c548383600181811061088e5761088e61289d565b9050602002013510156108d65760405162461bcd60e51b815260206004820152601060248201526f21494e56414c494428616d6f756e742960801b6044820152606401610536565b609e54838360038181106108ec576108ec61289d565b9050602002013510156109415760405162461bcd60e51b815260206004820152601860248201527f21494e56414c4944286d6178536c6970706167654270732900000000000000006044820152606401610536565b6109508787878e8e8e8e611c5f565b6109925760405162461bcd60e51b815260206004820152601360248201527221494e56414c4944286173736574537065632960681b6044820152606401610536565b600061099c611c50565b8888888f8f898943426040516020016109be9a999897969594939291906128e0565b60408051601f1981840301815291815281516020928301206000818152609990935291209091506109ed611c50565b81546001600160a01b03199081166001600160a01b039283161783556001830180549091169188169190911790558c8c600081610a2c57610a2c61289d565b9050602002016020810190610a4191906122a6565b6002820180546001600160a01b0319166001600160a01b03929092169190911790558c8c6001818110610a7657610a7661289d565b9050602002016020810190610a8b91906122a6565b8160030160006101000a8154816001600160a01b0302191690836001600160a01b031602179055508c8c6002908092610ac69392919061297a565b610ad491600e8401916120d9565b5084846001818110610ae857610ae861289d565b602002919091013560048301555084846002818110610b0957610b0961289d565b60200291909101356005830155508484600081610b2857610b2861289d565b9050602002013581600d0160006101000a81548163ffffffff021916908363ffffffff16021790555084846004818110610b6457610b6461289d565b6020029190910135600c8301555084846005818110610b8557610b8561289d565b6020029190910135600b8301555084846003818110610ba657610ba661289d565b6020029190910135600a83015550600d810180546bffffffffffffffff0000000019166401000000004263ffffffff1690810263ffffffff60401b191691909117600160401b91909102178082556001919060ff60601b1916600160601b8302179055506000828152609f6020526040902080548a90829060ff19166001836002811115610c3657610c36612315565b0217905550610c49600182018a8a61213c565b50609a6000610c56611c50565b6001600160a01b0390811682526020808301939093526040918201600090812080546001810182559082529390209092018590556098549051637d0c250f60e11b81526004810186905291169063fa184a1e90602401600060405180830381600087803b158015610cc657600080fd5b505af1158015610cda573d6000803e3d6000fd5b5060019250610ce7915050565b600d830154600160601b900460ff166004811115610d0757610d07612315565b14610d455760405162461bcd60e51b815260206004820152600e60248201526d21554e50524f4345535341424c4560901b6044820152606401610536565b8160080154600114610d8a5760405162461bcd60e51b815260206004820152600e60248201526d21554e50524f4345535341424c4560901b6044820152606401610536565b60018201548254600e840180546001600160a01b03938416939092169186917f9d1e5b985dd0611bc11e93d5075cdea08f64d1d51dd07489e6f288c20cd6669091600090610dda57610dda61289d565b600091825260209091200154600e870180546001600160a01b0390921691610e04906001906129a8565b81548110610e1457610e1461289d565b60009182526020918290200154600489015460058a0154600d8b0154604080516001600160a01b039788168152969094169486019490945291840152606083015263ffffffff16608082015260a00160405180910390a450909c9b505050505050505050505050565b610e85611c50565b6001600160a01b0316610ea06033546001600160a01b031690565b6001600160a01b031614610ec65760405162461bcd60e51b8152600401610536906129bf565b610ece611d85565b565b6098546001600160a01b0316610ee4611c50565b6001600160a01b031614610f0a5760405162461bcd60e51b8152600401610536906127a9565b60008281526099602052604090206003826003811115610f2c57610f2c612315565b1415610f8557600d8101805460ff60601b1916600160611b17905580546040516001600160a01b039091169084907f3d63c73b75a797c741bcfc0ae2644bc392388e97ea718a8731d44f47da2b23a490600090a3505050565b6001826003811115610f9957610f99612315565b1415610ff657600d810180546003919060ff60601b1916600160601b835b021790555080546040516001600160a01b039091169084907f5d3baeac0d91b82fe19cca4c28f0768ed59c65d7f64d48d53f166f9ec0f099c090600090a35b505050565b611003611c50565b6001600160a01b031661101e6033546001600160a01b031690565b6001600160a01b0316146110445760405162461bcd60e51b8152600401610536906129bf565b610ece6000611e1e565b611056611c50565b6001600160a01b03166110716033546001600160a01b031690565b6001600160a01b0316146110975760405162461bcd60e51b8152600401610536906129bf565b610ece611e70565b60008181526099602052604090205481906001600160a01b03166110c1611c50565b6001600160a01b0316146110e75760405162461bcd60e51b8152600401610536906127a9565b60655460ff161561110a5760405162461bcd60e51b815260040161053690612873565b60008281526099602052604090206001600d820154600160601b900460ff16600481111561113a5761113a612315565b148061116557506002600d820154600160601b900460ff16600481111561116357611163612315565b145b6111a45760405162461bcd60e51b815260206004820152601060248201526f21494e56414c4944287374617475732960801b6044820152606401610536565b600d810180546003919060ff60601b1916600160601b83610fb7565b6111c8611c50565b6001600160a01b03166111e36033546001600160a01b031690565b6001600160a01b0316146112095760405162461bcd60e51b8152600401610536906129bf565b609c55565b6112166121b0565b60008281526099602090815260409182902082516102408101845281546001600160a01b03908116825260018301548116938201939093526002820154831693810193909352600381015490911660608301526004808201546080840152600582015460a0840152600682015460c0840152600782015460e084015260088201546101008401526009820154610120840152600a820154610140840152600b820154610160840152600c820154610180840152600d82015463ffffffff8082166101a0860152640100000000820481166101c0860152600160401b8204166101e0850152610200840191600160601b90910460ff169081111561131b5761131b612315565b600481111561132c5761132c612315565b8152602001600e820180548060200260200160405190810160405280929190818152602001828054801561074e57602002820191906000526020600020905b81546001600160a01b0316815260019091019060200180831161136b575050505050815250509050919050565b600054610100900460ff166113b35760005460ff16156113b7565b303b155b61141a5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610536565b600054610100900460ff1615801561143c576000805461ffff19166101011790555b611444611ec9565b61144c611f00565b609b82905560a08290556001609c55609d805463ffffffff191662015180179055600a609e5561147a611c50565b60a180546001600160a01b0319166001600160a01b039290921691909117905580156114ac576000805461ff00191690555b5050565b60008181526099602052604090205481906001600160a01b03166114d2611c50565b6001600160a01b0316146114f85760405162461bcd60e51b8152600401610536906127a9565b60655460ff161561151b5760405162461bcd60e51b815260040161053690612873565b60008281526099602052604090206002600d820154600160601b900460ff16600481111561154b5761154b612315565b146115865760405162461bcd60e51b815260206004820152600b60248201526a085393d517d4105554d15160aa1b6044820152606401610536565b600d8101805460ff60601b1916600160601b179081905563ffffffff428116600160401b9092041610156115d557600d8101805463ffffffff60401b1916600160401b4263ffffffff16021790555b609854604051637d0c250f60e11b8152600481018590526001600160a01b039091169063fa184a1e90602401600060405180830381600087803b15801561161b57600080fd5b505af115801561162f573d6000803e3d6000fd5b505082546040516001600160a01b0390911692508591507f0d04c91a4cb25e87e66b2337207d34bd31384c15371c944d543b0d90c866e32c90600090a3505050565b6098546001600160a01b0316611685611c50565b6001600160a01b0316146116ab5760405162461bcd60e51b8152600401610536906127a9565b6000848152609960205260409020600d8101546116d89063ffffffff80821691600160401b9004166127de565b81600d0160086101000a81548163ffffffff021916908363ffffffff1602179055508381600601600082825461170e9190612806565b92505081905550828160070160008282546117299190612806565b9250508190555060018160080160008282546117459190612806565b9091555050805460408051868152602081018690529081018490526001600160a01b039091169086907f2cd977fbc4930a01c7a1d2d4f59916c67f5e443ee1b3efc3cf295b30b95499289060600160405180910390a3600081600501541180156117b757508060050154816006015410155b1561180b57600d8101805460ff60601b1916600160621b17905580546040516001600160a01b039091169086907fe91db046d37f56c01a0949ac11e488007e1e26ea683caaee32d54c4cea5d851b90600090a35b5050505050565b6001600160a01b0382166000908152609a6020526040812080548390811061183c5761183c61289d565b9060005260206000200154905092915050565b611857611c50565b6001600160a01b03166118726033546001600160a01b031690565b6001600160a01b0316146118985760405162461bcd60e51b8152600401610536906129bf565b60a180546001600160a01b0319166001600160a01b0383169081179091556040517f3a99482b294ac192dccc0f45604a8e3a48889930e9e8c089bb0f434bbfd1e55990600090a250565b60008181526099602052604090205481906001600160a01b0316611904611c50565b6001600160a01b03161461192a5760405162461bcd60e51b8152600401610536906127a9565b60655460ff161561194d5760405162461bcd60e51b815260040161053690612873565b60008281526099602052604090206001600d820154600160601b900460ff16600481111561197d5761197d612315565b146119b85760405162461bcd60e51b815260206004820152600b60248201526a214e4f545f41435449564560a81b6044820152606401610536565b600d8101805460ff60601b1916600160611b17905580546040516001600160a01b039091169084907f3d63c73b75a797c741bcfc0ae2644bc392388e97ea718a8731d44f47da2b23a490600090a3505050565b611a13611c50565b6001600160a01b0316611a2e6033546001600160a01b031690565b6001600160a01b031614611a545760405162461bcd60e51b8152600401610536906129bf565b609d805463ffffffff191663ffffffff92909216919091179055565b611a78611c50565b6001600160a01b0316611a936033546001600160a01b031690565b6001600160a01b031614611ab95760405162461bcd60e51b8152600401610536906129bf565b609880546001600160a01b0319166001600160a01b0392909216919091179055565b611ae3611c50565b6001600160a01b0316611afe6033546001600160a01b031690565b6001600160a01b031614611b245760405162461bcd60e51b8152600401610536906129bf565b609780546001600160a01b0319166001600160a01b03831617905550565b50565b611b4d611c50565b6001600160a01b0316611b686033546001600160a01b031690565b6001600160a01b031614611b8e5760405162461bcd60e51b8152600401610536906129bf565b609e55565b611b9b611c50565b6001600160a01b0316611bb66033546001600160a01b031690565b6001600160a01b031614611bdc5760405162461bcd60e51b8152600401610536906129bf565b6001600160a01b038116611c415760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610536565b611b4281611e1e565b3b151590565b6000611c5a611f37565b905090565b60008088888888886000818110611c7857611c7861289d565b9050602002016020810190611c8d91906122a6565b89896001818110611ca057611ca061289d565b9050602002016020810190611cb591906122a6565b611cc28a6002818e61297a565b604051602001611cd897969594939291906129f4565b604051602081830303815290604052805190602001209050611d3184848080602002602001604051908101604052809392919081815260200183836020028082843760009201919091525050609b549150849050611f6b565b80611d785750611d788484808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152505060a0549150849050611f6b565b9998505050505050505050565b60655460ff16611dce5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b6044820152606401610536565b6065805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa611e01611c50565b6040516001600160a01b03909116815260200160405180910390a1565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b60655460ff1615611e935760405162461bcd60e51b815260040161053690612873565b6065805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258611e01611c50565b600054610100900460ff16611ef05760405162461bcd60e51b815260040161053690612a92565b611ef8611f81565b610ece611fa8565b600054610100900460ff16611f275760405162461bcd60e51b815260040161053690612a92565b611f2f611f81565b610ece611fdf565b600060143610801590611f5457506097546001600160a01b031633145b15611f66575060131936013560601c90565b503390565b600082611f788584612012565b14949350505050565b600054610100900460ff16610ece5760405162461bcd60e51b815260040161053690612a92565b600054610100900460ff16611fcf5760405162461bcd60e51b815260040161053690612a92565b610ece611fda611c50565b611e1e565b600054610100900460ff166120065760405162461bcd60e51b815260040161053690612a92565b6065805460ff19169055565b600081815b84518110156120b65760008582815181106120345761203461289d565b602002602001015190508083116120765760408051602081018590529081018290526060016040516020818303038152906040528051906020012092506120a3565b60408051602081018390529081018490526060016040516020818303038152906040528051906020012092505b50806120ae81612add565b915050612017565b509392505050565b604080518082019091528060005b8152602001606081525090565b82805482825590600052602060002090810192821561212c579160200282015b8281111561212c5781546001600160a01b0319166001600160a01b038435161782556020909201916001909101906120f9565b50612138929150612275565b5090565b82805461214890612838565b90600052602060002090601f01602090048101928261216a576000855561212c565b82601f106121835782800160ff1982351617855561212c565b8280016001018555821561212c579182015b8281111561212c578235825591602001919060010190612195565b60405180610240016040528060006001600160a01b0316815260200160006001600160a01b0316815260200160006001600160a01b0316815260200160006001600160a01b03168152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600063ffffffff168152602001600063ffffffff168152602001600063ffffffff168152602001600060048111156120cc576120cc612315565b5b808211156121385760008155600101612276565b80356001600160a01b03811681146122a157600080fd5b919050565b6000602082840312156122b857600080fd5b6122c18261228a565b9392505050565b600080604083850312156122db57600080fd5b823591506020830135600681106122f157600080fd5b809150509250929050565b60006020828403121561230e57600080fd5b5035919050565b634e487b7160e01b600052602160045260246000fd5b6003811061233b5761233b612315565b9052565b6000815180845260005b8181101561236557602081850181015186830182015201612349565b81811115612377576000602083870101525b50601f01601f19169290920160200192915050565b6020815261239e60208201835161232b565b600060208301516040808401526123b8606084018261233f565b949350505050565b60008083601f8401126123d257600080fd5b50813567ffffffffffffffff8111156123ea57600080fd5b6020830191508360208260051b850101111561240557600080fd5b9250929050565b8035600381106122a157600080fd5b60008083601f84011261242d57600080fd5b50813567ffffffffffffffff81111561244557600080fd5b60208301915083602082850101111561240557600080fd5b60008060008060008060008060008060c08b8d03121561247c57600080fd5b8a3567ffffffffffffffff8082111561249457600080fd5b6124a08e838f016123c0565b909c509a5060208d01359150808211156124b957600080fd5b6124c58e838f016123c0565b909a5098508891506124d960408e0161240c565b975060608d01359150808211156124ef57600080fd5b6124fb8e838f0161241b565b909750955085915061250f60808e0161228a565b945060a08d013591508082111561252557600080fd5b506125328d828e016123c0565b915080935050809150509295989b9194979a5092959850565b6020815260006122c1602083018461233f565b6000806040838503121561257157600080fd5b823591506020830135600481106122f157600080fd5b6005811061233b5761233b612315565b600081518084526020808501945080840160005b838110156125d05781516001600160a01b0316875295820195908201906001016125ab565b509495945050505050565b602081526125f56020820183516001600160a01b03169052565b6000602083015161261160408401826001600160a01b03169052565b5060408301516001600160a01b03811660608401525060608301516001600160a01b038116608084015250608083015160a08381019190915283015160c08084019190915283015160e08084019190915283015161010080840191909152830151610120808401919091528301516101408084019190915283015161016080840191909152830151610180808401919091528301516101a0808401919091528301516101c06126c78185018363ffffffff169052565b84015190506101e06126e08482018363ffffffff169052565b84015190506102006126f98482018363ffffffff169052565b840151905061022061270d84820183612587565b8401516102408481015290506123b8610260840182612597565b6000806000806080858703121561273d57600080fd5b5050823594602084013594506040840135936060013592509050565b6000806040838503121561276c57600080fd5b6127758361228a565b946020939093013593505050565b60006020828403121561279557600080fd5b813563ffffffff811681146122c157600080fd5b60208082526005908201526404282aaa8960db1b604082015260600190565b634e487b7160e01b600052601160045260246000fd5b600063ffffffff8083168185168083038211156127fd576127fd6127c8565b01949350505050565b60008219821115612819576128196127c8565b500190565b602081016006831061283257612832612315565b91905290565b600181811c9082168061284c57607f821691505b6020821081141561286d57634e487b7160e01b600052602260045260246000fd5b50919050565b60208082526010908201526f14185d5cd8589b194e881c185d5cd95960821b604082015260600190565b634e487b7160e01b600052603260045260246000fd5b60006001600160fb1b038311156128c957600080fd5b8260051b8083863760009401938452509192915050565b6bffffffffffffffffffffffff198b60601b168152600060038b1061290757612907612315565b8a60f81b6014830152888a60158401376000828a0160150181815289915b89811015612953576001600160a01b0361293e8461228a565b16825260209283019290910190600101612925565b5061295f81888a6128b3565b95865250505050602082015260400198975050505050505050565b6000808585111561298a57600080fd5b8386111561299757600080fd5b5050600583901b0193919092039150565b6000828210156129ba576129ba6127c8565b500390565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b6129fe818961232b565b6000602060a0818401528760a0840152878960c0850137600060c089850181018290526001600160a01b0389811660408701528881166060870152601f8b01601f191686018681038301608088015291820187905287929160e0015b87831015612a815781612a6c8561228a565b16815292840192600192909201918401612a5a565b9d9c50505050505050505050505050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b6000600019821415612af157612af16127c8565b506001019056fea26469706673582212208cee799f46a4fd8c4076bb0ef609a904d6cd00b28c7387e043abe91d59fac5b864736f6c63430008090033",
  "linkReferences": {},
  "deployedLinkReferences": {}
}