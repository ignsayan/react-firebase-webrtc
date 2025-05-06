import React from 'react'

export default function ChatInboxSkeleton() {

    return (
        <div className="flex-1 flex flex-col bg-gray-800 text-white shadow-lg">

            {/* Header Skeleton */}
            <div className="px-5 py-3 font-semibold bg-gray-900 flex items-center animate-pulse">
                <div className="w-10 h-10 rounded-full bg-gray-700 mr-3" />
                <div className="space-y-1">
                    <div className="w-32 h-4 bg-gray-700 rounded" />
                    <div className="w-20 h-3 bg-gray-700 rounded" />
                </div>
            </div>

            {/* Message Skeletons */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className={`mb-4 flex ${i % 2 === 0 ? "justify-start" : "justify-end"} animate-pulse`}
                    >
                        <div className={`p-2 rounded-full max-w-xs bg-gray-700 w-40 h-5`} />
                    </div>
                ))}
            </div>
        </div>
    );
}
