import { createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import getUserList from './slices/getUserList'

const initialState = {
    loading: false,
    users: [],
    activeChatRoom: false,
};

export const chatSlice = createSlice({
    'name': 'chat',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserList.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserList.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
            })
            .addMatcher(isRejectedWithValue, (state) => {
                state.loading = false;
            })
    }
})

export const { } = chatSlice.actions
export { getUserList }

export default chatSlice.reducer