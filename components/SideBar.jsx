import {Clink} from './';

const data = [
  { label: 'Home', path: '/' },
  { label: 'Marketplace', path: '/marketplace' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Sell Nfts', path: '/sell-nfts' },
  { label: 'My Nfts', path: '/my-nfts' },
  { label: 'About', path: '/about' },
]

function SideBar() {

  return (
    <nav className={`font-outfit w-[280px] h-screen pt-12 bg-tert`}>
      <div className="heading text-white text-3xl text-center">Murals.</div>
      <ul className={'flex flex-col w-full items-center'}>
        {data.map(d => <li className='w-[216px] h-[48px] text-left' key={d.label}><Clink {...d} classNameActive="rounded-2xl w-[216px] h-[48px] pl-20 text-white bg-[#A249FF] leading-[48px]" classNameInActive="leading-[48px] w-[216px] h-[48px] pl-20 text-[#676D7C]"/></li>)}
        <li>
          <div className='bg-[#2d2879] h-12 w-40 grid grid-cols-4 items-center justify-items-center rounded-full'>
            <div className='bg-[#9091DC] h-4 w-4 rounded-full col-span-1'></div>
            <span className='text-white uppercase col-span-3'>connect</span>
          </div>
        </li>
      </ul>
    </nav>
  )
}


// local components


export default SideBar