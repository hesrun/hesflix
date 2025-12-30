import FilmCaruselLoading from '@/components/filmCarusel/FilmCaruselLoading';
import FilmCaruselServer from '@/components/filmCarusel/FilmCaruselServer';
import { Suspense } from 'react';

export default function Home() {
    return (
        <>
            <div className="container mx-auto">
                <h2 className="text-2xl font-bold mb-4">Popular Films</h2>
                <Suspense fallback={<FilmCaruselLoading />}>
                    <FilmCaruselServer type="movie" />
                </Suspense>
                <h2 className="text-2xl font-bold mt-8 mb-4">
                    Popular Serials
                </h2>
                <Suspense fallback={<FilmCaruselLoading />}>
                    <FilmCaruselServer type="tv" />
                </Suspense>
            </div>
        </>
    );
}
