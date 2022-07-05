import { Flipped } from 'react-flip-toolkit';
import {Clink} from './';
import {useEffect, useState} from 'react';
import { createPopper } from "@popperjs/core";
import Swal from 'sweetalert2'
import { loadAccount, loadWeb3,loadBalance } from './utils';
import Link from 'next/link';
import React from "react";
import Web3Modal from "web3modal";  
 
 
const data = [
  { label: 'Home', path: '/' },
  { label: 'Marketplace', path: '/marketplace' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Sell Nfts', path: '/sell-nfts' },
  { label: 'My Nfts', path: '/my-nfts' },
  { label: 'About', path: '/about' },
]

function NavBar({ color }) {
  

// dropdown props
const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
const btnDropdownRef = React.createRef();
const popoverDropdownRef = React.createRef();
const openDropdownPopover = () => {
  createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
    placement: "bottom-start"
  });
  setDropdownPopoverShow(true);
};
const closeDropdownPopover = () => {
  setDropdownPopoverShow(false);
};
// bg colors
let bgColor;
color === "white"
  ? (bgColor = "White")
  : (bgColor = "bg-" + color + "-500");
  //////////


  const [balanceAsEther, setbalanceAsEther] = useState();
  const [account, setAccount] = useState(null);
 const [loading, setLoader] = useState(false);
  // const providerOptions = {
 
  //   // binancechainwallet: {
  //   //   package: true
  //   //   },
  //   // walletconnect: {
  //   //   package: WalletConnectProvider,
  //   //   options: {
  //   //     infuraId: "1d06d07274f0416ba9089c49d7cfa7f8"
  //   //   }
  //   //   },
  //   //   walletlink: {
  //   //   package: WalletLink, 
  //   //   options: {
  //   //     appName: "LBToken", 
  //   //     infuraId: "1d06d07274f0416ba9089c49d7cfa7f8", 
  //   //     rpc: "", 
  //   //     chainId: 3, 
  //   //     appLogoUrl: null, 
  //   //     darkMode: true 
  //   //   }
  //   //   },
  // };
  
  // const web3Modal = new Web3Modal({
  //   network: "ropsten",
  //   theme: "dark",
  //   cacheProvider: false,
  //   providerOptions 
  // });
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

  useEffect(() =>  {
    // sweetAlert("Our Dapp Is on Test Net Right Now for Testing Purpose, Please Select Polygon matic Testnet to test our DAPP, Thanks")
    Swal.fire(
      'Want To Test?',
      'Select Polygon Test Net in your MetaMask',
      'question'
    )
    // loadWeb3();
    // loadAccount(setAccount);
     
  }, [])
  ///////// Account Change ////////
  useEffect(() => {
    window.ethereum?.on("accountsChanged", handleAccountChange);
    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountChange);
    };
  });
//////////////////////// Lad Balance //////////
  useEffect(() => {
    loadBalance({ account, setbalanceAsEther });
  }, [account, loading])
  ///////////////// Account Handle ////////
  const handleAccountChange = (...args) => {
    // you can console to see the args
    const accounts = args[0];
    // if no accounts that means we are not connected
    if (accounts.length === 0) {
      console.log("Please connect to metamask");
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Connect Your Metamask!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
      // our old data is not current connected account
      // currentAccount account that you already fetched and assume you stored it in useState
    } else if (accounts[0] !== account) {
      // if account changed you should update the currentAccount so you return the updated the data
      // assuming you have [currentAccount,setCurrentAccount]=useState
      // however you are tracking the state currentAccount, you have to update it. in case of redux you have to dispatch update action etc
      setAccount(accounts[0])
    }
  };

   
    
   

  return (
    <Flipped flipId={'nav'}>
    <nav className={`font-outfit flex justify-around pt-12 bg-tert`}>
    <Flipped   inverseFlipId='nav' flipId={'murals'}>
      <div className='cursor-pointer ...'>
    <Link href='/'   > 
      <div className="heading text-white text-3xl text-center">Murals.</div></Link></div>
      </Flipped>
      <ul className={'flex space-x-6 items-center'}>
        {data.map(d => <li key={d.label}><Clink {...d} classNameActive="text-white" classNameInActive="text-link-blue"/></li>)}
        <Flipped inverseFlipId='nav' flipId={'connect'}>
        <li >
          {/* <div className='bg-[#2d2879] h-15 w-60 grid grid-cols-4 items-center justify-items-center rounded-full '>
               <div className='bg-[#9091DC] h-4 w-4 rounded-full col-span-1'></div>
            <span className='text-white uppercase col-span-3 w-[80%] text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer  '
            
            
            onClick={
              () => {
                if (!account) {
                  loadWeb3();
                  loadAccount(setAccount);
                } else {
                   Swal.fire("Already Connected")
                }
              }
}
            
            > {account ? account : "Not Connected"}</span>
               <div className='bg-[#9091DC] h-4 w-4 rounded-full col-span-1'></div> 
            <span className='text-white uppercase col-span-3 w-[80%] text-ellipsis overflow-hidden whitespace-nowrap' >  {balanceAsEther?balanceAsEther:"Not Connected"}</span>
          </div> */}

          <button
              className={
                "text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 " +
                bgColor
              }
              type="button"
              ref={btnDropdownRef}
              onClick={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
             
            >
              {account ? "Connected" : "Not Connected"}
            </button>
            <div
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? "block " : "hidden ") +
                (color === "white" ? "bg-white " : bgColor + " ") +
                "text-base  z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
              }
              style={{ minWidth: "5rem" }}
            >
              <a
                // href=""
                className={
                  "text-sm py-2 px-4 font-normal block whitespace-nowrap bg-transparent cursor-pointer w-[40%] text-ellipsis overflow-hidden " +
                  (color === "white" ? " text-slate-700" : "text-white")
                }
                // onClick={e => e.preventDefault()}
                
           
              >
               Account : {account ? account : " Connect your Wallet "}
              </a>
              <a
                // href=""
                className={
                  "text-sm py-2 px-4 font-normal block w-[40%] whitespace-nowrap bg-transparent text-ellipsis overflow-hidden cursor-pointer " +
                  (color === "white" ? " text-slate-700" : "text-white")
                }
                // onClick={e => e.preventDefault()}
              >
                Balance : {balanceAsEther?balanceAsEther: ""} 
              </a>
               
              <div className="h-0 my-2 border border-solid border-t-0 color-white opacity-25" />
          {account ? 
           <a
              href="/"
           className={
             "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
             (color === "white" ? " text-slate-700" : "text-white")
           }
          //  onClick = {()=> { Web3Modal.clearCachedProvider()}}
         >
           Disconnect
         </a>
              
              : 
              <a
                  // href="/"
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap cursor-pointer bg-transparent " +
                  (color === "white" ? " text-slate-700" : "text-white")
                }
                // onClick={e => e.preventDefault()}
                onClick={
                  () => {
                    if (!account) {
                      loadWeb3();
                      loadAccount(setAccount);
                    } else {
                       Swal.fire("Already Connected")
                    }
                  }}
              >Connect your Wallet
                 
              </a>
              }
               
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
 