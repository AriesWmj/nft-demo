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

  const Erc721U = await hre.ethers.getContractFactory("ERC721UpDemo");
  const erc721U = await hre.upgrades.deployProxy(Erc721U, ["ERC721-U-TEST", "ERC721-UT"]);

  await erc721U.deployed();

  console.log("deploy erc721 u contract with address ", erc721U.address);
  let implementation = await hre.upgrades.erc1967.getImplementationAddress(erc721U.address);
  let proxyadmin = await hre.upgrades.erc1967.getAdminAddress(erc721U.address);
  save_to_json("erc721u", erc721U.address);
  save_to_json("erc721u-implementation", implementation);
  save_to_json("erc721u-proxyadmin", proxyadmin);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
