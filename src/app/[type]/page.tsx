import FilmGrid from '@/components/filmGrid/FilmGrid';
import FilmGridLoading from '@/components/filmGrid/FilmGridLoading';
import FiltersServer from '@/components/filters/FiltersServer';
import Title from '@/components/UI/Title';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import FiltersSkeleton from '@/components/filters/FiltersSkeleton';
import FiltersToggleBtn from '@/components/filters/FiltersToggleBtn';

interface MoviesPageProps {
    params: {
        type: 'movie' | 'tv';
    };
    searchParams: {
        page?: string;
        sort?: string;
        with_genres?: string;
    };
}

export async function generateMetadata({
    params,
}: MoviesPageProps): Promise<Metadata> {
    const { type } = await params;
    const isMovie = type === 'movie';
    const title = isMovie ? 'Discover Movies' : 'Discover TV Shows';
    const description = isMovie
        ? 'Discover and explore thousands of movies. Browse by genre, ratings, and popularity.'
        : 'Discover and explore thousands of TV shows. Browse by genre, ratings, and popularity.';

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'website',
        },
    };
}

export default async function MoviesPage({
    searchParams,
    params,
}: MoviesPageProps) {
    const { type } = await params;
    const paramsSearch = await searchParams;

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <Title type="h1" className="0">
                    Discover {type === 'movie' ? 'Movies' : 'Tv Shows'}
                </Title>
                <div className="md:hidden">
                    <FiltersToggleBtn />
                </div>
            </div>
            <div className="flex gap-4">
                <Suspense fallback={<FiltersSkeleton />}>
                    <FiltersServer type={type} />
                </Suspense>
                <Suspense
                    key={JSON.stringify(paramsSearch)}
                    fallback={<FilmGridLoading />}
                >
                    <FilmGrid type={type} params={paramsSearch} />
                </Suspense>
            </div>
        </>
    );
}
