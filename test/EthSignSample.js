const { expect } = require("chai");
const { ethers } = require("hardhat");
const { describe, it } = require("mocha");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
//0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199 address
//0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e privateKey
describe('EthSignSample', function () {
    // async function deployContractArrayShift() {
    //     const ArrayShift = await ethers.getContractFactory("ArrayShift");
    //     const arrayShift = await ArrayShift.deploy();
    //     return { arrayShift };
    // }
    let ethSignSample;
    let signature;
    let wallet;
    let msgHash;

    beforeEach(async function () {
        const EthSignSample = await ethers.getContractFactory("EthSignSample");
        ethSignSample = await EthSignSample.deploy();

        // 等效于Solidity中的keccak256(abi.encodePacked(account, tokenId))
        msgHash = ethers.solidityPackedKeccak256(
            ['address', 'uint256'],
            ['0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', '0'])
        console.log(`msgHash：${msgHash}`)
        //msgHash：0x0655204d83ff43e43a236f18cc31fd00ef9b6512f08220327c9bd631ca9961bd
        const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
        const privateKey = '0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e'
        wallet = new ethers.Wallet(privateKey, provider)
        const messageHashBytes = ethers.getBytes(msgHash)
        console.log(`messageHashBytes：${messageHashBytes}`)

        signature = await wallet.signMessage(messageHashBytes);
        console.log(`签名：${signature}`)
        //签名：0x5939fdabd93f5e0d138a6b5ff7b16d6826185d7e6e13192e8e8653f7b3596b0b48105c7c0f53d447b74c34d6296710c0deb79d4f08e3b3e31e1bb7e3c3982e171c

    });

    it("MsgHash", async function () {
        const msgHash_ = await ethSignSample.getMessageHash('0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', '0');
        console.log(`---msgHash：----- ${msgHash_}`)
        expect(msgHash).to.equal(msgHash_);
    });


    it("toEthSignedMessageHash and verify recover", async function () {
        const ethSignedMessageHash = await ethSignSample.toEthSignedMessageHash(msgHash);
        console.log(`以太坊消息签名消息：${ethSignedMessageHash}`)
        const verify = await ethSignSample.verify(ethSignedMessageHash, signature, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199');
        console.log(`verify is ,${verify}`);

    });




})