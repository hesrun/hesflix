import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Filters {
    genres: string[];
    sort: string;
    rating: [number, number];
}

interface UseFiltersOptions {
    type: 'movie' | 'tv';
    onApply?: () => void;
}

export const useFilters = ({ type, onApply }: UseFiltersOptions) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [filters, setFilters] = useState<Filters>({
        genres: [],
        sort: 'popularity.desc',
        rating: [0, 10],
    });

    useEffect(() => {
        const minRating = searchParams.get('vote_average.gte');
        const maxRating = searchParams.get('vote_average.lte');

        setFilters({
            genres: (searchParams.get('with_genres')?.split(',') ?? []).filter(
                Boolean,
            ),
            sort: searchParams.get('sort') ?? 'popularity.desc',
            rating: [
                minRating ? parseFloat(minRating) : 0,
                maxRating ? parseFloat(maxRating) : 10,
            ],
        });
    }, [searchParams]);

    const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = e.target;
        setFilters((prev) => ({
            ...prev,
            genres: checked
                ? [...prev.genres, id]
                : prev.genres.filter((f) => f !== id),
        }));
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters((prev) => ({ ...prev, sort: e.target.id }));
    };

    const handleRatingChange = (value: number | number[]) => {
        setFilters((prev) => ({
            ...prev,
            rating: value as [number, number],
        }));
    };

    const applyFilters = () => {
        const params = new URLSearchParams(searchParams.toString());

        if (filters.genres.length > 0) {
            params.set('with_genres', filters.genres.join(','));
        } else {
            params.delete('with_genres');
        }

        if (filters.sort) {
            params.set('sort', filters.sort);
        } else {
            params.delete('sort');
        }

        if (filters.rating[0] > 0) {
            params.set('vote_average.gte', filters.rating[0].toString());
        } else {
            params.delete('vote_average.gte');
        }

        if (filters.rating[1] < 10) {
            params.set('vote_average.lte', filters.rating[1].toString());
        } else {
            params.delete('vote_average.lte');
        }

        params.delete('page');

        router.push(`/${type}?${params.toString()}`);
        onApply?.();
    };

    const isFiltersChanged = () => {
        const currentGenres = (
            searchParams.get('with_genres')?.split(',') ?? []
        ).filter(Boolean);
        const currentSort = searchParams.get('sort') ?? 'popularity.desc';

        const currentMinRating = searchParams.get('vote_average.gte');
        const currentMaxRating = searchParams.get('vote_average.lte');
        const currentRatingRange: [number, number] = [
            currentMinRating ? parseFloat(currentMinRating) : 0,
            currentMaxRating ? parseFloat(currentMaxRating) : 10,
        ];

        const genresChanged =
            filters.genres.length !== currentGenres.length ||
            filters.genres.some((g) => !currentGenres.includes(g));

        const sortChanged = filters.sort !== currentSort;
        const ratingChanged =
            filters.rating[0] !== currentRatingRange[0] ||
            filters.rating[1] !== currentRatingRange[1];

        return genresChanged || sortChanged || ratingChanged;
    };

    return {
        filters,
        handleGenreChange,
        handleSortChange,
        handleRatingChange,
        applyFilters,
        isFiltersChanged: isFiltersChanged(),
    };
};
