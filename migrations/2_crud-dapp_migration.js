const contract = artifacts.require('Crud')

module.exports = function(deployer) {
    deployer.deploy(contract);
}