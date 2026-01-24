import { favoritesService } from '@/lib/api/appwrite';
import { LucideTrash2 } from 'lucide-react';

export default function RemoveFavoriteButton({
    id,
    setFavorites,
}: {
    id: any;
    setFavorites: React.Dispatch<React.SetStateAction<any[]>>;
}) {
    const handleRemove = async (
        e: React.MouseEvent<HTMLButtonElement>,
        id: string,
    ) => {
        e.preventDefault();
        try {
            await favoritesService.removeFromFavorites(id);
            setFavorites((prev) => prev.filter((item) => item.$id !== id));
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };
    return (
        <button
            onClick={(e) => handleRemove(e, id)}
            className="absolute top-2 left-2 w-10 h-10 bg-gray-800/80 text-red-500 hover:bg-gray-700 rounded-full flex items-center justify-center cursor-pointer transition"
            aria-label="Remove from favorites"
        >
            <LucideTrash2 className="w-4 h-4" />
        </button>
    );
}
