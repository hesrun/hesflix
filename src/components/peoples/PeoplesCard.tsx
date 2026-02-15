import Image from 'next/image';
import Link from 'next/link';
import type { People } from '@/types/people';
import NoProfile from '../UI/Caps/NoProfile';

interface PeoplesCardProps {
    person: People;
}

export default function PeoplesCard({ person }: PeoplesCardProps) {
    return (
        <Link
            href={`/peoples/${person.id}`}
            className="cursor-pointer group bg-gray-900 border-1 border-gray-800 rounded-md overflow-hidden"
        >
            <div className="overflow-hidden">
                {person.profile_path ? (
                    <Image
                        src={
                            person.profile_path
                                ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
                                : '/no-person-available.webp'
                        }
                        alt={person.name}
                        width={300}
                        height={450}
                        className={`group-hover:scale-105 transition-transform duration-300 ease-in-out aspect-[2/3] object-cover ${
                            person.profile_path ? '' : 'bg-gray-900 opacity-35'
                        }`}
                    />
                ) : (
                    <NoProfile />
                )}
            </div>
            <div className="p-2 gap-2 xl:p-4 space-y-1">
                <h3 className="font-medium text-amber-500 text-sm xl:text-base leading-snug">
                    {person.name}
                </h3>
                <p className="text-sm opacity-50">
                    {person.known_for
                        .map((work) =>
                            work.media_type === 'movie'
                                ? work.title
                                : work.name,
                        )
                        .join(', ')}
                </p>
            </div>
        </Link>
    );
}
