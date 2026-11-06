import { printerApi } from './api/printerApi'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        [printerApi.reducerPath]: printerApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(printerApi.middleware),
})