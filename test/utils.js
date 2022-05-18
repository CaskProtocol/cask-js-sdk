import { expect } from 'chai';
import { ethers } from 'ethers';

import { CaskSDK } from "../src";

const day = 86400;
const month = (365/12) * day;

describe("Plan Utils", function () {

    it("Plan encoding and decoding works properly", async function () {

        const plan1 = CaskSDK.utils.encodePlanData(
            100,  // planId
            ethers.utils.parseUnits('10', 18), // price in base asset units
            month, // period (in seconds)
            7*day, // freeTrial (in seconds) - 0 = no trial
            500, // maxActive - 0 = unlimited
            12, // minPeriods - 0 = no minimum
            7, // gracePeriod - 0 = no grace period
            true, // canPause
            true // canTransfer
        );

        const decodedPlan1 = CaskSDK.utils.parsePlanData(plan1);

        expect(decodedPlan1.price.toString()).to.equal(ethers.utils.parseUnits('10', 18).toString());
        expect(decodedPlan1.planId).to.equal(100);
        expect(decodedPlan1.period).to.equal(month);
        expect(decodedPlan1.freeTrial).to.equal(7*day);
        expect(decodedPlan1.maxActive).to.equal(500);
        expect(decodedPlan1.minPeriods).to.equal(12);
        expect(decodedPlan1.gracePeriod).to.equal(7);
        expect(decodedPlan1.canPause).to.equal(true);
        expect(decodedPlan1.canTransfer).to.equal(true);

    });

    it("Discount encoding and decoding works properly", async function () {

        const discount1 = CaskSDK.utils.encodeDiscountData(
            1000,  // value - if isFixed is false, in bps percent; if isFixed is true, in base asset units
            day * 7, // validAfter - 0 = immediate
            month * 12, // expiresAt - 0 = never expires
            500, // maxUses - 0 = unlimited
            100, // planId - 0 = all plans
            12, // applyPeriods - 0 = unlimited
            1, // discountType - 1 = code, 2 = ERC20 balance
            false // isFixed - true for fixed price discount, false for percentage discount
        );

        const decodedDiscount1 = CaskSDK.utils.parseDiscountData(discount1);

        expect(decodedDiscount1.value.toString()).to.equal('1000');
        expect(decodedDiscount1.validAfter).to.equal(day * 7);
        expect(decodedDiscount1.expiresAt).to.equal(month * 12);
        expect(decodedDiscount1.maxRedemptions).to.equal(500);
        expect(decodedDiscount1.planId).to.equal(100);
        expect(decodedDiscount1.applyPeriods).to.equal(12);
        expect(decodedDiscount1.applyPeriods).to.equal(12);
        expect(decodedDiscount1.discountType).to.equal(1);
        expect(decodedDiscount1.isFixed).to.equal(false);

    });

});