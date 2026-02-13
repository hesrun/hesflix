'use client';
import FilmCard from '@/components/filmGrid/FilmCard';
import Button from '@/components/UI/Button';
import { FilmsGridSkeleton } from '@/components/UI/Caps/FilmsGridSkeleton';
import Title from '@/components/UI/Title';
import { LucideWandSparkles } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface SearchResult {
    id: number;
    title?: string;
    name?: string;
    poster_path?: string;
    media_type?: string;
    vote_average?: number;
    release_date?: string;
    first_air_date?: string;
}

interface AISearchResponse {
    results: SearchResult[];
    params: {
        title: string | null;
        similarTo?: string | null;
        actor: string[];
        crew: string[];
        genre: number[];
        minRating: number | null;
        maxRating: number | null;
        yearFrom: number | null;
        yearTo: number | null;
        sortBy: string;
        mediaType: string;
    };
    page: number;
    total_pages: number;
    total_results: number;
}

const PRESETS: string[] = [
    'Best Scorsese films',
    'Most popular French comedies',
    'Top rated Japanese anime series',
    'Czech dramas with high ratings',
    'Spanish movies about family released after 2015',
    'Best Korean thrillers with more than 1000 votes',
    'Popular Italian romance films from the 2000s',
    'Highly rated German documentaries',
    'Most discussed American action movies',
    'Movies similar to Fast & Furious',
];

export default function AiSearch() {
    const [query, setQuery] = useState<string>('');
    const [currentQuery, setCurrentQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [response, setResponse] = useState<AISearchResponse | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [rateLimitError, setRateLimitError] = useState<boolean>(false);

    function handlePreset(preset: string) {
        setQuery(preset);
        AISearch(preset);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        AISearch(query);
    }

    async function AISearch(query: string) {
        setLoading(true);
        setResponse(null);
        setCurrentPage(1);
        setCurrentQuery(query);
        setRateLimitError(false);

        try {
            const res = await fetch(
                `/api/aisearch?query=${encodeURIComponent(query)}&page=1`,
            );
            const data = await res.json();

            if (
                data.error &&
                (data.details?.includes('Rate limit') ||
                    data.details?.includes('tokens per day'))
            ) {
                setRateLimitError(true);
                toast.error('AI поиск временно недоступен (лимит токенов)');
            } else if (data.error) {
                toast.error(data.error);
            } else {
                setResponse(data);
            }
        } catch (err) {
            toast.error(err instanceof Error ? err.message : 'Failed to fetch');
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    }

    async function loadMore() {
        if (!response || loadingMore) return;

        setLoadingMore(true);
        const nextPage = currentPage + 1;

        try {
            const res = await fetch(
                `/api/aisearch?query=${encodeURIComponent(currentQuery)}&page=${nextPage}`,
            );
            const data = await res.json();
            setResponse((prev) => {
                if (!prev) return data;

                const existingIds = new Set(prev.results.map((r) => r.id));
                const newResults = data.results.filter(
                    (r: SearchResult) => !existingIds.has(r.id),
                );

                return {
                    ...data,
                    results: [...prev.results, ...newResults],
                };
            });
            setCurrentPage(nextPage);
        } catch (err) {
            toast.error(
                err instanceof Error ? err.message : 'Failed to load more',
            );
            console.error('Load more error:', err);
        } finally {
            setLoadingMore(false);
        }
    }

    return (
        <div className="">
            <Title type="h1" className="mb-6">
                AI Search
            </Title>
            <form
                onSubmit={handleSubmit}
                className="flex items-center border border-amber-500 rounded-md overflow-hidden p-2 mb-6"
            >
                <input
                    className="w-full text-xl px-2 md:px-4 py-2 bg-transparent outline-none md:text-2xl italic text-amber-500"
                    type="text"
                    placeholder="Type your query..."
                    value={query}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setQuery(e.target.value)
                    }
                    disabled={loading}
                />
                <Button
                    type="submit"
                    size="md"
                    isLoading={loading}
                    icon={<LucideWandSparkles />}
                >
                    Search
                </Button>
            </form>

            {!response && (
                <div className="flex flex-wrap gap-2 items-start lg:gap-4 mb-6">
                    {PRESETS.map((item) => (
                        <button
                            onClick={() => handlePreset(item)}
                            className="text-left border-1 border-gray-800 rounded-md bg-gray-900 px-4 py-2 font-medium text-amber-500 italic hover:bg-gray-800 transition-colors cursor-pointer"
                        >
                            <span>„</span>
                            {item}
                            <span>“</span>
                        </button>
                    ))}
                </div>
            )}

            {response && response.results && response.results.length > 0 && (
                <>
                    <div className="mb-6 md:text-xl font-semibold">
                        <span className="text-white/50">You ask:</span>{' '}
                        <i className="text-amber-500">"{currentQuery}"</i>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {response.results.map((item, index) => (
                            <FilmCard
                                key={`${item.id}-${index}`}
                                data={{
                                    movieId: item.id,
                                    title: item.title || item.name || 'Unknown',
                                    posterPath: item.poster_path || null,
                                    mediaType:
                                        (item.media_type as 'movie' | 'tv') ||
                                        (item.title ? 'movie' : 'tv'),
                                    rating: item.vote_average,
                                    releaseDate:
                                        item.release_date ||
                                        item.first_air_date,
                                }}
                            />
                        ))}
                    </div>
                    {currentPage < response.total_pages && (
                        <div className="flex justify-center mt-8">
                            <Button
                                onClick={loadMore}
                                size="lg"
                                isLoading={loadingMore}
                            >
                                Показать еще
                            </Button>
                        </div>
                    )}
                </>
            )}
            {loading && <FilmsGridSkeleton cols={5} count={20} />}

            {response && response.results && response.results.length === 0 && (
                <div className="bg-gray-900 border-1 border-gray-800 rounded-md text-center py-8 px-2 font-medium text-white/50 md:text-2xl italic">
                    Nothing found. Try a different query.
                </div>
            )}
            {rateLimitError && (
                <div className="bg-gray-900 border-1 border-gray-800 rounded-md text-center py-8 px-2 font-medium text-white/50 md:text-2xl italic">
                    Tokens limit (100,000 per day)
                </div>
            )}
        </div>
    );
}
