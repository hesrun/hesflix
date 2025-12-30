import getMediaDetail from '@/app/lib/api/MediaDetail';
import CreditsListLoading from '@/components/CreditsList/CreditsListLoading';
import CreditsListServer from '@/components/CreditsList/CreditsListServer';
import FilmDetail from '@/components/filmDetail/FilmDetail';
import Title from '@/components/UI/Title';
import Link from 'next/link';
import { Suspense } from 'react';

interface MediaDetailProps {
    params: {
        id: number;
        type: 'movie' | 'tv';
    };
}

export default async function MoviePage({ params }: MediaDetailProps) {
    const { id, type } = await params;
    const mediaData = await getMediaDetail(type, id);
    return (
        <>
            <Link
                className="mb-8 inline-block hover:text-amber-500"
                href={`/${type}`}
            >
                Go Back
            </Link>
            <FilmDetail data={mediaData} type={type} />
            <Title type="h2">Credits</Title>
            <Suspense fallback={<CreditsListLoading />}>
                <CreditsListServer type={type} id={id} />
            </Suspense>
        </>
    );
}
