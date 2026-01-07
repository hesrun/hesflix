import PersonDetailServer from '@/components/person/PersonDetailServer';
import Title from '@/components/UI/Title';
import getPerson from '@/app/lib/api/Persons';
import { Metadata } from 'next';
import { Suspense } from 'react';
import BackLink from '@/components/UI/BackLink';
import PersonCreditsServer from '@/components/person/PersonCreditsServer';
import PersonCreditsSkeletonGrid from '@/components/person/PersonCreditsSkeletonGrid';

interface PersonDetailsProps {
    params: {
        id: string;
    };
}

export async function generateMetadata({
    params,
}: PersonDetailsProps): Promise<Metadata> {
    const { id } = await params;
    const person = await getPerson(Number(id));
    const metaTitle = person.name;
    const metaDescription =
        person.biography || `${person.name} - Actor / Actress profile`;
    const metaImage = person.profile_path
        ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
        : undefined;
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/peoples/${id}`;

    const meta: Metadata = {
        title: metaTitle,
        description: metaDescription,
        openGraph: {
            title: metaTitle,
            type: 'profile',
            description: metaDescription,
            url: url,
            images: metaImage ? [{ url: metaImage }] : [],
            siteName: 'HessFlix',
        },
    };
    return meta;
}

export default async function PersonDetails({ params }: PersonDetailsProps) {
    const { id } = await params;

    return (
        <>
            <BackLink label="Back" />
            <Suspense
                fallback={<Title type="h1">Loading Person Details...</Title>}
            >
                <PersonDetailServer params={{ id }} />
            </Suspense>
            <Title type="h2" className="mb-6">
                Filmography
            </Title>
            <Suspense fallback={<PersonCreditsSkeletonGrid />}>
                <PersonCreditsServer personId={Number(id)} />
            </Suspense>
        </>
    );
}
