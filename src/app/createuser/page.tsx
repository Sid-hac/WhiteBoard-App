"use client"

import { Loader } from "lucide-react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

const Page = () => {

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin")
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
    <div className="w-screen h-screen">
      <div className="w-full h-full flex flex-col justify-center items-center " >
        welcome
        {session ? <p>active session</p> : <p>failed</p>}
      </div>

    </div>

  )
}

export default Page