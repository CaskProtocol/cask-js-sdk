require('dotenv').config();
const { expect } = require('chai');
const { ethers } = require('ethers');

const { testConsumerWallet, testProviderWallet } = require("./helpers/wallets");
const { CaskSDK } = require('..');

const caskConsumer = new CaskSDK({
    connections: {
        signer: testConsumerWallet(0, 'http://127.0.0.1:8545'),
    },
    ipfs: {
        pinataApiKey: process.env.PINATA_API_KEY,
        pinataApiSecret: process.env.PINATA_API_SECRET,
    },
    environment: CaskSDK.environments.DEVELOPMENT,
    defaultUnits: CaskSDK.units.ASSET,
});

const caskProvider = new CaskSDK({
    connections: {
        signer: testProviderWallet(0, 'http://127.0.0.1:8545'),
    },
    ipfs: {
        pinataApiKey: process.env.PINATA_API_KEY,
        pinataApiSecret: process.env.PINATA_API_SECRET,
    },
    environment: CaskSDK.environments.DEVELOPMENT,
    defaultUnits: CaskSDK.units.ASSET,
});


describe("Subscriptions", function () {

    it("End to end subscription creation works", async function () {

        // establish provider profile

        await caskProvider.init();

        // make sure plan 100 for provider exists and is published
        const providerProfile = await caskProvider.subscriptionPlans.loadProfile();
        providerProfile.setMetadata({
            name: "Acme Co",
            iconUrl: "https://uploads-ssl.webflow.com/621d95f4db3c83a0dbe84889/6221292671dd275593b129e8_traderwit-icon.png",
        });
        providerProfile.setPlan({
            planId: 100,
            name: "Gold",
            priceSimple: 10.45,
            period: CaskSDK.units.period.week
        });
        await caskProvider.subscriptionPlans.publishProfile();
        expect(providerProfile.cid).to.not.be.undefined;

        caskProvider.stop();


        // create consumer subscription

        await caskConsumer.init();

        // make sure consumer has enough balance for subscription
        await caskConsumer.vault.approveAndDeposit({asset: 'USDC', amountSimple: 25.00});

        const provider = testProviderWallet().address;

        // create subscription
        const resp = await caskConsumer.subscriptions.create({provider, planId: 100});

        // get newly created subscription
        const subscriptionInfo = await caskConsumer.subscriptions.get(resp.subscriptionId);

        expect(resp.subscriptionId).to.equal(subscriptionInfo.subscriptionId);

        expect(subscriptionInfo.planId).to.equal(100);
        expect(subscriptionInfo.consumer).to.equal(caskConsumer.subscriptions.ethersConnection.address);
        expect(subscriptionInfo.provider).to.equal(provider);
        expect(subscriptionInfo.status).to.equal(2); // SubscriptionStatus.ACTIVE

        caskConsumer.stop();
    });


});
