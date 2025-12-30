import { Genre, SeasonsItem } from './common';

export interface TV {
    adult: boolean;
    backdrop_path: string;
    id: number;
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    first_air_date: string;
    name: string;
    vote_average: number;
    vote_count: number;
    genre_ids: number[];
    genres?: Genre[];
    tagline?: string;
    seasons?: SeasonsItem[];
}

export interface TVResponse {
    page: number;
    total_pages: number;
    total_results: number;
    results: TV[];
}
