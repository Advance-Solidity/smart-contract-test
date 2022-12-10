// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract ExternalReturn{
    address public Owner;
    mapping(address=>uint256) Accounts;

    event ImportantMess(address indexed _vip);
    event Message(address _Special);
    event empty();

    constructor(){
        Owner=msg.sender;
    }
    function Transfer(address _from, address _to , uint amount) external returns(bool){
        // Accounts[_from]-=amount;
        Accounts[_to]+=amount;
        return true;
    }

    modifier onlyowner(){
        require(msg.sender==Owner,"owner unauthorised");
        _;
    }
    function changeAdmin(address _address) external onlyowner{
        Owner=_address;
    }
    function checkBalance() external view returns(uint){
        return Accounts[msg.sender];
    }



////////////////////////event analysis////////////////////////

    function vip() external {
        emit ImportantMess(msg.sender);
    }

    
    function special() external {
        emit Message(msg.sender);
    }

    
    function Empty() external {
        emit empty();
    }

//////////////////////////////////////




}