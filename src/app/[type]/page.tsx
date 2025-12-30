import FilmGrid from '@/components/filmGrid/FilmGrid';
import FilmGridLoading from '@/components/filmGrid/FilmGridLoading';
import FiltersServer from '@/components/filters/FiltersServer';
import { Suspense } from 'react';

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

export default async function MoviesPage({
    searchParams,
    params,
}: MoviesPageProps) {
    const { type } = params;
    const paramsSearch = searchParams;

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">
                Discover {type === 'movie' ? 'Movies' : 'Tv Shows'}
            </h1>
            <div className="flex gap-4">
                <FiltersServer type={type} />
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
