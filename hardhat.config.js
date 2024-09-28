// require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: {
    version: "0.8.27",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/tw-m9GCo9_2rqki4Hv10qHOodZlBU_0v", // Replace with your Alchemy or Infura API URL
      accounts: ["fff92bea17cf8a2e6a5d052474564a93aa21add8e6425f06f99e9217b9b4a6bb"], // Replace with your private key
    },
  },
  etherscan: {
    apiKey: "27QZSIAZV3A4A9QINEFVG8WAGJTSS966GG", // Optional: for contract verification
  },
};
