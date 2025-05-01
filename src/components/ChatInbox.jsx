import React, { useState } from 'react'

export default function ChatInbox() {
    const [isTyping, setIsTyping] = useState(false);

    return (
        <div className="flex-1 flex flex-col bg-gray-800 text-white shadow-lg">

            {/* Contact Name Header */}
            <div className="px-5 py-3 font-semibold bg-gray-900">
                <div>Contact Name</div>
                <span className="text-sm text-gray-400 mt-1">
                    {isTyping
                        ? <span>Typing...</span>
                        : <span>Online</span>
                    }
                </span>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                <div className="mb-4">
                    <div className="bg-gray-700 p-2 rounded-full max-w-xs text-white">
                        <span className="mx-2">Hey, how are you</span>
                    </div>
                </div>
                <div className="mb-4 text-right">
                    <div className="bg-blue-600 p-2 rounded-full max-w-xs ml-auto text-white">
                        <span className="mx-2">Hi there</span>
                    </div>
                </div>
                <div className="mb-4">
                    <div className="bg-gray-700 p-2 rounded-full max-w-xs text-white">
                        <span className="mx-2">Hello</span>
                    </div>
                </div>
                <div className="mb-4 text-right">
                    <div className="bg-blue-600 p-2 rounded-full max-w-xs ml-auto text-white">
                        <span className="mx-2">Hi there</span>
                    </div>
                </div>
            </div>

            {/* Input Area */}
            <div className="p-4 flex gap-2 bg-gray-800">
                <input
                    type="text"
                    placeholder="Type a message"
                    className="flex-1 rounded-full bg-gray-700 text-white focus:outline-none pl-4"
                    onChange={() => setIsTyping(true)} // Show typing status when typing
                    onBlur={() => setIsTyping(false)}  // Remove typing status when focus is lost
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Send Reply
                </button>
            </div>
        </div>
    );
}
