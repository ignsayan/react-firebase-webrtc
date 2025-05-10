import { createAsyncThunk } from '@reduxjs/toolkit'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db, generateChatRoom } from '../../../configs/firebase'

/**
 * @function getChatHistory
 * @description
 * Fetches the chat message history between two users from a specific chat room in Firestore.
 * The messages are ordered by timestamp in ascending order to preserve chronological order.
 *
 * This thunk uses the `generateChatRoom(sender, receiver)` function to create a consistent
 * room ID for the chat between the two users and then queries the `messages` subcollection.
 *
 * @type {AsyncThunk}
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.sender - The UID of the current user (sender).
 * @param {string} params.receiver - The UID of the other user (receiver).
 * @param {Object} thunkAPI - An object provided by Redux Toolkit.
 * @param {Function} thunkAPI.rejectWithValue - Helper function to handle errors with a value.
 *
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of message objects, 
 * @throws {string} A rejected value with an error message if the fetch fails.
 */
const getChatHistory = createAsyncThunk(
    'chat/getChatHistory',
    async ({ sender, receiver }, { rejectWithValue }) => {

        try {
            const chatRoom = generateChatRoom(sender, receiver);
            const messagesRef = collection(db, 'chats', chatRoom, 'messages');

            const builder = query(messagesRef, orderBy('timestamp', 'asc'));
            const snapshot = await getDocs(builder);

            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                timestamp: doc.data().timestamp?.toDate().toISOString() ?? null,
            }));

        } catch (error) {
            return rejectWithValue(error.message || 'Failed to load chats');
        }
    });

export default getChatHistory