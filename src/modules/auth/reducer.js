import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    user: null,
};

export const authSlice = createSlice({
    'name': 'auth',
    initialState,
    reducers: {
        initiateLogin: (state) => {
            state.loading = true
        },
        attemptLogin: (state, action) => {
            state.user = action.payload
            state.loading = false
        },
        logout: (state) => {
            state.user = null
        }
    }
})

export const { initiateLogin, attemptLogin, logout } = authSlice.actions

export default authSlice.reducer;
