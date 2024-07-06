
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { describe } = require("mocha");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
describe('ArrayShift', function () {
    // async function deployContractArrayShift() {
    //     const ArrayShift = await ethers.getContractFactory("ArrayShift");
    //     const arrayShift = await ArrayShift.deploy();
    //     return { arrayShift };
    // }
    let arrayShift;
    beforeEach(async function () {
        const ArrayShift = await ethers.getContractFactory("ArrayShift");
        arrayShift = await ArrayShift.deploy();
    });

    it("array remove ", async function () {
        // const arrayShift = await loadFixture(deployContractArrayShift);
        await arrayShift.removeElement(1);
        const result = await arrayShift.getArray();
        expect(result).to.deep.equal([1, 3, 4, 5, 6]);
    });


    it("array gas lower remove ", async function () {
        // const arrayShift = await loadFixture(deployContractArrayShift);
        await arrayShift.lowerGasRemove(1);
        const result = await arrayShift.getArray();
        expect(result).to.deep.equal([1, 6, 3, 4, 5]);
    });

})
