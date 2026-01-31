import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function SeasonsSkeleton() {
    return (
        <SkeletonTheme baseColor="#111" highlightColor="rgba(255,255,255,.05)">
            <div className="aspect-[3/1.5] overflow-hidden rounded-lg mb-8 md:aspect-[3/1]">
                <Skeleton className="w-full h-full" borderRadius={8} />
            </div>
            <div className="space-y-3">
                {Array(5)
                    .fill('')
                    .map((_, index) => (
                        <SkeletonTheme
                            key={index}
                            baseColor="#111"
                            highlightColor="rgba(255,255,255,.05)"
                        >
                            <div
                                key={index}
                                className="flex gap-4 md:gap-6 rounded-lg border border-white/10 items-center"
                            >
                                <div className="relative w-[100px] aspect-[3/4] flex-shrink-0 md:w-[150px]">
                                    <Skeleton
                                        className="w-full h-full"
                                        borderRadius={4}
                                    />
                                </div>
                                <div className="flex-1 leading-0 flex flex-col gap-2">
                                    <Skeleton width="150px" height={20} />
                                    <Skeleton width="50%" height={12} />
                                    <Skeleton width="50px" height={12} />
                                </div>
                            </div>
                        </SkeletonTheme>
                    ))}
            </div>
        </SkeletonTheme>
    );
}
