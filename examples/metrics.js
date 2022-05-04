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
    environment: CaskSDK.environments.INTERNAL,
    logLevel: 'debug',
});

async function monthlyCommitment() {
    const now = Date.now() / 1000;
    const month = 30 * 86400;

    let totalCommitment = 0;
    const result = await cask.query.subscriptions({first: 100});
    const subscriptionList = result.data.caskSubscriptions;
    subscriptionList.forEach((subscription) => {
        if (subscription.status === 'Active') { // only active
            if (!subscription.cancelAt ||
                subscription.cancelAt > now + month)  // if cancels within the next month, dont include it
            {
                const monthlyCommitment = parseFloat(subscription.price) * (month / subscription.period);
                totalCommitment = totalCommitment + monthlyCommitment;
            }
        }
    });
    console.log(`Monthly Commitment: $${totalCommitment.toFixed(2)} across ${subscriptionList.length} subscriptions`);
}


async function monthlyRecurringRevenue() {
    const now = Date.now() / 1000;
    const month = 30 * 86400;

    let totalMrr = 0;
    const result = await cask.query.subscribers({first:500});
    const customerList = result.data.caskSubscriptions;
    customerList.forEach((subscription) => {
        if (subscription.status === 'Active') { // only active
            if (!subscription.cancelAt ||
                subscription.cancelAt > now + month)  // if cancels within the next month, dont include it
            {
                const monthlyRevenue =  parseFloat(subscription.price) * (month/subscription.period);
                totalMrr = totalMrr + monthlyRevenue;
            }
        }
    });
    console.log(`MRR: $${totalMrr.toFixed(2)} across ${customerList.length} subscriptions`);
}

(async () => {
    await cask.init();

    await monthlyCommitment();
    await monthlyRecurringRevenue();

    cask.stop();

})();