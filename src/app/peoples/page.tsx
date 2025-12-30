import PeoplesGridSkeleton from '@/components/peoples/PeoplesGridSkeleton';
import PeoplesServer from '@/components/peoples/PeoplesServer';
import Title from '@/components/UI/Title';
import { Suspense } from 'react';

interface PeoplesPageProps {
    searchParams: {
        page?: string;
    };
}

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
