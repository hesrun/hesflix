import FilmCaruselLoading from '@/components/filmCarusel/FilmCaruselLoading';
import FilmCaruselServer from '@/components/filmCarusel/FilmCaruselServer';
import Button from '@/components/UI/Button';
import Title from '@/components/UI/Title';
import { Suspense } from 'react';

export default function Home() {
    return (
        <>
            <Button variant="filled" size="sm" className="mb-8" disabled>
                Get Started
            </Button>
            <Button variant="outline" size="sm" className="mb-8" isLoading>
                Get Started
            </Button>
            <Button variant="filled" size="sm" className="mb-8">
                Get Started
            </Button>
            <Button variant="outline" size="sm" className="mb-8">
                Get Started
            </Button>
            <Button variant="filled" size="md" className="mb-8">
                Get Started
            </Button>
            <Button variant="outline" size="md" className="mb-8">
                Get Started
            </Button>

            <Button variant="filled" size="lg" className="mb-8">
                Get Started
            </Button>
            <Button variant="outline" size="lg" className="mb-8">
                Get Started
            </Button>
            <div className="container mx-auto">
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
            </div>
        </>
    );
}
