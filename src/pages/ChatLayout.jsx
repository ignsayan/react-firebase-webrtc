import React from 'react'
import ChatInbox from '../components/ChatInbox'
import ChatList from '../components/ChatList'

export default function ChatLayout() {
    return (
        <div className="h-screen flex bg-gray-50">
            <ChatList />
            <ChatInbox />
        </div>
    );
}
