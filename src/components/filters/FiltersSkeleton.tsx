import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function FiltersSkeleton() {
    return (
        <div className="bg-gradient-to-l from-amber-700 to-amber-300 w-[250px] shrink-0 self-start p-px">
            <div className="bg-gradient-to-l from-amber-700 to-amber-300 text-black px-4 py-2 font-semibold text-lg">
                Sorting
            </div>
            <div className="p-4 flex flex-col gap-2 bg-black leading-none">
                <SkeletonTheme
                    baseColor="#111"
                    highlightColor="rgba(255,255,255,.05)"
                >
                    {Array(3)
                        .fill('')
                        .map((_, index) => (
                            <Skeleton
                                key={index}
                                borderRadius={8}
                                height={20}
                            />
                        ))}
                </SkeletonTheme>
            </div>
            <div className="bg-gradient-to-l from-amber-700 to-amber-300 text-black px-4 py-2 font-semibold text-lg">
                Genres
            </div>
            <div className="bg-black">
                <SkeletonTheme
                    baseColor="#111"
                    highlightColor="rgba(255,255,255,.05)"
                >
                    {Array(15)
                        .fill('')
                        .map((_, index) => (
                            <div
                                className="px-4 py-3 border-b border-b-white/10 flex flex-col justify-center leading-none"
                                key={index}
                            >
                                <Skeleton borderRadius={8} />
                            </div>
                        ))}
                </SkeletonTheme>
            </div>
        </div>
    );
}
