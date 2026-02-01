import FilmCaruselLoading from '@/components/filmCarusel/FilmCaruselLoading';
import FilmCaruselServer from '@/components/filmCarusel/FilmCaruselServer';
import Title from '@/components/UI/Title';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'HesFlix - Discover Movies and TV Shows',
    description:
        'Discover and explore thousands of movies and TV shows. Browse popular content, trending titles, and create your personal watchlist.',
    openGraph: {
        title: 'HessFlix - Discover Movies and TV Shows',
        type: 'website',
        description:
            'Discover and explore thousands of movies and TV shows. Browse popular content, trending titles, and create your personal watchlist.',
        url: process.env.NEXT_PUBLIC_BASE_URL,
        siteName: 'HessFlix',
    },
};

export default function Home() {
    return (
        <>
            <Title type="h2" className="mb-4">
                Popular Films
            </Title>
            <Suspense fallback={<FilmCaruselLoading />}>
                <FilmCaruselServer type="movie" />
            </Suspense>
            <Title type="h2" className="mt-4 mb-4">
                Popular Serials
            </Title>
            <Suspense fallback={<FilmCaruselLoading />}>
                <FilmCaruselServer type="tv" />
            </Suspense>
        </>
    );
}
