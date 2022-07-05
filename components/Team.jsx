import TeamCard from "./TeamCard"
import Head from "next/head"
import tarun from '../public/assets/imgs/tarun.png'
import amit from '../public/assets/imgs/amit.jpg'
import lusy from '../public/assets/imgs/lusy.png'
import swal from 'sweetalert';
import Grid from "../components/styled/Grid.styled";
import styled from "styled-components";
import { Colors, Devices } from "../pages/Theme";
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
 background-color: ${Colors.Background};
 color: ${Colors.Black};
 position: relative;
 display: flex;
 flex-direction: column;
 box-shadow: 0 4px 40px rgb(255 255 0/10%);
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

function Team() {
  return (

<TopCollectiblesEl>
    <Head>
          <title>Murals. NFT Marketplace</title>
          <meta
            name="description"
            content="Cleaned create-next-app including styled-components and configured theme"
          />
          <link rel="icon" href="/public/favicon.ico" />
    </Head>
    <Title>Meet Our Team</Title>
        <NFTCardEl>
        <Card>
        <Grid>
        {[
            {src:tarun.src, label:'Mallidi Tarun Reddy',quote:"Co- Founder ,Blockchain Developer , Front-End Developer."},
            {src:amit.src, label:'Amit Kumar Saraswat',quote:"Founder, Blockchain Developer , Researcher , iOS Developer."},
            {src:lusy.src, label:'Lucy Rose',quote:"Financial Management , Marketing Specialist , Lead Generation Specialist "}
        ].map(d=><TeamCard  {...d} key={d.label}/>)}
        </Grid>
        </Card>
        <Bar1 />
        <Bar2 />
        </NFTCardEl>
               
     
 
                
</TopCollectiblesEl>
  )
}

export default Team