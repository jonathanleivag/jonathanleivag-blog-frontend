import {configureStore} from '@reduxjs/toolkit'
import newsReducer from './features/news/news.slice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            news: newsReducer,
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
