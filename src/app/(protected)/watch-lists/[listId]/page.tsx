'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Title from '@/components/UI/Title';
import { FilmsGridSkeleton } from '@/components/UI/Caps/FilmsGridSkeleton';
import { useAuth } from '@/contexts/AuthContext';
import { useWatchListsStore } from '@/store/watchListsStore';
import { useWatchListFilmsStore } from '@/store/watchListFilmsStore';
import FilmCard from '@/components/filmGrid/FilmCard';
import { LucideArrowLeft } from 'lucide-react';
import listsEnabled from '@/constants/featureflags';
export default function WatchListDetailPage() {
    const { user } = useAuth();
    const params = useParams();
    const router = useRouter();
    const listId = params.listId as string;

    const { watchlists, loadLists, isLoading: listsLoading } =
        useWatchListsStore();
    const {
        getFilms,
        loadFilmsForList,
        isLoading: filmsLoading,
        getFilmCount,
    } = useWatchListFilmsStore();

    const list = watchlists.find((l) => l.$id === listId);
    const films = getFilms(listId);
    const count = getFilmCount(listId);

    useEffect(() => {
        if (!listsEnabled) {
            router.push('/');
            return;
        }
        if (user?.$id) {
            loadLists(user.$id);
        }
    }, [user, loadLists, router]);

    useEffect(() => {
        if (listId && user?.$id) {
            loadFilmsForList(listId);
        }
    }, [listId, user, loadFilmsForList]);

    if (!listsEnabled) return null;

    if (listsLoading || !list) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Link
                        href="/watch-lists"
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        aria-label="Back to watch lists"
                    >
                        <LucideArrowLeft className="w-5 h-5" />
                    </Link>
                    <Title>Loading...</Title>
                </div>
                <FilmsGridSkeleton cols={5} count={6} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <Link
                        href="/watch-lists"
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        aria-label="Back to watch lists"
                    >
                        <LucideArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <Title>{list.name}</Title>
                        {list.description && (
                            <p className="text-gray-500 mt-1">
                                {list.description}
                            </p>
                        )}
                        <p className="text-amber-500/80 text-sm font-medium mt-1">
                            {count} film{count !== 1 ? 's' : ''}
                        </p>
                    </div>
                </div>
            </div>

            {filmsLoading ? (
                <FilmsGridSkeleton cols={5} count={6} />
            ) : films.length === 0 ? (
                <div className="text-center py-16 bg-gray-900/50 rounded-xl border border-gray-800">
                    <p className="text-gray-400 text-lg mb-4">
                        No films in this list yet
                    </p>
                    <Link
                        href="/"
                        className="inline-block px-6 py-3 bg-amber-500 text-black rounded-lg hover:bg-amber-600 transition"
                    >
                        Browse Movies & TV Shows
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {films.map((item) => (
                        <FilmCard
                            key={item.$id}
                            data={{
                                ...item,
                                $id: item.$id,
                            }}
                            removeFromList={{ listId }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
