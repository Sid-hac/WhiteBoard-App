"use client"

import Image from 'next/image'
import logo from '../../public/logo.svg'
import Navsignout from './Navsignout'
import ToggleMode from './ToggleMode'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'


const Nav = () => {

  const {data:session } = useSession();
  const {theme} = useTheme()

  return (

    <nav className={cn(' flex justify-between items-center h-16 bg-slate-100 p-8',
      {'bg-slate-950 border-b-[1px] border-slate-700' : theme === 'dark'}
    )}>
      <div className='flex justify-center items-center gap-2' >
        <Image src={logo} width={40} height={40} alt='logo' />
        <h1 className={cn('text-black text-2xl font-bold font-mono max-sm:hidden' , 
          {'text-white' : theme === 'dark'}
        )}>DoodleBoard</h1>
      </div>
      <div className='flex justify-center items-center gap-2'>
        <Navsignout/>
        <ToggleMode/>
        {session && <Image src={session.user!.image || ""} alt={session.user?.name || "profile_img"} width={36} height={36} className='rounded-full' />}
      </div>
    </nav>
  )
}

export default Nav