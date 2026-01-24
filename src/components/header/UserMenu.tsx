'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { LucideUser, LucideLogOut, LucideHeart } from 'lucide-react';
import { useState } from 'react';

export default function UserMenu() {
    const { user, isAuthenticated, logout, isLoading } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    if (isLoading) {
        return (
            <div className="w-8 h-8 rounded-full bg-gray-800 animate-pulse"></div>
        );
    }

    if (!isAuthenticated || !user) {
        return (
            <div className="flex items-center gap-2">
                <Link
                    href="/signin"
                    className="px-4 py-2 text-sm text-gray-300 hover:text-white transition"
                >
                    Login
                </Link>
                <Link
                    href="/signup"
                    className="px-4 py-2 text-sm bg-amber-500 text-black rounded-lg hover:bg-amber-600 transition font-medium"
                >
                    Sign Up
                </Link>
            </div>
        );
    }

    const handleLogout = async () => {
        try {
            await logout();
            setIsOpen(false);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition"
            >
                <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                    <span className="text-black font-bold text-sm">
                        {user.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                </div>
                <span className="hidden md:block text-sm font-medium">
                    {user.name}
                </span>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-800 rounded-lg shadow-xl z-50">
                        <div className="p-4 border-b border-gray-800">
                            <p className="font-medium text-white">
                                {user.name}
                            </p>
                            <p className="text-sm text-gray-400 truncate">
                                {user.email}
                            </p>
                        </div>
                        <div className="py-2">
                            <Link
                                href="/favorites"
                                className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-800 transition"
                                onClick={() => setIsOpen(false)}
                            >
                                <LucideHeart className="w-4 h-4" />
                                My Favorites
                            </Link>
                            <Link
                                href="/profile"
                                className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-800 transition"
                                onClick={() => setIsOpen(false)}
                            >
                                <LucideUser className="w-4 h-4" />
                                Profile
                            </Link>
                        </div>
                        <div className="border-t border-gray-800 py-2">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-gray-800 transition w-full text-left"
                            >
                                <LucideLogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
