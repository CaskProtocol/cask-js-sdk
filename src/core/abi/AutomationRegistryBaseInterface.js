export default {
    abi: [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "uint96",
                    "name": "amount",
                    "type": "uint96"
                }
            ],
            "name": "addFunds",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "cancelUpkeep",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getCanceledUpkeepList",
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
            "inputs": [],
            "name": "getConfig",
            "outputs": [
                {
                    "internalType": "uint32",
                    "name": "paymentPremiumPPB",
                    "type": "uint32"
                },
                {
                    "internalType": "uint24",
                    "name": "checkFrequencyBlocks",
                    "type": "uint24"
                },
                {
                    "internalType": "uint32",
                    "name": "checkGasLimit",
                    "type": "uint32"
                },
                {
                    "internalType": "uint24",
                    "name": "stalenessSeconds",
                    "type": "uint24"
                },
                {
                    "internalType": "uint16",
                    "name": "gasCeilingMultiplier",
                    "type": "uint16"
                },
                {
                    "internalType": "uint256",
                    "name": "fallbackGasPrice",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "fallbackLinkPrice",
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
                    "name": "query",
                    "type": "address"
                }
            ],
            "name": "getKeeperInfo",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "payee",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "active",
                    "type": "bool"
                },
                {
                    "internalType": "uint96",
                    "name": "balance",
                    "type": "uint96"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getKeeperList",
            "outputs": [
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "getUpkeep",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "target",
                    "type": "address"
                },
                {
                    "internalType": "uint32",
                    "name": "executeGas",
                    "type": "uint32"
                },
                {
                    "internalType": "bytes",
                    "name": "checkData",
                    "type": "bytes"
                },
                {
                    "internalType": "uint96",
                    "name": "balance",
                    "type": "uint96"
                },
                {
                    "internalType": "address",
                    "name": "lastKeeper",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "admin",
                    "type": "address"
                },
                {
                    "internalType": "uint64",
                    "name": "maxValidBlocknumber",
                    "type": "uint64"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getUpkeepCount",
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
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "performData",
                    "type": "bytes"
                }
            ],
            "name": "performUpkeep",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "success",
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
                    "name": "target",
                    "type": "address"
                },
                {
                    "internalType": "uint32",
                    "name": "gasLimit",
                    "type": "uint32"
                },
                {
                    "internalType": "address",
                    "name": "admin",
                    "type": "address"
                },
                {
                    "internalType": "bytes",
                    "name": "checkData",
                    "type": "bytes"
                }
            ],
            "name": "registerUpkeep",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
};