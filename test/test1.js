const {expect}=require("chai");
const {ethers}=require("hardhat")
const {utils}=ethers;
const {bigNumber}=ethers;

describe("ExternalReturn", async function(){
    let Contract=null;
    let Account=null;
    let Default=0;
    let NewAdmin=1;
    let Attacker=2;

/////////////define fucntion 
function RevertReason(reason){
    return `VM expection while transaction with reason:'${reason}'`
}

    beforeEach(async function (){
          Account=await ethers.getSigners();
                // deploy contract
            const ContractFactory=await ethers.getContractFactory("ExternalReturn");

            // deploy contract with another EOA address
            Contract=await ContractFactory.deploy();
            await Contract.deployed();
    })

    describe("transfer(address, address)", async function(){

        it("should return true for valid non-zero address", async function(){

            // const Account=await ethers.getSigners();
            //     // deploy contract
            // const ContractFactory=await ethers.getContractFactory("ExternalReturn");

            // // deploy contract with another EOA address
            // const Contract=await ContractFactory.connect(Account[2]).deploy();
            // await Contract.deployed();

                console.log("admin of contract", await Contract.Owner());
                // console.log("second  account",Account[2].address)

            //  getting address for smart ccontract
            // const [owner, otherAccount] = await ethers.getSigners();
            // console.log("address of owner",owner.address);

            const amount=100;
            // call smart contract function with call static . it give external return value
            const transferTx=await Contract.callStatic.Transfer(Account[Default].address,Account[1].address,amount);


            // excess variable of smart contract
            console.log("value of balance",await Contract.connect(Account[1]).checkBalance())
            expect( await Contract.connect(Account[1]).checkBalance()).to.equal(100);
            
                // details of transferTx 
            console.log("details of transfer transaction of external contract",transferTx);
            

            // when you call function without callstatic . it doesn't return any external return value
            const transferTx2=await Contract.Transfer(owner.address,otherAccount.address,100);

            // details of transaction
            console.log("details of transfer transaction2 of external contract",transferTx2);

            

            // details of account provide by hardhat
            // const Accounts = await ethers.getSigners();
            console.log("second  account",Account[2].address)
            
            expect(transferTx).to.equal(true);


        });



        


        
        

    });

    describe("event  message", async function(){

        it("emit vip indexed event when vip function call" , async function(){

            await expect(Contract.vip()).to.emit(Contract,"ImportantMess").withArgs(Account[0].address);
            // console.log(await Contract.vip())

        });



        it("emit special event when special function call" , async function(){

            await expect( Contract.special()).to.emit(Contract,"Message").withArgs(Account[0].address);


        });
        it("emit empty event when Empty function call" , async function(){

            await expect(Contract.Empty()).to.emit(Contract,"empty").withArgs();


        });

        });



    describe("By default Admin", async function (){
        it("it should be account zero", async function (){
            console.log("admin of contract", await Contract.Owner())
            console.log("zeroth account of hardhat", Account[Default].address);
            expect(await Contract.Owner()).to.be.a('string').equal(Account[Default].address);
        });




    });


    describe("change Admin", async function (){
        context("rejecting the sender", async function(){


            /// when smart contract revert after verification
            it("should accept admin",async function (){
                await expect(Contract.connect(Account[Attacker]).changeAdmin(Account[Attacker].address)).to.be.revertedWith(RevertReason("owner unauthorised"));
            })
        })

        context("accepting the sender", async function (){
            it("should accept admin ", async function (){

                // when smart contract function work successfully   
                await expect(Contract.connect(Account[Default]).changeAdmin(Account[NewAdmin].address)).to.not.be.reverted;
                console.log("new owner of contract", await Contract.Owner());
                expect(await Contract.Owner()).to.be.a('string').equal(Account[NewAdmin].address);

            })
        })

    });



});