import { getPersonDetailCached } from '@/lib/api/TMDB/tmdbCache';
import Title from '../UI/Title';
import Image from 'next/image';
import decodeHtmlEntities from '@/utils/DecodeHtmlEntities';
import { formatDate, calculateAge } from '@/utils/FormatDate';
import LineTitle from '../UI/LineTitle';
import PersonCreditsServer from './PersonCreditsServer';
import NoProfile from '../UI/Caps/NoProfile';

export default async function PersonDetailServer({
    params,
}: {
    params: { id: string };
}) {
    const personParams = await params;
    const person = await getPersonDetailCached(Number(personParams.id));

    return (
        <>
            <div className="grid gap-4 mb-6 md:grid-cols-12 md:grid-rows-[auto_1fr] md:gap-x-8 md:mb-8">
                <Title type="h1" className="md:col-span-8 xl:col-start-4">
                    {person.name}
                </Title>
                <div className="md:col-span-4 md:col-start-1 md:row-span-2 md:row-start-1 xl:col-span-3">
                    <div className="rounded-md overflow-hidden">
                        {person.profile_path ? (
                            <Image
                                src={`https://image.tmdb.org/t/p/original${person.profile_path}`}
                                alt={person.name}
                                width={300}
                                height={450}
                                className="w-full "
                            />
                        ) : (
                            <NoProfile />
                        )}
                    </div>
                </div>
                <div className="md:col-span-8 flex flex-col gap-4 md:gap-8">
                    <div className="grid grid-cols-2 gap-2 md:flex md:gap-6">
                        <div>
                            <span className="text-white/40 text-sm">
                                Birthday:
                            </span>
                            <div className="text-amber-500 font-semibold">
                                {person.birthday
                                    ? formatDate(person.birthday)
                                    : 'Unknown'}
                                {person.birthday &&
                                    ` (Age: ${calculateAge(person.birthday)})`}
                            </div>
                        </div>
                        <div>
                            <span className="text-white/40 text-sm">
                                Place of Birth:
                            </span>
                            <div className="text-amber-500 font-semibold">
                                {person.place_of_birth
                                    ? person.place_of_birth
                                    : 'Unknown'}
                            </div>
                        </div>
                        <div>
                            <span className="text-white/40 text-sm">
                                Gender:
                            </span>
                            <div className="text-amber-500 font-semibold">
                                {person.gender === 1 ? 'Female' : 'Male'}
                            </div>
                        </div>
                    </div>
                    <div>
                        <LineTitle type="h3">Biography</LineTitle>
                        <div className="whitespace-pre-line leading-relaxed">
                            {person.biography
                                ? decodeHtmlEntities(person.biography)
                                : 'No biography available.'}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
