import { createAsyncThunk } from '@reduxjs/toolkit'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db, generateChatRoom } from '../../../configs/firebase'

const getChatMessages = createAsyncThunk(
    'chat/getChatMessages',
    async ({ sender, receiver }, { rejectWithValue }) => {

        try {
            const chatRoom = generateChatRoom(sender, receiver);
            const messagesRef = collection(db, 'chats', chatRoom, 'messages');

            const builder = query(messagesRef, orderBy('timestamp', 'asc'));
            const snapshot = await getDocs(builder);

            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                timestamp: doc.data().timestamp.toDate().toISOString(),
            }));

        } catch (error) {
            return rejectWithValue(error.message || 'Failed to load chats');
        }
    });

export default getChatMessages