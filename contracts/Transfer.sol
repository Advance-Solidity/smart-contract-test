// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Transfer{
mapping(address=>uint256) accounts;


function deposite() payable external{
        accounts[msg.sender]+=msg.value;
    }

    function withdraw() external{
        uint balance=accounts[msg.sender];
        delete accounts[msg.sender];
        payable(msg.sender).transfer(balance);
    }

    function Balance(address _address) public view returns(uint ){
        return accounts[_address];
    }
}