import hre from "hardhat";

async function main() {
  const Funding = await hre.ethers.getContractFactory("Funding");
  const funding = await hre.ethers.deployContract("Funding");

  await funding.waitForDeployment();

  console.log("Funding deployed to:", funding.target);
  console.log("Deployment tx hash:", funding.deploymentTransaction()?.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
