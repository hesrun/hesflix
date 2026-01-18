import { BASE_URL } from '@/constants/urls';
import { fetchFromTMDB } from './fetcher';
import { MovieCreditsResponse, TVCreditsResponse } from '@/types/credits';

type MediaType = 'movie' | 'tv';

export default function getMediaCredits<T extends MediaType>(
    type: T,
    id: number,
): Promise<T extends 'movie' ? MovieCreditsResponse : TVCreditsResponse> {
    const url = `${BASE_URL}/${type}/${id}/credits`;
    return fetchFromTMDB<
        T extends 'movie' ? MovieCreditsResponse : TVCreditsResponse
    >(url);
}
