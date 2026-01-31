import Image from 'next/image';
import NoPoster from '../UI/Caps/NoPoster';
import CircleProgress from '../UI/CircleProgress';
import Title from '../UI/Title';
import { tmdb } from '@/lib/api/TMDB';
import { TV } from '@/types/tv';

interface SeasonsServerProps {
    id: number;
    type: 'movie' | 'tv';
}

export default async function SeasonsServer({ id, type }: SeasonsServerProps) {
    const tv = (await tmdb.media.getDetail(type, id)) as TV;
    return (
        <div>
            <div className="relative -mx-4 overflow-hidden rounded-lg mb-8 sm:mx-0 ">
                <Image
                    src={`https://image.tmdb.org/t/p/original/${tv.backdrop_path}`}
                    alt={tv.name}
                    fill
                    className="w-full h-auto object-cover object-center absolute inset-0 -z-10"
                />
                <div className="min-h-64 flex flex-col items-center justify-center bg-black/70 p-4 gap-4 xl:min-h-128">
                    <h1 className="text-amber-500 font-semibold text-2xl md:text-4xl xl:text-5xl">
                        {tv.name}
                    </h1>
                    <p className="text-center text-sm md:text-xl md:max-w-3/4">
                        {tv.overview}
                    </p>
                </div>
            </div>
            <Title type="h2" className="mb-6">
                Seasons List
            </Title>
            <div className="space-y-8">
                {tv.seasons?.map((item) => (
                    <div
                        key={item.id}
                        className="grid grid-cols-[100px_1fr] gap-4 items-start md:grid-cols-[150px_1fr] md:items-center md:gap-8 md:border border-white/10 rounded-md hover:border-amber-500/30 hover:bg-white/5 transition-colors"
                    >
                        <div className="aspect-[2/3] relative overflow-hidden rounded-md">
                            {item.poster_path ? (
                                <Image
                                    src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <NoPoster />
                            )}
                        </div>
                        <div className="grid gap-2 xl:gap-4 md:py-2 pr-2">
                            <h2 className="text-amber-500 font-semibold text-xl xl:text-2xl">
                                {item.name}
                                {item.air_date && (
                                    <span className="text-white/70 ml-2 font-normal">
                                        {item.air_date.split('-')[0]}
                                    </span>
                                )}
                            </h2>
                            <div className="text-sm text-white/70">
                                <p>{item.overview}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div>
                                    <CircleProgress vote={item.vote_average} />
                                </div>
                                <div className="text-gray-500 font-medium text-sm xl:text-base">
                                    {item.episode_count} Episodes
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* {<JsonDisp data={tv} />} */}
        </div>
    );
}
