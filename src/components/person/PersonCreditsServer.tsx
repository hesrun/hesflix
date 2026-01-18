import { tmdb } from '@/lib/api/TMDB';
import LineTitle from '../UI/LineTitle';
import PersonCreditsList from './PersonCreditsList';
import Title from '../UI/Title';

interface PersonCreditsServerProps {
    personId: number;
}

export default async function PersonCreditsServer({
    personId,
}: PersonCreditsServerProps) {
    const { cast } = await tmdb.person.getCredits(personId);
    if (cast.length === 0) {
        return null;
    }
    return <PersonCreditsList credits={cast} />;
}
