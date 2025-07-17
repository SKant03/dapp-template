require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    ganache:{
      url:"http://127.0.0.1:7545",
      accounts: [
        "0x6fa1872594b08c6c7bab4ef70582bc900ecd35b9cd962159d19e238ab33b3351",
    ]
  }},
};
