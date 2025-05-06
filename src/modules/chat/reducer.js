import { createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import getUserList from './slices/getUserList'
import getMessages from './slices/getMessages'

const initialState = {
    users: [],
    activeChatRoom: false,
    currentUser: {},
    error: null,
};

export const chatSlice = createSlice({
    'name': 'chat',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserList.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(getMessages.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.activeChatRoom = true;
            })
            .addMatcher(isRejectedWithValue, (state, action) => {
                state.error = action.payload;
            })
    }
});

export const { } = chatSlice.actions
export { getUserList, getMessages }

export default chatSlice.reducer