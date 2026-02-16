import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function WatchListSkeleton() {
    return (
        <SkeletonTheme
            baseColor="rgba(255,255,255,.1)"
            highlightColor="rgba(255,255,255,.05)"
        >
            <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl space-y-2 lg:min-h-24 hover:border-amber-500 transition-colors">
                <Skeleton width="50%" height={14} borderRadius={8} />
                <Skeleton
                    width="75%"
                    className="md:mt-4"
                    height={8}
                    borderRadius={8}
                />
            </div>
        </SkeletonTheme>
    );
}
