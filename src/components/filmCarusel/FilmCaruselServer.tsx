import FilmCaruselClient from './FilmCaruselClient';
import { tmdb } from '@/lib/api/TMDB';

export default async function FilmCaruselServer({
    type,
}: {
    type: 'movie' | 'tv';
}) {
    const { results } =
        type === 'movie'
            ? await tmdb.media.getList('movie')
            : await tmdb.media.getList('tv');

    return (
        <>
            <FilmCaruselClient type={type} data={results} />
        </>
    );
}
