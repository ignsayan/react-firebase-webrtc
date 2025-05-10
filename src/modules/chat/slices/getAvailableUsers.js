import { createAsyncThunk } from '@reduxjs/toolkit'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../configs/firebase'

/**
 * @function getAvailableUsers
 * @description
 * Fetches a list of users from the Firebase Firestore `users` collection,
 * excluding the currently logged-in user (based on `uid` stored in `localStorage`).
 *
 * This thunk is used to retrieve the list of other users available for chat.
 * It leverages Redux Toolkit's `createAsyncThunk` and Firebase's `getDocs` to
 * read all user documents from the Firestore database.
 *
 * @type {AsyncThunk}
 *
 * @param {void} _ - No input parameters are required.
 * @param {Object} thunkAPI - An object provided by Redux Toolkit.
 * @param {Function} thunkAPI.rejectWithValue - A helper function to handle errors in a structured way.
 *
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of user objects excluding the current user.
 * @throws {string} A rejected value containing an error message if the fetch fails.
 */
const getAvailableUsers = createAsyncThunk(
    'chat/getAvailableUsers',
    async (_, { rejectWithValue }) => {

        try {
            const userRef = collection(db, 'users');
            const userDoc = await getDocs(userRef);

            return userDoc.docs
                .map((doc) => doc.data())
                .filter((user) => user.uid !== localStorage.getItem('uid'));

        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch users');
        }
    });

export default getAvailableUsers