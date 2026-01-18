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
import { GenresResponse } from '@/types/responses';

type MediaType = 'movie' | 'tv';

export const tmdb = {
    media: {
        getList<T extends MediaType>(
            type: T,
            page = 1,
            sort = 'popularity.desc',
            genres = '',
        ): Promise<T extends 'movie' ? FilmsResponse : TVResponse> {
            const url = `${BASE_URL}/discover/${type}?page=${page}&sort_by=${sort}${
                genres ? `&with_genres=${genres}` : ''
            }`;
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
};
