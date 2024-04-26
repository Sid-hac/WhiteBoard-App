
import Image from 'next/image'
import logo from '../../public/logo.svg'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Navsignout from './Navsignout'




const Nav = async () => {

 

  const session = await getServerSession(authOptions);

  return (

    <nav className=' flex justify-between items-center h-16 bg-slate-100 p-8'>
      <div className='flex justify-center items-center gap-2' >
        <Image src={logo} width={40} height={40} alt='logo' />
        <h1 className='text-black text-2xl font-bold font-mono max-sm:hidden'>DoodleBoard</h1>
      </div>
      <div className='flex justify-center items-center gap-2'>
        <Navsignout/>
        {session && <Image src={session.user!.image || ""} alt={session.user?.name || "profile_img"} width={36} height={36} className='rounded-full' />}
      </div>
    </nav>
  )
}

export default Nav