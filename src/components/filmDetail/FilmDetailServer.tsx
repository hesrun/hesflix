import { getMediaDetailCached } from '@/lib/api/TMDB/tmdbCache';
import FilmDetailClient from './FilmDetailClient';

interface mediaDetailProps {
    id: number;
    type: 'movie' | 'tv';
}

export default async function FilmDetailServer({ id, type }: mediaDetailProps) {
    const mediaData = await getMediaDetailCached(type, id);
    return <FilmDetailClient data={mediaData} type={type} />;
}
