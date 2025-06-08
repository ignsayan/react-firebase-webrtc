import React from 'react';
import GoogleAuth from '../components/GoogleAuth';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../configs/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {
    initiateLogin,
    attemptLogin,
} from '../modules/auth/reducer';

export default function AuthPage() {

    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleGoogleAuthentication = async () => {
        dispatch(initiateLogin());
        const provider = new GoogleAuthProvider();
        const google = await signInWithPopup(auth, provider);
        dispatch(attemptLogin(google.user));
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-sm text-white">
                <h2 className="text-3xl font-semibold mb-6">Welcome to {import.meta.env.VITE_APP_NAME}</h2>
                <GoogleAuth
                    labelPrefix={'Continue'}
                    handleGoogleAuthentication={handleGoogleAuthentication}
                    loading={loading}
                />
            </div>
        </div>
    );
}
