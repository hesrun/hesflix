import getPeoples from '@/app/lib/api/Peoples';
import PeoplesGrid from './PeoplesGrid';
import Pagination from '../UI/Pagination';
import { log } from 'console';

interface PeoplesPageProps {
    searchParams: {
        page?: string;
    };
}

export default async function PeoplesServer({
    searchParams,
}: PeoplesPageProps) {
    const page = Number(searchParams.page) || 1;
    const data = await getPeoples(page);

    log(data);

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
