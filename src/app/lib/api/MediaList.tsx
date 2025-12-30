import { BASE_URL } from '@/constants/urls';
import { fetchFromTMDB } from '../fetcher';
import { FilmsResponse, TVResponse } from '@/types/types';

type MediaType = 'movie' | 'tv';

export default function getMediaList<T extends MediaType>(
    type: T,
    page = 1,
    sort = 'popularity.desc',
    genres = ''
): Promise<T extends 'movie' ? FilmsResponse : TVResponse> {
    const url = `${BASE_URL}/discover/${type}?page=${page}&sort_by=${sort}${
        genres ? `&with_genres=${genres}` : ''
    }`;
    return fetchFromTMDB<T extends 'movie' ? FilmsResponse : TVResponse>(url);
}
