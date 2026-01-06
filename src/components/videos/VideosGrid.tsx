import { Video } from '@/types/videos';
import VideosCard from './VideosCard';

interface VideosGridProps {
    videos: Video[];
}

export default function VideosGrid({ videos }: VideosGridProps) {
    if (!videos.length) {
        return <p className="text-gray-400">No videos available</p>;
    }

    const youtubeVideos = videos.filter(
        (v) => v.site === 'YouTube' && v.type === 'Trailer'
    );

    if (!youtubeVideos.length) {
        return <p className="text-gray-400">No videos available</p>;
    }

    return (
        <div className="flex overflow-x-auto gap-4 mb-6 scroll pb-4">
            {youtubeVideos.map((video) => (
                <VideosCard key={video.id} video={video} />
            ))}
        </div>
    );
}
