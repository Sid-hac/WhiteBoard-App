


// import { useSelector } from 'react-redux'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { COLORCANVAS, COLORS, MENU_ITEMS } from '../../src/constants'
import { changeBrushSize, changeColor } from '@/lib/slices/toolboxSlice';
import { ChangeEvent } from 'react';
import { socket } from '@/socket/socket';




const Toolbox = () => {

    const activeMenuItem = useAppSelector((state) => state.menu.activeMenuItem)
    const { color, size } = useAppSelector((state) => state.toolbox[activeMenuItem])
    const showStrokeToolOption = activeMenuItem === MENU_ITEMS.PENSIL;
    const showBrushToolOption = activeMenuItem === MENU_ITEMS.PENSIL || activeMenuItem === MENU_ITEMS.ERASER

    const dispatch = useAppDispatch();

    const changeSizeHandler = (e : ChangeEvent<HTMLInputElement>) => {
           dispatch(changeBrushSize({item : activeMenuItem , size: Number(e.target.value)}))
           socket.emit("config ", {color , size :Number( e.target.value)})
    }

    const handleColorChange = (color: string )=> {
           
        dispatch(changeColor({item : activeMenuItem , color : color}))
        socket.emit("config" , {color : color , size})

    }

    return (

        <div className="absolute left-2 top-40 flex flex-col justify-center items-center border border-black bg-slate-100 rounded-md ">
            {showStrokeToolOption &&
                <div className='p-2 space-y-2' >
                    <h3>Stroke color</h3>
                    <div className='grid grid-cols-4 justify-center items-center gap-2 ' >
                        <div className={`bg-black w-6 h-6 col-span-1 border border-black hover:scale-110 rounded-sm`} onClick={() => handleColorChange(COLORS.BLACK)} />
                            <div className={`bg-blue-600 w-6 h-6 border border-black hover:scale-110 rounded-sm`} onClick={() => handleColorChange(COLORCANVAS.BLUE)} />
                            <div className={`bg-green-600 w-6 h-6 border border-black hover:scale-110 rounded-sm`} onClick={() => handleColorChange(COLORCANVAS.GREEN)} />
                             <div className={`bg-orange-600 w-6 h-6 border border-black hover:scale-110 rounded-sm`} onClick={() => handleColorChange(COLORCANVAS.ORANGE)} />
                             <div className={`bg-red-600 w-6 h-6 border border-black hover:scale-110 rounded-sm`} onClick={() => handleColorChange(COLORCANVAS.RED)} />
                            <div className={`bg-yellow-600 w-6 h-6 border border-black hover:scale-110 rounded-sm`} onClick={() => handleColorChange(COLORCANVAS.YELLOW)} />
                            <div className={`bg-white w-6 h-6 border border-black hover:scale-110 rounded-sm `} onClick={() => handleColorChange(COLORCANVAS.WHITE)} />
                           <div className={`bg-purple-600 w-6 h-6 border border-black hover:scale-110 rounded-sm `} onClick={() => handleColorChange(COLORCANVAS.PURPLE)} />

                        {/* {COLORS.map((color, i) => (
                            <div key={i} className={`bg-${color} w-6 h-6 border border-black hover:scale-110 rounded-sm`} />
                        ))} */}

                    </div>
                </div>}

            <div className="p-2" >
                <h3>{activeMenuItem} size</h3>
                <input type="range" min={1} max={20} step={1} className='w-full' onChange={changeSizeHandler} value={size} />
            </div>
        </div>
    )
}

export default Toolbox

