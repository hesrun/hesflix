import CreditsList from './CreditsList';
import { tmdb } from '@/lib/api/TMDB';

interface CreditsListServer {
    id: number;
    type: 'movie' | 'tv';
}

export default async function CreditsListServer({
    id,
    type,
}: CreditsListServer) {
    const { cast: mediaCredits } = await tmdb.media.getCredits(type, id);
    return (
        <>
            <CreditsList data={mediaCredits} />
        </>
    );
}
