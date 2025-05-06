import { createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import getUserList from './slices/getUserList'
import getChatUser from './slices/getChatUser'
import getMessages from './slices/getMessages'
import sendMessage from './slices/sendMessage'

const initialState = {
    users: [],
    chats: [],
    activeChatRoom: false,
    activeChatUser: {},
    error: null,
};

export const chatSlice = createSlice({
    'name': 'chat',
    initialState,
    reducers: {
        resetChatState: (state, { payload } = {}) => {
            state.chats = [];
            if (payload?.type === 'logout') {
                state.activeChatRoom = false;
                state.activeChatUser = {};
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserList.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(getChatUser.fulfilled, (state, action) => {
                state.activeChatUser = action.payload;
                state.activeChatRoom = true;
            })
            .addCase(getMessages.fulfilled, (state, action) => {
                state.chats = action.payload;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.chats.push(action.payload);
            })
            .addMatcher(isRejectedWithValue, (state, action) => {
                state.error = action.payload;
            })
    }
});

export const { resetChatState } = chatSlice.actions
export { getUserList, getChatUser, getMessages, sendMessage }

export default chatSlice.reducer