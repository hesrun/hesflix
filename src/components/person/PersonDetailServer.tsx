import getPerson from '@/app/lib/api/Persons';
import Title from '../UI/Title';
import JsonDisp from '@/app/helpers/JsonDisp';
import Image from 'next/image';
import decodeHtmlEntities from '@/app/utils/DecodeHtmlEntities';
import LineTitle from '../UI/LineTitle';

export default async function PersonDetailServer({
    params,
}: {
    params: { id: string };
}) {
    const person = await getPerson(Number(params.id));

    return (
        <>
            <JsonDisp data={person} />

            <div className="flex gap-8">
                <div className="w-[300px]">
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
