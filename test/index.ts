import { expect } from "chai"
import { ethers } from "hardhat"
import { toBn } from "evm-bn"

describe("KingOFool", function () {
  it("Should deposit successfully", async function () {
    const text = 'hello word'

    const KingOFool = await ethers.getContractFactory("KingOfFool");
    const kingOFool = await KingOFool.deploy();
    await kingOFool.deployed();

    await kingOFool.depositEth({value: toBn("1")});
    await kingOFool.depositEth({value: toBn("1.5")});

    expect(true);
  });
});
