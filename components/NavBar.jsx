import { Flipped } from 'react-flip-toolkit';
import {Clink} from './';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import {useEffect, useState} from 'react';
import Web3 from "web3";
import swal from 'sweetalert';
const data = [
  { label: 'Home', path: '/' },
  { label: 'Marketplace', path: '/marketplace' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Sell Nfts', path: '/sell-nfts' },
  { label: 'My Nfts', path: '/my-nfts' },
  { label: 'About', path: '/about' },
]

function NavBar() {
 const [account] = useState()
  const providerOptions = {
 
    // binancechainwallet: {
    //   package: true
    //   },
    // walletconnect: {
    //   package: WalletConnectProvider,
    //   options: {
    //     infuraId: "1d06d07274f0416ba9089c49d7cfa7f8"
    //   }
    //   },
    //   walletlink: {
    //   package: WalletLink, 
    //   options: {
    //     appName: "LBToken", 
    //     infuraId: "1d06d07274f0416ba9089c49d7cfa7f8", 
    //     rpc: "", 
    //     chainId: 3, 
    //     appLogoUrl: null, 
    //     darkMode: true 
    //   }
    //   },
  };
  
  const web3Modal = new Web3Modal({
    network: "ropsten",
    theme: "dark",
    cacheProvider: false,
    providerOptions 
  });
  // const provider = new web3Modal.connect();
  // window.web3 = new Web3(provider);

  // const loadAccount = async (setAccount)=>{
  //   const provider = await web3Modal.connect();
  //   window.web3 = new Web3(provider);
  //   const accounts = await window.web3.eth.getAccounts();
  //   console.log(accounts)
 
  //   // web3Api.web3.eth.defaultAccount = accounts[0];
  //   // setAccount(accounts[0]);
  // };

const loadWeb3 = async () => {
       const provider = await web3Modal.connect();
       if(provider){
        window.web3 = new Web3(provider);
        account = await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log(account)
        return account
       }else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        swal(" No wallet installed");
      }
      console.log(window.web3);
  };

   
    
   

  return (
    <Flipped flipId={'nav'}>
    <nav className={`font-outfit flex justify-around pt-12 bg-tert`}>
    <Flipped inverseFlipId='nav' flipId={'murals'}>
      <div className="heading text-white text-3xl text-center">Murals.</div>
      </Flipped>
      <ul className={'flex space-x-6 items-center'}>
        {data.map(d => <li key={d.label}><Clink {...d} classNameActive="text-white" classNameInActive="text-link-blue"/></li>)}
        <Flipped inverseFlipId='nav' flipId={'connect'}>
        <li>
          <div className='bg-[#2d2879] h-12 w-40 grid grid-cols-4 items-center justify-items-center rounded-full'>
            <div className='bg-[#9091DC] h-4 w-4 rounded-full col-span-1'></div>
            <span className='text-white uppercase col-span-3' onClick={loadWeb3}> {loadWeb3().account ? loadWeb3().account : "Not Connected"}</span>
          </div>
        </li>
        </Flipped>
      </ul>
    </nav>

    </Flipped>
  )
}


// local components


export default NavBar