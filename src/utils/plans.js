import { ethers } from "ethers";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { v4 as uuidv4 } from 'uuid';

/**
 * Encode a subscription plan into the raw format expected by the contracts.
 * @memberOf CaskSDK.utils
 * @param planId
 * @param price
 * @param period
 * @param freeTrial
 * @param maxActive
 * @param minPeriods
 * @param gracePeriod
 * @param canPause
 * @param canTransfer
 * @returns {string} bytes32 encoded data
 *
 */
function encodePlanData(planId, price, period, freeTrial, maxActive, minPeriods, gracePeriod, canPause, canTransfer) {
    if (typeof(price) == 'string') {
        price = ethers.BigNumber.from(price);
    }
    const options =
        (canTransfer ? 1 : 0) << 1 |
        (canPause ? 1 : 0);

    return ethers.utils.hexlify([
        ...ethers.utils.zeroPad(price, 12),
        ...ethers.utils.zeroPad(planId, 4),
        ...ethers.utils.zeroPad(period, 4),
        ...ethers.utils.zeroPad(freeTrial, 4),
        ...ethers.utils.zeroPad(maxActive, 4),
        ...ethers.utils.zeroPad(minPeriods, 2),
        ...ethers.utils.zeroPad(gracePeriod, 1),
        ...ethers.utils.zeroPad(options, 1)
    ]);
}

/**
 * Parses a packed plan data bytes32 value into a plan Object.
 * @memberOf CaskSDK.utils
 * @param planData
 * @returns {Plan} The decoded plan
 */
function parsePlanData(planData) {
    const options = parseInt(ethers.utils.hexDataSlice(planData, 31, 32)); // 1 byte (at the end)

    return {
        price: ethers.BigNumber.from(ethers.utils.hexDataSlice(planData, 0, 12)), // 12 bytes
        planId: parseInt(ethers.utils.hexDataSlice(planData, 12, 16)), // 4 bytes
        period: parseInt(ethers.utils.hexDataSlice(planData, 16, 20)), // 4 bytes
        freeTrial: parseInt(ethers.utils.hexDataSlice(planData, 20, 24)), // 4 bytes
        maxActive: parseInt(ethers.utils.hexDataSlice(planData, 24, 28)), // 4 bytes
        minPeriods: parseInt(ethers.utils.hexDataSlice(planData, 28, 30)), // 2 bytes
        gracePeriod: parseInt(ethers.utils.hexDataSlice(planData, 30, 31)), // 1 byte
        canPause: (options & 0x0001) === 0x01,
        canTransfer: (options & 0x0002) === 0x02,
    }
}

function plansMap(plansList) {
    return plansList.reduce((map, plan) => {
        map[plan.planId] = {
            ...parsePlanData(plan.planData),
            ...plan
        }
        map[plan.planId].price = map[plan.planId].price.toString();
        map[plan.planId].name = map[plan.planId].name || `Plan ${map[plan.planId].planId}`;
        return map;
    }, {});
}

function plansList(plansMap) {
    return Object.values(plansMap);
}

function discountsMap(discountsList) {
    return discountsList.reduce( (map, discount) => {
        map[discount.discountId] = {
            ...parseDiscountData(discount.discountData),
            ...discount
        }
        map[discount.discountId].value = map[discount.discountId].value.toString();
        return map;
    }, {});
}

function discountsList(discountsMap) {
    return Object.values(discountsMap);
}

function _plansMerkleLeafHash(plan) {

    let planData = plan.planData;
    if (!planData) {
        planData = encodePlanData(
            plan.planId,
            ethers.BigNumber.from(plan.price),
            plan.period,
            plan.freeTrial,
            plan.maxActive,
            plan.minPeriods,
            plan.gracePeriod,
            plan.canPause,
            plan.canTransfer);
    }

    return ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(
        [ "bytes32"],
        [ planData]
    ));
}

function _plansMerkleTree(plansList) {
    const elements = plansList.map((plan) => _plansMerkleLeafHash(plan));
    return new MerkleTree(elements, keccak256, { sort: true });
}

