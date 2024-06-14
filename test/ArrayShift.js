const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { describe } = require("mocha");

describe('ArrayShift', function () {

    let arrayShift;
    beforeEach(async function () {
        const ArrayShift = await ethers.getContractFactory("ArrayShift");
        arrayShift = await ArrayShift.deploy();
    });

    it("array remove ", async function () {
        await arrayShift.removeElement(1);
        const result = await arrayShift.getArray();
        expect(result).to.deep.equal([1, 3, 4, 5, 5]);
    });


    it("array gas lower remove ", async function () {
        await arrayShift.lowerGasRemove(1);
        const result = await arrayShift.getArray();
        expect(result).to.deep.equal([1, 5, 3, 4, 5]);
    });

})
