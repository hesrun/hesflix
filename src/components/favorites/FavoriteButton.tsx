'use client';

import { LucideHeart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { favoritesService } from '@/lib/api/appwrite';
import { useRouter } from 'next/navigation';

interface FavoriteButtonProps {
    movieId: number;
    title: string;
    posterPath: string | null;
    mediaType: 'movie' | 'tv';
    rating?: number;
    releaseDate?: string;
    className?: string;
}

export default function FavoriteButton({
    movieId,
    title,
    posterPath,
    mediaType,
    rating,
    releaseDate,
    className = '',
}: FavoriteButtonProps) {
    const { user, isAuthenticated } = useAuth();
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated && user) {
            checkFavoriteStatus();
        }
    }, [isAuthenticated, user, movieId]);

    const checkFavoriteStatus = async () => {
        if (!user) return;
        try {
            const status = await favoritesService.isFavorite(user.$id, movieId);
            setIsFavorite(status);
        } catch (error) {
            console.error('Error checking favorite status:', error);
        }
    };

    const handleToggleFavorite = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isAuthenticated) {
            router.push('/signin');
            return;
        }

        if (!user) return;

        setIsLoading(true);
        try {
            const result = await favoritesService.toggleFavorite(user.$id, {
                movieId,
                title,
                posterPath,
                mediaType,
                rating,
                releaseDate,
            });
            setIsFavorite(result.isNowFavorite);
        } catch (error) {
            console.error('Error toggling favorite:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleToggleFavorite}
            disabled={isLoading}
            className={`
                w-10 h-10 rounded-full transition-all duration-200 flex items-center justify-center cursor-pointer
                ${
                    isFavorite
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-gray-800/80 text-gray-400 hover:bg-gray-700 hover:text-white'
                }
                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                ${className}
            `}
            aria-label={
                isFavorite ? 'Remove from favorites' : 'Add to favorites'
            }
        >
            <LucideHeart
                className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`}
            />
        </button>
    );
}
