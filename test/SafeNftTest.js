const {expect}=require("chai");
const {ethers}=require("hardhat")
const {utils}=ethers;
const {bigNumber}=ethers;
const { network } = require("hardhat")



describe("TimeLock contract testing", async function (){

    var NFT=null;
    var attack=null;
    var ACCOUNT=null;




beforeEach("deploy TimeLock smart contract", async function (){
            ACCOUNT= await ethers.getSigners();
            Provider=await ethers.provider;
            const ContractFactory=await ethers.getContractFactory("safeNFT");
            const balance=ethers.utils.parseEther("0.01");
            NFT=await ContractFactory.deploy("annad","ANK", balance);
            // await NFT.deployed();

            const ContractFactory2=await ethers.getContractFactory("NFTAttack");

            // attacker EOA account
            attack=await ContractFactory2.connect(ACCOUNT[1]).deploy(NFT.address);
            // await attack.deployed();


            // console.log("address of nft contract",NFT.address);
            // console.log("address of attacker", attack.address);




        });

        describe("it should be pass",async function (){
            it("Reentrancy attack", async function(){

                console.log("address of nft contract",NFT.address);
            console.log("address of attacker", attack.address);
            // const ammount=ethers.utils.parseEther("20")
            // console.log("balance===",balance);

            const tx1= attack.connect(ACCOUNT[1]).exploit({value:ethers.utils.parseEther("1")});
                // await tx1.wait();    
            // console.log("details of transaction", await tx1);

            console.log("total supply of nft",await NFT.balanceOf(attack.address));
            expect(await NFT.balanceOf(attack.address)).to.be.equal(6);



            })



        })

        



});



