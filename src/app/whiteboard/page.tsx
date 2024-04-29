"use client"
import Board from "@/components/Board"
import Menu from "@/components/Menu"
import Toolbox from "@/components/Toolbox"
import { AlignJustify, CircleX, Cross, Loader } from "lucide-react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../../../src/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { useState } from "react"



const Page = () => {

  const [showTool, setShowTool] = useState<boolean>(false)

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callback=/whiteboard")
    }
  })

  const handleShowTool = () => {
    setShowTool(true)
  }

  const handleCloseTool = () => {
    setShowTool(false)
  }


  if (status === "loading") {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader width={50} height={50} className=" animate-spin" />
      </div>
    )
  }

  return (
    <div className=" relative w-full h-full">
      <div className="w-full h-full flex flex-col justify-center items-center " >

        <div className="absolute top-5 right-5">
          <span  >
            {!showTool && <AlignJustify onClick={handleShowTool} />}
            {showTool && <CircleX onClick={handleCloseTool} />}
          </span>
        </div>
        <div className="sm:hidden flex">
          {showTool && <Menu />}
        </div>
        <div className="sm:hidden flex">
          {showTool && <Toolbox />}
        </div>
        <div className="hidden sm:flex" >

          <Menu />

          <Toolbox />
        </div>
          <Board />
      </div>

    </div>

  )
}



export default Page