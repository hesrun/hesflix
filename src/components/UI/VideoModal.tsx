'use client';

import { useModalStore } from '@/store/modalStore';
import Modal from './Modal';

export default function VideoModal() {
    const { isVideoOpen, videoUrl, closeVideo } = useModalStore();

    if (!videoUrl) return null;

    return (
        <Modal
            isOpen={isVideoOpen}
            onClose={closeVideo}
            title="Watch Trailer"
            className="p-0"
        >
            <div className="aspect-video bg-black">
                {videoUrl && (
                    <iframe
                        width="100%"
                        height="100%"
                        src={videoUrl}
                        title="Video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                )}
            </div>
        </Modal>
    );
}
