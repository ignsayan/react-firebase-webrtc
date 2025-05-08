import React from 'react'

export default function FriendListSkeleton() {

    return (
        <ul className="flex-1 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-hidden md:scrollbar-default">
            {[...Array(6)].map((_, i) => (
                <li
                    key={i}
                    className="p-3 bg-gray-700/50 animate-pulse rounded mb-2 flex items-center space-x-3"
                >
                    <div className="w-10 h-10 rounded-full bg-gray-600" />
                    <div className="flex-1 space-y-2">
                        <div className="h-4 w-32 bg-gray-600 rounded" />
                        <div className="h-3 w-48 bg-gray-600 rounded" />
                    </div>
                </li>
            ))}
        </ul>
    );
}
