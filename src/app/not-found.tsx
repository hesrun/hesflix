import Link from 'next/link';
import Title from '@/components/UI/Title';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center py-16">
            <Title type="h1" className="mb-4">
                404
            </Title>
            <p className="text-gray-400 mt-4 text-center">
                Sorry, we couldn&apos;t find what you&apos;re looking for.
            </p>
            <Link
                href="/"
                className="mt-8 px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded font-semibold transition-colors"
            >
                Go Home
            </Link>
        </div>
    );
}
