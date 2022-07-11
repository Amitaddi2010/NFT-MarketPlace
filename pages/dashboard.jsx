import { ethers } from 'ethers'
import { useEffect, useLayoutEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'

import {
  marketplaceAddress
} from '../config'

import NFTMarketplace from '../artifacts/contracts/nft.sol/NFTMarketplace.json'
import NFTCard from '../components/NFTCard'

export default function CreatorDashboard({setDirection}) {

  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: true,
    })

    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    const data = await contract.fetchItemsListed()

    const items = await Promise.all(data.map(async i => {
      const tokenUri = await contract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
      }
      return item
    }))

    setNfts(items)
    setLoadingState('loaded') 
  }
  

  
  return (
    <div className="h-full bg-tert" >
      <div className="p-4">
        <div className='flex justify-around'>
          <div className="text-white p-8 pb-0 w-[687px] rounded-2xl" style={{background:'linear-gradient(101.33deg, #A249FF -1.74%, #25004D 100.61%)'}}>
            <h1 className='font-poppins text-3xl font-semibold text-left pb-4 w-[335px] leading-[48px]'>Collect and sell your
extraordinary NFT</h1>
<p className='opacity-50 w-[335px]'>
  Digital marketplace for crypto collections and non fungible tokens</p>
<button className='text-poppins rounded-2xl bg-white text-[#A249FF] px-8 py-4 my-6'>Explore Now</button>
          </div>
          <div className="graph p-6 text-poppins h-[288px] w-[385px] bg-white rounded-2xl bg-[#25284D]">
    <h3 className='text-white'>Earning</h3>
          <div className="barchart h-[162px] flex justify-evenly my-6">
            <div className="bars w-[20px] bg-[#191C3C] rounded h-[162px] inline-block self-end relative"><div className="val absolute rounded bg-[#A249FF] bottom-0 w-full h-[10px]"></div></div>
            <div className="bars w-[20px] bg-[#191C3C] rounded h-[162px] inline-block self-end relative"><div className="val absolute rounded bg-[#A249FF] bottom-0 w-full h-[120px]"></div></div>
            <div className="bars w-[20px] bg-[#191C3C] rounded h-[162px] inline-block self-end relative"><div className="val absolute rounded bg-[#A249FF] bottom-0 w-full h-[150px]"></div></div>
            <div className="bars w-[20px] bg-[#191C3C] rounded h-[162px] inline-block self-end relative"><div className="val absolute rounded bg-[#A249FF] bottom-0 w-full h-[40px]"></div></div>
            <div className="bars w-[20px] bg-[#191C3C] rounded h-[162px] inline-block self-end relative"><div className="val absolute rounded bg-[#A249FF] bottom-0 w-full h-[10px]"></div></div>
            <div className="bars w-[20px] bg-[#191C3C] rounded h-[162px] inline-block self-end relative"><div className="val absolute rounded bg-[#A249FF] bottom-0 w-full h-[70px]"></div></div>
            <div className="bars w-[20px] bg-[#191C3C] rounded h-[162px] inline-block self-end relative"><div className="val absolute rounded bg-[#A249FF] bottom-0 w-full h-[80px]"></div></div>
          </div>
          </div>
        </div>
        {(loadingState === 'loaded' && !nfts.length) ? (<h1 className="py-10 px-20 text-3xl">No NFTs listed</h1>):<>
        <h2 className="text-2xl py-2">Items Listed</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft, i) => (
              <NFTCard {...{nft, index:i, callback:{func:()=>{}, label:''}}}/>
            ))
          }
        </div>
        </>}
      </div>
    </div>
  )
}