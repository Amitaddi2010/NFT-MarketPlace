import {useRouter} from 'next/router';
import Link from 'next/link'


function Clink({ path, label, classNameActive, classNameInActive }) {
    const router = useRouter();
    return router.asPath === path
      ? <div className={classNameActive}>{label}</div>
      : <div className={classNameInActive}><Link href={path}>{label}</Link></div>
  }

  export default Clink;