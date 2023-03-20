// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721ADemo is ERC721A, Ownable {

    constructor (
        string memory name_,
        string memory symbol_
    ) ERC721A(name_, symbol_) {
        _mint(_msgSender(), 1);
    }

    function mint(address user, uint256 amount) public onlyOwner {
        _mint(user, amount);
    }


}
