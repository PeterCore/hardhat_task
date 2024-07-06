require("@nomicfoundation/hardhat-toolbox");

// const NEXT_PUBLIC_POLYGON_MUMBAI_RPC = "YOUR RPC URL";
// const NEXT_PUBLIC_PRIVATE_KEY = "PRIVATE KEY";
/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  // solidity: "0.8.20",
  // defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    // polygon_mumbai: {
    //   url: NEXT_PUBLIC_POLYGON_MUMBAI_RPC,
    //   accounts: [`0x${NEXT_PUBLIC_PRIVATE_KEY}`],
    // },
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/U85JCEL0GxZZhXpHpu7009oLBrf4gc5z',
      accounts: ["0xee1a8ab44bb95f362c1f7b9d5a2c0bdfbc45fbe43ff51361b5ea9e1b09371631"]
    },
  },
  version: "0.8.24",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },

  //   // fuji: {
  //   //   url: `Your URL`,
  //   //   accounts: [
  //   //     `0x${"Your Account"}`,
  //   //   ],
  //   // },
  // },
};
