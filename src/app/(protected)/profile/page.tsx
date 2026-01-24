'use client';

import { useAuth } from '@/contexts/AuthContext';
import Title from '@/components/UI/Title';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import { LucideUser, LucideMail } from 'lucide-react';
import { useState, FormEvent } from 'react';

export default function ProfilePage() {
    const { user, refreshUser } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleUpdateName = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            // Здесь можно добавить логику обновления имени
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await refreshUser();
            setMessage('Name updated successfully!');
        } catch (error) {
            console.error('Update error:', error);
            setMessage('Failed to update name');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Title>Profile Settings</Title>

            <div className="mt-8 bg-gray-900 rounded-lg p-6 border border-gray-800">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-800">
                    <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center">
                        <span className="text-black font-bold text-2xl">
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </span>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">{user?.name}</h2>
                        <p className="text-gray-400">{user?.email}</p>
                    </div>
                </div>

                <form onSubmit={handleUpdateName} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Full Name
                        </label>
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            icon={<LucideUser />}
                            iconPosition="left"
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Email
                        </label>
                        <Input
                            type="email"
                            value={user?.email || ''}
                            icon={<LucideMail />}
                            iconPosition="left"
                            disabled
                        />
                    </div>

                    {message && (
                        <p
                            className={`text-sm ${
                                message.includes('success')
                                    ? 'text-green-500'
                                    : 'text-red-500'
                            }`}
                        >
                            {message}
                        </p>
                    )}

                    <Button
                        type="submit"
                        isLoading={isLoading}
                        disabled={isLoading || name === user?.name}
                    >
                        Save Changes
                    </Button>
                </form>
            </div>

            <div className="mt-6 bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-lg font-bold mb-4">Account Information</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-400">Account ID</span>
                        <span className="font-mono text-xs">{user?.$id}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-400">Created At</span>
                        <span>
                            {user?.$createdAt
                                ? new Date(user.$createdAt).toLocaleDateString()
                                : 'N/A'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
