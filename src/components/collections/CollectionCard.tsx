import Link from 'next/link';
import { Collection } from '@/types/collection';

interface CollectionCardProps {
    collection: Collection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
    return (
        <Link
            href={`/collections/${collection.slug}`}
            className="relative block overflow-hidden rounded-lg bg-gradient-to-br from-gray-900 to-gray-950 p-6 transition-all hover:scale-105 hover:shadow-xl"
        >
            <div className="flex flex-col gap-3">
                {collection.icon && (
                    <span className="text-4xl transition-transform group-hover:scale-110">
                        {collection.icon}
                    </span>
                )}
                <h3 className="text-xl font-bold text-amber-500">
                    {collection.title}
                </h3>
                <p className="text-sm text-gray-400">
                    {collection.description}
                </p>
                <div className="mt-2 flex items-center gap-2">
                    <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-medium text-black">
                        {collection.type === 'both'
                            ? 'Movies & TV'
                            : collection.type === 'movie'
                              ? 'Movies'
                              : 'TV Shows'}
                    </span>
                </div>
            </div>
        </Link>
    );
}
