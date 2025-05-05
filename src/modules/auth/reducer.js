import { createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import attemptLogin from './slices/attemptLogin'

const initialState = {
    loading: false,
    isAuthenticated: localStorage.getItem('authToken') ? true : false,
};

export const authSlice = createSlice({
    'name': 'auth',
    initialState,
    reducers: {
        initiateLogin: (state) => {
            state.loading = true;
        },
        logout: (state) => {
            localStorage.removeItem('uid');
            localStorage.removeItem('authToken');
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(attemptLogin.pending, (state) => {
                state.loading = true;
            })
            .addCase(attemptLogin.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.loading = false;
            })
            .addMatcher(isRejectedWithValue, (state) => {
                state.loading = false;
            })
    }
})

export const { initiateLogin, logout } = authSlice.actions
export { attemptLogin }

export default authSlice.reducer;
