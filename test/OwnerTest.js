const {expect, assert}=require("chai");
const {ether, ethers}=require("hardhat");


describe("Owner",function(){
    it("deploying Owner contract",async function(){
const Owner=await ethers.getContractFactory("Owner");
const owner=await Owner.deploy()
expect(owner.getOwner()).to.equal("0x");


    });





}

);