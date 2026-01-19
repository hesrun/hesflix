import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function PersonDetailSkeleton() {
    return (
        <SkeletonTheme baseColor="#111" highlightColor="rgba(255,255,255,.05)">
            <div className="grid gap-4 mb-6 md:grid-cols-12 md:grid-rows-[auto_1fr] md:gap-x-8 md:mb-8">
                <div className="md:col-span-8 xl:col-start-4">
                    <Skeleton height={40} />
                </div>
                <div className="md:col-span-4 md:col-start-1 md:row-span-2 md:row-start-1 xl:col-span-3">
                    <Skeleton className="aspect-[2/3]" />
                </div>
                <div className="md:col-span-8 flex flex-col gap-4 md:gap-8">
                    <div className="flex flex-wrap items-center gap-4 mt-4">
                        <Skeleton height={30} width="100px" />
                        <Skeleton height={30} width="100px" />
                        <Skeleton height={30} width="100px" />
                        <Skeleton height={30} width="100px" />
                    </div>
                    <div>
                        <Skeleton height={10} width="100%" />
                        <Skeleton height={10} width="100%" />
                        <Skeleton height={10} width="100%" />
                        <Skeleton height={10} width="100%" />
                        <Skeleton height={10} width="90%" />
                        <Skeleton height={10} width="80%" />
                    </div>
                </div>
            </div>
        </SkeletonTheme>
    );
}
