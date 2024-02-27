import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

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
    hardhat: {},
    sepolia: {
      accounts: [account],
      url: "https://eth-sepolia.public.blastapi.io",
    },
  },
  etherscan: {
    apiKey: etherscanApiKey,
  },
};

export default config;
