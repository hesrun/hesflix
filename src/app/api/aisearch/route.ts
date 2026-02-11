import { generateText } from 'ai';
import { groq } from '@ai-sdk/groq';
import { MovieGenresMap, TVGenreMap } from '@/constants/genresMapping';
import { tmdb } from '@/lib/api/TMDB';

interface AISearchParams {
    title: string | null;
    similarTo: string | null;
    actor: string[];
    crew: string[];
    genre: number[];
    keywords: string[];
    language: string | null;
    minRating: number | null;
    maxRating: number | null;
    yearFrom: number | null;
    yearTo: number | null;
    sortBy: string;
    mediaType: 'movie' | 'tv' | 'all';
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const page = parseInt(searchParams.get('page') || '1', 10);

    if (!query) {
        return Response.json(
            { error: 'Query parameter is required' },
            { status: 400 },
        );
    }

    try {
        const movieGenres = Object.entries(MovieGenresMap)
            .map(([name, id]) => `${name}=${id}`)
            .join(', ');
        const tvGenres = Object.entries(TVGenreMap)
            .map(([name, id]) => `${name}=${id}`)
            .join(', ');

        const prompt = `Convert user query to TMDB search params JSON. Always translate names/titles to English.
        Query: "${query}"
        Rules:
        - "title": exact movie/TV name if user asks for specific title (e.g. "find Inception" → "Inception")
        - "similarTo": movie/TV name if user wants similar/like (e.g. "like Inception" → "Inception")  
        - "actor": actor names if mentioned (e.g. "with Tom Hanks" → ["Tom Hanks"])
        - "crew": director names if mentioned (e.g. "by Nolan" → ["Christopher Nolan"])
        - "genre": genre IDs - Movies: ${movieGenres}; TV: ${tvGenres}
        - "keywords": theme/topic keywords if mentioned (e.g. "about space", "time travel", "zombie", "heist" → ["space", "time travel", "zombie", "heist"])
        - "language": ISO 639-1 language code if user specifies language (e.g. "ukrainian films" → "uk", "czech movies" → "cs", "french" → "fr", "spanish" → "es", "german" → "de", "italian" → "it", "japanese" → "ja", "korean" → "ko", "english" → "en")
        - "minRating"/"maxRating": if user wants quality (e.g. "best/top" → minRating:7, "high rated" → minRating:8)
        - "yearFrom"/"yearTo": if user mentions years/decades (e.g. "from 2020" → yearFrom:2020, "2000s" → yearFrom:2000,yearTo:2009)
        - "sortBy": choose one of "popularity.desc" (for popular), "vote_average.desc" (for best/top rated), "vote_count.desc" (for most discussed) based on user query context
        - "mediaType": "movie"/"tv"/"all" based on context
        Return only JSON, no markdown:
        {"title":null,"similarTo":null,"actor":[],"crew":[],"genre":[],"keywords":[],"language":null,"minRating":null,"maxRating":null,"yearFrom":null,"yearTo":null,"sortBy":"popularity.desc","mediaType":"all"}`;

        const { text } = await generateText({
            model: groq('llama-3.3-70b-versatile'),
            prompt,
            temperature: 0.1,
        });

        // console.log('AI Response:', text);

        const params: AISearchParams = JSON.parse(text);

        if (params.similarTo) {
            if (params.mediaType === 'movie') {
                const searchResults = await tmdb.aiSearch.searchMovieByTitle(
                    params.similarTo,
                );
                const bestResult = searchResults.results.sort(
                    (a, b) => (b.vote_count || 0) - (a.vote_count || 0),
                )[0];
                if (bestResult) {
                    const similar =
                        await tmdb.aiSearch.getRecommendationsMovies(
                            bestResult.id,
                            page,
                        );
                    return Response.json({
                        results: similar.results,
                        params,
                        page: similar.page,
                        total_pages: similar.total_pages,
                        total_results: similar.total_results,
                    });
                }
            } else if (params.mediaType === 'tv') {
                const searchResults = await tmdb.aiSearch.searchTVByTitle(
                    params.similarTo,
                );
                const bestResult = searchResults.results.sort(
                    (a, b) => (b.vote_count || 0) - (a.vote_count || 0),
                )[0];
                if (bestResult) {
                    const similar = await tmdb.aiSearch.getRecommendationsTV(
                        bestResult.id,
                        page,
                    );
                    return Response.json({
                        results: similar.results,
                        params,
                        page: similar.page,
                        total_pages: similar.total_pages,
                        total_results: similar.total_results,
                    });
                }
            } else {
                const [movieSearch, tvSearch] = await Promise.all([
                    tmdb.aiSearch.searchMovieByTitle(params.similarTo),
                    tmdb.aiSearch.searchTVByTitle(params.similarTo),
                ]);

                const bestMovie = movieSearch.results.sort(
                    (a, b) => (b.vote_count || 0) - (a.vote_count || 0),
                )[0];
                if (bestMovie) {
                    const similar =
                        await tmdb.aiSearch.getRecommendationsMovies(
                            bestMovie.id,
                            page,
                        );
                    return Response.json({
                        results: similar.results,
                        params: { ...params, mediaType: 'movie' },
                        page: similar.page,
                        total_pages: similar.total_pages,
                        total_results: similar.total_results,
                    });
                }

                const bestTV = tvSearch.results.sort(
                    (a, b) => (b.vote_count || 0) - (a.vote_count || 0),
                )[0];
                if (bestTV) {
                    const similar = await tmdb.aiSearch.getRecommendationsTV(
                        bestTV.id,
                        page,
                    );
                    return Response.json({
                        results: similar.results,
                        params: { ...params, mediaType: 'tv' },
                        page: similar.page,
                        total_pages: similar.total_pages,
                        total_results: similar.total_results,
                    });
                }
            }
        }

        if (params.title) {
            if (params.mediaType === 'movie') {
                const results = await tmdb.aiSearch.searchMovieByTitle(
                    params.title,
                    page,
                );
                return Response.json({
                    results: results.results,
                    params,
                    page: results.page,
                    total_pages: results.total_pages,
                    total_results: results.total_results,
                });
            } else if (params.mediaType === 'tv') {
                const results = await tmdb.aiSearch.searchTVByTitle(
                    params.title,
                    page,
                );
                return Response.json({
                    results: results.results,
                    params,
                    page: results.page,
                    total_pages: results.total_pages,
                    total_results: results.total_results,
                });
            } else {
                // Поиск и в фильмах и в сериалах
                const [movieResults, tvResults] = await Promise.all([
                    tmdb.aiSearch.searchMovieByTitle(params.title, page),
                    tmdb.aiSearch.searchTVByTitle(params.title, page),
                ]);
                return Response.json({
                    results: [...movieResults.results, ...tvResults.results],
                    params,
                    page: page,
                    total_pages: Math.max(
                        movieResults.total_pages,
                        tvResults.total_pages,
                    ),
                    total_results:
                        movieResults.total_results + tvResults.total_results,
                });
            }
        }

        const actorIds: string[] = [];
        const crewIds: string[] = [];
        const keywordIds: string[] = [];

        if (params.actor.length > 0) {
            const ids = await Promise.all(
                params.actor.map((name) => tmdb.aiSearch.searchPerson(name)),
            );
            actorIds.push(
                ...ids.filter((id): id is number => id !== null).map(String),
            );
        }

        if (params.crew.length > 0) {
            const ids = await Promise.all(
                params.crew.map((name) => tmdb.aiSearch.searchPerson(name)),
            );
            crewIds.push(
                ...ids.filter((id): id is number => id !== null).map(String),
            );
        }

        if (params.keywords.length > 0) {
            const keywords = await Promise.all(
                params.keywords.map((keyword) => tmdb.keywords.search(keyword)),
            );
            keywords.forEach((response) => {
                if (response.results.length > 0) {
                    keywordIds.push(String(response.results[0].id));
                }
            });
        }

        const discoverParams: any = {
            page: page,
            sort_by: params.sortBy,
        };

        if (actorIds.length > 0) {
            discoverParams.with_cast = actorIds.join(',');
        }

        if (crewIds.length > 0) {
            discoverParams.with_crew = crewIds.join(',');
        }

        if (params.genre.length > 0) {
            discoverParams.with_genres = params.genre.join(',');
        }

        if (keywordIds.length > 0) {
            discoverParams.with_keywords = keywordIds.join(',');
        }

        if (params.language !== null) {
            discoverParams.with_original_language = params.language;
        }

        if (params.minRating !== null) {
            discoverParams['vote_average.gte'] = params.minRating;
        }

        if (params.maxRating !== null) {
            discoverParams['vote_average.lte'] = params.maxRating;
        }

        if (params.mediaType === 'movie' || params.mediaType === 'all') {
            if (params.yearFrom !== null) {
                discoverParams['primary_release_date.gte'] =
                    `${params.yearFrom}-01-01`;
            }
            if (params.yearTo !== null) {
                discoverParams['primary_release_date.lte'] =
                    `${params.yearTo}-12-31`;
            }
        }

        if (params.mediaType === 'tv' || params.mediaType === 'all') {
            if (params.yearFrom !== null) {
                discoverParams['first_air_date.gte'] =
                    `${params.yearFrom}-01-01`;
            }
            if (params.yearTo !== null) {
                discoverParams['first_air_date.lte'] = `${params.yearTo}-12-31`;
            }
        }

        if (params.mediaType === 'movie') {
            const results = await tmdb.aiSearch.discoverMovies(discoverParams);
            return Response.json({
                results: results.results,
                params,
                page: results.page,
                total_pages: results.total_pages,
                total_results: results.total_results,
            });
        } else if (params.mediaType === 'tv') {
            const results = await tmdb.aiSearch.discoverTV(discoverParams);
            return Response.json({
                results: results.results,
                params,
                page: results.page,
                total_pages: results.total_pages,
                total_results: results.total_results,
            });
        } else {
            const [movieResults, tvResults] = await Promise.all([
                tmdb.aiSearch.discoverMovies(discoverParams),
                tmdb.aiSearch.discoverTV(discoverParams),
            ]);
            return Response.json({
                results: [...movieResults.results, ...tvResults.results],
                params,
                page: page,
                total_pages: Math.max(
                    movieResults.total_pages,
                    tvResults.total_pages,
                ),
                total_results:
                    movieResults.total_results + tvResults.total_results,
            });
        }
    } catch (error) {
        console.error('Search API error:', error);
        return Response.json(
            {
                error: 'Failed to fetch search results',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 },
        );
    }
}
