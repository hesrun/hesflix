import { tmdb } from '@/lib/api/TMDB';
import CreditsListServer from '@/components/creditsList/CreditsListServer';
import FilmDetail from '@/components/filmDetail/FilmDetailClient';
import BackLink from '@/components/UI/BackLink';
import Title from '@/components/UI/Title';
import VideosGridSkeleton from '@/components/videos/VideosGridSkeleton';
import VideosServer from '@/components/videos/VideosServer';
import CommentsSection from '@/components/comments/CommentsSection';
import { Movie } from '@/types/movie';
import { TV } from '@/types/tv';
import { Metadata } from 'next';
import { Suspense } from 'react';
import CreditsListSkeleton from '@/components/creditsList/CreditsListSkeleton';
import FilmDetailSkeleton from '@/components/filmDetail/FilmDetailSkeleton';
import FilmDetailServer from '@/components/filmDetail/FilmDetailServer';

interface MediaDetailProps {
    params: {
        id: string;
        type: 'movie' | 'tv';
    };
}

export async function generateMetadata({
    params,
}: MediaDetailProps): Promise<Metadata> {
    const { id, type } = await params;
    const data = await tmdb.media.getDetail(type, parseInt(id));
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
    return (
        <>
            <BackLink label="Back" />
            <Suspense fallback={<FilmDetailSkeleton />}>
                <FilmDetailServer id={parseInt(id)} type={type} />
            </Suspense>
            <Title type="h2" className="mb-6">
                Credits
            </Title>
            <Suspense fallback={<CreditsListSkeleton />}>
                <CreditsListServer type={type} id={parseInt(id)} />
            </Suspense>
            <Title type="h2" className="mb-6">
                Trailers
            </Title>
            <Suspense fallback={<VideosGridSkeleton />}>
                <VideosServer type={type} id={parseInt(id)} />
            </Suspense>
            <div className="mt-12">
                <CommentsSection movieId={id} mediaType={type} />
            </div>
        </>
    );
}
