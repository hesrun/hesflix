import { Movie, TV } from '@/types/types';
import { LucideFilm } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import CircleProgress from '../UI/CircleProgress';

interface PropsParams {
    type: 'movie' | 'tv';
    data: TV | Movie;
}
export default function FilmCaruselCard({ type, data }: PropsParams) {
    const title = type === 'movie' ? (data as Movie).title : (data as TV).name;
    const date =
        type === 'movie'
            ? (data as Movie).release_date
            : (data as TV).first_air_date;
    const path = type === 'movie' ? 'movie' : 'tv';
    return (
        <Link href={`${path}/${data.id}`} key={data.id} className="group">
            <div className="overflow-hidden relative">
                {data.poster_path ? (
                    <Image
                        src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
                        alt=""
                        width={300}
                        height={400}
                        className="group-hover:scale-110 transition-all"
                    />
                ) : (
                    <div className="uppercase aspect-[1/1.5] flex justify-center items-center flex-col gap-2 bg-amber-500 font-medium">
                        <LucideFilm size={32} />
                        no photo
                    </div>
                )}
                <div className="absolute top-2 right-2">
                    <CircleProgress vote={data.vote_average} />
                </div>
            </div>
            <div className="py-4 flex gap-4 items-baseline">
                <h2 className="font-bold leading-normal grow-1 group-hover:text-amber-500 transition-colors">
                    {title}
                </h2>
                <span className="opacity-70 text-sm">
                    {date && date.split('-')[0]}
                </span>
            </div>
        </Link>
    );
}
