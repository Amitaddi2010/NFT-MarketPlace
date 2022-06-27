import { Flipped } from 'react-flip-toolkit';
import {Clink} from './';

const data = [
  { label: 'Home', path: '/' },
  { label: 'Marketplace', path: '/marketplace' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Sell Nfts', path: '/sell-nfts' },
  { label: 'My Nfts', path: '/my-nfts' },
  { label: 'About', path: '/about' },
]

function NavBar() {

  return (
    <Flipped flipId={'nav'}>
    <nav className={`font-outfit flex justify-around pt-12 bg-tert`}>
    <Flipped inverseFlipId='nav' flipId={'murals'}>
      <div className="heading text-white text-3xl text-center">Murals.</div>
      </Flipped>
      <ul className={'flex space-x-6 items-center'}>
        {data.map(d => <li key={d.label}><Clink {...d} classNameActive="text-white" classNameInActive="text-link-blue"/></li>)}
        <Flipped inverseFlipId='nav' flipId={'connect'}>
        <li>
          <div className='bg-[#2d2879] h-12 w-40 grid grid-cols-4 items-center justify-items-center rounded-full'>
            <div className='bg-[#9091DC] h-4 w-4 rounded-full col-span-1'></div>
            <span className='text-white uppercase col-span-3'>connect</span>
          </div>
        </li>
        </Flipped>
      </ul>
    </nav>

    </Flipped>
  )
}


// local components


export default NavBar