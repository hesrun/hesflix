export interface Credit {
    adult: false;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
}

export interface MovieCreditsResponse {
    id: number;
    cast: Credit[];
}

export interface TVCreditsResponse {
    cast: Credit[];
}
