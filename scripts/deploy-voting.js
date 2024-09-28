const hre = require("hardhat");

async function main() {
    // Compile contracts
    await hre.run('compile');

    // Step 1: Deploy Verifier.sol
    const Verifier = await hre.ethers.getContractFactory("Verifier");
    console.log("Deploying Verifier contract...");
    const verifier = await Verifier.deploy();
    await verifier.deployed();
    console.log("Verifier deployed to:", verifier.address);

    // Step 2: Deploy ZkVoting.sol with the verifier address
    const ZkVoting = await hre.ethers.getContractFactory("ZkVoting");
    console.log("Deploying ZkVoting contract...");
    const zkVoting = await ZkVoting.deploy(verifier.address);
    await zkVoting.deployed();
    console.log("ZkVoting deployed to:", zkVoting.address);

    // Step 3: Verify the contracts on Etherscan (optional, but useful)
    // Wait for a few seconds before verifying, as Etherscan might take some time to index the contract
    console.log("Waiting for Etherscan to index the contract...");
    await new Promise(r => setTimeout(r, 60000));  // 1 minute delay

    console.log("Verifying Verifier contract...");
    await hre.run("verify:verify", {
        address: verifier.address,
    });

    console.log("Verifying ZkVoting contract...");
    await hre.run("verify:verify", {
        address: zkVoting.address,
        constructorArguments: [verifier.address],  // Pass the constructor arguments for ZkVoting
    });
}

// Handle errors during the deployment process
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
