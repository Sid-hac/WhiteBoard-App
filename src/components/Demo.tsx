"use client"

import Image from "next/image"

import demo from '../../public/images/drawing.png'
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"


const Demo = () => {

    const {theme} = useTheme()

  return (
   
     <div  className="relative mb-20">
        <Image src={demo} alt="demo" width={800} height={800} className={cn("shadow-xl shadow-slate-300 border border-black" , {
            'shadow-md shadow-slate-50' : theme === 'dark'
        })} />
        <div className="absolute z-[1] -left-1/4 bottom-0 w-[25%] h-[50%] rounded-full pink__gradient " />
       
       
     </div>
  )
}

export default Demo