import Image from 'next/image';
import Link from 'next/link';
import type { People } from '@/types/people';

interface PeoplesCardProps {
    person: People;
}

export default function PeoplesCard({ person }: PeoplesCardProps) {
    return (
        <Link
            href={`/peoples/${person.id}`}
            className="cursor-pointer mb-2 overflow-hidden group"
        >
            <div className="overflow-hidden">
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
            </div>
            <div className="py-2">
                <h3 className="font-semibold text-amber-500">{person.name}</h3>
                <p className="text-xs text-gray-500">
                    {person.known_for
                        .map((work) =>
                            work.media_type === 'movie' ? work.title : work.name
                        )
                        .join(', ')}
                </p>
            </div>
        </Link>
    );
}
