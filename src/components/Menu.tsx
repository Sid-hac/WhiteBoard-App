"use client"
import { MENU_ITEMS } from "@/constants"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { menuItemClick } from "@/lib/slices/menuslice"
import { cn } from "@/lib/utils"

import { Eraser, FileDownIcon, Pen, Redo, Undo } from "lucide-react"
import React from "react"
// import { useDispatch } from "react-redux"


const Menu = () => {
   
   const dispatch = useAppDispatch()
   const activeMenuItem = useAppSelector((state) => state.menu.activeMenuItem)
   const hancleClick = (itemName : string) => {
         
      dispatch(menuItemClick(itemName))
   }

  return (
         <div className="flex justify-end items-center w-100 h-10 mt-10 absolute right-2 top-64 " >
            <div className="flex flex-col justify-center items-center gap-8 bg-slate-100 p-2 rounded-sm shadow-2xl border border-black ">
                  <div className={cn("object-contain hover:bg-purple-200 hover:border-purple-400 p-2 rounded-md " , 
                   {"bg-purple-400" : activeMenuItem === MENU_ITEMS.PENSIL},
                   {"hover:bg-purple-200" : activeMenuItem !== MENU_ITEMS.PENSIL}
                  )} onClick={() => hancleClick(MENU_ITEMS.PENSIL)}  >
                     <Pen width={25} height={25} />
                  </div>
                  <div className={cn("object-contain  hover:border-purple-400 p-2 rounded-md " , 
                   {"bg-purple-400" : activeMenuItem === MENU_ITEMS.ERASER},
                   {"hover:bg-purple-200" : activeMenuItem !== MENU_ITEMS.ERASER}
                  )} onClick={() => hancleClick(MENU_ITEMS.ERASER)} >
                     <Eraser width={25} height={25} />
                  </div>
                  <div className="object-contain  hover:bg-purple-200 hover:border-purple-400 p-2 rounded-md " >
                     <Undo width={25} height={25} />
                  </div >
                  <div className="object-contain  hover:bg-purple-200 hover:border-purple-400 p-2 rounded-md " >
                     <Redo width={25} height={25} />
                  </div>
                  <div className="object-contain  hover:bg-purple-200 hover:border-purple-400 p-2 rounded-md " >
                     <FileDownIcon width={25} height={25} />
                  </div>
            </div>
         </div>
  )
}

export default Menu