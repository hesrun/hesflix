import CreditsList from './CreditsList';
import getMediaCredits from '@/lib/api/TMDB/MediaCredits';

interface CreditsListServer {
    id: number;
    type: 'movie' | 'tv';
}

export default async function CreditsListServer({
    id,
    type,
}: CreditsListServer) {
    const { cast: mediaCredits } = await getMediaCredits(type, id);
    return (
        <>
            <CreditsList data={mediaCredits} />
        </>
    );
}
