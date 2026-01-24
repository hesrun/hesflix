'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { favoritesService } from '@/lib/api/appwrite';
import Link from 'next/link';
import Image from 'next/image';
import { LucideTrash2 } from 'lucide-react';
import Title from '@/components/UI/Title';

export default function FavoritesPage() {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            setIsLoading(true);
            const data = await favoritesService.getUserFavorites(user!.$id);
            setFavorites(data);
        } catch (error) {
            console.error('Error loading favorites:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemove = async (id: string) => {
        try {
            await favoritesService.removeFromFavorites(id);
            setFavorites((prev) => prev.filter((item) => item.$id !== id));
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Title>My Favorites</Title>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-8">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className="aspect-[2/3] bg-gray-800 rounded-lg animate-pulse"
                        ></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Title>My Favorites</Title>

            {favorites.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-gray-400 text-lg mb-4">
                        You haven&apos;t added any favorites yet
                    </p>
                    <Link
                        href="/"
                        className="inline-block px-6 py-3 bg-amber-500 text-black rounded-lg hover:bg-amber-600 transition"
                    >
                        Browse Movies & TV Shows
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-8">
                    {favorites.map((item) => (
                        <div
                            key={item.$id}
                            className="group relative rounded-lg overflow-hidden bg-gray-900"
                        >
                            <Link href={`/${item.mediaType}/${item.movieId}`}>
                                <div className="aspect-[2/3] relative">
                                    {item.posterPath ? (
                                        <Image
                                            src={`https://image.tmdb.org/t/p/w500${item.posterPath}`}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                            <span className="text-gray-600">
                                                No Image
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-3">
                                    <h3 className="font-medium text-sm line-clamp-2">
                                        {item.title}
                                    </h3>
                                    {item.releaseDate && (
                                        <p className="text-gray-400 text-xs mt-1">
                                            {new Date(
                                                item.releaseDate,
                                            ).getFullYear()}
                                        </p>
                                    )}
                                </div>
                            </Link>
                            <button
                                onClick={() => handleRemove(item.$id)}
                                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                aria-label="Remove from favorites"
                            >
                                <LucideTrash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
