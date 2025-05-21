import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SocialData, SocialState} from '@/type';

const initialState: SocialState = {
    socials: {
        data: {
            _id: '',
            socials: []
        },
        error: null,
        status: 0,
        statusText: ''
    }
};

const socialSlice = createSlice({
    name: 'social',
    initialState,
    reducers: {
        initialDataSocial: (state, action: PayloadAction<SocialData>) => {
            state.socials = action.payload;
        }
    },
});

export const { initialDataSocial } = socialSlice.actions;
export default socialSlice.reducer;
