import { getCollectionBySlug } from '@/constants/collections';
import CollectionGridServer from '@/components/collections/CollectionGridServer';
import CollectionGridSkeleton from '@/components/collections/CollectionGridSkeleton';
import BackLink from '@/components/UI/BackLink';
import Title from '@/components/UI/Title';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface CollectionPageProps {
    params: {
        slug: string;
    };
    searchParams: {
        page?: string;
    };
}

export async function generateMetadata({
    params,
}: CollectionPageProps): Promise<Metadata> {
    const { slug } = await params;
    const collection = getCollectionBySlug(slug);

    if (!collection) {
        return {
            title: 'Collection Not Found - HessFlix',
        };
    }

    return {
        title: `${collection.title} - HessFlix`,
        description: collection.description,
    };
}

export default async function CollectionPage({
    params,
    searchParams,
}: CollectionPageProps) {
    const { slug } = await params;
    const { page } = await searchParams;
    const currentPage = page ? parseInt(page) : 1;

    const collection = getCollectionBySlug(slug);

    if (!collection) {
        notFound();
    }

    return (
        <>
            <BackLink label="Back to Collections" href="/collections" />
            <Title type="h1" className="mb-4">
                {collection.title}
            </Title>
            <Suspense key={currentPage} fallback={<CollectionGridSkeleton />}>
                <CollectionGridServer
                    collection={collection}
                    page={currentPage}
                />
            </Suspense>
        </>
    );
}
