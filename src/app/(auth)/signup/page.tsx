import type { Metadata } from 'next';
import RegisterForm from './RegisterForm';
import Title from '@/components/UI/Title';

export const metadata: Metadata = {
    title: 'Sign Up - HesFlix',
    description: 'Create your HesFlix account',
};

export default function RegisterPage() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="w-full max-w-md">
                <Title className="mb-6 text-3xl text-center mx-auto">
                    Sign Up
                </Title>
                <RegisterForm />
            </div>
        </div>
    );
}
