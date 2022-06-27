import {useRouter} from 'next/router'
import Clink from './Clink'

function Footer() {
    const data = [
        { label: 'Home', path: '/' },
        { label: 'Marketplace', path: '/marketplace' },
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Sell Nfts', path: '/sell-nfts' },
        { label: 'My Nfts', path: '/my-nfts' },
        { label: 'About', path: '/about' },
      ]
      
    return (
        <>
            <footer className='bg-tert text-white pt-[151px]'>
                <div className="font-semibold text-4xl text-left tracking-normal self-end">Murals.</div>
                <div>
                {data.map(d=><Clink {...d} key={d.label} classNameActive="text-white" classNameInActive="text-link-blue"/>)}
                </div>
                <div>
                    <h4>Contact</h4>
                    <div className='text-[#8C8E9D]'>Email</div>
                    <div className='text-[#8C8E9D]'>LinkedIn</div>
                    <div className='text-[#8C8E9D]'>Instagram</div>
                    <div className='text-[#8C8E9D]'>Twitter</div>
                </div>
                <div className='font-semibold text-xl leading-7 text-left tracking-normal font-outfit h-[100px] px-[190px]'>
                    <span className=''>Join our news letter</span>
                    <div className='bg-[#13124F] w-[345px] h-[53px] flex items-center justify-center rounded-3xl mt-[30px]'>
                        <input placeholder='Email Address' type="email" className='border-none bg-transparent ml-4 font-normal text-base leading-8 text-left tracking-normal outline-none' />
                        <button className='rounded-3xl bg-[#8D8DDA] w-[120px] h-[40px]'>Submit</button>
                    </div>
                </div>
                <div className='h-[11px] w-full row-span-1 row-start-2 col-span-full mt-[100px] px-0' style={{background:'linear-gradient(278.71deg, #ABD9D9 -20.32%, #5151C6 103.51%)'}}></div>
            </footer>
            
        </>
    )
}

export default Footer