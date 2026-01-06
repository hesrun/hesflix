'use client';

import Image from 'next/image';
import { Video } from '@/types/videos';
import { useModalStore } from '@/store/modalStore';
import { CirclePlay } from 'lucide-react';

interface VideoCardProps {
    video: Video;
}

export default function VideosCard({ video }: VideoCardProps) {
    const { openVideo } = useModalStore();

    if (video.site !== 'YouTube') {
        return null; // Only support YouTube for now
    }

    const posterUrl = `https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`;
    const embedUrl = `https://www.youtube.com/embed/${video.key}`;

    const handleClick = () => {
        openVideo(embedUrl);
    };

    return (
        <button
            onClick={handleClick}
            className="w-[400px] shrink-0 relative group overflow-hidden rounded-lg cursor-pointer transition-transform duration-300"
        >
            <Image
                src={posterUrl}
                alt={video.name}
                width={400}
                height={225}
                className="w-full aspect-video object-cover group-hover:scale-110 transition-transform duration-300"
            />

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <CirclePlay className="w-16 h-16" strokeWidth={1} />
                </div>
            </div>

            {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                <p className="text-white font-semibold text-sm truncate">
                    {video.name}
                </p>
                <p className="text-gray-300 text-xs">{video.type}</p>
            </div> */}
        </button>
    );
}
