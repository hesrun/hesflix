'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import Button from './Button';
import {
    LucideAArrowDown,
    LucideArrowLeft,
    LucideArrowRight,
} from 'lucide-react';

interface PaginationProps {
    type: 'movie' | 'tv' | 'people';
    currentPage: number;
    totalPages: number;
}

export default function Pagination({
    type,
    currentPage,
    totalPages,
}: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const goToPage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', String(page));
        if (type === 'people') {
            router.push(`/peoples?${params.toString()}`);
            return;
        }
        router.push(`/${type}?${params.toString()}`);
    };

    return (
        <div className="flex items-center justify-center mt-4 gap-4">
            <Button
                size="sm"
                variant="outline"
                icon={<LucideArrowLeft size={20} />}
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
            >
                Prev
            </Button>
            <span>
                {currentPage} of {totalPages}
            </span>
            <Button
                size="sm"
                variant="outline"
                icon={<LucideArrowRight size={20} />}
                iconPosition="right"
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
            >
                Next
            </Button>
        </div>
    );
}
