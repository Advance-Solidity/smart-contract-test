// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract TimeLock{

    uint256 public DURATION=1 days;
    struct AccountInfo{
        uint256 balance;
        uint256 lastDeposite;
    }

    mapping(address=>AccountInfo) public accounts;

    function deposite() external payable{
        accounts[msg.sender].balance+=msg.value;
        accounts[msg.sender].lastDeposite=block.timestamp;
    }

    function withdraw() external{
        require(block.timestamp-accounts[msg.sender].lastDeposite> DURATION,"can't witdraw yet");
        uint256 balance=accounts[msg.sender].balance;
        delete accounts[msg.sender];
        payable(msg.sender).transfer(balance);



    }

}