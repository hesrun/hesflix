import getMediaDetail from '@/app/lib/api/MediaDetail';
import CreditsListLoading from '@/components/creditsList/CreditsListLoading';
import CreditsListServer from '@/components/creditsList/CreditsListServer';
import FilmDetail from '@/components/filmDetail/FilmDetail';
import BackLink from '@/components/UI/BackLink';
import Title from '@/components/UI/Title';
import VideosGridSkeleton from '@/components/videos/VideosGridSkeleton';
import VideosServer from '@/components/videos/VideosServer';
import { Movie } from '@/types/movie';
import { TV } from '@/types/tv';
import { Metadata } from 'next';
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
    const { id, type } = await params;
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
            <BackLink label="Back" />
            <FilmDetail data={mediaData} type={type} />
            <Title type="h2" className="mb-6">
                Credits
            </Title>
            <Suspense fallback={<CreditsListLoading />}>
                <CreditsListServer type={type} id={id} />
            </Suspense>
            <Title type="h2" className="mb-6">
                Trailers
            </Title>
            <Suspense fallback={<VideosGridSkeleton />}>
                <VideosServer type={type} id={id} />
            </Suspense>
        </>
    );
}
