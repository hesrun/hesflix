import getPerson from '@/lib/api/TMDB/Persons';
import Title from '../UI/Title';
import Image from 'next/image';
import decodeHtmlEntities from '@/utils/DecodeHtmlEntities';
import { formatDate, calculateAge } from '@/utils/FormatDate';
import LineTitle from '../UI/LineTitle';
import PersonCreditsServer from './PersonCreditsServer';

export default async function PersonDetailServer({
    params,
}: {
    params: { id: string };
}) {
    const personParams = await params;
    const person = await getPerson(Number(personParams.id));

    return (
        <>
            <div className="grid gap-8 grid-cols-[300px_1fr] mb-8">
                <div>
                    <Image
                        src={
                            person.profile_path
                                ? `https://image.tmdb.org/t/p/original${person.profile_path}`
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
                <div className="grow">
                    <Title type="h1" className="mb-4">
                        {person.name}
                    </Title>
                    <div className="flex space-x-8 mb-6">
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
                    <div></div>
                    <LineTitle type="h3">Biography</LineTitle>
                    <div className="whitespace-pre-line leading-relaxed">
                        {person.biography
                            ? decodeHtmlEntities(person.biography)
                            : 'No biography available.'}
                    </div>
                </div>
            </div>
        </>
    );
}
