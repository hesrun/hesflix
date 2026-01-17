import type { Metadata } from 'next';
import RegisterForm from './RegisterForm';

export const metadata: Metadata = {
    title: 'Sign Up - HesFlix',
    description: 'Create your HesFlix account',
};

export default function RegisterPage() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="w-full max-w-md">
                <h1 className="text-4xl font-bold text-center mb-8">
                    Join HesFlix
                </h1>
                <RegisterForm />
            </div>
        </div>
    );
}
