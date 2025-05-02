import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Category} from '@/type';

interface CategoryState {
    categories: Category[];
}

const initialState: CategoryState = {
    categories: [],
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        initialDataCategory: (state, action: PayloadAction<Category[]>) => {
            state.categories = action.payload;
        }
    },
});

export const { initialDataCategory } = categorySlice.actions;
export default categorySlice.reducer;
