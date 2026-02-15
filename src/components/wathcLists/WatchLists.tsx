import { WatchListDocument } from '@/types/watchLists';
import { LucidePlus } from 'lucide-react';

interface WatchListsProps {
    lists: WatchListDocument[];
}

export default function WatchLists({ lists }: WatchListsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {lists.map((item) => (
                <div
                    key={item.$id}
                    className="bg-gray-900 border border-gray-800 p-4 rounded-xl space-y-2 lg:min-h-24 hover:border-amber-500 transition-colors"
                >
                    <div className="text-amber-500 font-semibold text-xl md:text-2xl">
                        {item.name}
                    </div>
                    <p
                        className="text-gray-500 leading-none text-sm
					"
                    >
                        {item.description}
                    </p>
                </div>
            ))}
            <button className="bg-gray-900 border border-gray-800 p-4 rounded-xl flex items-center justify-center gap-4 text-gray-500 cursor-pointer hover:text-amber-500 hover:border-amber-500 transition-colors min-h-24">
                <LucidePlus className="w-8 h-8" />
                <span className="text-md md:text-2xl font-semibold">
                    Create watch list
                </span>
            </button>
        </div>
    );
}
