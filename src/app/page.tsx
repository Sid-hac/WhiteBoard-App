"use client"


import { useTheme } from "next-themes";

import Hero from "@/components/Hero";
import Demo from "@/components/Demo";


const Home = () => {
   
  const { theme } = useTheme()

  return (
    <div className=" relative flex flex-col justify-center items-center">
       <Hero/>
       <Demo/>
    </div>

  );
}

export default Home;
