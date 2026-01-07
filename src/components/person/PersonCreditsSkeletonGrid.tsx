import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function PersonCreditsSkeletonGrid() {
    return (
        <div className="space-y-3">
            {Array(10)
                .fill('')
                .map((_, index) => (
                    <SkeletonTheme
                        baseColor="#111"
                        highlightColor="rgba(255,255,255,.05)"
                    >
                        <div
                            key={index}
                            className="flex gap-6 rounded-lg border border-white/10 items-center"
                        >
                            <div className="relative w-24 aspect-[3/4] flex-shrink-0">
                                <Skeleton
                                    className="w-full h-full"
                                    borderRadius={4}
                                />
                            </div>
                            <div className="flex-1 ">
                                <Skeleton width="50px" height={12} />
                                <Skeleton width="50%" height={20} />
                                <Skeleton width="50px" height={12} />
                            </div>
                        </div>
                    </SkeletonTheme>
                ))}
        </div>
    );
}
