## Example - Provider Side

```javascript
const cask = require('@caskprotocol/sdk');
const ethers = require('ethers');

const day = 86400;
const month = (365/12) * day;

const provider = ...; // provider ethers object from connected wallet

// set up plan data
const plan1 = cask.utils.encodePlanData(100, ethers.utils.parseUnits('10', 18), month, 7*day, 0, 0, 7, true, true);
const plan2 = cask.utils.encodePlanData(101, ethers.utils.parseUnits('20', 18), month, 7*day, 0, 0, 7, true, true);
const plan3 = cask.utils.encodePlanData(102, ethers.utils.parseUnits('30', 18), month, 7*day, 0, 0, 7, true, true);
const plan4 = cask.utils.encodePlanData(103, ethers.utils.parseUnits('40', 18), month, 7*day, 0, 0, 7, true, true);

// plan merkle tree
const plans = [
    { planId: 100, planData: plan1 },
    { planId: 101, planData: plan2 },
    { planId: 102, planData: plan3 },
    { planId: 103, planData: plan4 },
];


// set up discounts data
const discount1 = cask.utils.encodeDiscountData(2000, 0, 0, 0, 100, false);
const discount2 = cask.utils.encodeDiscountData(500, 0, 0, 0, 101, false);

// discounts merkle tree
const discounts = [
  {discountId: cask.utils.generateDiscountId('SUMMER20'), discountData: discount1},
  {discountId: cask.utils.generateDiscountId('ABC123'), discountData: discount1},
  {discountId: cask.utils.generateDiscountId('SUMMER5'), discountData: discount2},
  {discountId: cask.utils.generateDiscountId('XYZ'), discountData: discount2},
]

// generate roots and signature
const plansRoot = cask.utils.plansMerkleRoot(plans);
const discountsRoot = cask.utils.discountsMerkleRoot(discounts);
const signedRoots = await cask.utils.signMerkleRoots(provider, plansRoot, discountsRoot);

// Save "plans" merkle tree, "discounts" merkle tree, "plansRoot", "discountsRoot" 
// and "signedRoots" to provider IPFS profile data...

```


## Example - Consumer Side

```javascript
const cask = require('@caskprotocol/sdk');
const ethers = require('ethers');

// Get "plans" merkle tree, "discounts" merkle tree, "plansRoot", "discountsRoot" 
// and "signedRoots" from provider IPFS profile data... 
const plans = ...;
const discounts = ...;
const plansRoot = ...;
const discountsRoot = ...;
const signedRoots = ...;


// get plan being signed up for from merkle tree by its planId
const plan = plans.find((p) => p.planId === 100);


// internal reference ID providers can supply to widget for this consumer to assist in matching on-chain events
// to their internal database data
const ref = cask.utils.stringToRef("123456789");


// generate plan proof needed for creating a subscription
const plansProof = cask.utils.generatePlanProof(provider.address, ref, plan.planData, plansRoot, 
        cask.utils.plansMerkleProof(plans, plan));

// generate discount proof needed for creating a subscription, if the discount is valid
const discountCodeProof = cask.utils.generateDiscountCodeProof("SUMMER20");
const discount = cask.utils.lookupDiscount(discountCodeProof, discounts);
let discountProof = [];
if (discount) {  // does discount exist?
  discountProof = cask.utils.generateDiscountProof(discountCodeProof, discount.discountData, discountsRoot,
          cask.utils.discountsMerkleProof(discounts, discount));
} else {
  discountProof = cask.utils.generateDiscountProof(0, 0, discountsRoot); // empty proof for no discount
}

// call createSubscription on CaskSubscriptions contract as the consumer
const tx = await subscriptionContract.createSubscription(
        plansProof, // planProof
        discountProof, // discountProof
        0, // cancelAt
        signedRoots, // providerSignature
        "" // ipfs cid
);

```
