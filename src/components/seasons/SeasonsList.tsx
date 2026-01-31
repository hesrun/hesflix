import { TV } from '@/types/tv';
import SeasonsCard from './SeasonsCard';

interface SeasonsListProps {
    data: TV;
}
export default function SeasonsList({ data }: SeasonsListProps) {
    return (
        <div className="space-y-8">
            {data.seasons?.map((item) => (
                <SeasonsCard tv_id={data.id} key={item.id} data={item} />
            ))}
        </div>
    );
}
