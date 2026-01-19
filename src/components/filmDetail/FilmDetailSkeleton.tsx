import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function FilmDetailSkeleton() {
    return (
        <SkeletonTheme baseColor="#111" highlightColor="rgba(255,255,255,.05)">
            <div className="flex flex-col gap-4 mb-8 md:grid md:grid-rows-[auto_1fr] md:grid-cols-12 md:gap-x-8">
                <div className="md:col-start-5 md:col-end-13 md:row-start-1">
                    <Skeleton height={40} />
                </div>
                <div className="shrink-0 rounded-lg overflow-hidden md:col-start-1 md:col-end-5 md:row-start-1 md:row-end-3">
                    <Skeleton className="aspect-[2/3]" />
                </div>
                <div className="flex flex-col md:col-start-5 md:col-end-13 md:row-start-2 gap-6">
                    <div className="flex items-center gap-4 mt-4">
                        <div className="rounded-full overflow-hidden">
                            <Skeleton
                                height={64}
                                width={64}
                                className="rounded-full"
                            />
                        </div>
                        <div className="grow">
                            <Skeleton height={30} width="100px" />
                        </div>
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
