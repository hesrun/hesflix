import { Movie } from '@/types/movie';
import { TV } from '@/types/tv';
import Image from 'next/image';
import CircleProgress from '../UI/CircleProgress';
import LineTitle from '../UI/LineTitle';
import decodeHtmlEntities from '@/utils/DecodeHtmlEntities';
import Title from '../UI/Title';
import Link from 'next/link';
import NoPoster from '../UI/Caps/NoPoster';
import FavoriteButton from '../favorites/FavoriteButton';

interface mediaDetailProps {
    data: Movie | TV;
    type: 'movie' | 'tv';
}

export default function FilmDetailClient({ data, type }: mediaDetailProps) {
    const media = {
        title: type === 'movie' ? (data as Movie).title : (data as TV).name,
        date:
            type === 'movie'
                ? (data as Movie).release_date
                : (data as TV).first_air_date,
        tagline: type === 'tv' ? (data as TV).tagline : undefined,
        seasons: type === 'tv' ? (data as TV).seasons : null,
    };
    const favoriteData = {
        movieId: data.id,
        title: media.title,
        posterPath: data.poster_path,
        mediaType: type,
        rating: data.vote_average,
        releaseDate: media.date,
    };
    return (
        <>
            <div className="flex flex-col gap-4 mb-8 md:grid md:grid-rows-[auto_1fr] md:grid-cols-12 md:gap-x-8">
                <div className="flex items-baseline gap-4 justify-between gap-2 md:col-start-5 md:col-end-13 md:row-start-1">
                    <div>
                        <Title type="h1">{media.title}</Title>
                        <span className="text-white/50 text-xl md:text-2xl">{`(${
                            media.date.split('-')[0]
                        })`}</span>
                    </div>
                    <div>
                        <FavoriteButton {...favoriteData} />
                    </div>
                </div>
                <div className="shrink-0 rounded-lg overflow-hidden md:col-start-1 md:col-end-5 md:row-start-1 md:row-end-3">
                    {data.poster_path ? (
                        <div className="bg-white/10 rounded-lg">
                            <Image
                                className="w-full rounded-lg"
                                src={`https://image.tmdb.org/t/p/w780/${data.poster_path}`}
                                width={400}
                                height={600}
                                alt={media.title}
                            />
                        </div>
                    ) : (
                        <NoPoster />
                    )}
                </div>
                <div className="flex flex-col gap-6 md:col-start-5 md:col-end-13 md:row-start-2">
                    {media.tagline && (
                        <div className="flex gap-1 text-xl text-gray-600">
                            <span>❝</span>
                            <span className="font-semibold">
                                {media.tagline}
                            </span>
                            <span>❞</span>
                        </div>
                    )}
                    {data.vote_average > 0 && (
                        <div className="flex items-center gap-4  my-4">
                            <CircleProgress
                                vote={data.vote_average}
                                size="large"
                            />
                            <div className="uppercase flex text-sm gap-2">
                                <span className="text-amber-500 font-bold">
                                    {data.vote_count}
                                </span>
                                <span>votes</span>
                            </div>
                        </div>
                    )}

                    <div>
                        <LineTitle type="h3">Overview</LineTitle>
                        <div>{decodeHtmlEntities(data.overview)}</div>
                    </div>
                    {data.genres?.length && (
                        <div>
                            <LineTitle type="h3">Genres</LineTitle>
                            <ul className="flex flex-wrap gap-2 mt-4">
                                {data.genres.map((item) => (
                                    <li key={item.id}>
                                        <Link
                                            href={`/${type}?with_genres=${item.id}`}
                                            className="text-amber-500 border border-amber-500 px-4 py-1 rounded-4xl text-sm font-medium hover:bg-amber-500 hover:text-black transition-colors"
                                        >
                                            {item.name}
                                        </Link>
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
