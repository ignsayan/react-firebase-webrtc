import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../modules/auth/reducer'
import { getUserList } from '../modules/chat/reducer';

export default function ChatList() {

    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.chat);

    useEffect(() => {
        dispatch(getUserList());
    }, []);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="w-1/4 border-r border-gray-700 bg-gray-800 text-white p-4 flex flex-col h-screen">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{import.meta.env.VITE_APP_NAME}</h3>
            </div>

            {/* Chat List */}
            <ul className="flex-1 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-hidden md:scrollbar-default">
                {users.map((user, i) => (
                    <li
                        key={i}
                        className="p-3 hover:bg-gray-700 rounded cursor-pointer mb-2 transition-all flex items-center"
                    >
                        <img
                            src={user.photo}
                            className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                            <div className="font-medium">
                                {user.name}
                                {localStorage.getItem('uid') === user.uid && ' (You)'}
                            </div>
                            <div className="text-sm text-gray-400">{user.email}</div>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Logout Button */}
            <div className="mt-4">
                <button
                    onClick={handleLogout}
                    className="w-full bg-red-600 text-white py-2 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
