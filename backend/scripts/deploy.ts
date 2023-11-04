import { ethers } from "hardhat";

async function main() {
  const Mesta = await ethers.deployContract("Mesta");

  await Mesta.waitForDeployment();

  console.log("Mesta deployed to:", await Mesta.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
