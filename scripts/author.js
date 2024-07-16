const { ethers, upgrades } = require("hardhat");
async function main() {
    const AuthorControlledNFT = await ethers.getContractFactory("AuthorControlledNFT");
    // const authorInstance = await AuthorControlledNFT.deploy();
    const authorInstance = await upgrades.deployProxy(AuthorControlledNFT, ["0x5FbDB2315678afecb367f032d93F642f64180aa3"], { initializer: 'initialize' });
    const deploy = await authorInstance.waitForDeployment();
    const address = deploy.getAddress();
    console.log(`deployed contract Address ${address}`);
    // 0x127C5b0b38794D6d91f4e20cAD51DBAd2de30741
    // 0x5FbDB2315678afecb367f032d93F642f64180aa3
    // console.log(` deployed contract Address ${transferFunds.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});