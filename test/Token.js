const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("Token", () => {
  let token, accounts, deployer;
  beforeEach(async () => {
    // Fetch Token from blockchain w ether js
    const Token = await ethers.getContractFactory("Token");
    token = await Token.deploy("Nox", "NOX", "1000000000");

    accounts = await ethers.getSigners();
    deployer = accounts[0];
  });

  describe("deployment", () => {
    const name = "Nox";
    const symbol = "NOX";
    const decimals = "18";
    const totalSupply = tokens("1000000000");

    it("has correct name", async () => {
      // Read token name and Check that name is correct
      expect(await token.name()).to.equal(name);
    });

    it("has correct symbol", async () => {
      // Read token name and Check that name is correct
      expect(await token.symbol()).to.equal(symbol);
    });

    it("has correct decimals", async () => {
      // Read token name and Check that name is correct
      expect(await token.decimals()).to.equal(decimals);
    });

    it("has correct total supply", async () => {
      expect(await token.totalSupply()).to.equal(totalSupply);
    });

    it("assigns total supply to deployer", async () => {
      console.log(deployer.address);
      expect(await token.balanceOf(deployer.address)).to.equal(totalSupply);
    });
  });
});