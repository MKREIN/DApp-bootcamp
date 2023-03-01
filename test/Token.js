const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("Token", () => {
  let token, accounts, deployer, receiver;
  beforeEach(async () => {
    // Fetch Token from blockchain w ether js
    const Token = await ethers.getContractFactory("Token");
    token = await Token.deploy("Nox", "NOX", "1000000000");

    accounts = await ethers.getSigners();
    deployer = accounts[0];
    receiver = accounts[1];
  });

  describe("Deployment", () => {
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

  describe("Sending Tokens", () => {
    let amount, transaction, result;

    describe("Success", () => {
      beforeEach(async () => {
        // Transfer tokens
        amount = tokens(100);
        transaction = await token
          .connect(deployer)
          .transfer(receiver.address, amount);
        result = await transaction.wait();
      });

      it("transfers token balances", async () => {
        // Ensure tokens were transfered(balance change)
        expect(await token.balanceOf(deployer.address)).to.equal(
          tokens(999999900)
        );
        expect(await token.balanceOf(receiver.address)).to.equal(amount);

        // log blance after transfer
      });

      it("emits a Transfer event", async () => {
        const event = result.events[0];
        expect(event.event).to.equal("Transfer");

        const args = event.args;
        expect(args.from).to.equal(deployer.address);
        expect(args.to).to.equal(receiver.address);
        expect(args.value).to.equal(amount);
      });
    });

    describe("Failure", () => {
      it("rejects insufficient balances", async () => {
        // transfer more tokens than deployer has 101M
        const invalidAmount = tokens(10000000000);
        await expect(
          token.connect(deployer).transfer(receiver.address, invalidAmount)
        ).to.be.reverted;
      });

      it("rejects invalid recipent", async () => {
        const amount = tokens(100);
        await expect(
          token
            .connect(deployer)
            .transfer("0x0000000000000000000000000000000000000000", amount)
        ).to.be.reverted;
      });
    });
  });
});
