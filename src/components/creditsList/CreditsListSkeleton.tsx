import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default async function CreditsListSkeleton() {
    return (
        <div className="flex gap-4 mb-6 pb-4 overflow-hidden">
            {Array(10)
                .fill('')
                .map((_, index) => (
                    <div className="shrink-0 w-[180px]" key={index}>
                        <div className="aspect-[2/4]">
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
