'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCommentsStore } from '@/store/commentsStore';
import Button from '@/components/UI/Button';

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
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write a reply..."
                rows={3}
                maxLength={1000}
                autoFocus
                className="w-full px-4 py-2.5 rounded-md bg-neutral-900 border border-gray-700 
                         text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 
                         focus:ring-amber-500/60 focus:border-amber-500
                         hover:border-amber-500/50 transition-colors resize-none text-sm"
            />
            <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                    {content.length}/1000
                </span>
                <div className="flex gap-2">
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
                    <Button
                        type="submit"
                        disabled={!content.trim() || isSubmitting}
                        isLoading={isSubmitting}
                        size="sm"
                    >
                        Reply
                    </Button>
                </div>
            </div>
        </form>
    );
}
