'use client';
import getSearchResult from '@/app/lib/api/Search';
import { SearchResponse } from '@/types/Search';
import { LucideLoaderCircle, LucideSearch } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HeaderSearch() {
    const [results, setResults] = useState<SearchResponse | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState('');
    const [loading, setLoading] = useState(false);

    const heandleClearSearch = (e: React.MouseEvent) => {
        setSearchTerm('');
        setDebouncedTerm('');
        setResults(null);
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        if (debouncedTerm.length === 0) {
            setResults(null);
            return;
        }
        async function fetchData() {
            setLoading(true);
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

    return (
        <div className="ml-auto relative w-full max-w-sm">
            <input
                value={searchTerm}
                type="text"
                name=""
                id=""
                placeholder="Search Film, TV, Peoples"
                className="px-4 py-2 pr-10 w-full border border-amber-500  rounded-full"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchTerm(e.target.value)
                }
            />
            {loading ? (
                <LucideLoaderCircle className="text-amber-500 absolute right-4 top-1/2 transform -translate-y-1/2 animate-spin" />
            ) : (
                <LucideSearch className="text-amber-500 absolute right-4 top-1/2 transform -translate-y-1/2" />
            )}
            {searchTerm.length > 0 && (
                <div className="absolute bg-black top-full left-0 w-full mt-1 max-h-80 overflow-y-auto rounded-md border border-amber-500 z-10 scroll-vertical">
                    {loading ? (
                        <div className="p-2 text-amber-500 flex items-center justify-center gap-2 py-4">
                            Loading...
                            <LucideLoaderCircle className="animate-spin" />
                        </div>
                    ) : results && results.results.length > 0 ? (
                        results.results.map((item) => {
                            const href =
                                'media_type' in item
                                    ? item.media_type === 'person'
                                        ? `/peoples/${item.id}`
                                        : `/${item.media_type}/${item.id}`
                                    : `/movie/${item.id}`;

                            return (
                                <Link
                                    onClick={heandleClearSearch}
                                    href={href}
                                    key={item.id}
                                    className="block p-2 border-b border-amber-500 last:border-0 hover:bg-amber-500 hover:text-black"
                                >
                                    {'title' in item
                                        ? item.title
                                        : 'name' in item
                                        ? item.name
                                        : 'Unknown'}{' '}
                                    {'media_type' in item
                                        ? `(${item.media_type})`
                                        : ''}
                                </Link>
                            );
                        })
                    ) : (
                        <div className="p-2 text-amber-500 text-center">
                            No results found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
