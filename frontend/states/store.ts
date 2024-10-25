// import { configureStore } from "@reduxjs/toolkit";


// const store = configureStore({
//     reducer: {
//         note: noteReducer,
//         noteForm: noteFormReducer
//     },
// });

// export default store;

import { configureStore } from '@reduxjs/toolkit'
import noteReducer from "./noteSlice";
import noteFormReducer from "./noteFormSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            note: noteReducer,
            noteForm: noteFormReducer
        },
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']