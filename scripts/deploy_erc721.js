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

  const Erc721 = await hre.ethers.getContractFactory("ERC721Demo");
  const erc721 = await Erc721.deploy("ERC721-TEST","ERC721T", 1);

  await erc721.deployed();

  console.log("deploy erc721 contract with address ", erc721.address);
  save_to_json("erc721", erc721.address);

  // await hre.run(`verify:verify`, {
  //   address: erc721.address,
  //   constructorArguments: ["ERC721-TEST","ERC721T", 1],
  // });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
