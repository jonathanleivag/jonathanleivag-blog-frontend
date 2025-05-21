import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Blog, Category, CategoryState, Pagination} from '@/type';


const initialState: CategoryState = {
    categories: {
        docs: [],
        totalDocs: 0,
        limit: 10,
        totalPages: 0,
        page: 1,
        pagingCounter: 1,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null
    },
    selected: null,
    selectBlog: undefined
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        initialDataCategory: (state, action: PayloadAction<Pagination<Category>>) => {
            state.categories = action.payload;
        },
        addCategorySelect: (state, action: PayloadAction<Pagination<Category>>) => {
            state.categories = {
                ...action.payload,
                docs: [...state.categories.docs, ...action.payload.docs]
            };

        },
        addCategory: (state, action: PayloadAction<Category>) => {
            const isLastPage = state.categories.page === state.categories.totalPages;
            const hasSpace = state.categories.docs.length < state.categories.limit;

            if (isLastPage && hasSpace) {
                state.categories.docs = [...state.categories.docs, action.payload];
            }
            state.categories.totalDocs += 1;
            if (isLastPage && !hasSpace) {
                state.categories.totalPages += 1;
            }
        },
        setSelected: (state, action: PayloadAction<Category| null>) => {
            state.selected = action.payload;
        },
        updateCategory: (state, action: PayloadAction<Category>) => {
            const index = state.categories.docs.findIndex(cat => cat._id === action.payload._id);
            if (index !== -1) {
                state.categories.docs[index] = action.payload;
            }
        },
        selectBlog: (state, action: PayloadAction<Blog[]| undefined>) => {
            state.selectBlog = action.payload;
        },
    },
});

export const { initialDataCategory, addCategory,setSelected ,updateCategory, selectBlog, addCategorySelect } = categorySlice.actions;
export default categorySlice.reducer;
