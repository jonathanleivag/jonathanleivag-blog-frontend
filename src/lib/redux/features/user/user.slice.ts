import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Pagination, User, UserState} from '@/type';


const initialState: UserState = {
    users: {
        docs: [],
        totalDocs: 0,
        limit: 5,
        totalPages: 0,
        page: 1,
        pagingCounter: 1,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null
    },
};


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        initialDataUser: (state, action: PayloadAction<Pagination<User>>) => {
            state.users = action.payload;
        }
    }
});

export const {initialDataUser} = userSlice.actions;
export default userSlice.reducer;
