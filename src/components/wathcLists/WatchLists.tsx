import { WatchListDocument } from '@/types/watchLists';
import { LucidePencil, LucidePlus, LucideTrash2 } from 'lucide-react';
import { useWatchListFilmsStore } from '@/store/watchListFilmsStore';
import Link from 'next/link';
import WatchListSkeleton from './WatchListSkeleton';

interface WatchListsProps {
    isLoading: boolean;
    lists: WatchListDocument[];
    onDelete: (rowId: string) => void;
    onEdit: (item: WatchListDocument) => void;
    onAdd: () => void;
}

export default function WatchLists({
    isLoading,
    lists,
    onDelete,
    onEdit,
    onAdd,
}: WatchListsProps) {
    const { getFilmCount } = useWatchListFilmsStore();
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {isLoading && (
                <>
                    {Array(6)
                        .fill('')
                        .map((_, index) => (
                            <WatchListSkeleton key={index} />
                        ))}
                </>
            )}
            {!isLoading && (
                <>
                    {lists.map((item) => (
                        <Link
                            key={item.$id}
                            href={`/watch-lists/${item.$id}`}
                            className="block bg-gray-900 border border-gray-800 p-4 rounded-xl space-y-2 lg:min-h-24 hover:border-amber-500 transition-colors"
                        >
                            <div className="flex items-center">
                                <h3 className="text-amber-500 font-semibold text-xl md:text-2xl">
                                    {item.name}
                                </h3>
                                <div className="flex items-center gap-1 ml-auto">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            onEdit(item);
                                        }}
                                        title="edit watchlist"
                                        className="p-1.5 hover:bg-white/10 rounded transition-colors cursor-pointer"
                                    >
                                        <LucidePencil width={14} height={14} />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            onDelete(item.$id);
                                        }}
                                        title="remove watchlist"
                                        className="p-1.5 hover:bg-white/10 rounded transition-colors cursor-pointer text-red-500"
                                    >
                                        <LucideTrash2 width={14} height={14} />
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-500 leading-none text-sm">
                                {item.description}
                            </p>
                            <p className="text-amber-500/80 text-sm font-medium">
                                {getFilmCount(item.$id)} film
                                {getFilmCount(item.$id) !== 1 ? 's' : ''}
                            </p>
                        </Link>
                    ))}
                    <button
                        onClick={onAdd}
                        className="bg-gray-900 border border-gray-800 p-4 rounded-xl flex items-center justify-center gap-4 text-gray-500 cursor-pointer hover:text-amber-500 hover:border-amber-500 transition-colors min-h-24"
                    >
                        <LucidePlus className="w-8 h-8" />
                        <span className="text-md md:text-2xl font-semibold">
                            Create watch list
                        </span>
                    </button>
                </>
            )}
        </div>
    );
}
