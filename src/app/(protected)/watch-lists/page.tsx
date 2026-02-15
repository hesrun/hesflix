'use client';

import Title from '@/components/UI/Title';
import CreateWatchListForm from '@/components/wathcLists/CreateWatchListForm';
import WatchLists from '@/components/wathcLists/WatchLists';
import listsEnabled from '@/constants/featureflags';
import { useAuth } from '@/contexts/AuthContext';
import { useWatchListsStore } from '@/store/watchListsStore';
import { useEffect } from 'react';

export default function WatchListsPage() {
    if (!listsEnabled) {
        return;
    }
    const { user } = useAuth();
    const { watchlists, loadLists } = useWatchListsStore();

    useEffect(() => {
        if (user?.$id) loadLists(user?.$id);
    }, [user]);

    return (
        <div className="space-y-6">
            <Title>Watch Lists</Title>
            <WatchLists lists={watchlists} />
            <CreateWatchListForm />
        </div>
    );
}
