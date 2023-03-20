require("@nomicfoundation/hardhat-toolbox");
const {node_url, accounts} = require("./util/network");
require('@openzeppelin/hardhat-upgrades');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      }
    }
  },
  networks: {
    localhost: {
      allowUnlimitedContractSize: true,
      blockGasLimit: 10000000000,
      gas: 100000000
    },
    test: {
      url: node_url('test'),
      accounts: accounts('test')
    },
    main: {
      url: node_url('main'),
      accounts: accounts('main'),
      loggingEnabled: true
    }
  },
  etherscan: {
    apiKey: {
      bscTestnet: "GCBRV1SJ3FJ1FMTU28WQDT363N8IZG57H7"
    }
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: true
  }
};
