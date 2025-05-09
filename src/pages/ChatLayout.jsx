import React from 'react'
import ChatInbox from '../components/ChatInbox'
import EmptyChatInbox from '../components/EmptyChatInbox'
import FriendList from '../components/FriendList'
import { useSelector } from 'react-redux'

export default function ChatLayout() {

    const { activeChatRoom } = useSelector((state) => state.chat);

    return (
        <div className="h-screen flex flex-col md:flex-row bg-gray-50">
            <FriendList />
            {activeChatRoom ? <ChatInbox /> : <EmptyChatInbox />}
        </div>
    );
}
