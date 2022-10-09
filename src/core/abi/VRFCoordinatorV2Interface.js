export default {
    abi: [
        {
            "inputs": [
                {
                    "internalType": "uint64",
                    "name": "subId",
                    "type": "uint64"
                }
            ],
            "name": "acceptSubscriptionOwnerTransfer",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint64",
                    "name": "subId",
                    "type": "uint64"
                },
                {
                    "internalType": "address",
                    "name": "consumer",
                    "type": "address"
                }
            ],
            "name": "addConsumer",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint64",
                    "name": "subId",
                    "type": "uint64"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "cancelSubscription",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "createSubscription",
            "outputs": [
                {
                    "internalType": "uint64",
                    "name": "subId",
                    "type": "uint64"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getRequestConfig",
            "outputs": [
                {
                    "internalType": "uint16",
                    "name": "",
                    "type": "uint16"
                },
                {
                    "internalType": "uint32",
                    "name": "",
                    "type": "uint32"
                },
                {
                    "internalType": "bytes32[]",
                    "name": "",
                    "type": "bytes32[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint64",
                    "name": "subId",
                    "type": "uint64"
                }
            ],
            "name": "getSubscription",
            "outputs": [
                {
                    "internalType": "uint96",
                    "name": "balance",
                    "type": "uint96"
                },
                {
                    "internalType": "uint64",
                    "name": "reqCount",
                    "type": "uint64"
                },
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address[]",
                    "name": "consumers",
                    "type": "address[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint64",
                    "name": "subId",
                    "type": "uint64"
                },
                {
                    "internalType": "address",
                    "name": "consumer",
                    "type": "address"
                }
            ],
            "name": "removeConsumer",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "keyHash",
                    "type": "bytes32"
                },
                {
                    "internalType": "uint64",
                    "name": "subId",
                    "type": "uint64"
                },
                {
                    "internalType": "uint16",
                    "name": "minimumRequestConfirmations",
                    "type": "uint16"
                },
                {
                    "internalType": "uint32",
                    "name": "callbackGasLimit",
                    "type": "uint32"
                },
                {
                    "internalType": "uint32",
                    "name": "numWords",
                    "type": "uint32"
                }
            ],
            "name": "requestRandomWords",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "requestId",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint64",
                    "name": "subId",
                    "type": "uint64"
                },
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "requestSubscriptionOwnerTransfer",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
}