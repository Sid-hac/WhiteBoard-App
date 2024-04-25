import { configureStore } from "@reduxjs/toolkit";
import menuslice from "./slices/menuslice";


 const store  = () => {
    return configureStore({
      reducer: {
        menu : menuslice
      },
    })
  }

  // Infer the type of makeStore
export type AppStore = ReturnType<typeof store>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export default store
