import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserList, getChatUser, getMessages, resetChatState } from '../modules/chat/reducer'
import { logoutUser } from '../modules/auth/reducer'
import ChatListSkeleton from './loaders/ChatListSkeleton'

export default function ChatList() {

    const { users, loading } = useSelector((state) => state.chat);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserList());
    }, []);

    const openInbox = (uid) => () => {
        dispatch(resetChatState());
        dispatch(getChatUser(uid));
        dispatch(getMessages({
            sender: localStorage.getItem('uid'),
            receiver: uid,
        }));
    };

    const handleLogout = () => {
        dispatch(resetChatState({ type: 'logout' }));
        dispatch(logoutUser());
    };

    return (
        <div className="w-1/4 border-r border-gray-700 bg-gray-800 text-white p-4 flex flex-col h-screen">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{import.meta.env.VITE_APP_NAME}</h3>
            </div>

            {/* User List */}
            {users.length > 0
                ? <ul className="flex-1 max-h-[calc(100vh-140px)] overflow-y-auto scrollbar-hidden md:scrollbar-default">
                    {users.map((user, i) => (
                        <li key={i} onClick={openInbox(user.uid)}
                            className="p-3 hover:bg-gray-700 rounded cursor-pointer mb-2 transition-all flex items-center"
                        >
                            <img src={user.photo} className="w-10 h-10 rounded-full mr-3" />
                            <div>
                                <div className="font-medium">
                                    {user.name} {localStorage.getItem('uid') === user.uid && '(You)'}
                                </div>
                                <div className="text-sm text-gray-400">{user.email}</div>
                            </div>
                        </li>
                    ))}
                </ul>
                : <ChatListSkeleton />}

            {/* Logout Button */}
            <div className="mt-auto">
                <button onClick={handleLogout}
                    className="w-full bg-red-600 text-white py-2 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    disabled={loading}
                >
                    {loading ? <div className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Logout
                    </div> : 'Logout'}
                </button>
            </div>
        </div>
    );
}
