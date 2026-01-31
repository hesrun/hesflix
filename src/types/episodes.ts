export interface EpisodItem {
    air_date: string;
    episode_number: number;
    episode_type: string;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string | null;
    vote_average: number;
    vote_count: number;
    crew: any[];
}

export interface EpisodesResponse {
    id: number;
    air_date: string;
    episodes: EpisodItem[];
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
}
