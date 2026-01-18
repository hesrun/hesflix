import { tmdb } from '@/lib/api/TMDB';
import FiltersClient from './FiltersClient';

export default async function FiltersServer({
    type,
}: {
    type: 'movie' | 'tv';
}) {
    const { genres } = await tmdb.genres.get(type);
    return <FiltersClient type={type} data={genres} />;
}
