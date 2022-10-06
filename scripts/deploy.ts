import { ethers } from "hardhat";
import fs from "fs";

async function main() {
  const KingOfFool = await ethers.getContractFactory("KingOfFool");
  const kingOfFool = await KingOfFool.deploy();

  await kingOfFool.deployed();

  console.log("KingOfFool deployed to:", kingOfFool.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
