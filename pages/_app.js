import '../styles/globals.css'
import Link from 'next/link'
import { NavBar, Footer } from '../components'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}

export default MyApp