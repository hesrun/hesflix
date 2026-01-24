import type { Metadata } from 'next';
import LoginForm from './LoginForm';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Login - HesFlix',
    description: 'Login to your HesFlix account',
};

export default function LoginPage() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="w-full max-w-md">
                <h1 className="text-4xl font-bold text-center mb-8">
                    Login to HesFlix
                </h1>
                <Suspense
                    fallback={
                        <div className="bg-gray-900 p-8 rounded-lg border-2 border-gray-800 h-96 animate-pulse" />
                    }
                >
                    <LoginForm />
                </Suspense>
            </div>
        </div>
    );
}
