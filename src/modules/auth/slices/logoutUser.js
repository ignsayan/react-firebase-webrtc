import { createAsyncThunk } from '@reduxjs/toolkit'
import { signOut } from 'firebase/auth'
import { auth } from '../../../configs/firebase'

/**
 * @function logoutUser
 * @description
 * 1. Signs out the user from Firebase Auth.
 * 2. Clears `uid` and `authToken` from `localStorage`.
 * 3. Returns `true` upon successful logout.
 * 4. Handles and returns any errors through `rejectWithValue` for Redux error handling.
 *
 * @type {AsyncThunk}
 *
 * @param {void} _ - This thunk does not require any arguments.
 * @param {Object} thunkAPI - Provided by Redux Toolkit, contains utility methods.
 * @param {Function} thunkAPI.rejectWithValue - A helper to reject the thunk with a custom error message.
 *
 * @returns {Promise<boolean>} Resolves with `true` if logout is successful.
 * @throws {string} Rejects with a descriptive error message if logout fails.
 */
const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {

        try {
            signOut(auth).then(() => {
                localStorage.removeItem('uid');
                localStorage.removeItem('authToken');
            });
            return true;

        } catch (error) {
            return rejectWithValue(error.message || 'Failed to logout');
        }
    });

export default logoutUser