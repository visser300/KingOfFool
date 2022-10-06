import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.7",
  networks: {
    goerli: {
      url: 'https://goerli.infura.io/v3/309820d3955640ec9cda472d998479ef',
      accounts: { mnemonic: process.env.PRIVATE_KEY },
      chainId: 5,
      gas: 'auto',
      // gasPrice: 30000000000, // 30 [GWei]
      gasPrice: 'auto', // 30 [GWei]
    },
    hardhat: {
      chainId: 1337,
      // chainId: 31337,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
