'use client';

import { LucideListPlus } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useWatchListsStore } from '@/store/watchListsStore';
import { useWatchListFilmsStore } from '@/store/watchListFilmsStore';
import Link from 'next/link';

interface AddToListButtonProps {
    movieId: number;
    title: string;
    posterPath: string | null;
    mediaType: 'movie' | 'tv';
    rating?: number;
    releaseDate?: string;
    className?: string;
}

export default function AddToListButton({
    movieId,
    title,
    posterPath,
    mediaType,
    rating,
    releaseDate,
    className = '',
}: AddToListButtonProps) {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { watchlists, loadLists } = useWatchListsStore();
    const { addFilm, isFilmInList, loadFilmsForList } =
        useWatchListFilmsStore();

    useEffect(() => {
        if (user?.$id) loadLists(user.$id);
    }, [user, loadLists]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleAdd = async (listId: string) => {
        if (!user) return;
        setIsLoading(listId);
        try {
            await addFilm(listId, user.$id, {
                movieId,
                title,
                posterPath,
                mediaType,
                rating,
                releaseDate,
            });
            await loadFilmsForList(listId);
        } catch (error) {
            console.error('Error adding to list:', error);
        } finally {
            setIsLoading(null);
        }
    };

    if (!isAuthenticated) {
        return (
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    router.push('/signin');
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer bg-gray-800/80 text-gray-400 hover:bg-gray-700 hover:text-white transition-all duration-200 ${className}`}
                aria-label="Add to list (sign in required)"
            >
                <LucideListPlus className="w-5 h-5" />
            </button>
        );
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
                disabled={watchlists.length === 0}
                className={`
                    w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200
                    ${
                        isOpen
                            ? 'bg-amber-500 text-black'
                            : 'bg-gray-800/80 text-gray-400 hover:bg-gray-700 hover:text-white'
                    }
                    ${watchlists.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                    ${className}
                `}
                aria-label="Add to list"
                aria-expanded={isOpen}
            >
                <LucideListPlus className="w-5 h-5" />
            </button>

            {isOpen && (
                <div
                    className="absolute top-full left-0 mt-2 py-2 bg-gray-900 border border-gray-800 rounded-lg shadow-xl z-50 min-w-[180px] max-h-60 overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {watchlists.length === 0 ? (
                        <div className="px-4 py-3 text-sm text-gray-500">
                            No lists yet.{' '}
                            <Link
                                href="/watch-lists"
                                className="text-amber-500 hover:underline"
                                onClick={() => setIsOpen(false)}
                            >
                                Create one
                            </Link>
                        </div>
                    ) : (
                        watchlists.map((list) => {
                            const inList = isFilmInList(list.$id, movieId);
                            const loading = isLoading === list.$id;
                            return (
                                <button
                                    key={list.$id}
                                    onClick={() => {
                                        if (!inList && !loading) {
                                            handleAdd(list.$id);
                                        }
                                        if (inList) setIsOpen(false);
                                    }}
                                    disabled={loading || inList}
                                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-800 flex items-center justify-between gap-2 disabled:opacity-70 disabled:cursor-default"
                                >
                                    <span className="truncate">{list.name}</span>
                                    {loading ? (
                                        <span className="text-amber-500 text-xs">
                                            Adding...
                                        </span>
                                    ) : inList ? (
                                        <span className="text-green-500 text-xs">
                                            In list
                                        </span>
                                    ) : null}
                                </button>
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
}
