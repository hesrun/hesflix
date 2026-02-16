import { watchListService } from '@/lib/api/appwrite/watchLists';
import { WatchListItem, WatchListDocument } from '@/types/watchLists';
import { create } from 'zustand';

interface WatchListsState {
    watchlists: WatchListDocument[];
    isLoading: boolean;
    isInitialized: boolean;

    addList: (
        userId: string,
        item: Omit<WatchListItem, 'userId'>,
    ) => Promise<void>;

    loadLists: (userId: string) => Promise<void>;
    removeWatchList: (rowId: string) => Promise<void>;
    editWatchList: (
        rowId: string,
        item: Omit<WatchListItem, 'userId'>,
    ) => Promise<void>;
}

export const useWatchListsStore = create<WatchListsState>((set, get) => ({
    watchlists: [],
    isLoading: false,
    isInitialized: false,

    loadLists: async (userId: string) => {
        if (get().isInitialized) return;
        set({ isLoading: true });
        try {
            const watchlists = await watchListService.getWatchLists(userId);
            set({ watchlists, isInitialized: true });
        } catch (error) {
            console.error('Error loading lists:', error);
        } finally {
            set({ isLoading: false });
        }
    },

    addList: async (userId: string, item: Omit<WatchListItem, 'userId'>) => {
        try {
            const newList = await watchListService.createWatchList(
                userId,
                item,
            );
            set((state) => ({
                watchlists: [...state.watchlists, newList],
            }));
        } catch (error) {
            console.error('Error adding list:', error);
            throw error;
        }
    },
    removeWatchList: async (rowId: string) => {
        try {
            await watchListService.removeWatchList(rowId);
            set((state) => ({
                watchlists: state.watchlists.filter(
                    (item) => item.$id !== rowId,
                ),
            }));
        } catch (error) {
            console.error('Error delete list:', error);
            throw error;
        }
    },
    editWatchList: async (
        rowId: string,
        item: Omit<WatchListItem, 'userId'>,
    ) => {
        try {
            const updatedList = await watchListService.editWatchList(
                rowId,
                item,
            );
            set((state) => ({
                watchlists: state.watchlists.map((list) =>
                    list.$id === rowId ? updatedList : list,
                ),
            }));
        } catch (error) {
            console.error('Error editing list:', error);
            throw error;
        }
    },
}));
