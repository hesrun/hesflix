import FilmCaruselLoading from '@/components/filmCarusel/FilmCaruselLoading';
import FilmCaruselServer from '@/components/filmCarusel/FilmCaruselServer';
import Button from '@/components/UI/Button';
import Title from '@/components/UI/Title';
import { Suspense } from 'react';

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
