'use client';

import ErrorFallback from '@/components/UI/ErrorFallback';

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <ErrorFallback
            error={error}
            reset={reset}
            title="Failed to load content"
        />
    );
}
