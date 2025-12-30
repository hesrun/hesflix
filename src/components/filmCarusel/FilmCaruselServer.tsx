import FilmCaruselClient from './FilmCaruselClient';
import getMediaList from '@/app/lib/api/MediaList';

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
