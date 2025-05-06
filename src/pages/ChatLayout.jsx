import React from 'react'
import ChatInbox from '../components/ChatInbox'
import EmptyChatInbox from '../components/EmptyChatInbox'
import ChatList from '../components/ChatList'
import { useSelector } from 'react-redux'

export default function ChatLayout() {

    const { activeChatRoom } = useSelector((state) => state.chat);

    return (
        <div className="h-screen flex bg-gray-50">
            <ChatList />
            {activeChatRoom ? <ChatInbox /> : <EmptyChatInbox />}
        </div>
    );
}
