'use client';

import { useState, FormEvent } from 'react';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import Link from 'next/link';
import { LucideMail, LucideLock } from 'lucide-react';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // TODO: Implement actual login logic
        setTimeout(() => {
            console.log('Login:', { email, password });
            setIsLoading(false);
        }, 2000);
    };

    return (
        <div className="bg-gray-900 p-8 rounded-lg border-2 border-gray-800">
            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={<LucideMail />}
                    iconPosition="left"
                    required
                    disabled={isLoading}
                />

                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    icon={<LucideLock />}
                    iconPosition="left"
                    required
                    disabled={isLoading}
                />

                {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <Button
                    type="submit"
                    isLoading={isLoading}
                    className="w-full"
                    size="lg"
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </Button>

                <div className="text-center space-y-2">
                    <Link
                        href="/auth/forgot-password"
                        className="text-sm text-amber-500 hover:text-amber-400 block"
                    >
                        Forgot password?
                    </Link>
                    <p className="text-gray-400 text-sm">
                        Don&apos;t have an account?{' '}
                        <Link
                            href="/signup"
                            className="text-amber-500 hover:text-amber-400"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}
