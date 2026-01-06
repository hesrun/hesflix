import { create } from 'zustand';

interface ModalState {
    // Video Modal
    isVideoOpen: boolean;
    videoUrl: string | null;
    openVideo: (url: string) => void;
    closeVideo: () => void;

    // Add more modals here in future
    // isAuthOpen: boolean;
    // openAuth: () => void;
    // closeAuth: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
    // Video Modal
    isVideoOpen: false,
    videoUrl: null,
    openVideo: (url: string) => set({ isVideoOpen: true, videoUrl: url }),
    closeVideo: () => set({ isVideoOpen: false, videoUrl: null }),

    // Add more modals here
}));
