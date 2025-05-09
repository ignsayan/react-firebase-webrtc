import React, { Fragment, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage } from '../modules/chat/reducer'

export default function ChatInbox() {

    const { activeChatUser, chats } = useSelector((state) => state.chat);
    const dispatch = useDispatch();
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chats]);

    const handleReply = (receiver) => (form) => {
        const chat = {
            sender: localStorage.getItem('uid'),
            receiver,
            message: form.get('message'),
        }
        dispatch(sendMessage(chat));
    }

    return (
        <div className="flex-1 flex flex-col bg-gray-800 text-white shadow-lg h-[77vh] md:h-screen">

            {/* Header */}
            <div className="px-5 py-3 font-semibold bg-gray-900 flex items-center">
                <img src={activeChatUser.photo} alt="Profile" className="w-10 h-10 rounded-full mr-3" />
                <div>{activeChatUser.name}</div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {chats.map((chat, index) => (
                    <Fragment key={index}>
                        {chat.sender !== activeChatUser.uid ? (
                            <div className="mb-4 text-right">
                                <div className="bg-blue-600 p-2 rounded-full max-w-xs ml-auto text-white">
                                    <span className="mx-2">{chat.message}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="mb-4">
                                <div className="bg-gray-700 p-2 rounded-full max-w-xs text-white">
                                    <span className="mx-2">{chat.message}</span>
                                </div>
                            </div>
                        )}
                    </Fragment>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form action={handleReply(activeChatUser.uid)}
                className="p-4 flex flex-col sm:flex-row gap-2 bg-gray-800">
                <input
                    type="text" name="message"
                    placeholder="Type a message"
                    className="flex-1 rounded-full bg-gray-700 text-white focus:outline-none pl-4 py-2" />
                <button
                    className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >Send</button>
            </form>
        </div>
    );

}
