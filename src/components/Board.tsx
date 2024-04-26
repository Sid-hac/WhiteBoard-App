"use client"

import { useAppSelector } from "@/lib/hooks";
import { useEffect, useRef } from "react"





const Board = () => {

  const activeMenuItem = useAppSelector((state) => state.menu.activeMenuItem)
  const { color, size } = useAppSelector((state) => state.toolbox[activeMenuItem])

  const canvasRef = useRef(null);
  const shouldDraw = useRef(false);

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