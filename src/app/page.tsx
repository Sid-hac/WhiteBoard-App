"use client"
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

import Link from "next/link";





const Home = () => {

  const {theme} = useTheme()

  
  return (
    <div className=" relative flex justify-center items-center">
         <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className={cn("text-4xl font-bold  tracking-tight sm:text-6xl " , 
          {'text-slate-500' : theme === 'dark'}
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
        <div className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient"/>

    </div>
  );
}

export default Home;
