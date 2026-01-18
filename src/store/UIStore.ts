import { create } from 'zustand';

interface UIState {
    filtersIsOpen: boolean;
    openFilters: () => void;
    closeFilters: () => void;
    toggleFilters: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    filtersIsOpen: false,
    openFilters: () => set({ filtersIsOpen: true }),
    closeFilters: () => set({ filtersIsOpen: false }),
    toggleFilters: () =>
        set((state) => ({ filtersIsOpen: !state.filtersIsOpen })),
}));
