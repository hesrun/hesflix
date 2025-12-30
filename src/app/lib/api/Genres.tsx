import { BASE_URL } from '@/constants/urls';
import { fetchFromTMDB } from '../fetcher';
import { GenresResponse } from '@/types/types';

export default function getGenres(type: 'movie' | 'tv') {
    const url = `${BASE_URL}/genre/${type}/list`;
    return fetchFromTMDB<GenresResponse>(url);
}
