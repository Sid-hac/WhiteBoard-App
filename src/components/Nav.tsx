"use client"

import Image from 'next/image'
import logo from '../../public/logo.svg'
import Navsignout from './Navsignout'
import ToggleMode from './ToggleMode'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Room from './Room'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Input } from './ui/input'
import { Button, buttonVariants } from './ui/button'
import { socket } from '@/socket/socket'
import { Toast } from './ui/toast'
import { useToast } from './ui/use-toast'
import { LogOut } from 'lucide-react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'
import { useRouter } from 'next/navigation'


const Nav = () => {

  const { data: session } = useSession();
  const { theme } = useTheme()
  const { toast } = useToast()
  const router = useRouter()

  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [roomName, setRoomName] = useState<string>('')
  const [joinRoomName, setJoinRoomName] = useState<string>('')
  const [isJoined, setIsJoined] = useState<boolean>(false)
  const [latestRoom, setLatestRoom] = useState<string>('')


  useEffect(() => {
    setIsMounted(true)
    socket.on('connected', (data) => {
      console.log(data)
    })

    socket.on('newUser', ({ username, roomname }) => {
      setIsJoined(true)
      console.log(roomname);

      setLatestRoom(roomname)

      toast({
        description: `${username} has joined`
      })
    })



  }, [toast])
  if (!isMounted) {
    return null
  }
  const isDark = theme === 'dark'

  // const inputHandler = (e:any) => {
  //     setRoomName(e.target.value)
  //     
  // }


  const createRoomHandler = () => {

    setRoomName('')

    socket.emit('createRoom', { roomName: roomName, userName: session?.user?.name as string, id: socket.id })
  }

  const createJoinHandler = () => {
    setJoinRoomName('')
    socket.emit('joinRoom', { roomName: joinRoomName, userName: session?.user?.name as string, id: socket.id })
  }
  const socketDisconnectHandler = () => {
     router.refresh();
  }



  return (

    <nav className={cn(' flex justify-between items-center h-16 bg-slate-100 p-8',
      { 'bg-slate-950 border-b-[1px] border-slate-700': isDark }
    )}>
      <div className='flex justify-center items-center gap-2' >
        <Link href='/' >
          <Image src={logo} width={40} height={40} alt='logo'  />
        </Link>
        <h1 className={cn('text-black text-2xl font-bold font-mono max-sm:hidden',
          { 'text-white': theme === 'dark' }
        )}>DoodleBoard</h1>
      </div>
      <div className='flex justify-center items-center gap-2'>
        {session && !isJoined && <DropdownMenu >
          <DropdownMenuTrigger >
            <Room name={'create'} varient={'default'} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Give Name</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='flex gap-2' asChild>
              <Input value={roomName} onChange={(e) => setRoomName(e.target.value)} placeholder='Room name' />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSeparator />
            <DropdownMenuItem className={cn(buttonVariants(), 'w-full hover:cursor-pointer hover:outline-none hover:bg-purple-500')} onClick={createRoomHandler} >
              create room
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>}
        {isJoined && <div>
          <Button variant={'ghost'} className='flex gap-2 ' >
            <h3 className='text-xl font-bold '>{latestRoom}</h3>
            <HoverCard>
              <HoverCardTrigger  >
                <LogOut className='h-6 w-6 '  />
              </HoverCardTrigger>
              <HoverCardContent className='font-bold w-fit' onClick={socketDisconnectHandler} >
                 Leave{" "}{latestRoom}
              </HoverCardContent>
            </HoverCard>

          </Button>
        </div>}
        {session && !isJoined && <DropdownMenu >
          <DropdownMenuTrigger >
            <Room name={'Join'} varient={'outline'} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Room Name</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='flex gap-2' asChild>
              <Input value={joinRoomName} onChange={(e) => setJoinRoomName(e.target.value)} placeholder='Room name' />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSeparator />
            <DropdownMenuItem className={cn(buttonVariants(), 'w-full hover:cursor-pointer hover:outline-none hover:bg-purple-500')} onClick={createJoinHandler}>
              Join room
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>}


        <Navsignout />
        <ToggleMode />

        {session && <Image src={session.user!.image || ""} alt={session.user?.name || "profile_img"} width={36} height={36} className='rounded-full' />}
      </div>
    </nav>
  )
}

export default Nav