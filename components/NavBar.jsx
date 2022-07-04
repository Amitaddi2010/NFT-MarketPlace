import { Flipped } from 'react-flip-toolkit';
import {Clink} from './';
 
import {useEffect, useState} from 'react';
 
import swal from 'sweetalert';
import { loadAccount, loadWeb3,loadBalance } from './utils';

const data = [
  { label: 'Home', path: '/' },
  { label: 'Marketplace', path: '/marketplace' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Sell Nfts', path: '/sell-nfts' },
  { label: 'My Nfts', path: '/my-nfts' },
  { label: 'About', path: '/about' },
]

function NavBar() {
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

  useEffect(() => {
    loadWeb3();
    loadAccount(setAccount);
     
  }, [])
  useEffect(() => {
    window.ethereum?.on("accountsChanged", handleAccountChange);
    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountChange);
    };
  });
  useEffect(() => {
    loadBalance({ account, setbalanceAsEther });
  }, [account, loading])
  const handleAccountChange = (...args) => {
    // you can console to see the args
    const accounts = args[0];
    // if no accounts that means we are not connected
    if (accounts.length === 0) {
      console.log("Please connect to metamask");
      window.alert("Please connect to metamask");
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
    <Flipped inverseFlipId='nav' flipId={'murals'}>
      <div className="heading text-white text-3xl text-center">Murals.</div>
      </Flipped>
      <ul className={'flex space-x-6 items-center'}>
        {data.map(d => <li key={d.label}><Clink {...d} classNameActive="text-white" classNameInActive="text-link-blue"/></li>)}
        <Flipped inverseFlipId='nav' flipId={'connect'}>
        <li >
          <div className='bg-[#2d2879] h-12 w-40 grid grid-cols-4 items-center justify-items-center rounded-full '>
            <div className='bg-[#9091DC] h-4 w-4 rounded-full col-span-1'></div>
            <span className='text-white uppercase col-span-3 w-[80%] text-ellipsis overflow-hidden whitespace-nowrap  '> {account ? account : "Not Connected"}</span>
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