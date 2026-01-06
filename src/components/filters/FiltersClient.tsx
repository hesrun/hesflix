'use client';
import { Genre } from '@/types/common';
import { LucideCheck } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
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

export default function FiltersClient({ data, type }: FiltersClientProips) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedSort, setSelectedSort] = useState<string>();

    useEffect(() => {
        setSelectedGenres(
            (searchParams.get('with_genres')?.split(',') ?? []).filter(Boolean)
        );
        setSelectedSort(searchParams.get('sort') ?? 'popularity.desc');
    }, [searchParams]);

    const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = e.target;
        setSelectedGenres((prev) => {
            return checked ? [...prev, id] : prev.filter((f) => f !== id);
        });
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedSort(e.target.id);
    };

    const applyFilters = () => {
        const params = new URLSearchParams(searchParams.toString());

        if (selectedGenres.length > 0) {
            params.set('with_genres', selectedGenres.join(','));
        } else {
            params.delete('with_genres');
        }

        if (selectedSort) {
            params.set('sort', selectedSort);
        } else {
            params.delete('sort');
        }

        params.delete('page');

        router.push(`/${type}?${params.toString()}`);
    };

    const isFiltersChanged = () => {
        const currentGenres = (
            searchParams.get('with_genres')?.split(',') ?? []
        ).filter(Boolean);
        const currentSort = searchParams.get('sort') ?? 'popularity.desc';

        const genresChanged =
            selectedGenres.length !== currentGenres.length ||
            selectedGenres.some((g) => !currentGenres.includes(g));

        const sortChanged = selectedSort !== currentSort;

        return genresChanged || sortChanged;
    };

    return (
        <div className="bg-gradient-to-l from-amber-700 to-amber-300 w-[250px] shrink-0 self-start p-px">
            <div className="bg-gradient-to-l from-amber-700 to-amber-300 text-black px-4 py-2 font-semibold text-lg">
                Sorting
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
                            checked={selectedSort === item.query}
                            className="sr-only peer"
                        />
                        <div className="w-4 h-4 border border-amber-500 rounded-full flex items-center justify-center">
                            <div
                                className={`w-2 h-2 bg-amber-500 rounded-full opacity-0 ${
                                    selectedSort === item.query && 'opacity-100'
                                }`}
                            ></div>
                        </div>
                        <span className="text-sm">{item.name}</span>
                    </label>
                ))}
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
                            checked={selectedGenres.includes(String(item.id))}
                            className="sr-only peer"
                        />

                        <span className="text-sm leading-6">{item.name}</span>
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
    );
}
