import { createAsyncThunk } from '@reduxjs/toolkit'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../../../configs/firebase';

const attemptLogin = createAsyncThunk(
    'auth/attemptLogin',
    async (payload) => {

        try {
            const userData = {
                name: payload.displayName,
                email: payload.email,
                photo: payload.photoURL
            }

            const userRef = doc(db, 'users', payload.uid);
            const userDoc = await getDoc(userRef);

            if (!userDoc.exists()) {
                await setDoc(userRef, userData);
            }

            const token = await payload.getIdToken();
            localStorage.setItem('authToken', token);

            return userData;

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export default attemptLogin
