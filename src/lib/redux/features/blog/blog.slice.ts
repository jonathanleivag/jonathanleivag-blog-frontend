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
    }
});

export const { initialDataBlog } = blogSlice.actions;
export default blogSlice.reducer;
