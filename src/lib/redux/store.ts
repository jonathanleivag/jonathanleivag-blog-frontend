import {configureStore} from '@reduxjs/toolkit'
import newsReducer from './features/news/news.slice'
import categoryReducer from './features/category/category.slice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            news: newsReducer,
            category: categoryReducer,
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
