import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface FilmsGridSkeletonProps {
    count?: number;
    cols: number;
}

export function FilmCardSkeleton() {
    return (
        <SkeletonTheme baseColor="#111" highlightColor="rgba(255,255,255,.05)">
            <div className="border border-white/10 rounded-xl overflow-hidden">
                <div className="aspect-[2/3]">
                    <Skeleton className="w-full h-full" />
                </div>
                <div className="grid grid-cols-12 px-4 py-2">
                    <div className="col-span-6">
                        <Skeleton width="100%" height={12} borderRadius={8} />
                    </div>
                    <div className="col-start-10 col-span-3">
                        <Skeleton width="100%" height={8} borderRadius={8} />
                    </div>
                </div>
            </div>
        </SkeletonTheme>
    );
}
export function FilmsGridSkeleton({
    count = 10,
    cols = 5,
}: FilmsGridSkeletonProps) {
    const colsClass: Record<string, string> = {
        '4': 'gap-4 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        '5': 'gap-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5',
    };
    return (
        <div className={colsClass[cols]}>
            {Array(count)
                .fill('')
                .map((_, index) => (
                    <FilmCardSkeleton key={index} />
                ))}
        </div>
    );
}
