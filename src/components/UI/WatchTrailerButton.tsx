'use client';

import { useModalStore } from '@/store/modalStore';

interface WatchTrailerButtonProps {
    videoUrl?: string;
    className?: string;
    disabled?: boolean;
}

export default function WatchTrailerButton({
    videoUrl,
    className = '',
    disabled = false,
}: WatchTrailerButtonProps) {
    const { openVideo } = useModalStore();

    const handleClick = () => {
        if (videoUrl) {
            openVideo(videoUrl);
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={disabled || !videoUrl}
            className={`px-6 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded font-semibold transition-colors ${className}`}
        >
            ▶ {videoUrl ? 'Watch Trailer' : 'No Trailer Available'}
        </button>
    );
}
