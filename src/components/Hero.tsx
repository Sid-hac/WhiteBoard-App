"use client"

import { cn } from '@/lib/utils'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button, buttonVariants } from './ui/button'
import { useTheme } from "next-themes";

const Hero = () => {

    const { theme } = useTheme()

    
    const [isMounted , setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        setIsMounted(true)
    },[])
    if(!isMounted){
        return null
    }
       const isDark = theme === 'dark'



    return (

        <section>

            <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
                <h1 className={cn("text-4xl font-bold  tracking-tight sm:text-6xl ",
                    { 'text-slate-500': theme === 'dark' }
                )}>
                    Unleash Your Creativity! with{' '}
                    <span className="text-blue-700">Doodleboard</span>
                </h1>
                <p className="mt-6 text-lg max-w-prose text-muted-foreground font-semibold" >
                    Welcome to Doodleboard.
                </p>
                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                    <Link href="/whiteboard" className={buttonVariants()}>Get started</Link>
                    <Button variant="ghost">Join community &rarr;</Button>
                </div>
            </div>

            <div className="absolute z-[1] -left-1/2 bottom-0 w-[50%] h-[50%] rounded-full pink__gradient " />
            {isDark && <div className="absolute z-[0] w-[60%] h-[60%] -right-[20%] top-10 rounded-full blue__gradient" />}

        </section>

    )
}

export default Hero