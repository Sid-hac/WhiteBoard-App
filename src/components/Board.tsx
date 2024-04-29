"use client"

import { COLORCANVAS, MENU_ITEMS } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { actionMenuClick } from "@/lib/slices/menuslice";
import { socket } from "@/socket/socket";
import { useEffect, useRef } from "react"

interface config  {
    color : string,
    size: number,
}


const Board = () => {

  const { activeMenuItem, actionMenuItem } = useAppSelector((state) => state.menu)
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

    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {

      const URL = canvas.toDataURL()
      const anchor = document.createElement("a");
      anchor.href = URL;
      anchor.download = "drawing.png";
      anchor.click();
    } else if (actionMenuItem === MENU_ITEMS.UNDO) {

      if (historyPointer.current > 0) historyPointer.current--

      const imageData = drawHistory.current[historyPointer.current]
      ctx?.putImageData(imageData, 0, 0)
    } else if (actionMenuItem === MENU_ITEMS.REDO) {

      if (historyPointer.current < drawHistory.current.length - 1) historyPointer.current++
      const imageData = drawHistory.current[historyPointer.current]
      ctx?.putImageData(imageData, 0, 0)
    }

    dispatch(actionMenuClick(null))

  }, [actionMenuItem, dispatch])



  useEffect(() => {

    if (!canvasRef.current) return;

    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    canvas.width = (window.innerWidth);
    canvas.height = (window.innerHeight);

    const beginPath = (x: any, y: any) => {
      ctx?.beginPath();
      ctx?.moveTo(x, y - 60)

    }
    const drawLine = (x: any, y: any) => {
      ctx?.lineTo(x, y - 60);
      ctx?.stroke();
      
    }


    const handleMouseDown = (e: any) => {
      shouldDraw.current = true;
      beginPath(e.clientX, e.clientY)
      socket.emit('beginPath' , {x:e.clientX , y : e.clientY})
    }
    const handleMouseMove = (e: any) => {
      if (!shouldDraw.current) return;
      drawLine(e.clientX, e.clientY);
      socket.emit('drawLine' , {x : e.clientX , y : e.clientY});
    }
    const handleMouseUp = (e: any) => {
      shouldDraw.current = false;
      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height)

      if (imageData) {
        drawHistory.current.push(imageData);
      }
      historyPointer.current = drawHistory.current.length - 1;
      

    }

    const handleBeginPath = (path : any) => {
      beginPath(path.x , path.y)
    }
    
    const handleDrawLine = (path : any) => {
        drawLine(path.x , path.y)
    }

    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseup', handleMouseUp)

    
  socket.on("beginPath", handleBeginPath);
  socket.on("drawLine" , handleDrawLine)
  
    

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseup', handleMouseUp)

      socket.off("beginPath", handleBeginPath);
      socket.off("drawLine" , handleDrawLine)

    }

  }, [])
  useEffect(() => {

    if (!canvasRef.current) return;

    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    const changeConfig = (color: string , size : number) => {
      ctx!.strokeStyle = color
      ctx!.lineWidth = size

    }

    const handleConfig = (config : config) => {
       
         changeConfig(config.color ,config.size)
    }
    

    changeConfig(color , size)

    socket.on("config", handleConfig)


    return () => {
      socket.off("config", handleConfig)
    }

    
    
  }, [color, size])




  return (

    <canvas ref={canvasRef} className="w-full h-full overflow-hidden" >

    </canvas>
  )
}

export default Board