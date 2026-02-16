import { WatchListItem } from '@/types/watchLists';
import { tablesDB, DATABASE_ID, WATHCLISTS_TABLE_ID } from './config';
import { ID, Query } from 'appwrite';
import { toast } from 'sonner';

const TABLE_CONFIG = {
    databaseId: DATABASE_ID,
    tableId: WATHCLISTS_TABLE_ID,
};

export const watchListService = {
    async createWatchList(
        userId: string,
        item: Omit<WatchListItem, 'userId'>,
    ): Promise<any> {
        try {
            const row = await tablesDB.createRow({
                ...TABLE_CONFIG,
                rowId: ID.unique(),
                data: {
                    userId,
                    name: item.name,
                    description: item.description,
                },
            });
            toast.success(`List "${item.name}" was created`);
            return row;
        } catch (error) {
            console.error('Create list error:', error);
            toast.error('Failed to create list');
            throw error;
        }
    },

    async getWatchLists(userId: string): Promise<any[]> {
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
            console.log('Get watch list error', error);
            throw error;
        }
    },
    async removeWatchList(rowId: string): Promise<void> {
        try {
            await tablesDB.deleteRow({
                ...TABLE_CONFIG,
                rowId: rowId,
            });
            toast.success('Removed from watch lists');
        } catch (error) {
            console.error('Remove from watch list error:', error);
            toast.error('Failed to remove from watchlist');
            throw error;
        }
    },
    async editWatchList(
        rowId: string,
        item: Omit<WatchListItem, 'userId'>,
    ): Promise<any> {
        try {
            const row = await tablesDB.updateRow({
                ...TABLE_CONFIG,
                rowId: rowId,
                data: item,
            });
            toast.success('Watch list was edited');
            return row;
        } catch (error) {
            console.error('Update watch list error:', error);
            toast.error('Failed to update watchlist');
            throw error;
        }
    },
};
