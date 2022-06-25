import TeamCard from "./TeamCard"
import tarun from '../public/assets/imgs/tarun.png'
import amit from '../public/assets/imgs/amit.jpg'
import lusy from '../public/assets/imgs/lusy.png'


function Team() {
  return (
    <div className="pb-[98px]">
    <div className="font-outfit font-semibold leading-7 tracking-widest text-[#ABD9D9] text-center pb-3 uppercase">
        Our Team
    </div>
        <h2 className='font-outfit font-bold text-6xl text-center tracking-normal leading-[57px] text-white pb-16'>Building for the future.</h2>
    <div className='flex justify-between'>

        {[
            {src:tarun.src, label:'Mallidi Tarun Reddy',quote:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae eveniet porro qui voluptas, suscipit veritatis ad ipsam? Blanditiis, ea maiores."},
            {src:amit.src, label:'Amit Kumar Saraswat',quote:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae eveniet porro qui voluptas, suscipit veritatis ad ipsam? Blanditiis, ea maiores."},
            {src:lusy.src, label:'Lucy Rose',quote:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae eveniet porro qui voluptas, suscipit veritatis ad ipsam? Blanditiis, ea maiores."}
        ].map(d=><TeamCard  {...d} key={d.label}/>)}
    </div>
</div>
  )
}

export default Team