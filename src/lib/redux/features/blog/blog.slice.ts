import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Blog, BlogState, Pagination} from '@/type';


const initialState: BlogState = {
    blogs: {
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
};

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        initialDataBlog: (state, action: PayloadAction<Pagination<Blog>>) => {
            state.blogs = action.payload;
        },
        addBlog: (state, action: PayloadAction<Blog>) => {
            const isLastPage = state.blogs.page === state.blogs.totalPages;
            const hasSpace = state.blogs.docs.length < state.blogs.limit;

            if (isLastPage && hasSpace) {
                state.blogs.docs = [...state.blogs.docs, action.payload];
            }
            state.blogs.totalDocs += 1;
            if (isLastPage && !hasSpace) {
                state.blogs.totalPages += 1;
            }
        }
    }
});

export const {initialDataBlog, addBlog} = blogSlice.actions;
export default blogSlice.reducer;
