import { MENU_ITEMS } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";

  
   const initialState = {
        activeMenuItem : MENU_ITEMS.PENSIL,
        actionMenuItem : null
   }

   const MenuSlice = createSlice({
       name : 'menu',
       initialState,
       reducers :{
             menuItemClick(state , action) {
                 state.activeMenuItem = action.payload
             },
             actionMenuClick(state , action) {
                 state.actionMenuItem = action.payload
             }
       }
   })

   export const { menuItemClick , actionMenuClick } = MenuSlice.actions;
   export default MenuSlice.reducer;
