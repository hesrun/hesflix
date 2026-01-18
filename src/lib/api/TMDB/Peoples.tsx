import { BASE_URL } from '@/constants/urls';
import { fetchFromTMDB } from './fetcher';
import { PeopleSearchResponse } from '@/types/people';

export default function getPeoples(page = 1): Promise<PeopleSearchResponse> {
    const url = `${BASE_URL}/person/popular?page=${page}`;
    return fetchFromTMDB<PeopleSearchResponse>(url);
}
