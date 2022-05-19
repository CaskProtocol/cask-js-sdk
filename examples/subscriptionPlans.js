require('dotenv').config();
const ethers = require('ethers');
const { CaskSDK } = require('../dist');


const ethersProvider = new ethers.providers.JsonRpcProvider(process.env.EXAMPLES_PROVIDER_URL);

const cask = new CaskSDK({
    connections: {
        signer: new ethers.Wallet(process.env.PROVIDER_WALLET_PK, ethersProvider),
    },
    ipfs: {
        pinataApiKey: process.env.PINATA_API_KEY,
        pinataApiSecret: process.env.PINATA_API_SECRET,
    },
    environment: CaskSDK.environments.DEVELOPMENT,
    logLevel: 'debug',
});

async function publishProfile() {

    const providerProfile = await cask.subscriptionPlans.loadProfile();
    console.log(`Provider ${cask.ethersConnection.address} profile CID before ${providerProfile.cid}`);

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

    providerProfile.setPlan({
        planId: 101,
        name: "Platinum",
        priceSimple: 20.45,
        period: CaskSDK.units.period.week,
        metadata: {
            internalId: 1234,
        }
    });

    providerProfile.setDiscount({
        discountERC20Address: '0x3f249f398D5aa6f528B97293ff8EDc2e0E0Ca54B', // mockERC20 dev token
        discountERC20Decimals: 18,
        discountERC20MinBalance: 10,
        value: 5000, // 50%,
    });

    providerProfile.setDiscount({
        discountNFTAddress: '0xE5f04D368bED555D378563e36AcF39F3D4931139', // mock NFT dev token
        value: 5000, // 50%,
    });



    const tx = await cask.subscriptionPlans.publishProfile();

    console.log(`Provider ${cask.ethersConnection.address} profile CID now ${providerProfile.cid}`);

}

async function addPlanAndPublishProfile() {

    const providerProfile = await cask.subscriptionPlans.loadProfile();
    console.log(`Provider ${cask.ethersConnection.address} profile CID loaded ${providerProfile.cid}`);

    const plan = providerProfile.getPlan(100);
    providerProfile.setPlan({
        ...plan,
        name: "New Gold",
        priceSimple: 33.44
    });

    providerProfile.setPlan({
        planId: 102,
        name: "Unobtainium",
        price: '45250000',
        period: CaskSDK.units.period.week,
    });

    const tx = await cask.subscriptionPlans.publishProfile();

    console.log(`Provider ${cask.ethersConnection.address} profile CID now ${providerProfile.cid}`);

}

async function loadProfile() {

    const providerProfile = await cask.subscriptionPlans.loadProfile();
    console.log(`Provider ${cask.ethersConnection.address} profile ${JSON.stringify(providerProfile.asProfileObject(), null, 2)}`);

    const planInfo = providerProfile.getPlan(100);
    console.log(`Plan Info: ${JSON.stringify(planInfo, null, 2)}`);
    console.log(`Price: ${planInfo.price} per ${CaskSDK.units.humanizePeriod(planInfo.period)}`);

    const status = await cask.subscriptionPlans.planStatus(100);
    console.log(`Plan 100 status is ${status}`);
}


(async () => {
    await cask.init();

    await publishProfile();
    // await addPlanAndPublishProfile();
    await loadProfile();

    cask.stop();
})();