'use client';
import { useFavoritesStore } from '@/store/favoritesStore';
import { LucideTrash2 } from 'lucide-react';
import { useState } from 'react';

export default function RemoveFavoriteButton({ id }: { id: string }) {
    const [isLoading, setIsLoading] = useState(false);
    const { removeFavorite } = useFavoritesStore();

    const handleRemove = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        setIsLoading(true);
        try {
            await removeFavorite(id);
        } catch (error) {
            console.error('Error removing favorite:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleRemove}
            disabled={isLoading}
            className={`absolute top-2 left-2 w-10 h-10 bg-gray-800/80 text-red-500 hover:bg-gray-700 rounded-full flex items-center justify-center cursor-pointer transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Remove from favorites"
        >
            <LucideTrash2 className="w-4 h-4" />
        </button>
    );
}
