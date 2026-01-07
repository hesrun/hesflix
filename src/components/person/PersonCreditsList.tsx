'use client';

import { PersonCredit } from '@/types/personCredits';
import Image from 'next/image';
import Link from 'next/link';

interface PersonCreditsClientProps {
    credits: PersonCredit[];
}

export default function PersonCreditsList({
    credits,
}: PersonCreditsClientProps) {
    if (credits.length === 0) {
        return null;
    }
    return (
        <div className="space-y-3">
            {credits.map((credit, index) => {
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
                        className="group border border-white/10 flex gap-6 hover:bg-white/5 transition-colors duration-300"
                    >
                        <div className="relative w-24 aspect-[3/4] flex-shrink-0 overflow-hidden">
                            <Image
                                src={
                                    credit.poster_path
                                        ? `https://image.tmdb.org/t/p/w342${credit.poster_path}`
                                        : '/no-image.webp'
                                }
                                alt={title || 'Unknown'}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                            <p className="text-white/80 text-sm font-semibold">
                                {year || 'Unknown year'}
                            </p>
                            <h4 className="font-semibold line-clamp-2 text-amber-500">
                                {title}
                            </h4>

                            {credit.character && (
                                <p className="text-white/80 text-xs mt-1">
                                    as {credit.character}
                                </p>
                            )}
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
