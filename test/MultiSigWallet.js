const { expect } = require("chai");
const { describe, it } = require("mocha");
const { ethers } = require("hardhat");
const { BigNumber, utils } = require("ethers");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");


describe("MultiSigWallet Contract", function () {

    async function deployMultiSigWalletFixture() {
        const MultisigWallet = await ethers.getContractFactory("MultisigWallet");
        const multisigWallet = await MultisigWallet.deploy(["0x70997970C51812dc3A010C7d01b50e0d17dc79C8", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",], 2);

        // Fixtures can return anything you consider useful for your tests
        return { multisigWallet };
    }


    describe("MultiSigWallet", function () {

        // Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
        // Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

        // Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
        // Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

        let multisigWallet;
        let transferHash;
        let txHash;
        let signature1;
        let signature2;

        beforeEach(async function () {
            // transferHash = ethers.solidityPackedKeccak256(
            //     ['address', 'uint256'],
            //     ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', '1000000000000000000', '0x', '0', '1']);
            // console.log(`msgHash：${transferHash}`)

        });

        it("TxHash", async function () {
            const { multisigWallet } = await loadFixture(deployMultiSigWalletFixture);
            txHash = await multisigWallet.encodeTransactionData('0x70997970C51812dc3A010C7d01b50e0d17dc79C8', '1000000000000000000', '0x', '0', '1');
            console.log(`TxHash is ${txHash}`);
        });

        it("Sign1 Wallet", async () => {
            const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
            const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
            wallet = new ethers.Wallet(privateKey, provider)
            const messageHashBytes = ethers.getBytes(txHash)
            signature1 = await wallet.signMessage(messageHashBytes);
            console.log(`签名1：${signature1}`)
        });

        it("Sign2 Wallet", async () => {
            const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
            const privateKey = '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d'
            wallet = new ethers.Wallet(privateKey, provider)
            const messageHashBytes = ethers.getBytes(txHash)
            signature2 = await wallet.signMessage(messageHashBytes);
            console.log(`签名2：${signature2}`)
        });

        it("contact signature", async () => {
            const { multisigWallet } = await loadFixture(deployMultiSigWalletFixture);

            // address to,
            // uint256 value,
            // bytes memory data,
            // bytes memory signatures
            let sign1 = signature2;
            let result = signature1.replace("0x", "");
            let signContact = `${sign1}${result}`;
            console.log(`signContact is ${signContact}`);
            const success_1 = await multisigWallet.execTransaction('0x70997970C51812dc3A010C7d01b50e0d17dc79C8', '1000000000000000000', '0x', signContact);
            console.log(`success1 is ${success_1}`);
            const success_2 = await multisigWallet.getTrue();
            console.log(`success2 is ${success_2}`);

        });
    });
});

