'use client';

import { useModalStore } from '@/store/modalStore';
import Modal from './Modal';

interface VideoData {
    videoUrl: string;
}

export default function VideoModal() {
    const { isOpen, data, title, closeModal } = useModalStore();
    const videoData = data as VideoData;

    if (!videoData?.videoUrl) return null;
    arguments;
    return (
        <Modal
            size="xxlarge"
            isOpen={isOpen}
            onClose={closeModal}
            title={title || ''}
            className="p-0"
        >
            <div className="aspect-video bg-black">
                {videoData.videoUrl && (
                    <iframe
                        width="100%"
                        height="100%"
                        src={videoData.videoUrl}
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
