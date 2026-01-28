'use client';
import { useUIStore } from '@/store/UIStore';
import { Genre } from '@/types/common';
import { LucideCheck, LucideX } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Slider from 'rc-slider';
import { useEffect, useState } from 'react';

interface FiltersClientProips {
    data: Genre[];
    type: 'movie' | 'tv';
}

const sortList = [
    {
        name: 'Popularity',
        query: 'popularity.desc',
    },
    {
        name: 'Rating',
        query: 'vote_average.desc',
    },
    {
        name: 'Release Date',
        query: 'primary_release_date.desc',
    },
];

interface Filters {
    genres: string[];
    sort: string;
    rating: [number, number];
}

export default function FiltersClient({ data, type }: FiltersClientProips) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const filtersIsOpen = useUIStore((state) => state.filtersIsOpen);
    const toggleFilters = useUIStore((state) => state.toggleFilters);

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

    const applyFilters = () => {
        toggleFilters();
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

    return (
        <>
            {filtersIsOpen && (
                <div
                    onClick={toggleFilters}
                    className="fixed inset-0 bg-black/50 z-50 md:hidden"
                />
            )}
            <div
                className={`fixed -translate-x-full z-50 inset-y-0 left-0 w-[280px] md:w-[250px] md:shrink-0 md:self-start ${filtersIsOpen ? 'translate-x-0' : ''} transition-transform md:relative md:translate-x-0 md:transition-none md:z-0`}
            >
                <div className="bg-gradient-to-l from-amber-700 to-amber-300 p-px h-full overflow-y-auto md:overflow-visible">
                    <div className="bg-gradient-to-l from-amber-700 to-amber-300 text-black px-4 py-2 font-semibold text-lg flex justify-between items-center">
                        Sorting
                        <button
                            onClick={toggleFilters}
                            aria-label="close filters"
                            className="md:hidden"
                        >
                            <LucideX />
                        </button>
                    </div>
                    <div className="p-4 flex flex-col gap-2 bg-black">
                        {sortList.map((item) => (
                            <label
                                htmlFor={item.query}
                                key={item.query}
                                className="flex items-center gap-2 cursor-pointer hover:text-amber-500"
                            >
                                <input
                                    onChange={handleSortChange}
                                    type="radio"
                                    name="sorting"
                                    id={item.query}
                                    checked={filters.sort === item.query}
                                    className="sr-only peer"
                                />
                                <div className="w-4 h-4 border border-amber-500 rounded-full flex items-center justify-center">
                                    <div
                                        className={`w-2 h-2 bg-amber-500 rounded-full opacity-0 ${
                                            filters.sort === item.query &&
                                            'opacity-100'
                                        }`}
                                    ></div>
                                </div>
                                <span className="text-sm">{item.name}</span>
                            </label>
                        ))}
                    </div>
                    <div className="bg-gradient-to-l from-amber-700 to-amber-300 text-black px-4 py-2 font-semibold text-lg">
                        Rating
                    </div>
                    <div className="bg-black p-4">
                        <div className="mb-2 flex justify-between text-sm items-center font-medium">
                            <span className="bg-amber-500 text-black leading-none px-2 py-[2px] rounded-sm">
                                {filters.rating[0].toFixed(0)}
                            </span>
                            <span className="bg-amber-500 text-black leading-none px-2 py-[2px] rounded-sm">
                                {filters.rating[1].toFixed(0)}
                            </span>
                        </div>
                        <Slider
                            range
                            min={0}
                            max={10}
                            step={0.5}
                            value={filters.rating}
                            onChange={(value) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    rating: value as [number, number],
                                }))
                            }
                        />
                    </div>
                    <div className="bg-gradient-to-l from-amber-700 to-amber-300 text-black px-4 py-2 font-semibold text-lg">
                        Genres
                    </div>
                    <div className="bg-black">
                        {data.map((item) => (
                            <label
                                htmlFor={String(item.id)}
                                key={item.id}
                                className="px-4 py-2 flex cursor-pointer justify-between items-center has-checked:bg-white/10 has-checked:text-amber-500 group not-last:border-b border-white/10 hover:text-amber-500"
                            >
                                <input
                                    onChange={handleGenreChange}
                                    type="checkbox"
                                    name="genres"
                                    id={String(item.id)}
                                    checked={filters.genres.includes(
                                        String(item.id),
                                    )}
                                    className="sr-only peer"
                                />

                                <span className="text-sm leading-6">
                                    {item.name}
                                </span>
                                <LucideCheck
                                    strokeWidth={1}
                                    width={20}
                                    className="hidden peer-checked:block"
                                />
                            </label>
                        ))}
                    </div>
                    <button
                        disabled={!isFiltersChanged()}
                        onClick={applyFilters}
                        className="bg-amber-500 text-black w-full py-3 font-bold sticky bottom-0 cursor-pointer disabled:hidden disabled:pointer-events-none"
                    >
                        Aplly
                    </button>
                </div>
            </div>
        </>
    );
}
