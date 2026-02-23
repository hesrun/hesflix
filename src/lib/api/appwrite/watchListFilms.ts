import {
    WatchListFilmsDocument,
    WatchListFilmsItem,
} from '@/types/watchListFilms';
import { tablesDB, DATABASE_ID, WATCHLIST_FILMS_TABLE_ID } from './config';
import { ID, Query } from 'appwrite';
import { toast } from 'sonner';
import { WatchListFilmsRow } from '@/types/watchListFilms';

const TABLE_CONFIG = {
    databaseId: DATABASE_ID,
    tableId: WATCHLIST_FILMS_TABLE_ID,
};

export const watchListFilmsService = {
    async getFilmsByWatchList(
        watchListId: string,
    ): Promise<WatchListFilmsRow[]> {
        try {
            const response = await tablesDB.listRows<WatchListFilmsRow>({
                ...TABLE_CONFIG,
                queries: [
                    Query.equal('watchListId', watchListId),
                    Query.orderDesc('$createdAt'),
                    Query.limit(100),
                ],
            });
            return response.rows;
        } catch (error) {
            console.error('Get films by list error:', error);
            throw error;
        }
    },

    async addFilmToList(
        userId: string,
        watchListId: string,
        item: Omit<WatchListFilmsItem, 'userId' | 'watchListId'>,
    ): Promise<WatchListFilmsRow> {
        try {
            const row = await tablesDB.createRow<WatchListFilmsRow>({
                ...TABLE_CONFIG,
                rowId: ID.unique(),
                data: {
                    userId,
                    watchListId,
                    movieId: item.movieId,
                    title: item.title,
                    posterPath: item.posterPath,
                    mediaType: item.mediaType,
                    rating: item.rating,
                    releaseDate: item.releaseDate,
                },
            });
            return row;
        } catch (error) {
            console.error('Add film to list error:', error);
            toast.error('Failed to add to list');
            throw error;
        }
    },

    async removeFilmFromList(rowId: string): Promise<void> {
        try {
            await tablesDB.deleteRow({
                ...TABLE_CONFIG,
                rowId,
            });
        } catch (error) {
            console.error('Remove film from list error:', error);
            toast.error('Failed to remove from list');
            throw error;
        }
    },

    async deleteAllFilmsByWatchListId(watchListId: string): Promise<void> {
        try {
            const rows = await this.getFilmsByWatchList(watchListId);

            await Promise.all(
                rows.map((row) => this.removeFilmFromList(row.$id)),
            );
        } catch (error) {
            console.error('Delete films by watchListId error:', error);
            throw error;
        }
    },
};
