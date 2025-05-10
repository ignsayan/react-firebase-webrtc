import { createAsyncThunk } from '@reduxjs/toolkit'
import { collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db, generateChatRoom } from '../../../configs/firebase'
import { setMessages } from '../reducer'

/**
 * @function listenToMessages
 * @description
 * Sets up a real-time listener on the Firestore messages collection for a specific chat room.
 * The chat room is determined using the `generateChatRoom(sender, receiver)` function.
 * 
 * This function uses Firestore's `onSnapshot` to listen for updates to the `messages` subcollection.
 * When new data is detected, it dispatches the `setMessages` action to update the Redux store with
 * the latest list of messages, ordered by timestamp.
 *
 * If a previous listener exists, it will be unsubscribed before setting a new one.
 * This ensures only one active listener at a time.
 *
 * @type {AsyncThunk}
 *
 * @param {Object} payload - The payload object.
 * @param {string} payload.sender - The UID of the currently logged-in user.
 * @param {string} payload.receiver - The UID of the user being chatted with.
 * @param {Object} thunkAPI - An object provided by Redux Toolkit.
 * @param {Function} thunkAPI.dispatch - The Redux `dispatch` function.
 * @param {Function} thunkAPI.rejectWithValue - A helper function to handle rejected async results with a value.
 *
 * @returns {Promise<void>} A promise that resolves once the listener is successfully registered.
 * @throws {string} A rejected value containing the error message if setting up the listener fails.
 */

let unsubscribe = null;

const listenToMessages = createAsyncThunk(
    'chat/listenToMessages',
    async ({ sender, receiver }, { dispatch, rejectWithValue }) => {

        try {
            const chatRoom = generateChatRoom(sender, receiver);
            const messagesRef = collection(db, 'chats', chatRoom, 'messages');

            const builder = query(messagesRef, orderBy('timestamp', 'asc'));
            if (unsubscribe) unsubscribe();

            unsubscribe = onSnapshot(builder, (snapshot) => {
                const messages = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    timestamp: doc.data().timestamp?.toDate().toISOString() ?? null,
                }));
                dispatch(setMessages(messages));
            });

        } catch (error) {
            return rejectWithValue(error.message);
        }
    });

export default listenToMessages
