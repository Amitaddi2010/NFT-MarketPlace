import {useRouter} from 'next/router';
import Link from 'next/link'
import {Flipped} from 'react-flip-toolkit'

function Clink({ path, label, classNameActive, classNameInActive }) {
    const {asPath:Path} = useRouter();
    return <Flipped inverseFlipId='nav' flipId={label}>
     {Path === path ? <div className={classNameActive}>{label}</div>
      : <div className={classNameInActive}><Link href={path}>{label}</Link></div>}
      </Flipped> 
  }

  export default Clink;