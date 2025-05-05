import React from 'react'
import { MdChat } from 'react-icons/md'

export default function EmptyChatInbox() {

    return (
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-800 text-white">
            <div className="flex flex-col items-center space-y-4">
                <MdChat className="w-20 h-20 text-gray-500" />
                <p className="text-gray-400 text-lg">Select a chat to start messaging</p>
            </div>
        </div>
    );
}
