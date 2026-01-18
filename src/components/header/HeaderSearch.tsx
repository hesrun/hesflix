'use client';
import getSearchResult from '@/lib/api/TMDB/Search';
import { SearchResponse } from '@/types/Search';
import {
    LucideCroissant,
    LucideList,
    LucideLoaderCircle,
    LucideSearch,
    LucideX,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function HeaderSearch() {
    const [isOpen, setIsOpen] = useState(false);
    const [results, setResults] = useState<SearchResponse | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const heandleSearchToggle = () => {
        setIsOpen(!isOpen);
    };
    const heandleClearSearch = (e: React.MouseEvent) => {
        setSearchTerm('');
        setDebouncedTerm('');
        setResults(null);
    };
    const handleCloseSearch = () => {
        setIsOpen(false);
        setSearchTerm('');
        setDebouncedTerm('');
        setResults(null);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        if (debouncedTerm.length === 0) {
            setResults(null);
            return;
        }
        async function fetchData() {
            setLoading(true);
            setResults(null);
            try {
                const response = await getSearchResult(debouncedTerm);
                setResults(response);
            } catch (error) {
                console.error('Error fetching search results:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [debouncedTerm]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                handleCloseSearch();
            }
        };

        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="flex items-center grow justify-end" ref={searchRef}>
            {isOpen && (
                <div
                    className={`absolute left-4 z-10 right-12 md:relative md:left-0 md:right-0 transition-all duration-300 grow max-w-[800px] `}
                >
                    <input
                        value={searchTerm}
                        type="text"
                        name=""
                        id=""
                        placeholder="Search Film, TV, Peoples"
                        className="px-4 h-10 pr-10 w-full bg-gray-900 focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-transparent"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSearchTerm(e.target.value)
                        }
                    />
                    {loading ? (
                        <LucideLoaderCircle className="text-amber-500 absolute right-4 top-1/2 transform -translate-y-1/2 animate-spin" />
                    ) : (
                        searchTerm.length > 0 && (
                            <button
                                className="absolute right-4 top-1/2 -translate-y-1/2 uppercase text-xs text-amber-500 hover:text-amber-700 font-semibold cursor-pointer"
                                onClick={heandleClearSearch}
                            >
                                clear
                            </button>
                        )
                    )}
                    {results && results.results.length > 0 && (
                        <div className="absolute bg-black top-full left-0 w-full mt-4 border border-amber-500 z-10 p-4 pr-2">
                            <div className="max-h-80 overflow-y-auto scroll-vertical space-y-2 pr-2">
                                {results.results.map((item) => {
                                    const href =
                                        'media_type' in item
                                            ? item.media_type === 'person'
                                                ? `/peoples/${item.id}`
                                                : `/${item.media_type}/${item.id}`
                                            : `/movie/${item.id}`;

                                    return (
                                        <Link
                                            onClick={handleCloseSearch}
                                            href={href}
                                            key={item.id}
                                            className="flex items-center gap-2 justify-between bg-white/5 rounded-md p-2 border-amber-500 hover:bg-amber-500 hover:text-black transition"
                                        >
                                            <span className="font-bold text-sm">
                                                {'title' in item
                                                    ? item.title
                                                    : 'name' in item
                                                      ? item.name
                                                      : 'Unknown'}
                                            </span>
                                            <span className="uppercase font-semibold text-xs opacity-50">
                                                {'media_type' in item
                                                    ? `${item.media_type}`
                                                    : ''}
                                            </span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    {!loading &&
                        results?.results.length === 0 &&
                        debouncedTerm.length > 0 && (
                            <div className="absolute bg-black top-full left-0 w-full mt-4 border border-amber-500 z-10 p-4 pr-2">
                                <div className="flex items-center gap-2 text-amber-500 justify-center">
                                    <LucideList />
                                    <span className="font-semibold">
                                        No results found
                                    </span>
                                </div>
                            </div>
                        )}
                </div>
            )}
            <button
                onClick={heandleSearchToggle}
                type="button"
                className="ml-2 h-10 cursor-pointer text-amber-500 hover:text-amber-700"
                aria-label="search"
            >
                {isOpen ? <LucideX /> : <LucideSearch />}
            </button>
        </div>
    );
}
