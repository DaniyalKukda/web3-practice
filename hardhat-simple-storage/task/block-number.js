const { task } = require("hardhat/config");

task("block-number", "print the current block number").setAction(async (taskArgs, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log('blockNumber: ', blockNumber);
})

module.exports = {}