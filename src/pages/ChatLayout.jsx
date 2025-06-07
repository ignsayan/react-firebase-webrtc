import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { MdChat } from 'react-icons/md';
import FriendList from '../components/FriendList';
import ChatWindow from '../components/ChatWindow';

export default function ChatLayout() {

    const { activeChatRoom } = useSelector((state) => state.chat);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const EmptyChatOverlay = () => (
        <div className="flex-1 flex flex-col bg-gray-800 text-white">
            <div className="p-4 flex items-center">
                <button
                    className="md:hidden mr-4 p-2 text-white rounded hover:bg-gray-700"
                    onClick={() => setSidebarOpen(true)}
                >
                    ☰
                </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <MdChat className="w-20 h-20 text-gray-500" />
                    <p className="text-gray-400 text-lg">Select a chat to start messaging</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen flex bg-gray-900 text-white overflow-hidden">
            <FriendList
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
            {
                !activeChatRoom
                    ? <EmptyChatOverlay />
                    : <ChatWindow
                        setSidebarOpen={setSidebarOpen}
                    />
            }
        </div>
    );
}
