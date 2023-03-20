// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721Demo is ERC721, Ownable{

    constructor (
        string memory name_,
        string memory symbol_,
        uint256 tokenId_
    ) ERC721(name_, symbol_) {
        _safeMint(_msgSender(), tokenId_);
    }

    function mint(address user, uint256 tokenId) public onlyOwner {
        _safeMint(user, tokenId);
    }
}
