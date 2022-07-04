import { useLayoutEffect } from 'react'
 
 import Link from 'next/link'
import {TeamCard} from '../components'

//images
import desktop from '../public/assets/imgs/desktop.png'
import comp1 from '../public/assets/imgs/comp1.png'
import comp2 from '../public/assets/imgs/comp2.png'
import comp3 from '../public/assets/imgs/comp3.png'
import comp4 from '../public/assets/imgs/comp4.png'
import database from '../public/assets/imgs/database.png'
import phone from '../public/assets/imgs/phone.png'
import Team from '../components/Team'
function index({setDirection}) {
    useLayoutEffect(()=>{
        setDirection('row');
        return ()=>{setDirection('col')};
    },[])
    return (
        <div className='bg-tert px-[190px]'>
            <div className='home-grid-container-1  bg-tert pt-24 h-[90vh]'>
                <div className='font-bold not-italic capitalize font-outfit text-7xl w-[463px] col-span-2 col-start-1 text-white'>
                    discover and collect rare NFTs
                </div>
                <span className='font-normal text-lg leading-7 w-[373px] font-outfit col-span-2 col-start-1 text-white'>The most secure marketplace for buying and selling unique crypto assets.</span>
                <Link href='/marketplace'>
                    
                            <button className="btn bg-secondary row-span-1 row-start-3 ">Buy NFT </button>
                 </Link>
                <button className='btn bg-transparent border-solid  border-secondary border-2 row-span-1 row-start-3'><Link href='/sell-nfts'> Sell NFTs </Link></button>
                <img src={desktop.src} alt="" className='row-span-full' />
            </div>
            <div className='text-white uppercase font-semibold text-xl leading-7 text-left tracking-widest pb-5'>featured on</div>
            <div className='flex justify-items-center justify-around items-center h-[100px] bg-tblue'>
                <img src={comp1.src} alt="" /><img src={comp2.src} alt="" /><img src={comp3.src} alt="" /><img src={comp4.src} alt="" />
            </div>
            <div className='home-grid-container-2 pt-[90px]'>
                <div className="font-outfit font-semibold text-xl leading-7 text-left tracking-widest text-[#ABD9D9] self-end row-start-1 row-end-2 col-start-2 col-end-3">Analytics</div>
                <div className='font-bold text-6xl text-left capitalize tracking-normal w-[518px] font-outfit leading-[57px] col-span-1 col-start-2 text-white'>
                    built-in analytics to track your nfts
                </div>
                <span className='font-normal text-lg leading-7 text-left tracking-normal w-[373px] font-outfit col-start-2 col-span-1 row-start-3 row-span-1 text-white'>Use our built-in analytics dashboard to pull valuable insights and monitor the value of your Krypto portfolio over time.</span>
                <Link href='/marketplace' >
                          <button className="btn bg-secondary row-span-1 row-start-4 ">View Our Pricing</button>
                </Link>
                <img src={database.src} alt="" className='col-span-1 col-start-1 row-span-full ' />
            </div>
            <div className='home-grid-container-2 pt-[90px] pb-[151px]'>
                <div className="font-outfit font-semibold text-xl leading-7 text-left tracking-widest text-[#ABD9D9] self-end row-start-1 row-end-2 col-start-1 col-end-3 uppercase">get our app</div>
                <div className='font-bold text-6xl text-left capitalize tracking-normal w-[518px] font-outfit leading-[57px] col-span-1 col-start-1 text-white'>
                    Browse NFTs from your smartphone
                </div>
                <span className='font-normal text-lg leading-7 text-left tracking-normal w-[373px] font-outfit col-start-1 col-span-1 row-start-3 row-span-1 text-white'>Use our built-in analytics dashboard to pull valuable insights and monitor the value of your Krypto portfolio over time.</span>
                <Link href='/marketplace' > 
                            <button className="btn bg-secondary row-span-1 row-start-4"> View Our Pricing</button>
                 </Link>
                <img src={phone.src} alt="" className='col-span-1 col-start-2 row-span-full pl-[150px] ' />
            </div>
            <Team />
            <div className='grid items-center justify-items-center grid-rows-3 h-[402px] rounded-3xl' style={{ background: 'linear-gradient(278.71deg, #ABD9D9 -20.32%, #5151C6 103.51%)'}}>
                <p className='font-semibold text-xl leading-7 text-center tracking-widest font-outfit uppercase'>Are you Ready?</p>
                <div className='font-bold text-6xl text-center tracking-normal font-outfit leading-[57px] w-[526px] text-white capitalize'>be a part of the next big thing</div>
                <button className='btn bg-black text-white self-center uppercase'>Get Started</button>
            </div>
        </div>
    )
}


export default index