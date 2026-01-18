import { BASE_URL } from '@/constants/urls';
import { fetchFromTMDB } from './fetcher';
import { VideosResponse } from '@/types/videos';

type MediaType = 'movie' | 'tv';

export default function getMediaVideos(
    type: MediaType,
    id: number,
): Promise<VideosResponse> {
    const url = `${BASE_URL}/${type}/${id}/videos`;
    return fetchFromTMDB<VideosResponse>(url);
}
