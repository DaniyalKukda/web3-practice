const { ethers, run, network } = require("hardhat");

async function main() {
  const SimpleStorageContractFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying Contract");
  const simpleStorage = await SimpleStorageContractFactory.deploy();
  await simpleStorage.deployed();

  console.log('contract address: ', simpleStorage.address);
  console.log("Networl Config", network.config);

  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6);
    await verifyContract(simpleStorage.address, [])
  }

  const currentValue = await simpleStorage.retrieve();
  console.log('currentValue: ', currentValue);
  const transaction = await simpleStorage.store(5);
  await transaction.wait(1)
  const updatedValue = await simpleStorage.retrieve();
  console.log('updatedValue: ', updatedValue);
}

async function verifyContract(contractAddress, args) {
  console.log("Verifying Contracts");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args
    })
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("already verified");
    } else {
      console.log('error: ', error);
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().then(() => process.exit(0)).catch((error) => {
  console.error(error);
  process.exit(1)
});
