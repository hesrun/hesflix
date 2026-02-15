import { Models } from 'appwrite';

export interface FavoriteItem {
    userId: string;
    movieId: number;
    title: string;
    posterPath: string | null;
    mediaType: 'movie' | 'tv';
    rating?: number;
    releaseDate?: string;
}

export type FavoriteDocument = Models.Document & FavoriteItem;
