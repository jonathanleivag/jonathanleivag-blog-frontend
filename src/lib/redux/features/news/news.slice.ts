import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Gnews, NewsState} from '@/type'

const initialState: NewsState = {
    news: []
}

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        initialDataNews: (state, action: PayloadAction<Gnews[]>) => {
            state.news = action.payload;
        }
    },
})

export const { initialDataNews } = newsSlice.actions

export default newsSlice.reducer
