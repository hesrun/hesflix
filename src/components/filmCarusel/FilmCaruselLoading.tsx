import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function FilmCaruselLoading() {
    return (
        <div className="flex -mx-2 overflow-hidden">
            {Array(6)
                .fill('')
                .map((_, index) => (
                    <div
                        className="w-60 md:w-1/3 lg:w-1/4 xl:w-1/6 shrink-0 px-2"
                        key={index}
                    >
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
