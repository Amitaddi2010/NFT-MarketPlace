import { Flipped } from 'react-flip-toolkit';
import {Clink} from './';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import { loadAccount, loadWeb3,loadBalance } from './utils';
import swal from 'sweetalert';
const data = [
  { label: 'Home', path: '/' },
  { label: 'Marketplace', path: '/marketplace' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Sell Nfts', path: '/sell-nfts' },
  { label: 'My Nfts', path: '/my-nfts' },
  { label: 'About', path: '/about' },
]

function SideBar() {
  const [balanceAsEther, setbalanceAsEther] = useState();
  const [account, setAccount] = useState(null);
 const [loading, setLoader] = useState(false);

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
      swal("Please connect to metamask");
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
    <nav className={`font-outfit w-[280px] h-screen pt-12 bg-tert`}>
        <Flipped inverseFlipId='nav' flipId={'murals'}>

      <div className=" cursor-pointer ... heading text-white text-3xl text-center">
      <Link href='/'   > 
        Murals.
        </Link>
        </div>
      </Flipped>
      <ul className={'flex flex-col w-full items-center'}>
        {data.map(d => <li className='w-[216px] h-[48px] text-left' key={d.label}><Clink {...d} classNameActive="rounded-2xl w-[216px] h-[48px] pl-20 text-white bg-[#A249FF] leading-[48px]" classNameInActive="leading-[48px] w-[216px] h-[48px] pl-20 text-[#676D7C]"/></li>)}
       <div className='text-white mt-6'>Account Details</div>  <Flipped inverseFlipId='nav' flipId={'connect'}> 
        <li>
          <div className='bg-[#2d2879] mt-4 h-20 w-60 grid grid-cols-4 items-center justify-items-center rounded-2xl '>
            {/* <div className='bg-[#9091DC] h-4 w-4 rounded-full col-span-1'></div> */}
            <span className='text-white uppercase col-span-3 w-[85%] text-ellipsis overflow-hidden whitespace-nowrap '>Account: {account ? account : "Not Connected"}</span>
               {/* <div className='bg-[#9091DC] h-4 w-4 rounded-full col-span-1'></div>  */}
            <span className='text-white uppercase col-span-3 w-[85%] text-ellipsis overflow-hidden whitespace-nowrap' >  Balance : {balanceAsEther?balanceAsEther:"Not Connected"}</span>
       
          </div>
        </li>
        </Flipped>
      </ul>
    </nav>
    </Flipped>
  )
}


// local components


export default SideBar