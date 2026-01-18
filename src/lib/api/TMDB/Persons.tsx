import { BASE_URL } from '@/constants/urls';
import { fetchFromTMDB } from './fetcher';
import { Person } from '@/types/people';

export default function getPerson(id: number): Promise<Person> {
    const url = `${BASE_URL}/person/${id}`;
    return fetchFromTMDB<Person>(url);
}
