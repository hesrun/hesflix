import PersonDetailServer from '@/components/person/PersonDetailServer';
import Title from '@/components/UI/Title';
import { Suspense } from 'react';

export default function PersonDetails({ params }: { params: { id: string } }) {
    return (
        <>
            <Suspense
                fallback={<Title type="h1">Loading Person Details...</Title>}
            >
                <PersonDetailServer params={params} />
            </Suspense>
        </>
    );
}
