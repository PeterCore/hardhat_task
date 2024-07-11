const { expect } = require("chai");
const { ethers } = require("hardhat");
const { describe, it } = require("mocha");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
//0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199 address
//0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e privateKey
describe('EthSignSample', function () {
    let ethSignSample;
    let signature;
    let wallet;
    let msgHash;

    beforeEach(async function () {
        const EthSignSample = await ethers.getContractFactory("EthSignSample");
        ethSignSample = await EthSignSample.deploy();

        msgHash = ethers.solidityPackedKeccak256(
            ['address', 'uint256'],
            ['0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', '0'])
        console.log(`msgHash：${msgHash}`)

        const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
        const privateKey = '0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e'
        wallet = new ethers.Wallet(privateKey, provider)
        const messageHashBytes = ethers.getBytes(msgHash)
        console.log(`messageHashBytes：${messageHashBytes}`)

        signature = await wallet.signMessage(messageHashBytes);
        console.log(`签名：${signature}`)


    });

    it("MsgHash  Contract", async function () {
        const msgHash_ = await ethSignSample.getMessageHash('0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', '0');
        console.log(`---msgHash：----- ${msgHash_}`)
        expect(msgHash).to.equal(msgHash_);
    });


    it("toEthSignedMessageHash and Verify Contract", async function () {
        const ethSignedMessageHash = await ethSignSample.toEthSignedMessageHash(msgHash);
        console.log(`以太坊消息签名消息：${ethSignedMessageHash}`)
        const isVerify = await ethSignSample.verify(ethSignedMessageHash, signature, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199');
        console.log(`verify is ${isVerify}`);

    });




})