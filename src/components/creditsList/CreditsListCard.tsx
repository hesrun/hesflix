import { Credit } from '@/types/credits';
import Image from 'next/image';

export default function CreditsListCard({ data }: { data: Credit }) {
    return (
        <div
            className="shrink-0 w-[180px] bg-white/10 rounded-lg mb-2 overflow-hidden group"
            key={data.id}
        >
            <div className="overflow-hidden">
                <Image
                    src={
                        data.profile_path
                            ? `https://image.tmdb.org/t/p/w200${data.profile_path}`
                            : '/no-person-available.webp'
                    }
                    alt={data.name}
                    width={200}
                    height={300}
                    className={`group-hover:scale-105 transition-transform duration-300 ease-in-out aspect-[2/3] object-cover ${
                        data.profile_path ? '' : 'bg-gray-900 opacity-35'
                    }`}
                />
            </div>
            <div className="px-4 py-2">
                <h3 className="text-sm font-semibold text-amber-500">
                    {data.name}
                </h3>
                <p className="text-sm text-gray-500">{data.character}</p>
            </div>
        </div>
    );
}
