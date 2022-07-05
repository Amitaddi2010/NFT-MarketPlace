 
import Web3Modal from "web3modal";
// import { ethers } from 'ethers';
import Web3 from "web3";
// import {useEffect, useState} from 'react';
// import WalletConnectProvider from "@walletconnect/web3-provider";
// import WalletLink from "walletlink";
 
const providerOptions = {
	
  binancechainwallet: {
		package: true
	  },
};
if (typeof window !== 'undefined') {
    //here `window` is available
    const web3Modal = new Web3Modal({
        //   network: "ropsten",
          theme: "dark",
          cacheProvider: true,
          providerOptions 
        });
        const provider = new web3Modal.connect();
        window.web3 = new Web3(provider);
  }
 
const loadWeb3 = async () => {
      
       const provider = await web3Modal.connect();
       if(provider){
        window.web3 = new Web3(provider);
        await window.ethereum.request({ method: "eth_requestAccounts" });
       }else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert("No wallet installed");
      }
      console.log(window.web3);
  };
//   async function disconnect() {
//    const clear = await web3Modal.clearCachedProvider();
//   }
  const loadAccount = async (setAccount)=>{
    const provider = await web3Modal.connect();
    window.web3 = new Web3(provider);
    const accounts = await window.web3.eth.getAccounts();
    console.log(accounts)
    // web3Api.web3.eth.defaultAccount = accounts[0];
    setAccount(accounts[0]);
  };
   
  const loadBalance = async ({account, setbalanceAsEther})=>{
     
    if(account && window.web3){
      console.log('loading...');
    const ethBalance = await window.web3.eth.getBalance(account);
   
    setbalanceAsEther(window.web3.utils.fromWei(ethBalance, "Ether"));
    const networkId = await window.web3.eth.net.getId();
    
    
  }
}
   


  export { loadAccount, loadWeb3, loadBalance};