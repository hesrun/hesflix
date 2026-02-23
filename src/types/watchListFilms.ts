import { Models } from 'appwrite';

export interface WatchListFilmsItem {
    userId: string;
    watchListId: string;
    movieId: number;
    title: string;
    posterPath: string | null;
    mediaType: 'movie' | 'tv';
    rating?: number;
    releaseDate?: string;
}

export type WatchListFilmsRow = Models.DefaultRow & WatchListFilmsItem;
