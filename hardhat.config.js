require("@nomiclabs/hardhat-waffle");
const fs = require('fs');
// const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";
const privateKey = fs.readFileSync(".secret").toString()
module.exports = {
  defaultNetwork: "mumbai",
  networks: {
    // hardhat: {
    //   chainId: 1337
    // },
  
    mumbai: {
      // Infura
      url: `https://polygon-mumbai.g.alchemy.com/v2/vhtk8r2ZFkp1lXhOYx7VFEaax3g6XPF0`,
      // url: "https://rpc-mumbai.matic.today",
      accounts: [privateKey]
    },
    // matic: {
    //   // Infura
    //   // url: `https://polygon-mainnet.infura.io/v3/${infuraId}`,
    //   url: "https://rpc-mainnet.maticvigil.com",
    //   accounts: [process.env.privateKey]
    // }
  
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};