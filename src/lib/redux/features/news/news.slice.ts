import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Gnews} from '@/type';

interface NewsState {
  news: Gnews[];
}

const initialState: NewsState = {
  news: [],
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    initialDataNews: (state, action: PayloadAction<Gnews[]>) => {
      state.news = action.payload;
    },
    appendNews: (state, action: PayloadAction<Gnews[]>) => {
      state.news = [...state.news, ...action.payload];
    },
  },
});

export const { initialDataNews, appendNews } = newsSlice.actions;
export default newsSlice.reducer;
