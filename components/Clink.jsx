import {useRouter} from 'next/router';
import Link from 'next/link'


function Clink({ path, label }) {
    const router = useRouter();
    return router.asPath === path
      ? <div className='text-white'>{label}</div>
      : <div className='text-link-blue'><Link href={path}>{label}</Link></div>
  }

  export default Clink;