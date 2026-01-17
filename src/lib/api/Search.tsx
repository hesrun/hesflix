import { BASE_URL } from '@/constants/urls';
import { fetchFromTMDB } from '../fetcher';
import { SearchResponse } from '@/types/Search';

export function getSearchResultDirect(query: string) {
    const url = `${BASE_URL}/search/multi?query=${encodeURIComponent(query)}`;
    return fetchFromTMDB<SearchResponse>(url);
}

export default function getSearchResult(query: string) {
    const url = `/api/search?query=${encodeURIComponent(query)}`;
    return fetchFromTMDB<SearchResponse>(url);
}
