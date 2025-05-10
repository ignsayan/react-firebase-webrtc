import { createAsyncThunk } from '@reduxjs/toolkit'
import { db } from '../../../configs/firebase'
import { doc, getDoc } from 'firebase/firestore'

/**
 * @function getChatroomUser
 * @description
 * Fetches the user data from Firestore for the user associated with a given UID.
 * This is typically used to load the other participant's details in a chat room.
 *
 * The function queries the Firestore `users` collection and returns the document
 * data corresponding to the provided UID.
 *
 * @type {AsyncThunk}
 *
 * @param {string} uid - The unique identifier (UID) of the user whose data should be fetched.
 * @param {Object} thunkAPI - An object provided by Redux Toolkit.
 * @param {Function} thunkAPI.rejectWithValue - Helper function to handle rejected async results with a value.
 *
 * @returns {Promise<Object>} A promise that resolves to the user's data object.
 * @throws {string} A rejected value containing the error message if the Firestore query fails.
 */
const getChatroomUser = createAsyncThunk(
    'chat/getChatUser',
    async (uid, { rejectWithValue }) => {

        try {
            const userRef = doc(db, 'users', uid);
            const userDoc = await getDoc(userRef);
            return userDoc.data();

        } catch (error) {
            return rejectWithValue(error.message || 'Failed to load user');
        }
    });

export default getChatroomUser