import { create } from 'zustand';
import { FavoriteDocument } from '@/types/favorite';
import { favoritesService, FavoriteItem } from '@/lib/api/appwrite';

interface FavoritesState {
    favorites: FavoriteDocument[];
    isLoading: boolean;
    isInitialized: boolean;

    // Actions
    loadFavorites: (userId: string) => Promise<void>;
    addFavorite: (
        userId: string,
        item: Omit<FavoriteItem, 'userId'>,
    ) => Promise<void>;
    removeFavorite: (rowId: string) => Promise<void>;
    toggleFavorite: (
        userId: string,
        item: Omit<FavoriteItem, 'userId'>,
    ) => Promise<boolean>;
    isFavorite: (movieId: number) => boolean;
    getFavoriteRow: (movieId: number) => FavoriteDocument | undefined;
    clearFavorites: () => void;

    // Для будущих AI-рекомендаций
    getTopGenres: () => string[];
    getAverageRating: () => number;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
    favorites: [],
    isLoading: false,
    isInitialized: false,

    loadFavorites: async (userId: string) => {
        set({ isLoading: true });
        try {
            const favorites = await favoritesService.getUserFavorites(userId);
            set({ favorites, isInitialized: true });
        } catch (error) {
            console.error('Error loading favorites:', error);
        } finally {
            set({ isLoading: false });
        }
    },

    addFavorite: async (userId: string, item: Omit<FavoriteItem, 'userId'>) => {
        try {
            const newFavorite = await favoritesService.addToFavorites(
                userId,
                item,
            );
            set((state) => ({
                favorites: [newFavorite, ...state.favorites],
            }));
        } catch (error) {
            console.error('Error adding favorite:', error);
            throw error;
        }
    },

    removeFavorite: async (rowId: string) => {
        try {
            await favoritesService.removeFromFavorites(rowId);
            set((state) => ({
                favorites: state.favorites.filter((fav) => fav.$id !== rowId),
            }));
        } catch (error) {
            console.error('Error removing favorite:', error);
            throw error;
        }
    },

    toggleFavorite: async (
        userId: string,
        item: Omit<FavoriteItem, 'userId'>,
    ) => {
        const existing = get().getFavoriteRow(item.movieId);

        if (existing) {
            await get().removeFavorite(existing.$id);
            return false;
        } else {
            await get().addFavorite(userId, item);
            return true;
        }
    },

    isFavorite: (movieId: number) => {
        return get().favorites.some((fav) => fav.movieId === movieId);
    },

    getFavoriteRow: (movieId: number) => {
        return get().favorites.find((fav) => fav.movieId === movieId);
    },

    clearFavorites: () => {
        set({ favorites: [], isInitialized: false });
    },

    // Для AI-рекомендаций
    getTopGenres: () => {
        // TODO: реализовать когда будут данные о жанрах
        return [];
    },

    getAverageRating: () => {
        const { favorites } = get();
        if (favorites.length === 0) return 0;

        const validRatings = favorites
            .filter((fav) => fav.rating !== undefined)
            .map((fav) => fav.rating!);

        if (validRatings.length === 0) return 0;

        const sum = validRatings.reduce((acc, rating) => acc + rating, 0);
        return sum / validRatings.length;
    },
}));
