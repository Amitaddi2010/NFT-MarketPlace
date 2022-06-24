import React from 'react'
import desktop from '../public/assets/imgs/desktop.png'

function index() {
    return (
        <div className='home-grid-container px-[190px] bg-tert pt-24 h-[90vh]'>
            <div className='font-bold not-italic capitalize font-outfit text-7xl w-[463px] col-span-2 col-start-1 text-white'>
                discover and collect rare NFTs
            </div>
            <span className='font-normal text-lg leading-7 w-[373px] font-outfit col-span-2 col-start-1 text-white'>The most secure marketplace for buying and selling unique crypto assets.</span>
            <button className="btn bg-secondary row-span-1 row-start-3 ">Buy NFTs</button>
            <button className='btn bg-transparent border-solid  border-secondary border-2 row-span-1 row-start-3'>Sell NFTs</button>
            <img src={desktop.src} alt="" className='row-span-full' />
        </div>
    )
}

export default index