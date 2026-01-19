import { tmdb } from '@/lib/api/TMDB';
import FilmDetailClient from './FilmDetailClient';

interface mediaDetailProps {
    id: number;
    type: 'movie' | 'tv';
}

export default async function FilmDetailServer({ id, type }: mediaDetailProps) {
    const mediaData = await tmdb.media.getDetail(type, id);
    return <FilmDetailClient data={mediaData} type={type} />;
}
