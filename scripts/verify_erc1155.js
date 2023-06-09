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
  await hre.run('verify:verify', {
    contract:"contracts/ERC1155Demo.sol:ERC1155Demo",
    address: getProperties("erc1155"),
    constructorArguments: ["http://testcase/"],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
