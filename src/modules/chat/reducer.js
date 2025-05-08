import { createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import getChatMessages from './slices/getChatMessages'
import getChatroomUser from './slices/getChatroomUser'
import getAvailableUsers from './slices/getAvailableUsers'
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
            .addCase(getAvailableUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(getChatroomUser.fulfilled, (state, action) => {
                state.activeChatUser = action.payload;
                state.activeChatRoom = true;
            })
            .addCase(getChatMessages.fulfilled, (state, action) => {
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
export { getAvailableUsers, getChatroomUser, getChatMessages, sendMessage }

export default chatSlice.reducer