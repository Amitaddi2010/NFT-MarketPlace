import { Flipped } from "react-flip-toolkit";
import matic from "../public/assets/imgs/matic.png";

function NFTCard({index, nft, buyNft, callback }) {
    console.log(nft)
  return (
    <div key={index} className="shadow rounded-xl w-[349px] h-[374px] bg-tert" style={{background:'#1819391A'}}>
    <img src={nft.image} className="h-[188px] w-[317px] object-cover hover:object-contain transition-all m-4 rounded-2xl"/>
   <div className="font-medium text-lg leading-7 font-poppins text-left tracking-normal text-white mx-6 mb-2 block h-[27px] w-full">{nft.name}</div>
   <div className="font-medium text-sm leading-5 text-left tracking-normal text-[#7c7e94] ml-6 w-[80px] overflow-hidden text-ellipsis mb-4">@{nft.seller !== '0x0000000000000000000000000000000000000000' ? nft.seller:nft.owner}</div>
   <div className='grid bg-[#10122B] grid-cols-2 grid-rows-2 px-6 py-4 rounded-2xl'>

    <div className='text-[#7c7e94] col-start-1 col-span-1 pb-2'>Selling price</div>
    <div className="col-start-1 col-span-1 text-white font-semibold text-sm leading-5 text-left tracking-normal"><img src={matic.src} className="h-4 w-4 inline align-middle mr-2"/>{nft.price}</div>
    <button className="col-start-2 col-span-1 row-span-full text-white" onClick={()=>{callback.func(nft)}}>{callback.label}</button>
   </div>
  </div>
  )
}

export default NFTCard