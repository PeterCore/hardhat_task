require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
require("@openzeppelin/hardhat-upgrades");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      chainId: 31337
    },
    local: {
      url: 'http://127.0.0.1:8545',
      chainId: 31337,
      accounts: [process.env.LOCAL_PRIVATE_KEY]
    },
    alchemy_sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/U85JCEL0GxZZhXpHpu7009oLBrf4gc5z",
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },
    arb_sepolia: {
      url: "https://arb-sepolia.g.alchemy.com/v2/U85JCEL0GxZZhXpHpu7009oLBrf4gc5z",
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },
    opt_sepolia: {
      url: "https://opt-sepolia.g.alchemy.com/v2/U85JCEL0GxZZhXpHpu7009oLBrf4gc5z",
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  }
};