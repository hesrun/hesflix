'use client';

import Link from 'next/link';
import Title from '@/components/UI/Title';
import Button from '@/components/UI/Button';

export default function CollectionError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
            <Title type="h1" className="mb-4">
                Something went wrong
            </Title>
            <p className="mb-8 text-lg text-gray-400">
                Unable to load this collection. Please try again.
            </p>
            <div className="flex gap-4">
                <Button onClick={reset}>Try again</Button>
                <Link
                    href="/collections"
                    className="rounded-lg bg-gray-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-600"
                >
                    Back to Collections
                </Link>
            </div>
        </div>
    );
}
