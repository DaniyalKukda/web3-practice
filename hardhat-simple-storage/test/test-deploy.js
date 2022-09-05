const { hardhat } = require("hardhat");
const { assert, expect } = require("chai")

describe("Simple Storage", function () {
  let SimpleStorageContractFactory, simpleStorage;
  beforeEach(async function () {
    SimpleStorageContractFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await SimpleStorageContractFactory.deploy();
  })

  it("Should start with a favourite number of zero", async function () {
    const expectedValue = "0";
    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedValue);
  })

  it("Should update a favourite number", async function () {
    const transaction = await simpleStorage.store(90);
    await transaction.wait(1);
    const expectedValue = "90";
    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedValue);
  })

})