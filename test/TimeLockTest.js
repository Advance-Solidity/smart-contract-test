const {expect}=require("chai");
const {ethers}=require("hardhat")
const {utils}=ethers;
const {bigNumber}=ethers;
const { network } = require("hardhat")

describe("TimeLock contract testing", async function (){

        let Default_ID=0;
        let Account1=1;
        let Account2=2;
        let Account3=3;
        let Account4=4;
        let ACCOUNT=null;
        let Contract=null;
        let  Provider=null;

        function revertReason(reason){
    return `VM expection while transaction with reason:'${reason}'`
}

        beforeEach("deploy TimeLock smart contract", async function (){
            ACCOUNT= await ethers.getSigners();
            Provider=await ethers.provider;
            const ContractFactory=await ethers.getContractFactory("TimeLock");
            Contract=await ContractFactory.deploy();
            await Contract.deployed();


        });

        describe("should be deposite amount in smartcontract", async function (){
            context("deposite Ehers", async function (){
                it("deposite 10 Ether from Account1", async function(){
                    const tx1= await Contract.connect(ACCOUNT[Account1]).deposite({value:utils.parseEther("10")});
                    //details of transaction 
                    // console.log(tx1);
                    // access public variable of smart contract
                    console.log("access public variable:",await Contract.accounts(ACCOUNT[Account1].address))

                    expect(await Provider.getBalance(Contract.address)).to.be.equal(utils.parseEther("10"));

                });

                it("deposite 15 Ether from Account2", async function(){
                    const tx1= await Contract.connect(ACCOUNT[Account1]).deposite({value:utils.parseEther("10")});
                    const tx2= await Contract.connect(ACCOUNT[Account2]).deposite({value:utils.parseEther("15")});
                    //details of transaction 
                    // console.log(tx1);
                    // access public variable of smart contract
                    console.log("access public variable:",await Contract.accounts(ACCOUNT[Account2].address))

                    expect(await Provider.getBalance(Contract.address)).to.be.equal(utils.parseEther("25"));

                });

            });


        });


        describe("should be withraw amount from smart contract", async function (){
            it("should allow deposite before 1 day", async function (){
                const deposite= await Contract.connect(ACCOUNT[Account1]).deposite({value:utils.parseEther("15")});
                await deposite.wait();
                expect(await Provider.getBalance(Contract.address)).to.be.equal(utils.parseEther("15"));

                expect(await Contract.connect(ACCOUNT[Account1]).withdraw()).to.be.revertedWith(revertReason(""));


            });

             it("should allow deposite afetr 1 day", async function (){

                const originalBalance=await Provider.getBalance(ACCOUNT[Account1].address);

                const deposite= await Contract.connect(ACCOUNT[Account1]).deposite({value:utils.parseEther("15")});
                await deposite.wait();

                // details of transaction 
                console.log("block number at the time of deposite amount",deposite.blockNumber);

                ///////////// // Time travelling to the future!////////////////////////////////
                await network.provider.request({
                    method: 'evm_increaseTime',
                    params: [24*60*60+1],      
                        });

                await hre.network.provider.send("hardhat_mine", ["0x100"]);

                console.log("block number after time of deposite amount",deposite.blockNumber);

                expect(await Provider.getBalance(Contract.address)).to.be.equal(utils.parseEther("15"));

                expect(await Contract.connect(ACCOUNT[Account1]).withdraw()).to.not.be.reverted;

                expect(await Provider.getBalance(ACCOUNT[Account1].address)).to.be.closeTo(originalBalance,utils.parseEther("0.001"));


            });

        });
        

});