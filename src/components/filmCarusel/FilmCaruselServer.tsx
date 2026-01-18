import FilmCaruselClient from './FilmCaruselClient';
import getMediaList from '@/lib/api/TMDB/MediaList';

export default async function FilmCaruselServer({
    type,
}: {
    type: 'movie' | 'tv';
}) {
    const { results } =
        type === 'movie'
            ? await getMediaList('movie')
            : await getMediaList('tv');

    return (
        <>
            <FilmCaruselClient type={type} data={results} />
        </>
    );
}
