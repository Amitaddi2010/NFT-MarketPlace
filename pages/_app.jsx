import '../styles/globals.css'
import swal from 'sweetalert';
import Link from 'next/link'
import { SideBar, NavBar, Footer} from '../components'
import Disc from '../components/Disc';
import { useState } from 'react';
import { Flipper } from 'react-flip-toolkit';
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const [direction, setDirection] = useState('col');
   
  return (
    <div className={direction != 'row' ? `sidebar-layout-container` : ``}>
     
      <Flipper flipKey={direction}>
      {direction == 'row' ? <NavBar direction={direction} /> : <div className='col-span-1 col-start-1 row-span-1 row-start-1'><SideBar direction={direction} /></div>}
      </Flipper>
     
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