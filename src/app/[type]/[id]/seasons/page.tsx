import BackLink from '@/components/UI/BackLink';
import NoPoster from '@/components/UI/Caps/NoPoster';
import CircleProgress from '@/components/UI/CircleProgress';
import Title from '@/components/UI/Title';
import JsonDisp from '@/helpers/JsonDisp';
import { tmdb } from '@/lib/api/TMDB';
import { TV } from '@/types/tv';
import { Circle, LucideStar } from 'lucide-react';
import Image from 'next/image';
import { redirect } from 'next/navigation';

interface SeasonsPageProps {
    params: {
        id: number;
        type: 'movie' | 'tv';
    };
}

export default async function SeasonsPage({ params }: SeasonsPageProps) {
    const { id, type } = await params;
    if (type !== 'tv') {
        redirect(`/${type}/${id}`);
    }
    const tv = (await tmdb.media.getDetail(type, id)) as TV;

    return (
        <div>
            <BackLink href={`/${type}/${id}`} className="mb-3 inline-block" />
            <div className="relative aspect-[3/1.5] -mx-4 overflow-hidden rounded-lg mb-8 sm:mx-0 md:aspect-[3/1]">
                <Image
                    src={`https://image.tmdb.org/t/p/original/${tv.backdrop_path}`}
                    alt={tv.name}
                    width={1920}
                    height={1080}
                    className="w-full h-auto object-cover object-center"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 p-4 gap-4">
                    <h1 className="text-amber-500 font-semibold text-2xl md:text-4xl xl:text-5xl">
                        {tv.name}
                    </h1>
                    <p className="text-center text-sm md:text-2xl md:max-w-3/4">
                        {tv.overview}
                    </p>
                </div>
            </div>
            <Title type="h2" className="mb-6">
                Seasons List
            </Title>
            <div className="space-y-4">
                {tv.seasons?.map((item) => (
                    <div
                        key={item.id}
                        className="grid grid-cols-[100px_1fr] gap-4 items-start md:grid-cols-[150px_1fr] md:items-center md:gap-8 border border-white/10 rounded-md hover:border-amber-500/30 hover:bg-white/5 transition-colors"
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
                        <div className="grid gap-2 xl:gap-4 py-2 pr-2">
                            <h2 className="text-amber-500 font-semibold text-xl xl:text-2xl">
                                {item.name}
                                {item.air_date && (
                                    <span className="text-white/70 ml-2 font-normal">
                                        {item.air_date.split('-')[0]}
                                    </span>
                                )}
                            </h2>
                            <div className="text-sm text-white/70 xl:text-base">
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
