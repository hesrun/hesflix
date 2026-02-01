import SeasonsServer from '@/components/seasons/SeasonsServer';
import SeasonsSkeleton from '@/components/seasons/SeasonsSkeleton';
import BackLink from '@/components/UI/BackLink';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { tmdb } from '@/lib/api/TMDB';
import { Metadata } from 'next';
import { TV } from '@/types/tv';

interface SeasonsPageProps {
    params: {
        id: number;
        type: 'movie' | 'tv';
    };
}

export async function generateMetadata({
    params,
}: SeasonsPageProps): Promise<Metadata> {
    const { id, type } = await params;

    if (type !== 'tv') {
        return {
            title: 'Seasons - HessFlix',
        };
    }

    const data = await tmdb.media.getDetail(type, id);
    const tvShow = data as TV;
    const metaTitle = `${tvShow.name} - Seasons`;
    const metaDescription = `Browse all seasons of ${tvShow.name}`;
    const metaImage = tvShow.poster_path
        ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`
        : undefined;
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/tv/${id}/seasons`;

    return {
        title: metaTitle,
        description: metaDescription,
        openGraph: {
            title: metaTitle,
            type: 'video.tv_show',
            description: metaDescription,
            url: url,
            images: metaImage ? [{ url: metaImage }] : [],
            siteName: 'HessFlix',
        },
    };
}

export default async function SeasonsPage({ params }: SeasonsPageProps) {
    const { id, type } = await params;
    if (type !== 'tv') {
        redirect(`/${type}/${id}`);
    }

    return (
        <>
            <BackLink
                href={`/tv/${id}`}
                className="mb-3 inline-block"
                label="Back to Details"
            />
            <Suspense fallback={<SeasonsSkeleton />}>
                <SeasonsServer id={id} type={type} />
            </Suspense>
        </>
    );
}
