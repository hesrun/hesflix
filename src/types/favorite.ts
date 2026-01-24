import { Models } from 'appwrite';

export interface FavoriteDocument extends Models.Document {
    userId: string;
    movieId: number;
    title: string;
    posterPath: string | null;
    mediaType: 'movie' | 'tv';
    rating?: number;
    releaseDate?: string;
}
