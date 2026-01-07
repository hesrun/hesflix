import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
export default function VideosGridSkeleton() {
    return (
        <div className="flex overflow-x-hidden gap-4 mb-6">
            {Array(6)
                .fill('')
                .map((_, index) => (
                    <div className="shrink-0 w-[400px]" key={index}>
                        <div className="aspect-video">
                            <SkeletonTheme
                                baseColor="#111"
                                highlightColor="rgba(255,255,255,.05)"
                            >
                                <Skeleton
                                    className="w-full h-full"
                                    borderRadius={8}
                                />
                            </SkeletonTheme>
                        </div>
                    </div>
                ))}
        </div>
    );
}
