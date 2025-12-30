import PeoplesGridSkeleton from '@/components/peoples/PeoplesGridSkeleton';
import PeoplesServer from '@/components/peoples/PeoplesServer';
import Title from '@/components/UI/Title';
import { Suspense } from 'react';
import JsonDisp from '../helpers/JsonDisp';

interface PeoplesPageProps {
    searchParams: {
        page?: string;
    };
}

export default function Peoples({ searchParams }: PeoplesPageProps) {
    return (
        <>
            <JsonDisp data={searchParams} />
            <Title type="h1">Peoples Page</Title>
            <Suspense fallback={<PeoplesGridSkeleton />}>
                <PeoplesServer searchParams={searchParams} />
            </Suspense>
        </>
    );
}
