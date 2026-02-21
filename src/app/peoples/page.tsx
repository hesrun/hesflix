import PeoplesGridSkeleton from '@/components/peoples/PeoplesGridSkeleton';
import PeoplesServer from '@/components/peoples/PeoplesServer';
import Title from '@/components/UI/Title';
import { Metadata } from 'next';
import { Suspense } from 'react';

interface PeoplesPageProps {
    searchParams: {
        page?: string;
    };
}

export const metadata: Metadata = {
    title: 'Peoples',
    description: 'Browse popular actors and actresses from movies and TV shows',
    openGraph: {
        title: 'Peoples',
        type: 'website',
        description:
            'Browse popular actors and actresses from movies and TV shows',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/peoples`,
        siteName: 'HesFlix',
    },
};

export default function Peoples({ searchParams }: PeoplesPageProps) {
    return (
        <>
            <Title type="h1" className="mb-4">
                Peoples Page
            </Title>
            <Suspense fallback={<PeoplesGridSkeleton />}>
                <PeoplesServer searchParams={searchParams} />
            </Suspense>
        </>
    );
}
