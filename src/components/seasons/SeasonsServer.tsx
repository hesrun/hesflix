import Image from 'next/image';
import Title from '../UI/Title';
import { getMediaDetailCached } from '@/lib/api/TMDB/tmdbCache';
import { TV } from '@/types/tv';
import SeasonsList from './SeasonsList';

interface SeasonsServerProps {
    id: number;
    type: 'movie' | 'tv';
}

export default async function SeasonsServer({ id, type }: SeasonsServerProps) {
    const tv = (await getMediaDetailCached(type, id)) as TV;
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
            <SeasonsList data={tv} />
        </div>
    );
}
