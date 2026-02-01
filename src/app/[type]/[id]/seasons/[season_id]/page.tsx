import EpisodesServer from '@/components/episodes/EpisodesServer';
import EpisodesSkeleton from '@/components/episodes/EpisodesSkeleton';
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
        season_id: number;
    };
}

export async function generateMetadata({
    params,
}: SeasonsPageProps): Promise<Metadata> {
    const { id, type, season_id } = await params;

    if (type !== 'tv') {
        return {
            title: 'Episodes - HessFlix',
        };
    }

    const [tvShow, seasonData] = await Promise.all([
        tmdb.media.getDetail(type, id),
        tmdb.seasons.getSeason(id, season_id),
    ]);

    const tv = tvShow as TV;
    const metaTitle = `${tv.name} - ${seasonData.name}`;
    const metaDescription =
        seasonData.overview ||
        `Watch all episodes of ${seasonData.name} from ${tv.name}`;
    const metaImage = seasonData.poster_path
        ? `https://image.tmdb.org/t/p/w500${seasonData.poster_path}`
        : tv.poster_path
          ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
          : undefined;
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/tv/${id}/seasons/${season_id}`;

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
    const { id, type, season_id } = await params;
    if (type !== 'tv') {
        redirect(`/${type}/${id}`);
    }

    return (
        <>
            <BackLink
                href={`/${type}/${id}/seasons`}
                label="Back to Seasons Page"
            ></BackLink>
            <Suspense fallback={<EpisodesSkeleton />}>
                <EpisodesServer id={id} season_id={season_id} />
            </Suspense>
        </>
    );
}
