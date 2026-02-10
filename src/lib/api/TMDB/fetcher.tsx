import { GET_HEADER } from '@/constants/requestHeader';

export async function fetchFromTMDB<T>(
    url: string,
    revalidate: number | false = 3600 * 24,
): Promise<T> {
    const res = await fetch(url, {
        ...GET_HEADER,
        ...(revalidate !== false && { next: { revalidate } }),
    });

    if (!res.ok)
        throw new Error(`TMDB fetch failed: ${res.status} ${res.statusText}`);

    const data = (await res.json()) as T;
    return data;
}
