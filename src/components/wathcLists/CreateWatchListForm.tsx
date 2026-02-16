import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Textarea from '../UI/Textarea';
import { useAuth } from '@/contexts/AuthContext';
import { WatchListDocument, WatchListItem } from '@/types/watchLists';
import { useEffect } from 'react';

interface CreateListProps {
    name: string;
    description: string;
}
interface FromProps {
    initialItem: WatchListDocument | null;
    onAddList: (userId: string, item: CreateListProps) => Promise<void>;
    onClose: () => void;
    onEdit: (rowId: string, item: Omit<WatchListItem, 'userId'>) => void;
}

export default function CreateWatchListForm({
    initialItem,
    onAddList,
    onClose,
    onEdit,
}: FromProps) {
    const { user } = useAuth();
    const { register, handleSubmit, reset } = useForm<CreateListProps>();

    useEffect(() => {
        if (initialItem) {
            reset({
                name: initialItem.name,
                description: initialItem.description,
            });
        } else {
            reset({ name: '', description: '' });
        }
    }, [initialItem, reset]);

    const onSubmit: SubmitHandler<CreateListProps> = async (data) => {
        if (!user?.$id) return;
        if (initialItem) {
            await onEdit(initialItem.$id, data);
        } else {
            await onAddList(user?.$id, data);
        }
        onClose();
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-gray-900 border border-gray-800 p-4 rounded-xl space-y-4"
            >
                <Input placeholder="List name" {...register('name')} />
                <Textarea
                    placeholder="List description"
                    {...register('description')}
                    rows={6}
                />
                <div className="flex gap-4">
                    <Button type="submit">
                        {initialItem ? 'Update' : 'Save'}
                    </Button>
                    <Button onClick={onClose} variant="outline" type="button">
                        Cancle
                    </Button>
                </div>
            </form>
        </>
    );
}
