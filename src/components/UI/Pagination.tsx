'use client';
import { useSearchParams, useRouter } from 'next/navigation';

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
            <button
                disabled={currentPage === 1}
                className="bg-amber-500 cursor-pointer text-black px-4 py-2 font-medium disabled:opacity-50 disabled:pointer-events-none"
                onClick={() => goToPage(currentPage - 1)}
            >
                Prev
            </button>
            <span>
                {currentPage} of {totalPages}
            </span>
            <button
                disabled={currentPage === totalPages}
                className="bg-amber-500 cursor-pointer text-black px-4 py-2 font-medium disabled:opacity-50 disabled:pointer-events-none"
                onClick={() => goToPage(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
}
