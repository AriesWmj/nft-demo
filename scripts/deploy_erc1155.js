// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const {save_to_json, getProperties} = require("../util/out");

async function main() {
  const [owner] = await hre.ethers.getSigners();

  const Erc1155 = await hre.ethers.getContractFactory("ERC1155Demo");
  const erc1155 = await Erc1155.deploy("http://testcase/");

  await erc1155.deployed();

  console.log("deploy erc1155 contract with address ", erc1155.address);
  save_to_json("erc1155", erc1155.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
