import FilmCard from './FilmCard';
import { LucideFilm } from 'lucide-react';
import { tmdb } from '@/lib/api/TMDB';
import Pagination from '../UI/Pagination';
import FilmGridClient from './FilmGridClient';

interface PropsParams {
    type: 'movie' | 'tv';
    params: {
        page?: string;
        sort?: string;
        with_genres?: string;
        'vote_average.gte'?: string;
        'vote_average.lte'?: string;
    };
}

export default async function FilmGridServer({ type, params }: PropsParams) {
    const page = Number(params.page) || 1;
    const sort = (params.sort as string) || 'popularity.desc';
    const genres = (params.with_genres as string) || '';
    const vote_average_gte = Number(params['vote_average.gte']) || 0;
    const vote_average_lte = Number(params['vote_average.lte']) || 10;

    console.log(params);

    const { results, total_pages } = await tmdb.media.getList(
        type,
        page,
        sort,
        genres,
        vote_average_gte,
        vote_average_lte,
    );

    return (
        <>
            {results.length > 0 ? (
                <div>
                    <FilmGridClient data={results} type={type} />
                    <Pagination
                        type={type}
                        currentPage={page}
                        totalPages={total_pages}
                    />
                </div>
            ) : (
                <div className="flex grow h-80 justify-center text-black">
                    <div className="bg-amber-500/70 p-12 rounded-4xl m-auto flex flex-col gap-4 justify-center items-center">
                        <LucideFilm size={32} />
                        <div className="uppercase font-bold">No items</div>
                    </div>
                </div>
            )}
        </>
    );
}
