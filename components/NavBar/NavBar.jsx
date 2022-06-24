import Link from 'next/link'
import { useRouter } from 'next/router'

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
        {data.map(d => <List {...d} key={d.label}/>)}
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

function List({ path, label }) {
  const router = useRouter();
  console.log(router.asPath)
  return router.asPath === path
    ? <li className='text-white'>{label}</li>
    : <li className='text-link-blue'><Link href={path}>{label}</Link></li>
}
export default NavBar