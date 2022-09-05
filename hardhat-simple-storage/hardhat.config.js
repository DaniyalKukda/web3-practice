require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("./task/block-number");
require("hardhat-gas-reporter");
require('solidity-coverage')

/** @type import('hardhat/config').HardhatUserConfig */

const RPC_URL_RINKEBY = process.env.RPC_URL_RINKEBY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const COIN_MARKET_API_KEY = process.env.COIN_MARKET_API_KEY;

module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "hardhat",
  networks: {
    rinkeby: {
      url: RPC_URL_RINKEBY,
      accounts: [PRIVATE_KEY],
      chainId: 4
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-reporter.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COIN_MARKET_API_KEY
  }
};
