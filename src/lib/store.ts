import { configureStore } from "@reduxjs/toolkit";
import menuslice from "./slices/menuslice";
import toolboxReducer from './slices/toolboxSlice'

 const store  = () => {
    return configureStore({
      reducer: {
        menu : menuslice,
        toolbox : toolboxReducer
      },
    })
  }

  // Infer the type of makeStore
export type AppStore = ReturnType<typeof store>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export default store
