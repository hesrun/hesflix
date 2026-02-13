import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
export function FilmCardSkeleton() {
    return (
        <div>
            <div className="aspect-[2/3]">
                <SkeletonTheme
                    baseColor="#111"
                    highlightColor="rgba(255,255,255,.05)"
                >
                    <Skeleton className="w-full h-full" borderRadius={8} />
                </SkeletonTheme>
            </div>
        </div>
    );
}
export function FilmsGridSkeleton() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array(10)
                .fill('')
                .map((_, index) => (
                    <FilmCardSkeleton />
                ))}
        </div>
    );
}
