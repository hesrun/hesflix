'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import Link from 'next/link';
import { LucideMail, LucideLock, LucideUser } from 'lucide-react';

export default function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{
        name?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
    }>({});
    const { register, isAuthenticated, isLoading: authLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, authLoading, router]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setErrors({});

        const newErrors: typeof errors = {};

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);

        try {
            await register({ email, password, name });
            router.push('/');
        } catch (err: any) {
            console.error('Registration error:', err);
            if (err?.code === 409) {
                setErrors({ email: 'User with this email already exists' });
            } else {
                const errorMessage =
                    err?.message || 'Registration failed. Please try again.';
                setErrors({ email: errorMessage });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-900 p-8 rounded-lg border-2 border-gray-800">
            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    icon={<LucideUser />}
                    iconPosition="left"
                    required
                    disabled={isLoading}
                    error={!!errors.name}
                    helperText={errors.name}
                />

                <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={<LucideMail />}
                    iconPosition="left"
                    required
                    disabled={isLoading}
                    error={!!errors.email}
                    helperText={errors.email}
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
                    error={!!errors.password}
                    helperText={errors.password}
                />

                <Input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    icon={<LucideLock />}
                    iconPosition="left"
                    required
                    disabled={isLoading}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                />

                <Button type="submit" isLoading={isLoading} className="w-full">
                    {isLoading ? 'Creating account...' : 'Sign Up'}
                </Button>

                <p className="text-gray-400 text-sm text-center">
                    Already have an account?{' '}
                    <Link
                        href="/signin"
                        className="text-amber-500 hover:text-amber-400"
                    >
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}
