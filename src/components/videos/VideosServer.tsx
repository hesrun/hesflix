import { tmdb } from '@/lib/api/TMDB';
import VideosGrid from './VideosGrid';

interface VideosServerProps {
    type: 'movie' | 'tv';
    id: number;
}

export default async function VideosServer({ type, id }: VideosServerProps) {
    const data = await tmdb.media.getVideos(type, id);
    return (
        <>
            <VideosGrid videos={data.results} />
        </>
    );
}
