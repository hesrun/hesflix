import FilmCard from './FilmCard';
import { LucideFilm } from 'lucide-react';
import { tmdb } from '@/lib/api/TMDB';
import Pagination from '../UI/Pagination';
import { Movie } from '@/types/movie';
import { TV } from '@/types/tv';

interface PropsParams {
    type: 'movie' | 'tv';
    params: {
        page?: string;
        sort?: string;
        with_genres?: string;
    };
}

export default async function FilmGrid({ type, params }: PropsParams) {
    const page = Number(params.page) || 1;
    const sort = (params.sort as string) || 'popularity.desc';
    const genres = (params.with_genres as string) || '';

    const { results, total_pages } = await tmdb.media.getList(
        type,
        page,
        sort,
        genres,
    );

    return (
        <>
            {results.length > 0 ? (
                <div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-4 md:gap-x-4 md:gap-y-12 ">
                        {results.map((item) => {
                            const filmCardProps = {
                                mediaType: type,
                                movieId: item.id,
                                title:
                                    type === 'movie'
                                        ? (item as Movie).title
                                        : (item as TV).name,
                                posterPath: item.poster_path,
                                rating: item.vote_average,
                                releaseDate:
                                    type === 'movie'
                                        ? (item as Movie).release_date
                                        : (item as TV).first_air_date,
                            };

                            return (
                                <FilmCard key={item.id} data={filmCardProps} />
                            );
                        })}
                    </div>
                    <Pagination
                        type={type}
                        currentPage={page}
                        totalPages={total_pages}
                    />
                </div>
            ) : (
                <div className="flex grow h-80 justify-center text-black">
                    <div className="bg-amber-500/70 p-12 rounded-4xl m-auto gap-4 flex flex-col gap-4 justify-center items-center">
                        <LucideFilm size={32} />
                        <div className="uppercase font-bold">No items</div>
                    </div>
                </div>
            )}
        </>
    );
}
