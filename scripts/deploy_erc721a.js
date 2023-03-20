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

  const Erc721a = await hre.ethers.getContractFactory("ERC721ADemo");
  const erc721a = await Erc721a.deploy("ERC721A-TEST","ERC721AT", 1);

  await erc721a.deployed();

  console.log("deploy erc721a contract with address ", erc721a.address);
  save_to_json("erc721a", erc721a.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
