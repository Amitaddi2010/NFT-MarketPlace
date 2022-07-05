import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import axios from 'axios'
import Web3Modal from 'web3modal'
import Swal from 'sweetalert2'
import Head from 'next/head'
import {
  marketplaceAddress
} from '../config'

import NFTMarketplace from '../artifacts/contracts/nft.sol/NFTMarketplace.json'

export default function ResellNFT() {
  const [formInput, updateFormInput] = useState({ price: '', image: '' })
  const router = useRouter()
  const { id, tokenURI } = router.query
  const { image, price } = formInput

  useEffect(() => {
    fetchNFT()
  }, [id])

  async function fetchNFT() {
    if (!tokenURI) return
    const meta = await axios.get(tokenURI)
    updateFormInput(state => ({ ...state, image: meta.data.image }))
  }

  async function listNFTForSale() {
    if (!price) return
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const priceFormatted = ethers.utils.parseUnits(formInput.price, 'ether')
    let contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    let listingPrice = await contract.getListingPrice()

    listingPrice = listingPrice.toString()
    let transaction = await contract.resellToken(id, priceFormatted, { value: listingPrice })
    await transaction.wait()
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your NFT has been Listed',
      showConfirmButton: false,
      timer: 1500
    })
   router.push('/')
  }

  return (
   
    <div className="bg-tert text-white  flex justify-center pt-20">
       <Head>
            <title>Murals. NFT Marketplace</title>
            <meta
              name="description"
              content="Cleaned create-next-app including styled-components and configured theme"
            />
            <link rel="icon" href="/public/favicon.ico" />
      </Head>
    <div className=" w-1/2 flex flex-col pb-[10%]">
    <div className=" overflow-hidden rounded shadow-[0_35px_60px_-15px_rgba(255,255,255,0.3)]">
      <div className="px-12 py-8">
       <div className="mb-2 text-xl font-bold"> Sell NFTs</div>
       <div className="flex flex-col">
        
        <input
          placeholder="Asset Price in Matic"
          className="mt-2 border rounded p-4 text-black"
          onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
        />
        {
          image && (
            <img className="rounded mt-4" width="350" src={image} />
          )
        }
        <button onClick={listNFTForSale} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
          List NFT
        </button>

        </div>
        </div>
       </div>
       
     </div>
     </div>
  )
}