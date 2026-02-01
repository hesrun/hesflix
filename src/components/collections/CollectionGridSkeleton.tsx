import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function CollectionGridSkeleton() {
    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array(20)
                .fill('')
                .map((_, index) => (
                    <div key={index}>
                        <div className="aspect-[2/3]">
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
