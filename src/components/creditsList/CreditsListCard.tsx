import { Credit } from '@/types/credits';
import Image from 'next/image';
import Link from 'next/link';
import NoProfile from '../UI/Caps/NoProfile';

export default function CreditsListCard({ data }: { data: Credit }) {
    return (
        <Link
            href={`/peoples/${data.id}`}
            className="shrink-0 w-[180px] group"
            key={data.id}
        >
            <div className="bg-gray-900 border-1 border-gray-800 rounded-md overflow-hidden">
                <div className="overflow-hidden">
                    {data.profile_path ? (
                        <Image
                            src={`https://image.tmdb.org/t/p/w200${data.profile_path}`}
                            alt={data.name}
                            width={200}
                            height={300}
                            className={`group-hover:scale-105 transition-transform duration-300 ease-in-out aspect-[2/3] object-cover ${
                                data.profile_path
                                    ? ''
                                    : 'bg-gray-900 opacity-35'
                            }`}
                        />
                    ) : (
                        <NoProfile />
                    )}
                </div>
                <div className="px-4 py-2">
                    <h3 className="text-sm font-semibold text-amber-500">
                        {data.name}
                    </h3>
                    <p className="text-sm text-gray-500">{data.character}</p>
                </div>
            </div>
        </Link>
    );
}
