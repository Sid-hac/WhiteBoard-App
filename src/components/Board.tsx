"use client"

import { MENU_ITEMS } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { actionMenuClick } from "@/lib/slices/menuslice";
import { useEffect, useRef } from "react"

const Board = () => {

  const {activeMenuItem , actionMenuItem} = useAppSelector((state) => state.menu)
  const { color, size } = useAppSelector((state) => state.toolbox[activeMenuItem])

  const canvasRef = useRef(null);
  const shouldDraw = useRef(false);
  const drawHistory = useRef<ImageData[]>([])
  const historyPointer = useRef(0);
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    if(actionMenuItem === MENU_ITEMS.DOWNLOAD){
        
         const URL = canvas.toDataURL()
         const anchor = document.createElement("a");
         anchor.href = URL;
         anchor.download = "drawing.png";
         anchor.click();
        }else if(actionMenuItem === MENU_ITEMS.UNDO){
          
          if(historyPointer.current > 0) historyPointer.current--
          
          const imageData = drawHistory.current[historyPointer.current]
          ctx?.putImageData(imageData , 0 , 0)
        }else if(actionMenuItem === MENU_ITEMS.REDO){
            
          if(historyPointer.current < drawHistory.current.length - 1) historyPointer.current++
          const imageData = drawHistory.current[historyPointer.current]
          ctx?.putImageData(imageData , 0 , 0)
        }
        dispatch(actionMenuClick(null))

  },[actionMenuItem, dispatch])
  
  

  useEffect(() => {

    if (!canvasRef.current) return;

    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    canvas.width = (window.innerWidth);
    canvas.height = (window.innerHeight);

    const beginPath = (x : any , y : any) => {
      ctx?.beginPath();
      ctx?.moveTo(x , y - 60)

    }
    const drawLine = (x : any, y :any) => {
      ctx?.lineTo(x , y - 60);
      ctx?.stroke();
    }


    const handleMouseDown = (e: any) => {
      shouldDraw.current = true;
      beginPath(e.clientX, e.clientY)
    }
    const handleMouseMove = (e: any) => {
      if (!shouldDraw.current) return;
      drawLine(e.clientX, e.clientY);
    }
    const handleMouseUp = (e: any) => {
      shouldDraw.current = false;
      const imageData = ctx?.getImageData(0 , 0, canvas.width, canvas.height)

      if (imageData){
        drawHistory.current.push(imageData);
      }
      historyPointer.current = drawHistory.current.length - 1;
      
    }

    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseup', handleMouseUp)

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseup', handleMouseUp)
    }

  }, [])
  useEffect(() => {

    if (!canvasRef.current) return;

    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    const changeConfig = () => {
      ctx!.strokeStyle = color
      ctx!.lineWidth = size

    }

    changeConfig()

  }, [color, size])

  console.log(color, size);




  return (

    <canvas ref={canvasRef} className="w-full h-full overflow-hidden" >

    </canvas>
  )
}

export default Board