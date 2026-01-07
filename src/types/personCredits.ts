export interface PersonCredit {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    media_type: 'movie' | 'tv';
    original_language: string;
    overview: string;
    poster_path: string | null;
    vote_average: number;
    vote_count: number;
    character: string;
    // Movie fields
    original_title?: string;
    release_date?: string;
    title?: string;
    video?: boolean;
    // TV fields
    first_air_date?: string;
    name?: string;
    origin_country?: string[];
    original_name?: string;
}

export interface PersonCreditsResponse {
    cast: PersonCredit[];
    crew: PersonCredit[];
    id: number;
}
