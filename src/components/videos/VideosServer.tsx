import getMediaVideos from '@/lib/api/MediaVideos';
import VideosGrid from './VideosGrid';

interface VideosServerProps {
    type: 'movie' | 'tv';
    id: number;
}

export default async function VideosServer({ type, id }: VideosServerProps) {
    const data = await getMediaVideos(type, id);
    return (
        <>
            <VideosGrid videos={data.results} />
        </>
    );
}
