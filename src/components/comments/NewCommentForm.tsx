'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCommentsStore } from '@/store/commentsStore';
import { Star } from 'lucide-react';
import Button from '@/components/UI/Button';
import Title from '../UI/Title';
import Textarea from '../UI/Textarea';

interface NewCommentFormProps {
    movieId: string;
    mediaType: 'movie' | 'tv';
}

export default function NewCommentForm({
    movieId,
    mediaType,
}: NewCommentFormProps) {
    const { user } = useAuth();
    const { addComment } = useCommentsStore();
    const [content, setContent] = useState('');
    const [rating, setRating] = useState<number | undefined>(undefined);
    const [hoveredStar, setHoveredStar] = useState(0);
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
                rating,
            );
            setContent('');
            setRating(undefined);
        } catch (error) {
            console.error('Failed to add comment:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!user) {
        return;
    }

    return (
        <div className="mt-6">
            <Title type="h3" className="mb-4">
                Add Your Comment
            </Title>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400 font-medium">
                        Your rating:
                    </span>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoveredStar(star)}
                                onMouseLeave={() => setHoveredStar(0)}
                                className="transition-all hover:scale-110 cursor-pointer"
                                aria-label={`Rate ${star} stars`}
                            >
                                <Star
                                    size={24}
                                    className={
                                        (hoveredStar || rating || 0) >= star
                                            ? 'fill-amber-500 text-amber-500'
                                            : 'text-gray-600 hover:text-gray-500'
                                    }
                                />
                            </button>
                        ))}
                    </div>
                    {rating && (
                        <button
                            type="button"
                            onClick={() => setRating(undefined)}
                            className="text-xs text-gray-500 hover:text-amber-500 transition-colors cursor-pointer"
                        >
                            Clear
                        </button>
                    )}
                </div>

                <div>
                    <div className="relative">
                        <Textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Share your thoughts about this movie..."
                            rows={4}
                            maxLength={1000}
                        />
                        <span className="text-xs text-gray-500 absolute bottom-4 right-4">
                            {content.length}/1000
                        </span>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                        <Button
                            type="submit"
                            disabled={!content.trim() || isSubmitting}
                            isLoading={isSubmitting}
                            size="md"
                        >
                            Post Comment
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
