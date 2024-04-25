import { Eraser, FileDownIcon, Pen, Redo, Undo } from "lucide-react"
import React from "react"


const Menu = () => {
  return (
         <div className="flex justify-end items-center w-100 h-10 mt-10 absolute right-2 top-64 " >
            <div className="flex flex-col justify-center items-center gap-8 bg-slate-100 p-2 rounded-sm shadow-2xl border border-black " >
                  <div className="object-contain hover:bg-purple-200 hover:border-purple-400 p-2 rounded-md " >
                     <Pen width={25} height={25} />
                  </div>
                  <div className="object-contain  hover:bg-purple-200 hover:border-purple-400 p-2 rounded-md " >
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