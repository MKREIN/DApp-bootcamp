// require("@nomicfoundation/hardhat-toolbox");
require('@nomiclabs/hardhat-waffle');
require('dotenv').config();
const privatekeys = process.env.PRIVATE_KEY || '';
const privatekeys1 = process.env.PRIVATE_KEY_1 || '';

task('accounts', 'Prints the list of accounts', async (taskArks, hre) => {
  const accounts = await hre.ethers.getSigner();

  for (const accounts of accounts) {
    console.log(accounts.address);
  }
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.9',
  networks: {
    localhost: {},
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: privatekeys.split(','),
    },
  },
};

module.exports = {
  solidity: '0.8.9',
  networks: {
    localhost: {},
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: privatekeys1.split(','),
    },
  },
};
