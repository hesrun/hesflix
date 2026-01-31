import { EpisodItem } from '@/types/episodes';
import EpisodesCard from './EpisodesCard';

interface EpisodesListProps {
    data: EpisodItem[];
}
export default function EpisodesList({ data }: EpisodesListProps) {
    return (
        <div className="space-y-8">
            {data.map((episode) => (
                <EpisodesCard key={episode.id} data={episode} />
            ))}
        </div>
    );
}
