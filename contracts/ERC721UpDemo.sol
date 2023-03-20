// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";

contract ERC721UpDemo is ERC721Upgradeable, OwnableUpgradeable {

    function initialize(string memory name_, string memory symbol_) external initializer {
        OwnableUpgradeable.__Ownable_init();
        ERC721Upgradeable.__ERC721_init(name_, symbol_);
        _safeMint(_msgSender(), 1);
    }

    function mint(address user, uint256 tokenId) public onlyOwner {
        _safeMint(user, tokenId);
    }
}
