import getGenres from '@/lib/api/TMDB/Genres';
import FiltersClient from './FiltersClient';

export default async function FiltersServer({
    type,
}: {
    type: 'movie' | 'tv';
}) {
    const { genres } = await getGenres(type);
    return <FiltersClient type={type} data={genres} />;
}
