const hre = require("hardhat");

async function main(){
    const PingCounter = await hre.ethers.getContractFactory("PingCounter");
    const pingCounter = await PingCounter.deploy();
    await pingCounter.waitForDeployment();

    console.log("ping counter deployed to:", await pingCounter.getAddress());
}

main().catch((error)=>{
    console.error(error);
    process.exitCode = 1;
});