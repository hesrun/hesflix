import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function EpisodesSkeleton() {
    return (
        <SkeletonTheme baseColor="#111" highlightColor="rgba(255,255,255,.05)">
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
                                className="rounded-lg border border-white/10 md:flex md:items-center"
                            >
                                <div className="relative aspect-[16/9] flex-shrink-0 md:w-84">
                                    <Skeleton
                                        className="w-full h-full"
                                        borderRadius={4}
                                    />
                                </div>
                                <div className="flex-1 leading-0 flex flex-col gap-2 p-4">
                                    <Skeleton width="150px" height={20} />
                                    <Skeleton width="80%" height={12} />
                                    <Skeleton width="70%" height={12} />
                                    <Skeleton width="60%" height={12} />
                                    <Skeleton width="50px" height={12} />
                                </div>
                            </div>
                        </SkeletonTheme>
                    ))}
            </div>
        </SkeletonTheme>
    );
}
