 
  
  import { MENU_ITEMS , COLORCANVAS } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";


  const initialState = {
     [MENU_ITEMS.PENSIL] :{ 
           
         color : COLORCANVAS.BLACK,
         size : 1,
     },
     [MENU_ITEMS.ERASER] :{
        
         color : COLORCANVAS.WHITE,
         size : 1,
     }
  }

  const toolboxSlice = createSlice({
     name: 'toolbox',
     initialState ,
     reducers : {
         changeColor : (state, action) => {
             state[action.payload.item].color = action.payload.color
         },
         changeBrushSize : (state, action) => {
             state[action.payload.item].size = action.payload.size
         }
         
     }
  })

  export const { changeColor , changeBrushSize } = toolboxSlice.actions;
  export default toolboxSlice.reducer;