function plansMerkleRoot(plansList) {
    const merkleTree = _plansMerkleTree(plansList);
    return merkleTree.getHexRoot();
}

function plansMerkleProof(plansList, plan) {
    const merkleTree = _plansMerkleTree(plansList);
    return merkleTree.getHexProof(_plansMerkleLeafHash(plan));
}

function generatePlanProof(providerAddress, ref, planData, merkleRoot, merkleProof) {
    return [
        ethers.utils.hexZeroPad(providerAddress, 32),
        ethers.utils.hexZeroPad(ref, 32),
        planData,
        merkleRoot,
        ...merkleProof
    ];
}

function encodeNetworkData(networkAddress, feeBps) {

    return ethers.utils.hexlify([
        ...ethers.utils.zeroPad(networkAddress, 20),
        ...ethers.utils.zeroPad(feeBps, 2),
        ...ethers.utils.zeroPad(0, 10), // reserved
    ]);
}

function parseNetworkData(networkData) {
    return {
        networkAddress: ethers.utils.getAddress(ethers.utils.hexDataSlice(networkData, 0, 20)), // 20 bytes
        feeBps: parseInt(ethers.utils.hexDataSlice(networkData, 20, 22)), // 2 bytes
    }
}

function encodeDiscountData(value, validAfter, expiresAt, maxRedemptions, planId, applyPeriods, discountType, isFixed) {
    const options =
        (isFixed ? 1 : 0);

    return ethers.utils.hexlify([
        ...ethers.utils.zeroPad(value, 12),
        ...ethers.utils.zeroPad(validAfter, 4),
        ...ethers.utils.zeroPad(expiresAt, 4),
        ...ethers.utils.zeroPad(maxRedemptions, 4),
        ...ethers.utils.zeroPad(planId, 4),
        ...ethers.utils.zeroPad(applyPeriods, 2),
        ...ethers.utils.zeroPad(options, 1),
        ...ethers.utils.zeroPad(discountType, 1),
    ]);
}

function parseDiscountData(discountData) {
    const options = parseInt(ethers.utils.hexDataSlice(discountData, 30, 31)); // 1 bytes

    return {
        value: ethers.BigNumber.from(ethers.utils.hexDataSlice(discountData, 0, 12)), // 12 bytes
        validAfter: parseInt(ethers.utils.hexDataSlice(discountData, 12, 16)), // 4 bytes
        expiresAt: parseInt(ethers.utils.hexDataSlice(discountData, 16, 20)), // 4 bytes
        maxRedemptions: parseInt(ethers.utils.hexDataSlice(discountData, 20, 24)), // 4 bytes
        planId: parseInt(ethers.utils.hexDataSlice(discountData, 24, 28)), // 4 bytes
        applyPeriods: parseInt(ethers.utils.hexDataSlice(discountData, 28, 30)), // 2 bytes
        discountType: parseInt(ethers.utils.hexDataSlice(discountData, 31, 32)), // 2 bytes
        isFixed: (options & 0x01) === 0x01,
    }
}

function generateERC20DiscountValidator(address, decimals=0, minBalance=1) {
    return ethers.utils.hexlify([
        ...ethers.utils.zeroPad(address, 20),
        ...ethers.utils.zeroPad(decimals, 1),
        ...ethers.utils.zeroPad(0, 3),  // reserved
        ...ethers.utils.zeroPad(minBalance, 8),
    ]);
}

function parseERC20DiscountValidator(validatorData) {
    return {
        address: ethers.utils.getAddress(ethers.utils.hexDataSlice(validatorData, 0, 20)), // 20 bytes
        decimals: parseInt(ethers.utils.hexDataSlice(validatorData, 20, 21)), // 1 byte
        minBalance: parseInt(ethers.utils.hexDataSlice(validatorData, 24, 32)), // 8 bytes
    }
}

function generateDiscountId(code) {
    return ethers.utils.keccak256(generateDiscountCodeValidator(code));
}

