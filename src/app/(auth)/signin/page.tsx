import type { Metadata } from 'next';
import LoginForm from './LoginForm';
import { Suspense } from 'react';
import Title from '@/components/UI/Title';

export const metadata: Metadata = {
    title: 'Login - HesFlix',
    description: 'Login to your HesFlix account',
};

export default function LoginPage() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="w-full max-w-md">
                <Title className="mb-6 text-3xl text-center mx-auto">
                    Sign In
                </Title>
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
