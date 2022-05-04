import { ethers } from 'ethers';

const mnemonic = "dolphin capable patient jump first clip argue wink upon kiss bring laundry";

export function testConsumerWallet(i=0, url="http://127.0.0.1:8545") {
    const wallet = new ethers.Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/${i+4}`);
    return wallet.connect(new ethers.providers.JsonRpcProvider(url));
}

export function testProviderWallet(i=0, url="http://127.0.0.1:8545") {
    const wallet = new ethers.Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/${i+7}`);
    return wallet.connect(new ethers.providers.JsonRpcProvider(url));
}