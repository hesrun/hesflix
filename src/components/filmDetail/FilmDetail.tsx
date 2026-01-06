import { Movie } from '@/types/movie';
import { TV } from '@/types/tv';
import Image from 'next/image';
import CircleProgress from '../UI/CircleProgress';
import LineTitle from '../UI/LineTitle';
import decodeHtmlEntities from '@/app/utils/DecodeHtmlEntities';
import Title from '../UI/Title';

interface mediaDetailProps {
    data: Movie | TV;
    type: 'movie' | 'tv';
}

export default function FilmDetail({ data, type }: mediaDetailProps) {
    const media = {
        title: type === 'movie' ? (data as Movie).title : (data as TV).name,
        date:
            type === 'movie'
                ? (data as Movie).release_date
                : (data as TV).first_air_date,
        tagline: type === 'tv' ? (data as TV).tagline : undefined,
        seasons: type === 'tv' ? (data as TV).seasons : null,
    };
    return (
        <>
            <div className="flex gap-12 mb-12">
                <div className="shrink-0">
                    <Image
                        src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
                        width={400}
                        height={500}
                        alt={media.title}
                    />
                </div>
                <div className="flex flex-col gap-6">
                    <div>
                        <div className="flex items-baseline gap-4">
                            <Title type="h1">{media.title}</Title>
                            <span className="text-white/50 text-3xl">{`(${
                                media.date.split('-')[0]
                            })`}</span>
                        </div>
                        {media.tagline && (
                            <div className="flex gap-1 text-xl text-gray-600">
                                <span>❝</span>
                                <span className="font-semibold">
                                    {media.tagline}
                                </span>
                                <span>❞</span>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-4  my-4">
                        <CircleProgress vote={data.vote_average} size="large" />
                        <div className="uppercase flex text-sm gap-2">
                            <span className="text-amber-500 font-bold">
                                {data.vote_count}
                            </span>
                            <span>votes</span>
                        </div>
                    </div>
                    <div>
                        <LineTitle type="h3">Overview</LineTitle>
                        <div>{decodeHtmlEntities(data.overview)}</div>
                    </div>
                    {data.genres?.length && (
                        <div>
                            <LineTitle type="h3">Genres</LineTitle>
                            <ul className="flex flex-wrap gap-2 mt-4">
                                {data.genres.map((item) => (
                                    <li
                                        key={item.id}
                                        className="bg-amber-500 px-4 py-1 rounded-4xl text-black text-sm font-medium"
                                    >
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            {media.seasons && (
                <div>
                    <Title type="h2">Seasons List</Title>
                    <div className="flex overflow-auto gap-4 scroll pb-4 mb-8">
                        {media.seasons.map((item) => (
                            <div
                                key={item.id}
                                className="w-[180px] shrink-0 bg-white/10 rounded-xl overflow-hidden flex flex-col"
                            >
                                <div className="aspect-[2/3] relative">
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="py-2 px-4 mt-auto">
                                    <span className="font-medium">
                                        {item.name}
                                    </span>
                                    <div className="flex justify-between">
                                        <div className="text-gray-500 text-sm font-medium">
                                            {item.episode_count} Episodes
                                        </div>
                                        <span className="text-sm text-amber-500">
                                            {item.air_date &&
                                                item.air_date.split('-')[0]}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
