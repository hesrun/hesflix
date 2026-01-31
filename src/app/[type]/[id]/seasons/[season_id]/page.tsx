import EpisodesServer from '@/components/episodes/EpisodesServer';
import BackLink from '@/components/UI/BackLink';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

interface SeasonsPageProps {
    params: {
        id: number;
        type: 'movie' | 'tv';
        season_id: number;
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
                href={`/${type}/${id}`}
                label="Back to Seasons Page"
            ></BackLink>
            <Suspense fallback={<div>Loading episodes...</div>}>
                <EpisodesServer id={id} season_id={season_id} />
            </Suspense>
        </>
    );
}
