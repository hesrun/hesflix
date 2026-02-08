import { GET_HEADER } from '@/constants/requestHeader';

export async function fetchFromTMDB<T>(url: string): Promise<T> {
    const res = await fetch(url, {
        ...GET_HEADER,
        next: { revalidate: 3600 * 24 },
    });

    if (!res.ok)
        throw new Error(`TMDB fetch failed: ${res.status} ${res.statusText}`);

    const data = (await res.json()) as T;
    return data;
}
