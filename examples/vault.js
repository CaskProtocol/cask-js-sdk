require('dotenv').config();
const ethers = require('ethers');
const { CaskSDK } = require('../dist');


const ethersProvider = new ethers.providers.JsonRpcProvider(process.env.EXAMPLES_PROVIDER_URL);

const cask = new CaskSDK({
    connections: {
        signer: new ethers.Wallet(process.env.CONSUMER_WALLET_PK, ethersProvider),
    },
    ipfs: {
        pinataApiKey: process.env.PINATA_API_KEY,
        pinataApiSecret: process.env.PINATA_API_SECRET,
    },
    environment: CaskSDK.environments.TESTNET,
    logLevel: 'debug',
});


async function fundingSource() {

    const currentSource = await cask.vault.getFundingSource();
    console.log(`currentSource: ${JSON.stringify(currentSource, null, 2)}`);

    // const result = await cask.vault.setFundingSource({fundingSource: CaskSDK.fundingSource.PERSONAL, asset: 'USDT'});
    const result = await cask.vault.setFundingSource({fundingSource: CaskSDK.fundingSource.CASK});
    console.log(`Result: ${JSON.stringify(result, null, 2)}`);

    const newSource = await cask.vault.getFundingSource();
    console.log(`newSource: ${JSON.stringify(newSource, null, 2)}`);

}

async function deposit() {

    const depositAsset = 'USDT';
    const depositAmount = 190.50;

    let balance;

    balance = await cask.vault.balance();
    console.log(`Before deposit vault balance: ${balance} ${depositAsset}`);

    const asset = cask.vault.getAsset(depositAsset);
    const assetContract = CaskSDK.contracts.ERC20({tokenAddress: asset.address, provider: ethersProvider});
    balance = await assetContract.balanceOf(cask.vault.ethersConnection.address);
    balance = ethers.utils.formatUnits(balance, asset.assetDecimals);
    console.log(`Before deposit ${depositAsset} balance: ${balance}`);

    const quote = await cask.vault.quoteDeposit({asset: depositAsset, amountSimple: depositAmount})
    console.log(`Vault deposit quote: ${quote} USDC`);

    const depositResult = await cask.vault.approveAndDeposit({asset: depositAsset, amountSimple: depositAmount});
    const events = (await depositResult.tx.wait()).events || [];
    const event = events.find((e) => e.event === "AssetDeposited");
    console.log(`Event Args: ${JSON.stringify(event.args, null, 2)}`);

    balance = await cask.vault.balance();
    console.log(`After deposit vault balance: ${balance} USDC`);

    balance = await assetContract.balanceOf(cask.vault.ethersConnection.address);
    balance = ethers.utils.formatUnits(balance, asset.assetDecimals);
    console.log(`After deposit ${depositAsset} balance: ${balance}`);
}


async function withdraw() {

    const withdrawalAsset = 'USDT'; // receive value converted to this asset
    const withdrawalVaultAmount = 25.50; // of vault asset value

    let balance;

    balance = await cask.vault.balance();
    console.log(`Before withdraw vault balance: ${balance} USDC`);

    const asset = cask.vault.getAsset(withdrawalAsset);
    const assetContract = CaskSDK.contracts.ERC20({tokenAddress: asset.address, provider: ethersProvider});
    balance = await assetContract.balanceOf(cask.vault.ethersConnection.address);
    balance = ethers.utils.formatUnits(balance, asset.assetDecimals);
    console.log(`Before withdraw ${withdrawalAsset} balance: ${balance}`);

    balance = await cask.vault.quoteWithdrawal({asset: withdrawalAsset, amountSimple: withdrawalVaultAmount});
    console.log(`Withdrawal quote: ${balance} ${withdrawalAsset}`);

    await cask.vault.withdraw({asset: withdrawalAsset, amountSimple: withdrawalVaultAmount});

    balance = await cask.vault.balance();
    console.log(`After withdraw vault balance: ${balance} USDC`);

    balance = await assetContract.balanceOf(cask.vault.ethersConnection.address);
    balance = ethers.utils.formatUnits(balance, asset.assetDecimals);
    console.log(`After withdraw ${withdrawalAsset} balance: ${balance}`);
}

async function allowance() {

    const asset = 'DAI';

    const allowance = await cask.vault.allowance({asset, units: CaskSDK.units.SIMPLE});
    console.log(`Allowance of ${asset}: ${allowance}`);

}

async function balance() {
    console.log(`Balance is ${await cask.vault.balance()}`);
}

(async () => {
    await cask.init();

    // await fundingSource();
    // await deposit();
    // await withdraw();
    // await allowance();
    await balance();

    cask.stop();
})();