import { tablesDB, DATABASE_ID, FAVORITES_TABLE_ID } from './config';
import { ID, Query } from 'appwrite';
import { toast } from 'sonner';

const TABLE_CONFIG = {
    databaseId: DATABASE_ID,
    tableId: FAVORITES_TABLE_ID,
};

export interface FavoriteItem {
    userId: string;
    movieId: number;
    title: string;
    posterPath: string | null;
    mediaType: 'movie' | 'tv';
    rating?: number;
    releaseDate?: string;
}

export const favoritesService = {
    async addToFavorites(
        userId: string,
        item: Omit<FavoriteItem, 'userId'>,
    ): Promise<any> {
        try {
            const row = await tablesDB.createRow({
                ...TABLE_CONFIG,
                rowId: ID.unique(),
                data: {
                    userId,
                    movieId: item.movieId,
                    title: item.title,
                    posterPath: item.posterPath,
                    mediaType: item.mediaType,
                    rating: item.rating,
                    releaseDate: item.releaseDate,
                },
            });
            toast.success(`Added "${item.title}" to favorites`);
            return row;
        } catch (error) {
            console.error('Add to favorites error:', error);
            toast.error('Failed to add to favorites');
            throw error;
        }
    },

    async removeFromFavorites(rowId: string): Promise<void> {
        try {
            await tablesDB.deleteRow({
                ...TABLE_CONFIG,
                rowId: rowId,
            });
            toast.success('Removed from favorites');
        } catch (error) {
            console.error('Remove from favorites error:', error);
            toast.error('Failed to remove from favorites');
            throw error;
        }
    },

    async getUserFavorites(userId: string): Promise<any[]> {
        try {
            const response = await tablesDB.listRows({
                ...TABLE_CONFIG,
                queries: [
                    Query.equal('userId', userId),
                    Query.orderDesc('$createdAt'),
                ],
            });
            return response.rows;
        } catch (error) {
            console.error('Get favorites error:', error);
            throw error;
        }
    },

    async isFavorite(userId: string, movieId: number): Promise<boolean> {
        try {
            const response = await tablesDB.listRows({
                ...TABLE_CONFIG,
                queries: [
                    Query.equal('userId', userId),
                    Query.equal('movieId', movieId),
                ],
            });
            return response.rows.length > 0;
        } catch (error) {
            console.error('Check favorite error:', error);
            return false;
        }
    },

    async getFavoriteRow(userId: string, movieId: number): Promise<any | null> {
        try {
            const response = await tablesDB.listRows({
                ...TABLE_CONFIG,
                queries: [
                    Query.equal('userId', userId),
                    Query.equal('movieId', movieId),
                ],
            });
            return response.rows[0] || null;
        } catch (error) {
            console.error('Get favorite row error:', error);
            return null;
        }
    },

    async toggleFavorite(
        userId: string,
        item: Omit<FavoriteItem, 'userId'>,
    ): Promise<{ isNowFavorite: boolean }> {
        try {
            const existingFavorite = await this.getFavoriteRow(
                userId,
                item.movieId,
            );

            if (existingFavorite) {
                await this.removeFromFavorites(existingFavorite.$id);
                return { isNowFavorite: false };
            } else {
                await this.addToFavorites(userId, item);
                return { isNowFavorite: true };
            }
        } catch (error) {
            console.error('Toggle favorite error:', error);
            throw error;
        }
    },
};
