import { tmdb } from '@/lib/api/TMDB';
import PeoplesGrid from './PeoplesGrid';
import Pagination from '../UI/Pagination';
interface PeoplesPageProps {
    searchParams: {
        page?: string;
    };
}

export default async function PeoplesServer({
    searchParams,
}: PeoplesPageProps) {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const data = await tmdb.person.getPopular(page);

    return (
        <div>
            <PeoplesGrid peoples={data.results} />
            <Pagination
                type="people"
                currentPage={page}
                totalPages={data.total_pages}
            />
        </div>
    );
}
