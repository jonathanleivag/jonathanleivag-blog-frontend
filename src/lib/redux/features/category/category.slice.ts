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
        },
        addCategory: (state, action: PayloadAction<Category>) => {
            state.categories = [...state.categories, action.payload];
        },
        updateCategory: (state, action: PayloadAction<Category>) => {
            const index = state.categories.findIndex(cat => cat._id === action.payload._id);
            if (index !== -1) {
                state.categories[index] = action.payload;
            }
        }
    },
});

export const { initialDataCategory, addCategory, updateCategory } = categorySlice.actions;
export default categorySlice.reducer;
