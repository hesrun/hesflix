import Link from 'next/link';
import NoPoster from '../UI/Caps/NoPoster';
import { SeasonsItem } from '@/types/seasons';
import CircleProgress from '../UI/CircleProgress';
import Image from 'next/image';

interface SeasonsCardProps {
    tv_id: number;
    data: SeasonsItem;
}

export default function SeasonsCard({ tv_id, data }: SeasonsCardProps) {
    return (
        <Link
            href={`/tv/${tv_id}/seasons/${data.season_number}`}
            key={data.id}
            className="grid grid-cols-[100px_1fr] gap-4 items-start md:grid-cols-[150px_1fr] md:items-center md:gap-8 md:border border-white/10 rounded-md hover:bg-white/5 transition-colors"
        >
            <div className="aspect-[2/3] relative overflow-hidden rounded-md">
                {data.poster_path ? (
                    <Image
                        src={`https://image.tmdb.org/t/p/w300/${data.poster_path}`}
                        alt={data.name}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <NoPoster />
                )}
            </div>
            <div className="grid gap-2 xl:gap-4 md:py-2 pr-2">
                <h2 className="text-amber-500 font-semibold text-xl xl:text-2xl">
                    {data.name}
                    {data.air_date && (
                        <span className="text-white/70 ml-2 font-normal">
                            {data.air_date.split('-')[0]}
                        </span>
                    )}
                </h2>
                <div className="text-sm text-white/70">
                    <p>{data.overview}</p>
                </div>
                <div className="flex items-center gap-4">
                    <div>
                        <CircleProgress vote={data.vote_average} />
                    </div>
                    <div className="text-gray-500 font-medium text-sm xl:text-base">
                        {data.episode_count} Episodes
                    </div>
                </div>
            </div>
        </Link>
    );
}
