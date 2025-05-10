import { createAsyncThunk } from '@reduxjs/toolkit'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db, generateChatRoom } from '../../../configs/firebase'

/**
 * @function sendMessage
 * @description
 * Sends a message from the `sender` to the `receiver` in a specified chat room.
 * This function creates a new message document in Firestore under the appropriate chat room's `messages` subcollection.
 * The `timestamp` is automatically generated using Firestore's `serverTimestamp` method.
 * 
 * If the message is successfully added to Firestore, the message object (excluding the timestamp) is returned.
 * If there is an error during the process, the error message is returned using the `rejectWithValue` function.
 * 
 * @type {AsyncThunk}
 *
 * @param {Object} payload - The message data.
 * @param {string} payload.sender - The UID of the user sending the message.
 * @param {string} payload.receiver - The UID of the recipient of the message.
 * @param {string} payload.message - The content of the message being sent.
 * @param {Object} thunkAPI - An object provided by Redux Toolkit.
 * @param {Function} thunkAPI.rejectWithValue - A helper function to handle rejected async results with a value.
 *
 * @returns {Promise<Object>} A promise that resolves with the sent message data (excluding the timestamp).
 * @throws {string} A rejected value containing the error message if sending the message fails.
 */
const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async ({ sender, receiver, message }, { rejectWithValue }) => {

        try {
            const chatRoom = generateChatRoom(sender, receiver);
            const messagesRef = collection(db, 'chats', chatRoom, 'messages');

            const chat = {
                sender,
                receiver,
                message,
                timestamp: serverTimestamp(),
            };
            await addDoc(messagesRef, chat);

            const { timestamp, ...response } = chat;
            return response;

        } catch (error) {
            return rejectWithValue(error.message);
        }
    });

export default sendMessage
