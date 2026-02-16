'use client';

import Title from '@/components/UI/Title';
import CreateWatchListForm from '@/components/wathcLists/CreateWatchListForm';
import WatchLists from '@/components/wathcLists/WatchLists';
import listsEnabled from '@/constants/featureflags';
import { useAuth } from '@/contexts/AuthContext';
import { useWatchListsStore } from '@/store/watchListsStore';
import { WatchListDocument } from '@/types/watchLists';
import { useEffect, useState } from 'react';

export default function WatchListsPage() {
    if (!listsEnabled) {
        return;
    }
    const { user } = useAuth();
    const {
        isLoading,
        addList,
        watchlists,
        loadLists,
        removeWatchList,
        editWatchList,
    } = useWatchListsStore();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [editingItem, setEditingItem] = useState<WatchListDocument | null>(
        null,
    );

    const handleCreate = () => {
        setEditingItem(null);
        setIsOpen(true);
    };

    const handleEdit = (item: WatchListDocument) => {
        setEditingItem(item);
        setIsOpen(true);
    };

    const handleClose = () => {
        setEditingItem(null);
        setIsOpen(false);
    };

    useEffect(() => {
        if (user?.$id) loadLists(user?.$id);
    }, [user]);

    return (
        <div className="space-y-6">
            <Title>Watch Lists</Title>
            <WatchLists
                isLoading={isLoading}
                lists={watchlists}
                onDelete={removeWatchList}
                onEdit={handleEdit}
                onAdd={handleCreate}
            />
            {isOpen && (
                <CreateWatchListForm
                    initialItem={editingItem}
                    onAddList={addList}
                    onClose={handleClose}
                    onEdit={editWatchList}
                />
            )}
        </div>
    );
}
