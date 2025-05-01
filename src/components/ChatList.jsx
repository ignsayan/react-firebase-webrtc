import React from 'react'

export default function ChatList() {
    // Logout handler function (you can replace this with actual logout functionality)
    const handleLogout = () => {
        console.log('Logging out...');
        // Add your logout logic here (e.g., clearing tokens, redirecting, etc.)
    };

    return (
        <div className="w-1/4 border-r border-gray-700 bg-gray-800 text-white p-4 flex flex-col h-screen">
            {/* Your Name */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{import.meta.env.VITE_APP_NAME}</h3>
            </div>

            {/* Chat List */}
            <ul className="flex-1 max-h-[calc(100h-200px)] overflow-y-auto scrollbar-hidden md:scrollbar-default">
                {[...Array(10)].map((_, i) => (
                    <li
                        key={i}
                        className="p-3 hover:bg-gray-700 rounded cursor-pointer mb-2 transition-all"
                    >
                        <div className="font-medium">Contact {i + 1}</div>
                        <div className="text-sm text-gray-400">Last chat preview</div>
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
