import React from 'react'
import GoogleAuth from '../components/GoogleAuth'

export default function Login() {

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-sm text-center">
                <h1 className="text-2xl font-bold text-white mb-6">Welcome to {import.meta.env.VITE_APP_NAME}</h1>
                <GoogleAuth />
            </div>
        </div>
    );
}
