"use client"
import React from 'react';
import store from "./store"

// const {Provider} = require("react-redux") --> we can use this also
import { Provider } from 'react-redux';

export function Providers({children }:{children :  React.ReactNode}){
    return(
        <Provider store={store()}>
            {children}
        </Provider>
    )
}