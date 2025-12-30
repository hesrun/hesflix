import CreditsListCard from './CreditsListCard';
import getMediaCredits from '@/app/lib/api/MediaCredits';

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
            <div className="flex overflow-x-auto gap-4 mb-6 scroll pb-4">
                {mediaCredits.map((credit) => (
                    <CreditsListCard key={credit.id} data={credit} />
                ))}
            </div>
        </>
    );
}