function generateDiscountCodeValidator(code) {
    return ethers.utils.id(code.toUpperCase());
}

function _discountsMerkleLeafHash(discount) {
    let discountId = discount.discountId;
    if (!discountId) {
        discountId = generateDiscountId(discount.discountCode);
    }
    let discountData = discount.discountData;
    if (!discountData) {
        discountData = encodeDiscountData(
            discount.value,
            discount.validAfter,
            discount.expiresAt,
            discount.maxUses,
            discount.planId,
            discount.applyPeriods,
            discount.discountType,
            discount.isFixed);
    }

    return ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(
        [ "bytes32", "bytes32" ],
        [ discountId, discountData ]
    ));
}

function _discountsMerkleTree(discountsList) {
    const elements = discountsList.map((discount) => _discountsMerkleLeafHash(discount));
    return new MerkleTree(elements, keccak256, { sort: true });
}

function discountsMerkleRoot(discountsList) {
    const merkleTree = _discountsMerkleTree(discountsList);
    return ethers.utils.hexZeroPad(merkleTree.getHexRoot(), 32);
}

function discountsMerkleProof(discountsList, discount) {
    const merkleTree = _discountsMerkleTree(discountsList);
    return merkleTree.getHexProof(_discountsMerkleLeafHash(discount));
}

function generateDiscountProof(discountValidator, discountData, merkleRoot, merkleProof=[]) {
    return [
        ethers.utils.hexZeroPad(discountValidator, 32),
        ethers.utils.hexZeroPad(discountData, 32),
        ethers.utils.hexZeroPad(merkleRoot, 32),
        ...merkleProof
    ];
}

function lookupCodeDiscount(discountCodeValidator, discountsList) {
    const discountId = ethers.utils.keccak256(discountCodeValidator);
    return discountsList.find((d) => d.discountId === discountId);
}

function generateMerkleCommitment(nonce, plansMerkleRoot, discountsMerkleRoot) {
    const payload = ethers.utils.defaultAbiCoder.encode(
        [ "uint256", "bytes32", "bytes32" ],
        [ nonce, plansMerkleRoot, discountsMerkleRoot ]);
    return ethers.utils.arrayify(ethers.utils.keccak256(payload))
}

async function signMerkleRoots(signer, nonce, plansMerkleRoot, discountsMerkleRoot) {
    return signer.signMessage(generateMerkleCommitment(nonce, plansMerkleRoot, discountsMerkleRoot));
}

function stringToRef(string) {
    return ethers.utils.formatBytes32String(string);
}

function refToString(ref) {
    return ethers.utils.parseBytes32String(ref);
}

function numberStringToRef(numberString) {
    return ethers.utils.hexZeroPad(ethers.utils.hexValue(ethers.BigNumber.from(numberString)), 32)
}

function refToNumberString(ref) {
    return ethers.BigNumber.from(ref).toString();
}

function uuidToRef(uuid) {
    return ethers.utils.hexZeroPad(ethers.utils.hexValue(uuidv4.parse(uuid)), 32)
}

function refToUuid(ref) {
    return uuidv4.stringify(ethers.utils.arrayify(ethers.utils.hexDataSlice(ref, 16, 32)));
}

export default {
    // plans helpers
    encodePlanData,
    parsePlanData,
    plansMap,
    plansList,
    discountsMap,
    discountsList,
    plansMerkleRoot,
    plansMerkleProof,
    generatePlanProof,

    // network helpers
    encodeNetworkData,
    parseNetworkData,

    // discounts helpers
    encodeDiscountData,
    parseDiscountData,
    generateERC20DiscountValidator,
    parseERC20DiscountValidator,
    generateDiscountId,
    generateDiscountCodeValidator,
    discountsMerkleRoot,
    discountsMerkleProof,
    generateDiscountProof,
    lookupCodeDiscount,

    // signature helpers
    generateMerkleCommitment,
    signMerkleRoots,

    // ref helpers
    stringToRef,
    refToString,
    numberStringToRef,
    refToNumberString,
    uuidToRef,
    refToUuid,
}