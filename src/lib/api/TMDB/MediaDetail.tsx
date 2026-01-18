import { BASE_URL } from '@/constants/urls';
import { fetchFromTMDB } from './fetcher';
import { Movie } from '@/types/movie';
import { TV } from '@/types/tv';

type MediaType = 'movie' | 'tv';

export default function getMediaDetail<T extends MediaType>(
    type: T,
    id: number,
): Promise<T extends 'movie' ? Movie : TV> {
    const url = `${BASE_URL}/${type}/${id}`;
    return fetchFromTMDB<T extends 'movie' ? Movie : TV>(url);
}
