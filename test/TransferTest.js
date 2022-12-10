const {expect}=require("chai");
const {ethers}=require("hardhat")
const {utils}=ethers;
const {bigNumber}=ethers;

describe("Transfer contract testing", async function (){

        let Default_ID=0;
        let Account1=1;
        let Account2=2;
        let Account3=3;
        let Account4=4;
        let ACCOUNT=null;
        let Contract=null;
        let  Provider=null;

         beforeEach(async function (){
          ACCOUNT=await ethers.getSigners();
                // deploy contract
            const ContractFactory=await ethers.getContractFactory("Transfer");

            // deploy contract with another EOA address
            Contract=await ContractFactory.deploy();
            await Contract.deployed();

            Provider= await ethers.provider;
            // console.log("details of provider",Provider);

            // by default you got 9999999550390000000000 in each account



    });

    describe("check initial balance", async function(){
        context("initial balance of Smartcontract",async function (){
            it("contract should have zero balance", async function (){

                let balance=await Provider.getBalance(Contract.address);
                console.log("initail balance of contract is:",balance);
                expect(balance).to.be.equal(0);

            });

        });

    });

    describe("deposite in smart contract", async function (){
        context("account1 deposite", async function (){
            it("should deposite 10 Ether", async function (){
                const tx=await Contract.connect(ACCOUNT[Default_ID]).deposite({value:ethers.utils.parseEther("10")});
                console.log("new contract balance", await Provider.getBalance(Contract.address));
                expect(await Provider.getBalance(Contract.address)).to.be.equal(utils.parseEther("10"))

            }).then(async function(result){
                // it("should deposite 20 Ether from account2",async function(){
                const tx=await Contract.connect(ACCOUNT[Account1]).deposite({value:ethers.utils.parseEther("20")});
                console.log("new contract balance", await Provider.getBalance(Contract.address));
                expect(await Provider.getBalance(Contract.address)).to.be.equal(utils.parseEther("30"))


                // })



            })

        })

        it("should deposite 20 Ether from account2",async function(){
                const tx=await Contract.connect(ACCOUNT[Account1]).deposite({value:ethers.utils.parseEther("20")});

                const tx1=await Contract.connect(ACCOUNT[Account1]).deposite({value:ethers.utils.parseEther("20")});
                console.log("details of transaction of deposite 20 ethers");
                console.log(tx1);
                console.log("new contract balance", await Provider.getBalance(Contract.address));
                expect(await Contract.Balance(ACCOUNT[Account1].address)).to.be.equal(utils.parseEther("40"))


                })

    });


    describe ("withraw",async function (){
        it("withraw 15 ether form account1", async function (){
            console.log("before contract balance", await Provider.getBalance(Contract.address));
            const tx1=await Contract.connect(ACCOUNT[Account1]).deposite({value:ethers.utils.parseEther("20")});
            await Contract.connect(ACCOUNT[Account2]).deposite({value:ethers.utils.parseEther("20")});

            const tx2=await Contract.connect(ACCOUNT[Account1]).withdraw();
            expect(await Contract.Balance(ACCOUNT[Account1].address)).to.be.equal(utils.parseEther("0"));
            console.log("after contract balance", await Provider.getBalance(Contract.address));




        })



    });







});