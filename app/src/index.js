import Web3 from "web3";
import StarNotaryArtifact from "../../build/contracts/StarNotary.json";


const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function(){
    const { web3 } = this;

    try{
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = StarNotaryArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        StarNotaryArtifact.abi,
        deployedNetwork.address,
      );
      //get accounts
      const accounts = await web3.eth.getAccounts()
      this.account = accounts[0];
    } catch(error){
      console.error("Could not connect to contract or chain");
    }
  },

  //function to update the status message in the page
  setStatus: function(message){
    const status = document.getElementById("status");
    status.innerHTML = message
  },

  starNameFunc: async function() {
    const { starName } = this.meta.methods;
    const response = await starName().call();
    const owner = document.getElementById("name");
    owner.innerHTML = response;
  },

  starOwnerFunc: async function(){
    const {starOwner} = this.meta.methods;
    const response = await starOwner().call();
    const owner = document.getElementById("owner");
    owner.innerHTML = response;
  },

  claimStarFunc: async function(){
    const {claimStar, starOwner} = this.meta.methods;
    await claimStar().send({from: this.account});
    const response = await starOwner().call();
    App.setStatus("New Star Owner is " + response + ".")
  }
};

window.App = App;

window.addEventListener("load", async function(){
  if(window.ethereum){

    App.Web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. you should remove you deploy this live");

    App.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"),)
  }

  App.start();
})