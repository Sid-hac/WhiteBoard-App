"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { signOut, useSession } from "next-auth/react"
import {  useRouter } from "next/navigation"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"


const Navsignout = () => {

    const router = useRouter()

    const {data : session} = useSession()
    
    const handleSignout = async() => {
       
        await signOut();
        router.push("/")
        
   }
    return (
        <Button>
            {session ? 
              <AlertDialog>
              <AlertDialogTrigger>Sign out</AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSignout} >Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
             
            : <Link href='/api/auth/signin' >Sign in</Link>}
        </Button>
    )
}

export default Navsignout