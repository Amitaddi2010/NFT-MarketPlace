import '../styles/globals.css'
import Link from 'next/link'
import { SideBar, NavBar, Footer } from '../components'
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [direction, setDirection] = useState('col');
  return (
    <div className={direction != 'row' ? `sidebar-layout-container` : ``}>
      {direction == 'row' ? <NavBar direction={direction} /> : <div className='col-span-1 col-start-1 row-span-1 row-start-1'><SideBar direction={direction} /></div>}
      <div className={direction != 'row' ? `col-span-1 col-start-2 h-screen  overflow-scroll` : ``}>
        <Component {...pageProps} setDirection={setDirection} />
      </div>
      <div className={direction != 'row' ? `col-span-full` : ``}>
      <Footer />
      </div>
    </div>
  )
}

export default MyApp