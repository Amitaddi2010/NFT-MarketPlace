import { ethers } from 'ethers';
import { useLayoutEffect, useEffect, useState } from 'react';
import axios from 'axios';
import Grid from "../components/styled/Grid.styled";
import Web3Modal from 'web3modal';
import {marketplaceAddress} from '../config';
import NFTMarketplace from '../artifacts/contracts/nft.sol/NFTMarketplace.json'
import styled from "styled-components";
import { Colors, Devices } from "./Theme";
import { BsHeart } from "react-icons/bs";
import Imgpoly from "./../public/assets/imgs/polygon-matic.png"
import Murals_logo from "./../public/assets/imgs/Murals_logo.png"
import Hero from "./../components/Hero"
import Button from "./../components/styled/Button.styled";
import swal from 'sweetalert';


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

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 500;
`;
const TopSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const Sort = styled.div`
  border-radius: 30px;
  border: 1px solid ${Colors.Primary};
  padding: 0.4rem 1rem;
  cursor: pointer;
`;
const Date = styled.div`
  background: linear-gradient(
    to right,
    ${Colors.Gradients.PrimaryToSec[0]},
    ${Colors.Gradients.PrimaryToSec[1]}
  );
  border-radius: 30px;
  padding: 0.4rem 2.5rem;
`;
const ShowMore = styled.button`
  margin-top: 1rem;
  cursor: pointer;
  border: 1px solid ${Colors.Primary};
  padding: 1rem 2rem;
  color: ${Colors.Primary};
  background-color: transparent;
  border-radius: 5px;
  font-size: 1rem;
`;
 /////////////////// 
 const NFTCardEl = styled.article`
 position: relative;
 display: flex;
 flex-direction: column;
 align-items: center;
`;
const Card = styled.div`
 border-radius: 15px;
 overflow: hidden;
 z-index: 2;
 background-color: ${Colors.White};
 color: ${Colors.Black};
 position: relative;
 display: flex;
 flex-direction: column;
 box-shadow: 0 4px 40px rgb(0 0 0/10%);
`;

const BadgeEl = styled.span`
 position: absolute;
 left: 1rem;
 top: 1rem;
 z-index: 3;
 background: linear-gradient(
   to right,
   ${Colors.Gradients.PrimaryToSec[0]},
   ${Colors.Gradients.PrimaryToSec[1]}
 );
 padding: 0.5rem 1rem;
 border-radius: 30px;
 font-weight: 500;
 color: ${Colors.White};
`;

const ItemImage = styled.div``;
const InfoSection = styled.div`
 display: flex;
 flex-direction: column;
 padding: 1rem 1.5rem;
 flex: 1;
 gap: 0.5rem;
`;
const TSection = styled.div`
 display: flex;
 justify-content: space-between;
`;
const EditionEl = styled.span`
 font-weight: 500;
`;
const StockEl = styled.span`
 color: ${Colors.Primary};
 font-weight: 600;
`;
const ItemTitle = styled.h2`
 font-size: 1.4rem;
`;
const PriceSection = styled.div``;
const BottomSection = styled.div`
 display: flex;
 align-items: center;
 width: 100%;
 margin-top: 1rem;
`;
const AvatarEl = styled.span`
 overflow: hidden;
 border-radius: 50%;
 display: flex;
 height: 50px;
 width: 50px;
 margin-right: 0.5rem;
`;

const AuthorEl = styled.span``;
const LikesEl = styled.span`
 margin-left: auto;
 display: flex;
 align-items: center;
 font-size: 1.2rem;
 gap: 0.5rem;

 > svg {
   cursor: pointer;
 }
`;

const Bar1 = styled.span`
 width: 93%;
 height: 0.7rem;
 background-color: ${Colors.White};
 border-radius: 0 0 50px 50px;
 box-shadow: inset 0 4px 5px rgb(0 0 0 /10%);
 z-index: 1;
 filter: brightness(0.7); 
 transform: translateY(-30%);
`;
const Bar2 = styled(Bar1)`
 width: 88%;
 transform: translateY(-60%);
 filter: brightness(0.5);
 z-index: 0;
`;



export default function Marketplace({props}) {
  const [ postNum, setPostNum] = useState(10); // Default number of posts dislplayed
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  
  
  useEffect(() => {
    loadNFTs()
  }, [])
   
  async function loadNFTs() {
    
    /* create a generic provider and query for unsold market items */
    // const provider = new ethers.providers.JsonRpcProvider();
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, provider)
    const data = await contract.fetchMarketItems()
      
   
    /*
    *  map over items returned from smart contract and format 
    *  them as well as fetch their token metadata
    */
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await contract.tokenURI(i.tokenId)
      console.log(tokenUri);
      const meta = await axios.get(tokenUri)
      console.log(meta);

      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      //  console.log(price);
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
      }
      return item
    }))

    setNfts(items)
    
    setLoadingState('loaded') 
  }
  

  async function buyNft(nft) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)

    /* user will be prompted to pay the asking proces to complete the transaction */
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')   
    const transaction = await contract.createMarketSale(nft.tokenId, {
      value: price
    })
    await transaction.wait()
   
    swal("Buying NFT Sucessfully , Happy Buying ");
    loadNFTs()
  }

  if (loadingState === 'loaded' && !nfts.length) return (<h1>No items in marketplace</h1>)
  return (
    <TopCollectiblesEl>
      <Hero />
    <Title>Marketplace</Title>
    <TopSection>
      <Sort>Sales Volume</Sort>
      <Date>Today</Date>
    </TopSection>
    <Grid>

   
      {
        nfts.map((nft, i) => {
        return (
          <div key={i} >
            <a>
             

              {/* <NFTCard item={nft} /> */}
              <NFTCardEl>
              <Card>
              <BadgeEl>{"Selling Price : "} {nft.price} Matic</BadgeEl>
              <ItemImage>
              <img src={nft.image} width="400" height="100"  />
              </ItemImage>
              <InfoSection>
              <TSection>
                <EditionEl> 
                  <img src={Imgpoly.src} width="35px" height="35px" />
                  </EditionEl>
               <StockEl>For Sale </StockEl>
             </TSection>
           
              <p>{nft.description}</p>
              
              <PriceSection>{nft.price} Matic </PriceSection>
               <Button  onClick={() => buyNft(nft)}>Buy</Button>  
             
              <BottomSection>
              
                <AvatarEl>
                <img src = {Murals_logo.src}   width= "100"  height="100" />
                
                   </AvatarEl>
                   <h4>Murals.co.in </h4>
                <LikesEl>
                   <BsHeart /> {10}
                   </LikesEl>
              </BottomSection>
              </InfoSection>
              </Card>
              <Bar1 />
              <Bar2 />
              </NFTCardEl>

            </a>
          </div>
        );
      })}
     
    </Grid>
    <ShowMore>show more</ShowMore>
  </TopCollectiblesEl>
);
}
