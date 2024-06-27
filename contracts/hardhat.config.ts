import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

const scrollDeployer = process.env.SCROLL_ACCOUNT;
if (!scrollDeployer) {
  throw new Error("Please set your SCROLL_ACCOUNT_1 in a .env file");
}
const scrollscanApiKey = process.env.SCROLLSCAN_API_KEY;
if (!scrollscanApiKey) {
  throw new Error("Please set your SCROLLSCAN_API_KEY in a .env file");
}

const account = process.env.SEPOLIA_ACCOUNT;
if (!account) {
  throw new Error("Please set your SEPOLIA_ACCOUNT in a .env file");
}
const etherscanApiKey = process.env.ETHERSCAN_API_KEY;
if (!etherscanApiKey) {
  throw new Error("Please set your ETHERSCAN_API_KEY in a .env file");
}

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
  },
  networks: {
    scroll: {
      url: "https://rpc.scroll.io",
      chainId: 534352,
      accounts: [scrollDeployer],
    },
    hardhat: {},
    sepolia: {
      accounts: [account],
      url: "https://eth-sepolia.public.blastapi.io",
    },
  },
  etherscan: {
    apiKey: {
      scroll: scrollscanApiKey,
      sepolia: etherscanApiKey,
    },
    customChains: [
      {
        network: "scroll",
        chainId: 534352,
        urls: {
          apiURL: "https://api.scrollscan.com/api",
          browserURL: "https://scrollscan.com",
        },
      },
    ],
  },
};

export default config;
