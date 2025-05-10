import React from 'react'
import { useSelector } from 'react-redux'
import { MdChat } from 'react-icons/md'
import FriendList from '../components/FriendList'
import ChatInbox from '../components/ChatInbox'

export default function ChatLayout() {

    const { activeChatRoom } = useSelector((state) => state.chat);

    const EmptyChatOverlay = () => (
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-800 text-white">
            <div className="flex flex-col items-center space-y-4">
                <MdChat className="w-20 h-20 text-gray-500" />
                <p className="text-gray-400 text-lg">Select a chat to start messaging</p>
            </div>
        </div>
    );

    return (
        <div className="h-screen flex flex-col md:flex-row bg-gray-50">
            <FriendList />
            {
                !activeChatRoom
                    ? <EmptyChatOverlay />
                    : <ChatInbox />
            }
        </div>
    );
}
