import SeasonsServer from '@/components/seasons/SeasonsServer';
import SeasonsSkeleton from '@/components/seasons/SeasonsSkeleton';
import BackLink from '@/components/UI/BackLink';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

interface SeasonsPageProps {
    params: {
        id: number;
        type: 'movie' | 'tv';
    };
}

export default async function SeasonsPage({ params }: SeasonsPageProps) {
    const { id, type } = await params;
    if (type !== 'tv') {
        redirect(`/${type}/${id}`);
    }

    return (
        <>
            <BackLink className="mb-3 inline-block" />
            <Suspense fallback={<SeasonsSkeleton />}>
                <SeasonsServer id={id} type={type} />
            </Suspense>
        </>
    );
}
