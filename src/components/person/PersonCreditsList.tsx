'use client';

import { PersonCredit } from '@/types/personCredits';
import Image from 'next/image';
import Link from 'next/link';
import NoPoster from '../UI/Caps/NoPoster';

interface PersonCreditsClientProps {
    credits: PersonCredit[];
}

export default function PersonCreditsList({
    credits,
}: PersonCreditsClientProps) {
    if (credits.length === 0) {
        return null;
    }

    const sortedCredits = [...credits].sort((a, b) => {
        const yearA = parseInt(
            a.media_type === 'movie'
                ? a.release_date?.substring(0, 4) || '0'
                : a.first_air_date?.substring(0, 4) || '0',
        );
        const yearB = parseInt(
            b.media_type === 'movie'
                ? b.release_date?.substring(0, 4) || '0'
                : b.first_air_date?.substring(0, 4) || '0',
        );
        return yearB - yearA;
    });

    return (
        <div className="space-y-3">
            {sortedCredits.map((credit, index) => {
                const title =
                    credit.media_type === 'movie' ? credit.title : credit.name;
                const year =
                    credit.media_type === 'movie'
                        ? credit.release_date?.substring(0, 4)
                        : credit.first_air_date?.substring(0, 4);

                return (
                    <Link
                        key={`${credit.id}-${credit.media_type}-${index}`}
                        href={`/${credit.media_type}/${credit.id}`}
                        className="group border border-white/10 flex hover:bg-white/5 transition-colors duration-300 rounded-md overflow-hidden"
                    >
                        <div className="relative w-24 flex-shrink-0 overflow-hidden">
                            {credit.poster_path ? (
                                <Image
                                    width={300}
                                    height={400}
                                    src={`https://image.tmdb.org/t/p/w342${credit.poster_path}`}
                                    alt={title || 'Unknown'}
                                    className="w-full"
                                />
                            ) : (
                                <NoPoster />
                            )}
                        </div>
                        <div className="flex-1 flex flex-col-reverse justify-center px-4 py-2 md:flex-row md:justify-between md:items-center md:px-8">
                            <div>
                                <h4 className="font-semibold line-clamp-2 text-amber-500 md:text-2xl">
                                    {title}
                                </h4>
                                {credit.character && (
                                    <p className="text-white/80 text-xs mt-1">
                                        as {credit.character}
                                    </p>
                                )}
                            </div>
                            <p className="text-sm font-semibold bg-white/10 text-white px-3 py-1 rounded-md w-fit mb-2 md:text-xl md:mb-0">
                                {year || '----'}
                            </p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
