"use client"

import Menu from "@/components/Menu"
import { Loader } from "lucide-react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

const Page = () => {

  const { data: session , status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callback=/whiteboard")
    }
  })


  if (status === "loading") {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader width={50} height={50} className=" animate-spin" />
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-col justify-center items-center " >
         <Menu/>
      </div>

    </div>

  )
}

export default Page