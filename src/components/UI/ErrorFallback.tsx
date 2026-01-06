'use client';

import Title from './Title';

interface ErrorFallbackProps {
    error: Error;
    reset: () => void;
    title?: string;
}

export default function ErrorFallback({
    error,
    reset,
    title = 'Something went wrong',
}: ErrorFallbackProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16">
            <Title type="h1" className="mb-4">
                {title}
            </Title>
            <p className="text-gray-400 mt-4 text-center max-w-md">
                {error.message ||
                    'An unexpected error occurred. Please try again.'}
            </p>
            <button
                onClick={reset}
                className="mt-8 px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded font-semibold transition-colors"
            >
                Try Again
            </button>
        </div>
    );
}
