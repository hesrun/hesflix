import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function FilmGridLoading() {
    return (
        <div className="grow grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-4 md:gap-x-4 md:gap-y-12">
            {Array(8)
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
