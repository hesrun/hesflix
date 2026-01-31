import { tmdb } from '@/lib/api/TMDB';
import Title from '../UI/Title';
import EpisodesList from './EpisodesList';

interface EpisodesServerProps {
    id: number;
    season_id: number;
}

export default async function EpisodesServer({
    id,
    season_id,
}: EpisodesServerProps) {
    const data = await tmdb.seasons.getSeason(id, season_id);
    return (
        <>
            <Title type="h2" className="mb-6 mt-4">
                {data.name} Episodes
            </Title>
            <EpisodesList data={data.episodes} />
        </>
    );
}
