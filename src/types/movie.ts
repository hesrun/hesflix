export interface Movie {
    adult: boolean;
    backdrop_path: string;
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    genre_ids?: number[];
    genres?: { id: number; name: string }[];
}

export interface FilmsResponse {
    page: number;
    total_pages: number;
    total_results: number;
    results: Movie[];
}
