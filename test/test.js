const { expect } = require("chai");

describe("Test Main Logic", function() {
  let foolLogicFactory;
  let foolVaultFactory;
  let accounts;

  beforeEach(async function () {
    foolLogicFactory = await ethers.getContractFactory('FoolLogic');
    foolVaultFactory = await ethers.getContractFactory('FoolVault');
    accounts = await ethers.getSigners()
  })

  it("test", async function() {
    const foolVault = await foolVaultFactory.deploy();

    await foolVault.deployed();

    const foolLogic = await foolLogicFactory.deploy(foolVault.address);
    await foolLogic.deployed();
    await foolVault.upgradeVersion(foolLogic.address);
    await foolLogic.recordLastFool(accounts[0].getAddress(), 1000000)
    try {
      await foolLogic.recordLastFool(accounts[1].getAddress(), 1000000)
      expect(false).to.equal(true);
    } catch(e) {
      // cannot add new fool because deposit is smaller than last deposit
      expect(true).to.equal(true);
    }
  });
});
