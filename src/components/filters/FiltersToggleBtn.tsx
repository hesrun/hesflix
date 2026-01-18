'use client';
import { LucideFilter, LucideSlidersHorizontal, LucideX } from 'lucide-react';
import Button from '../UI/Button';
import { useUIStore } from '@/store/UIStore';

export default function FiltersToggleBtn() {
    const filtersIsOpen = useUIStore((state) => state.filtersIsOpen);
    const toggleFilters = useUIStore((state) => state.toggleFilters);
    return (
        <Button
            onClick={toggleFilters}
            variant="ghost"
            size="sm"
            icon={<LucideSlidersHorizontal width={18} />}
            iconPosition="right"
        >
            Filters
        </Button>
    );
}
