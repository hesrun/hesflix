import { Credit } from '@/types/credits';
import CreditsListCard from './CreditsListCard';

export default function CreditsList({ data }: { data: Credit[] }) {
    return (
        <>
            <div className="flex overflow-x-auto gap-4 mb-6 scroll pb-4">
                {data.map((credit) => (
                    <CreditsListCard key={credit.id} data={credit} />
                ))}
            </div>
        </>
    );
}
