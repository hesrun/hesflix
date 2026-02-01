import { Collection } from '@/types/collection';

export const COLLECTIONS: Collection[] = [
    {
        slug: 'trending-today',
        title: 'Trending Today',
        description: 'What everyone is watching right now',
        endpoint: '/trending/all/day',
        icon: '🔥',
        type: 'both',
    },
    {
        slug: 'trending-week',
        title: 'Trending This Week',
        description: 'Most popular content this week',
        endpoint: '/trending/all/week',
        icon: '📈',
        type: 'both',
    },
    {
        slug: 'top-rated-movies',
        title: 'Top Rated Movies',
        description: 'Highest rated films of all time',
        endpoint: '/movie/top_rated',
        icon: '⭐',
        type: 'movie',
    },
    {
        slug: 'top-rated-tv',
        title: 'Top Rated TV Shows',
        description: 'Best rated television series',
        endpoint: '/tv/top_rated',
        icon: '📺',
        type: 'tv',
    },
    {
        slug: 'popular-movies',
        title: 'Popular Movies',
        description: 'Most popular movies right now',
        endpoint: '/movie/popular',
        icon: '🎬',
        type: 'movie',
    },
    {
        slug: 'popular-tv',
        title: 'Popular TV Shows',
        description: 'Most popular TV shows right now',
        endpoint: '/tv/popular',
        icon: '🍿',
        type: 'tv',
    },
    {
        slug: 'upcoming-movies',
        title: 'Upcoming Movies',
        description: 'Coming soon to theaters',
        endpoint: '/movie/upcoming',
        icon: '🎞️',
        type: 'movie',
    },
    {
        slug: 'now-playing',
        title: 'Now Playing',
        description: 'Currently in theaters',
        endpoint: '/movie/now_playing',
        icon: '🎥',
        type: 'movie',
    },
    {
        slug: 'on-the-air',
        title: 'On The Air',
        description: 'TV shows airing today',
        endpoint: '/tv/on_the_air',
        icon: '📡',
        type: 'tv',
    },
    {
        slug: 'airing-today',
        title: 'Airing Today',
        description: 'TV episodes airing today',
        endpoint: '/tv/airing_today',
        icon: '🗓️',
        type: 'tv',
    },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
    return COLLECTIONS.find((collection) => collection.slug === slug);
}
