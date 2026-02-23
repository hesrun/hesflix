import { create } from 'zustand';
import { WatchListFilmsRow, WatchListFilmsItem } from '@/types/watchListFilms';
import { watchListFilmsService } from '@/lib/api/appwrite/watchListFilms';
import { toast } from 'sonner';

interface WatchListFilmsState {
    filmsByList: Record<string, WatchListFilmsRow[]>;
    loadingByList: Record<string, boolean>;
    loadedByList: Record<string, boolean>;

    loadFilmsForList: (watchListId: string) => Promise<void>;
    addFilm: (
        watchListId: string,
        userId: string,
        item: Omit<WatchListFilmsItem, 'userId' | 'watchListId'>,
    ) => Promise<void>;
    removeFilm: (watchListId: string, rowId: string) => Promise<void>;
    isFilmInList: (watchListId: string, movieId: number) => boolean;
    getFilms: (watchListId: string) => WatchListFilmsRow[];
    getFilmCount: (watchListId: string) => number;
}

export const useWatchListFilmsStore = create<WatchListFilmsState>(
    (set, get) => ({
        filmsByList: {},
        loadingByList: {},
        loadedByList: {},

        loadFilmsForList: async (watchListId) => {
            const { loadedByList, loadingByList } = get();

            if (loadedByList[watchListId]) return;

            if (loadingByList[watchListId]) return;

            set((state) => ({
                loadingByList: { ...state.loadingByList, [watchListId]: true },
            }));

            try {
                const films =
                    await watchListFilmsService.getFilmsByWatchList(
                        watchListId,
                    );

                set((state) => ({
                    filmsByList: {
                        ...state.filmsByList,
                        [watchListId]: films,
                    },
                    loadedByList: {
                        ...state.loadedByList,
                        [watchListId]: true,
                    },
                }));
            } catch (error) {
                console.error('Error loading films:', error);
            } finally {
                set((state) => ({
                    loadingByList: {
                        ...state.loadingByList,
                        [watchListId]: false,
                    },
                }));
            }
        },

        addFilm: async (watchListId, userId, item) => {
            if (get().isFilmInList(watchListId, item.movieId)) {
                toast.warning('Already in list');
                return;
            }

            const newFilm = await watchListFilmsService.addFilmToList(
                userId,
                watchListId,
                item,
            );

            set((state) => ({
                filmsByList: {
                    ...state.filmsByList,
                    [watchListId]: [
                        ...(state.filmsByList[watchListId] || []),
                        newFilm,
                    ],
                },
                loadedByList: {
                    ...state.loadedByList,
                    [watchListId]: true,
                },
            }));

            toast.success(`"${newFilm.title}" added to list`);
        },

        removeFilm: async (watchListId, rowId) => {
            const films = get().filmsByList[watchListId] || [];
            const removedFilm = films.find((f) => f.$id === rowId);

            await watchListFilmsService.removeFilmFromList(rowId);

            set((state) => ({
                filmsByList: {
                    ...state.filmsByList,
                    [watchListId]: films.filter((f) => f.$id !== rowId),
                },
            }));

            if (removedFilm) {
                toast.success(`"${removedFilm.title}" removed from list`);
            }
        },

        isFilmInList: (watchListId, movieId) => {
            const films = get().filmsByList[watchListId] || [];
            return films.some((film) => film.movieId === movieId);
        },

        getFilms: (watchListId) => {
            return get().filmsByList[watchListId] || [];
        },

        getFilmCount: (watchListId) => {
            return get().filmsByList[watchListId]?.length || 0;
        },
    }),
);
