import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Textarea from '../UI/Textarea';
import { useWatchListsStore } from '@/store/watchListsStore';
import { useAuth } from '@/contexts/AuthContext';

interface CreateList {
    name: string;
    description: string;
}

export default function CreateWatchListForm() {
    const { isLoading, addList } = useWatchListsStore();
    const { user } = useAuth();

    const { register, handleSubmit } = useForm<CreateList>();
    const onSubmit: SubmitHandler<CreateList> = (data) => {
        if (user?.$id) {
            addList(user?.$id, data);
        }
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
                    <Button type="submit">Save</Button>
                    <Button variant="outline" type="button">
                        Cancle
                    </Button>
                </div>
            </form>
        </>
    );
}
