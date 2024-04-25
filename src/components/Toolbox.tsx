


// import { useSelector } from 'react-redux'
import { useAppSelector } from '@/lib/hooks'
import { COLORS, MENU_ITEMS } from '../../src/constants'
import { SketchPicker } from 'react-color'



const Toolbox = () => {

    const activeMenuItem = useAppSelector((state) => state.menu.activeMenuItem)
    const showStrokeToolOption = activeMenuItem === MENU_ITEMS.PENSIL;
    const showBrushToolOption = activeMenuItem === MENU_ITEMS.PENSIL || activeMenuItem === MENU_ITEMS.ERASER

    return (

        <div className="absolute left-2 top-40 flex flex-col justify-center items-center border border-black bg-slate-100 rounded-md ">
            {showStrokeToolOption &&
                <div className='p-2 space-y-2' >
                    <h3>Stroke color</h3>
                    <div className='grid grid-cols-4 justify-center items-center gap-2 ' >
                        {/* <div className={`bg-black w-6 h-6 col-span-1 `} />
                            <div className={`bg-blue-600 w-6 h-6`} />
                            <div className={`bg-green-600 w-6 h-6`} />
                             <div className={`bg-orange-600 w-6 h-6`} />
                             <div className={`bg-red-600 w-6 h-6`} />
                            <div className={`bg-yellow-600 w-6 h-6`} />
                            <div className={`bg-white w-6 h-6 border border-black `} />
                           <div className={`bg-purple-600 w-6 h-6 border border-black `} /> */}

                        {COLORS.map((color, i) => (
                            <div key={i} className={`bg-${color} w-6 h-6 border border-black hover:scale-110 rounded-sm`} />
                        ))}

                    </div>
                </div>}

            <div className="p-2" >
                <h3>{activeMenuItem} size</h3>
                <input type="range" min={1} max={20} step={1} className='w-full' />
            </div>
        </div>
    )
}

export default Toolbox

