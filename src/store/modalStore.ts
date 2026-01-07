import { create } from 'zustand';

interface ModalState {
    isOpen: boolean;
    title: string | null;
    data: unknown | null;
    openModal: <T = unknown>(data?: T, title?: string) => void;
    closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
    isOpen: false,
    title: null,
    data: null,
    openModal: (data, title = '') =>
        set({ isOpen: true, data: data ?? null, title }),
    closeModal: () => set({ isOpen: false, data: null, title: null }),
}));
