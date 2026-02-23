'use client';

import { useWatchListFilmsStore } from '@/store/watchListFilmsStore';
import { LucideTrash2 } from 'lucide-react';
import { useState } from 'react';

interface RemoveFromListButtonProps {
    id: string;
    listId: string;
}

export default function RemoveFromListButton({ id, listId }: RemoveFromListButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { removeFilm } = useWatchListFilmsStore();

    const handleRemove = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        setIsLoading(true);
        try {
            await removeFilm(id, listId);
        } catch (error) {
            console.error('Error removing from list:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleRemove}
            disabled={isLoading}
            className={`absolute top-2 left-2 w-10 h-10 bg-gray-800/80 text-red-500 hover:bg-gray-700 rounded-full flex items-center justify-center cursor-pointer transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Remove from list"
        >
            <LucideTrash2 className="w-4 h-4" />
        </button>
    );
}
