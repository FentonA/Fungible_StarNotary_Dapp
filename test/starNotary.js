//Importing the StarNotary smart contract ABI (JSON representation of smart contract)
const StarNotary = artifacts.require("StarNotary");

var accounts; // list of development accounts provided by Truffle
var owner;// Global variable use it in the tests cases

//This called the StarNotary smart contract and initializes it
contract('StarNotary', (accs) =>{
    accounts = accs; //Assigning test accounts
    owner = accounts[0]; // Assigning the owner test account
})

//Example test case, it will test if the contract is able to return the starName property 
//Initialized in the contract constructor
it('has correct name', async () =>{
    let instance = await StarNotary.deployed();// Making sure the Smart Contract is deployed and getting the instance.
    let starname = await instance.starName.call();//Calling the starName property
    assert.equal(starname, "Alf's Star"); //Assert if the starname property was initiliazed correctly
})

// test to see if a star can be claimed 
it('can be claimed', async ()=>{
    let instance = await StarNotary.deployed();
    await instance.claimStar({from: owner});
    let starowner = await instance.starOwner.call()
    assert.equal(starowner, owner );
});

//Example test case, this will test the smart contract function claimStar assigned the Star to the owner address and if it can be changed. 
it(' can change onwers', async() =>{
    let instance = await StarNotary.deployed();
    let secondOwner = accounts[1];
    await instance.claimStar({from: owner});
    let starowner = await instance.starOwner.call();
    assert.equal(starowner, owner);
    await instance.claimStar({from: secondOwner});
    let secondStarOwner = await instance.starOwner.call();
    assert.equal(secondStarOwner, secondOwner);
})

// Example test that will test if the smart conteract is able to change Star names
it('can change names', async() =>{
    let instance = await StarNotary.deployed();
    await instance.nameStar("Fonn's Star", {from: owner});
    assert.equal(await instance.starName.call(), "Fonn's Star");
    // let instance = await StarNotary.deployed();
    // let secondName = "Fonn's star";
    // await instance.nameStar({from: owner});
    

})