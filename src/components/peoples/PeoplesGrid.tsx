import type { People } from '@/types';
import PeoplesCard from './PeoplesCard';

interface PeoplesGridProps {
    peoples: People[];
}

export default function PeoplesGrid({ peoples }: PeoplesGridProps) {
    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {peoples.map((person) => (
                    <PeoplesCard key={person.id} person={person} />
                ))}
            </div>
        </>
    );
}
