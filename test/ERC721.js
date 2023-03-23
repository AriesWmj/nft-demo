const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const hre = require("hardhat");

describe("Erc721", function () {

  async function deployErc721() {
   const [owner, user1, user2] = await hre.ethers.getSigners();
    const Er721 = await hre.ethers.getContractFactory("ERC721Demo");
    const  erc721 = await Er721.deploy("ERC721-TEST","ERC721T", 1);
    console.log("erc721 token: ", erc721.address);

    return { erc721, owner, user1, user2 };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { erc721, owner,user1, user2 } = await loadFixture(deployErc721);

      expect(await erc721.owner()).to.equal(owner.address);
    });

    it("Should send token 1 to owner", async function () {
      const { erc721, owner,user1, user2 } = await loadFixture(deployErc721);

      expect(await erc721.ownerOf(1)).to.equal(owner.address);
    });
  });

  describe("Mint", function () {
    describe("Mint new token", function () {
      it("Should revert with wrong owner", async function () {
        const { erc721, owner,user1, user2 } = await loadFixture(deployErc721);

        await expect(erc721.connect(user1).mint(user2.address, 2)).to.be.revertedWith(
          "Ownable: caller is not the owner"
        );
      });

      it("Should mint the new nft to user", async function () {
        const { erc721, owner,user1, user2 } = await loadFixture(deployErc721);
        await erc721.mint(user2.address, 22);
        // We use lock.connect() to send a transaction from another account
        await expect(await erc721.ownerOf(22)).to.equal(user2.address);
      });
    });

    describe("Events", function () {
      it("Should emit an event on mint", async function () {
        const { erc721, owner,user1, user2 } = await loadFixture(deployErc721);
        await expect(erc721.mint(user2.address, 33))
          .to.emit(erc721, "Transfer")
          .withArgs(hre.ethers.constants.AddressZero, user2.address, 33); // We accept any value as `when` arg
      });
    });
  });
});
