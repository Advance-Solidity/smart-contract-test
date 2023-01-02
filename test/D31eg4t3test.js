const {expect}=require("chai");
const {ethers}=require("hardhat")
const {utils}=ethers;
const {bigNumber}=ethers;
const { network } = require("hardhat")



describe(" D31eg4t3 contract testing", async function (){

    var Delegate=null;      // original contract
    var attack=null;        // attacker contract
    var ACCOUNTS=null;      // total account provide by hardhat
    const defaultAccount=0;
    const AttackerAccount=1     // attacker account index
    var Provider=null;

beforeEach("deploy D31eg4t3 smart contract", async function (){
        ACCOUNTS= await ethers.getSigners();
        Provider=await ethers.provider;
        const ContractFactory=await ethers.getContractFactory("D31eg4t3");

        // deploy smart contract from default address
        Delegate=await ContractFactory.connect(ACCOUNTS[defaultAccount]).deploy();
        await Delegate.deployed();


        const ContractFactory2=await ethers.getContractFactory("HAckD31eg4t3");
        //  deploy smart contract with attacker EOA account
        attack=await ContractFactory2.connect(ACCOUNTS[AttackerAccount]).deploy();
        await attack.deployed();

    });

    describe("smart contrat should be hacked ", async function (){

        it("smart contract hacked", async function(){

        console.log("owner Address of D31eg4t3 contract before attacked ", await Delegate.owner());
        console.log("can you hacked  Me contract before attacked ", await Delegate.canYouHackMe(attack.address))
        const attacktx=await  attack.connect(ACCOUNTS[AttackerAccount]).hack(Delegate.address);
        console.log("owner Address of D31eg4t3 contract after attacked ", await Delegate.owner());
        console.log("can you hacked  Me contract after attacked ", await Delegate.canYouHackMe(attack.address))
        expect(await Delegate.owner()).to.be.equal(attack.address);
        expect(await Delegate.canYouHackMe(attack.address)).to.be.equal(true);

    })


    })





});

