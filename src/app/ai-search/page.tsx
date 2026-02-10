'use client';
import FilmCard from '@/components/filmGrid/FilmCard';
import Button from '@/components/UI/Button';
import Title from '@/components/UI/Title';
import { LucideWandSparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
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

const PLACEHOLDER_EXAMPLES = [
    'фильмы про космос с хорошим рейтингом',
    'movies like Inception',
    'filmy s Leonardem DiCapriem',
    'сериалы типа Игра престолов',
    'show me action movies from 2020',
    'nejlepší thriller filmy',
    'фильмы с Джейсоном Стэйтемом',
    'TV shows similar to Breaking Bad',
    'komedie z 90. let',
    'драмы от Кристофера Нолана',
    'sci-fi movies with high ratings',
    'české filmy o historii',
    'что-то похожее на Начало',
    'horror films from 2010s',
    'romantické filmy s dobrým hodnocením',
];

export default function AiSearch() {
    const [query, setQuery] = useState<string>('');
    const [currentQuery, setCurrentQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [response, setResponse] = useState<AISearchResponse | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [placeholder, setPlaceholder] = useState<string>('');
    const [placeholderIndex, setPlaceholderIndex] = useState<number>(0);
    const [rateLimitError, setRateLimitError] = useState<boolean>(false);

    // Анимация печати для placeholder
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        const currentText = PLACEHOLDER_EXAMPLES[placeholderIndex];
        let charIndex = 0;

        const type = () => {
            if (charIndex <= currentText.length) {
                setPlaceholder(currentText.slice(0, charIndex));
                charIndex++;
                timeout = setTimeout(type, 50); // Быстрая печать
            } else {
                // Пауза 3 секунды, затем переход к следующему
                timeout = setTimeout(() => {
                    setPlaceholder('');
                    setPlaceholderIndex(
                        (prev) => (prev + 1) % PLACEHOLDER_EXAMPLES.length,
                    );
                }, 3000);
            }
        };

        type();

        return () => clearTimeout(timeout);
    }, [placeholderIndex]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
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
                setQuery('');
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
                    className="w-full px-4 py-2 bg-transparent outline-none text-2xl italic text-amber-500"
                    type="text"
                    placeholder={placeholder}
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

            {loading && (
                <div className="text-center py-12">
                    <p className="text-lg opacity-70">Ищем...</p>
                </div>
            )}

            {response && response.results && response.results.length > 0 && (
                <>
                    <div className="mb-6 text-xl font-bold">
                        <span className="text-white/50">You ask:</span>{' '}
                        <i className="text-amber-500">"{currentQuery}"</i>
                    </div>
                    <div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {response.results.map((item, index) => (
                                <FilmCard
                                    key={`${item.id}-${index}`}
                                    data={{
                                        movieId: item.id,
                                        title:
                                            item.title ||
                                            item.name ||
                                            'Unknown',
                                        posterPath: item.poster_path || null,
                                        mediaType:
                                            (item.media_type as
                                                | 'movie'
                                                | 'tv') ||
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
                    </div>
                </>
            )}

            {rateLimitError && (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6 text-center">
                    <div className="text-2xl mb-2">⏳</div>
                    <p className="text-lg font-semibold mb-2">
                        AI поиск временно недоступен
                    </p>
                    <p className="text-sm opacity-70 mb-4">
                        Достигнут лимит токенов (100,000 в день)
                    </p>
                </div>
            )}

            {response && response.results && response.results.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-lg opacity-70">
                        Ничего не найдено. Попробуйте другой запрос.
                    </p>
                </div>
            )}
        </div>
    );
}
