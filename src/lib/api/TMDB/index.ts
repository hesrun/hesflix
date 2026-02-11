import { BASE_URL } from '@/constants/urls';
import { fetchFromTMDB } from './fetcher';
import { FilmsResponse } from '@/types/movie';
import { TVResponse } from '@/types/tv';
import { Movie } from '@/types/movie';
import { TV } from '@/types/tv';
import { MovieCreditsResponse, TVCreditsResponse } from '@/types/credits';
import { VideosResponse } from '@/types/videos';
import { PeopleSearchResponse, Person } from '@/types/people';
import { PersonCreditsResponse } from '@/types/personCredits';
import { SearchResponse } from '@/types/Search';
import { GenresResponse } from '@/types/genre';
import { EpisodesResponse } from '@/types/episodes';
import { KeywordsResponse } from '@/types/keyword';

type MediaType = 'movie' | 'tv';

export const tmdb = {
    media: {
        getList<T extends MediaType>(
            type: T,
            page = 1,
            sort = 'popularity.desc',
            genres = '',
            vote_average_gte = 0,
            vote_average_lte = 10,
        ): Promise<T extends 'movie' ? FilmsResponse : TVResponse> {
            const url = `${BASE_URL}/discover/${type}?page=${page}&sort_by=${sort}${
                genres ? `&with_genres=${genres}` : ''
            }${vote_average_gte ? `&vote_average.gte=${vote_average_gte}` : ''}${vote_average_lte ? `&vote_average.lte=${vote_average_lte}` : ''}`;
            return fetchFromTMDB<
                T extends 'movie' ? FilmsResponse : TVResponse
            >(url);
        },

        getDetail<T extends MediaType>(
            type: T,
            id: number,
        ): Promise<T extends 'movie' ? Movie : TV> {
            const url = `${BASE_URL}/${type}/${id}`;
            return fetchFromTMDB<T extends 'movie' ? Movie : TV>(url);
        },

        getCredits<T extends MediaType>(
            type: T,
            id: number,
        ): Promise<
            T extends 'movie' ? MovieCreditsResponse : TVCreditsResponse
        > {
            const url = `${BASE_URL}/${type}/${id}/credits`;
            return fetchFromTMDB<
                T extends 'movie' ? MovieCreditsResponse : TVCreditsResponse
            >(url);
        },

        getVideos(type: MediaType, id: number): Promise<VideosResponse> {
            const url = `${BASE_URL}/${type}/${id}/videos`;
            return fetchFromTMDB<VideosResponse>(url);
        },
    },

    seasons: {
        getSeason(tv_id: number, season_id: number): Promise<EpisodesResponse> {
            const url = `${BASE_URL}/tv/${tv_id}/season/${season_id}`;
            return fetchFromTMDB<EpisodesResponse>(url);
        },
    },

    person: {
        getPopular(page = 1): Promise<PeopleSearchResponse> {
            const url = `${BASE_URL}/person/popular?page=${page}`;
            return fetchFromTMDB<PeopleSearchResponse>(url);
        },

        getDetail(id: number): Promise<Person> {
            const url = `${BASE_URL}/person/${id}`;
            return fetchFromTMDB<Person>(url);
        },

        getCredits(personId: number): Promise<PersonCreditsResponse> {
            const url = `${BASE_URL}/person/${personId}/combined_credits`;
            return fetchFromTMDB<PersonCreditsResponse>(url);
        },
    },

    search: {
        multi(query: string): Promise<SearchResponse> {
            const url = `/api/search?query=${encodeURIComponent(query)}`;
            return fetchFromTMDB<SearchResponse>(url);
        },

        direct(query: string): Promise<SearchResponse> {
            const url = `${BASE_URL}/search/multi?query=${encodeURIComponent(query)}`;
            return fetchFromTMDB<SearchResponse>(url);
        },
    },

    genres: {
        get(type: 'movie' | 'tv'): Promise<GenresResponse> {
            const url = `${BASE_URL}/genre/${type}/list`;
            return fetchFromTMDB<GenresResponse>(url);
        },
    },

    collections: {
        getByEndpoint(
            endpoint: string,
            page = 1,
        ): Promise<FilmsResponse | TVResponse | SearchResponse> {
            const url = `${BASE_URL}${endpoint}?page=${page}`;
            return fetchFromTMDB<FilmsResponse | TVResponse | SearchResponse>(
                url,
            );
        },
    },

    keywords: {
        search(query: string): Promise<KeywordsResponse> {
            const url = `${BASE_URL}/search/keyword?query=${encodeURIComponent(query)}`;
            return fetchFromTMDB<KeywordsResponse>(url);
        },
    },

    aiSearch: {
        async searchPerson(name: string): Promise<number | null> {
            const url = `${BASE_URL}/search/person?query=${encodeURIComponent(name)}`;
            const response = await fetchFromTMDB<PeopleSearchResponse>(
                url,
                false,
            );
            return response.results[0]?.id || null;
        },

        searchMovieByTitle(title: string, page = 1): Promise<FilmsResponse> {
            const url = `${BASE_URL}/search/movie?query=${encodeURIComponent(title)}&page=${page}`;
            return fetchFromTMDB<FilmsResponse>(url, false);
        },

        searchTVByTitle(title: string, page = 1): Promise<TVResponse> {
            const url = `${BASE_URL}/search/tv?query=${encodeURIComponent(title)}&page=${page}`;
            return fetchFromTMDB<TVResponse>(url, false);
        },

        discoverMovies(params: {
            page?: number;
            with_cast?: string;
            with_crew?: string;
            with_genres?: string;
            with_keywords?: string;
            with_original_language?: string;
            'vote_average.gte'?: number;
            'vote_average.lte'?: number;
            'primary_release_date.gte'?: string;
            'primary_release_date.lte'?: string;
            sort_by?: string;
        }): Promise<FilmsResponse> {
            const queryParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    queryParams.append(key, String(value));
                }
            });
            const url = `${BASE_URL}/discover/movie?${queryParams.toString()}`;
            return fetchFromTMDB<FilmsResponse>(url, false);
        },

        discoverTV(params: {
            page?: number;
            with_cast?: string;
            with_crew?: string;
            with_genres?: string;
            with_keywords?: string;
            with_original_language?: string;
            'vote_average.gte'?: number;
            'vote_average.lte'?: number;
            'first_air_date.gte'?: string;
            'first_air_date.lte'?: string;
            sort_by?: string;
        }): Promise<TVResponse> {
            const queryParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    queryParams.append(key, String(value));
                }
            });
            const url = `${BASE_URL}/discover/tv?${queryParams.toString()}`;
            return fetchFromTMDB<TVResponse>(url, false);
        },

        getSimilarMovies(movieId: number, page = 1): Promise<FilmsResponse> {
            const url = `${BASE_URL}/movie/${movieId}/similar?page=${page}`;
            return fetchFromTMDB<FilmsResponse>(url, false);
        },

        getSimilarTV(tvId: number, page = 1): Promise<TVResponse> {
            const url = `${BASE_URL}/tv/${tvId}/similar?page=${page}`;
            return fetchFromTMDB<TVResponse>(url, false);
        },

        getRecommendationsMovies(
            movieId: number,
            page = 1,
        ): Promise<FilmsResponse> {
            const url = `${BASE_URL}/movie/${movieId}/recommendations?page=${page}`;
            return fetchFromTMDB<FilmsResponse>(url, false);
        },

        getRecommendationsTV(tvId: number, page = 1): Promise<TVResponse> {
            const url = `${BASE_URL}/tv/${tvId}/recommendations?page=${page}`;
            return fetchFromTMDB<TVResponse>(url, false);
        },
    },
};
