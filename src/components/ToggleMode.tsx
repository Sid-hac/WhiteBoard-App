"use client"

import { useTheme } from "next-themes"
import {Sun , Moon} from 'lucide-react'
import { Button } from "./ui/button"
import { useEffect, useState } from "react"

const ToggleMode = () => {

    const {theme ,setTheme} = useTheme()
    const [isMounted , setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        setIsMounted(true)
    },[])
    if(!isMounted){
        return null
    }

    const isDark = theme === 'dark'

  return (
        <Button variant={"outline"} onClick={() => setTheme(`${isDark ? 'light' : 'dark'}`)}>
          {theme === 'dark'? <Sun /> : <Moon />}
        </Button>
  )
}

export default ToggleMode