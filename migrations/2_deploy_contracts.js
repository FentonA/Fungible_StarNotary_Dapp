const Starnotary= artifacts.require("./StarNotary");


module.exports = function(deployer) {
  deployer.deploy(Starnotary);
};
