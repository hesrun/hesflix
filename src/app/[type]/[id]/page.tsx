import getMediaDetail from '@/app/lib/api/MediaDetail';
import CreditsListLoading from '@/components/creditsList/CreditsListLoading';
import CreditsListServer from '@/components/creditsList/CreditsListServer';
import FilmDetail from '@/components/filmDetail/FilmDetail';
import Title from '@/components/UI/Title';
import { Movie } from '@/types/movie';
import { TV } from '@/types/tv';
import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

interface MediaDetailProps {
    params: {
        id: number;
        type: 'movie' | 'tv';
    };
}

export async function generateMetadata({
    params,
}: MediaDetailProps): Promise<Metadata> {
    const { id, type } = params;
    const data = await getMediaDetail(type, id);
    const metaTitle =
        type === 'movie' ? (data as Movie).title : (data as TV).name;
    const metaDescription = data.overview;
    const metaImage = data.poster_path
        ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
        : undefined;
    const metaType = type === 'movie' ? 'video.movie' : 'video.tv_show';
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${type}/${id}`;

    const meta: Metadata = {
        title: metaTitle,
        description: metaDescription,
        openGraph: {
            title: metaTitle,
            type: metaType,
            description: metaDescription,
            url: url,
            images: metaImage ? [{ url: metaImage }] : [],
            siteName: 'HessFlix',
        },
    };
    return meta;
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
