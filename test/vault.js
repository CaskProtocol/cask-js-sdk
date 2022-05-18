require('dotenv').config();
const { expect } = require('chai');
const { ethers } = require('ethers');

const { testConsumerWallet} = require("./helpers/wallets");
const { CaskSDK } = require('..');

const cask = new CaskSDK({
    connections: {
        signer: testConsumerWallet(0),
    },
    ipfs: {
        provider: CaskSDK.ipfs.providers.NONE,
    },
    environment: CaskSDK.environments.DEVELOPMENT,
    defaultUnits: CaskSDK.units.ASSET,
});


describe("Vault", function () {

    it("Deposit USDC works properly", async function () {
        await cask.init();

        const amountSimple = 30.00;

        const initialBalance = await cask.vault.balance();
        await cask.vault.approveAndDeposit({asset: 'USDC', amountSimple});
        const newBalance = await cask.vault.balance();

        const expectedDepositCredit = ethers.utils.parseUnits(amountSimple.toString(), cask.vault.baseAsset.assetDecimals);

        const expectedBalance = ethers.BigNumber.from(initialBalance)
            .add(expectedDepositCredit).toString()

        expect(expectedBalance).to.equal(newBalance);
    });

    it("Deposit non-USDC works properly", async function () {
        await cask.init();

        const initialBalance = await cask.vault.balance({units: CaskSDK.units.SIMPLE});

        const DAI = cask.vault.getAsset('DAI');
        const amountSimple = 30.00;

        const quote = await cask.vault.quoteDeposit({asset: DAI, amountSimple, units: CaskSDK.units.SIMPLE})
        await cask.vault.approveAndDeposit({asset: DAI, amountSimple});
        const newBalance = await cask.vault.balance({units: CaskSDK.units.SIMPLE});

        // consumer will own 100% of vault, so slippage fees effectly get credited to the
        // consumer - so just make sure they got 'at least' the quote amount
        expect(newBalance).to.be.greaterThanOrEqual(initialBalance + quote);
    });

});