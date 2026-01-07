import { BASE_URL } from '@/constants/urls';
import { fetchFromTMDB } from '../fetcher';
import { PersonCreditsResponse } from '@/types/personCredits';

export default function getPersonCredits(
    personId: number
): Promise<PersonCreditsResponse> {
    const url = `${BASE_URL}/person/${personId}/combined_credits`;
    return fetchFromTMDB<PersonCreditsResponse>(url);
}
