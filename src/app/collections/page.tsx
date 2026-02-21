import { COLLECTIONS } from '@/constants/collections';
import CollectionCard from '@/components/collections/CollectionCard';
import Title from '@/components/UI/Title';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Collections - HesFlix',
    description: 'Explore curated collections of movies and TV shows',
};

export default function CollectionsPage() {
    return (
        <>
            <Title type="h1" className="mb-4">
                Collections
            </Title>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {COLLECTIONS.map((collection) => (
                    <CollectionCard
                        key={collection.slug}
                        collection={collection}
                    />
                ))}
            </div>
        </>
    );
}
