async function main() {
  console.log(`preparing deployment...\n`);
  //Fetch contract to deploy
  const Token = await ethers.getContractFactory("Token");
  const Exchange = await ethers.getContractFactory("Exchange");

  //Fetch accounts
  const accounts = await ethers.getSigners();

  console.log(
    `Accounts fetched: \n${accounts[0].address}\n${accounts[1].address}\n`
  );

  //Deploy contract
  const Nox = await Token.deploy("Nox", "NOX", "1000000000");
  await Nox.deployed();
  console.log(`NOX Deployed to: ${Nox.address}`);

  const Spud = await Token.deploy("Spud", "SPUD", "1000000000");
  await Spud.deployed();
  console.log(`SPUD Deployed to: ${Spud.address}`);

  const NFL = await Token.deploy("NFL Token", "NFL", "100000000000");
  await NFL.deployed();
  console.log(`NFL Deployed to: ${NFL.address}`);

  const exchange = await Exchange.deploy(accounts[1].address, 5);
  await exchange.deployed();
  console.log(`Exchange Deployed to ${exchange.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
