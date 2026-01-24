'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { favoritesService } from '@/lib/api/appwrite';
import Link from 'next/link';
import Title from '@/components/UI/Title';
import FilmCard from '@/components/filmGrid/FilmCard';

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
        <>
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
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8">
                    {favorites.map((item) => (
                        <FilmCard
                            key={item.$id}
                            data={{ ...item }}
                            removeFavorite={true}
                            setFavorites={setFavorites}
                        />
                    ))}
                </div>
            )}
        </>
    );
}
