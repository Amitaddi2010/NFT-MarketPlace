import { useState } from 'react'
// import Image from 'next/image'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import swal from 'sweetalert';
import styled from "styled-components";
import { Colors, Devices } from "./Theme";
 /*  Styled */
 
const TopCollectiblesEl = styled.article`
display: flex;
flex-direction: column;
gap: 1rem;
align-items: center;
padding: 1rem;
color: ${Colors.White};
background-color: ${Colors.Background};


@media ${Devices.Tablet} {
  padding: 1rem 3rem;
}
@media ${Devices.Laptop} {
  padding: 1rem 5%;
}
@media ${Devices.LaptopL} {
  padding: 1rem 10%;
}
`;

// const projectId = '2AvZQvz38z8tVJaxEi6i0BuPryU';
// const projectSecret = 'dcf8e826b6e61495b75b5850fc369b99';
// const auth =
//     'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

// const client = ipfsHttpClient({
//     host: 'ipfs.infura.io',
//     port: 5001,
//     protocol: 'https',
//     headers: {
//         authorization: auth,
//     },
// });

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

import {
  marketplaceAddress
} from '../config'

import NFTMarketplace from '../artifacts/contracts/nft.sol/NFTMarketplace.json'

export default function sellNFTs() {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  const router = useRouter()

  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      console.log(url);
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
      swal("Oops!", "Something went wrong!", "error");
    }
  }
  async function uploadToIPFS() {
    const { name, description, price } = formInput
    if (!name || !description || !price || !fileUrl) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, image: fileUrl
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, return the URL to use it in the transaction */
      return url
    } catch (error) {
      console.log('Error uploading file: ', error)
      swal("Oops!", "Something went wrong!", "error");
    }
  }

  async function listNFTForSale() {
    const url = await uploadToIPFS()
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    /* next, create the item */
    const price = ethers.utils.parseUnits(formInput.price, 'ether')
    let contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()
    let transaction = await contract.createToken(url, price, { value: listingPrice })
    await transaction.wait()
    swal("Your NFT is now Live, You can Check in the Marketplace Section ")
    router.push('/')
  }

  return (
    
  <div className="bg-tert text-white  flex justify-center pt-20 ">
     <div className=" w-1/2 flex flex-col pb-[100%]">
     {/* box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset; */}
    <div className=" overflow-hidden rounded shadow-[0_35px_60px_-15px_rgba(255,255,255,0.3)]">
      <div className="px-12 py-8">
       <div className="mb-2 text-xl font-bold"> Sell NFTs</div>
       
        <form className="flex flex-col">
        <input
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
        />
        <textarea
          placeholder="Asset Description"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
        />
        <input
          placeholder="Asset Price in Eth"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
        />
        <input
          type="file"
          name="Asset"
          className="my-4"
          onChange={onChange}
        />
        {
          fileUrl && (
            <img className="rounded mt-4" alt="Picture of the author" width="350px"
              height="300px" src={fileUrl} />
          )
        }
        <button onClick={listNFTForSale} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
          Create NFT
        </button>
        </form>
       
      </div>
      </div>
      
    </div>
    </div>
  
  )
}