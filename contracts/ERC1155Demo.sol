// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract ERC1155Demo is ERC1155, Ownable {
    using Strings for uint256;
    string private _baseUri;

    constructor (string memory baseUri_) ERC1155(baseUri_) {
        _baseUri = baseUri_;
        _mint(_msgSender(), 1, 100, "");
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        return bytes(_baseUri).length > 0
        ? string(abi.encodePacked(_baseUri, tokenId.toString()))
        : '';
    }

    function mint(address user, uint256 tokenId, uint256 amount) public onlyOwner {
        _mint(user, tokenId, amount, "");
    }
}
