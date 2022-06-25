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
    <nav className="font-outfit flex justify-around pt-12 bg-tert">
      <div className="heading text-white text-3xl">Murals.</div>
      <ul className='flex space-x-6 items-center'>
        {data.map(d => <li><Clink {...d} key={d.label}/></li>)}
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


export default NavBar