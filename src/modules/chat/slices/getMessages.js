import { createAsyncThunk } from '@reduxjs/toolkit'
import { db } from '../../../configs/firebase'
import { doc, getDoc } from 'firebase/firestore'

const getMessages = createAsyncThunk(
    'chat/getMessages',
    async (uid, { rejectWithValue }) => {
        
        try {
            const userRef = doc(db, 'users', uid);
            const userDoc = await getDoc(userRef);
            return userDoc.data();

        } catch (error) {
            return rejectWithValue(error.message || 'Failed to load chats');
        }
    });

export default getMessages