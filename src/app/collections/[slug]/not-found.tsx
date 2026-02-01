'use client';

import Link from 'next/link';
import Title from '@/components/UI/Title';

export default function CollectionNotFound() {
    return (
        <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
            <Title type="h1" className="mb-4">
                Collection Not Found
            </Title>
            <p className="mb-8 text-lg text-gray-400">
                The collection you're looking for doesn't exist or has been
                removed.
            </p>
            <Link
                href="/collections"
                className="rounded-lg bg-amber-500 px-6 py-3 font-semibold text-black transition-colors hover:bg-amber-400"
            >
                Browse All Collections
            </Link>
        </div>
    );
}
