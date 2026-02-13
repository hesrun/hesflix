'use client';
import { useMemo } from 'react';
import { useFavoritesStore } from '@/store/favoritesStore';
import Link from 'next/link';
import Title from '@/components/UI/Title';
import FavoritesGrid from '@/components/favorites/FavoritesGrid';
import { FilmsGridSkeleton } from '@/components/UI/Caps/FilmsGridSkeleton';

function FavoritesSkeleton({ title }: { title: string }) {
    return (
        <>
            <Title className="mb-6">{title}</Title>
            <FilmsGridSkeleton />
        </>
    );
}

export default function FavoritesPage() {
    const { favorites, isLoading } = useFavoritesStore();

    const { favoritesFilms, favoritesTVShows } = useMemo(() => {
        return {
            favoritesFilms: favorites.filter(
                (item) => item.mediaType === 'movie',
            ),
            favoritesTVShows: favorites.filter(
                (item) => item.mediaType === 'tv',
            ),
        };
    }, [favorites]);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <FavoritesSkeleton title="Favorite Films" />
                <FavoritesSkeleton title="Favorite TV Shows" />
            </div>
        );
    }

    return (
        <>
            {favorites.length === 0 && (
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
            )}
            {favoritesFilms.length > 0 && (
                <>
                    <Title className="mb-4 md:mb-6">Favorite Films</Title>
                    <FavoritesGrid data={favoritesFilms} />
                </>
            )}
            {favoritesTVShows.length > 0 && (
                <>
                    <Title className="mb-4 md:mb-6 mt-6 md:mt-8">
                        Favorite TV Shows
                    </Title>
                    <FavoritesGrid data={favoritesTVShows} />
                </>
            )}
        </>
    );
}
