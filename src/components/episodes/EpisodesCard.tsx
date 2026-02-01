import { EpisodItem } from '@/types/episodes';
import Image from 'next/image';
import NoPoster from '../UI/Caps/NoPoster';
import { Circle } from 'lucide-react';
import CircleProgress from '../UI/CircleProgress';
import { formatDateShort } from '@/utils/FormatDate';

interface EpisodesCardProps {
    data: EpisodItem;
}

export default function EpisodesCard({ data }: EpisodesCardProps) {
    return (
        <div
            key={data.id}
            className="md:border border-white/10 md:rounded-md not-last:border-b not-last:border-b-white/10 pb-6 md:flex md:pb-0 xl:items-center"
        >
            <div className="rounded-lg overflow-hidden md:w-84 md:flex-shrink-0 md:rounded-br-none md:rounded-tr-none">
                {data.still_path ? (
                    <Image
                        src={`https://image.tmdb.org/t/p/w780/${data.still_path}`}
                        alt={data.name}
                        width={780}
                        height={439}
                        className="w-full"
                    />
                ) : (
                    <NoPoster aspect="16/9" />
                )}
            </div>
            <div className="pt-4 space-y-2 md:p-4 xl:pl-6">
                <h3 className="text-amber-500 font-semibold text-xl xl:text-2xl">
                    Episode {data.episode_number}: {data.name}
                </h3>
                <p className="text-sm">{data.overview}</p>
                <div className="text-sm text-white/70 flex items-center gap-4">
                    <CircleProgress vote={data.vote_average} />
                    <p>
                        On Air: {formatDateShort(data.air_date)} | Runtime:{' '}
                        {data.runtime} minutes
                    </p>
                </div>
            </div>
        </div>
    );
}
