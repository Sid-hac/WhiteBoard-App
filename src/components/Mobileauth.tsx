"use client"

import Link from "next/link"
import { Button, buttonVariants } from "./ui/button"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"


const Navsignout = () => {

    const router = useRouter()

    const { data: session } = useSession()

    const handleSignout = () => {

        signOut();
        router.push("/")

    }
    return (
        <div className={cn(buttonVariants(), ' flex sm:hidden')} >
            {session ?
                <Button variant={'ghost'} onClick={handleSignout} >
                    sign out
                </Button>

                : <Link href='/api/auth/signin' >Sign in</Link>}
        </div>
    )
}

export default Navsignout