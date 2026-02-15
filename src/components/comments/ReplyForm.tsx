'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCommentsStore } from '@/store/commentsStore';
import Button from '@/components/UI/Button';
import Textarea from '../UI/Textarea';

interface ReplyFormProps {
    movieId: string;
    mediaType: 'movie' | 'tv';
    parentId: string;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export default function ReplyForm({
    movieId,
    mediaType,
    parentId,
    onSuccess,
    onCancel,
}: ReplyFormProps) {
    const { user } = useAuth();
    const { addComment } = useCommentsStore();
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !content.trim()) return;

        setIsSubmitting(true);
        try {
            await addComment(
                user.$id,
                user.name,
                movieId,
                mediaType,
                content.trim(),
                undefined,
                parentId,
            );
            setContent('');
            onSuccess?.();
        } catch (error) {
            console.error('Failed to add reply:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!user) return null;

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
                <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write a reply..."
                    rows={4}
                    maxLength={1000}
                    autoFocus
                />
                <span className="text-xs text-gray-500 absolute right-4 bottom-4">
                    {content.length}/1000
                </span>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <Button
                        type="submit"
                        disabled={!content.trim() || isSubmitting}
                        isLoading={isSubmitting}
                        size="sm"
                    >
                        Reply
                    </Button>
                    {onCancel && (
                        <Button
                            type="button"
                            onClick={onCancel}
                            variant="ghost"
                            size="sm"
                        >
                            Cancel
                        </Button>
                    )}
                </div>
            </div>
        </form>
    );
}
