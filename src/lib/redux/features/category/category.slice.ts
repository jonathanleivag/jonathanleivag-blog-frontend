import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Category, CategoryState} from '@/type';


const initialState: CategoryState = {
    categories: [],
    selected: null
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
        setSelected: (state, action: PayloadAction<Category| null>) => {
            state.selected = action.payload;
        },
        updateCategory: (state, action: PayloadAction<Category>) => {
            const index = state.categories.findIndex(cat => cat._id === action.payload._id);
            if (index !== -1) {
                state.categories[index] = action.payload;
            }
        },
    },
});

export const { initialDataCategory, addCategory,setSelected ,updateCategory, } = categorySlice.actions;
export default categorySlice.reducer;
