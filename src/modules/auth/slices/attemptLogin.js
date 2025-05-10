import { createAsyncThunk } from '@reduxjs/toolkit'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../../../configs/firebase'

/**
 * @function attemptLogin
 * @description
 * 1. Extracts essential user information from the Firebase user object.
 * 2. Checks if the user exists in Firestore (`users` collection).
 * 3. If the user doesn't exist, it creates a new user document.
 * 4. Retrieves the user's ID token and stores it in `localStorage`.
 * 5. Returns a sanitized `userData` object for Redux state management.
 * 
 * @type {AsyncThunk}
 *
 * @param {Object} payload - Firebase `User` object returned from authentication (e.g., `signInWithPopup`).
 * @param {Object} thunkAPI - Provided by Redux Toolkit, contains utility methods.
 * @param {Function} thunkAPI.rejectWithValue - A helper to reject the promise with a custom error.
 *
 * @returns {Promise<Object>} Resolves with `userData` (uid, name, email, photo) if successful.
 * @throws {string} Rejects with a user-friendly error message if any step fails.
 */
const attemptLogin = createAsyncThunk(
    'auth/attemptLogin',
    async (payload, { rejectWithValue }) => {

        try {
            const userData = {
                uid: payload.uid,
                name: payload.displayName,
                email: payload.email,
                photo: payload.photoURL,
            }

            const userRef = doc(db, 'users', payload.uid);
            const userDoc = await getDoc(userRef);

            if (!userDoc.exists()) {
                await setDoc(userRef, userData);
            }

            const token = await payload.getIdToken();
            localStorage.setItem('authToken', token);
            localStorage.setItem('uid', payload.uid);

            return userData;

        } catch (error) {
            return rejectWithValue(error.message || 'Failed to login');
        }
    });

export default attemptLogin
