'use client';

import { useEffect } from 'react';
import { useCommentsStore } from '@/store/commentsStore';
import { MessageSquare, Star } from 'lucide-react';
import Comment from './Comment';
import NewCommentForm from './NewCommentForm';
import Skeleton from 'react-loading-skeleton';

interface CommentsSectionProps {
    movieId: string;
    mediaType: 'movie' | 'tv';
    title?: string;
}

export default function CommentsSection({
    movieId,
    mediaType,
    title = 'Comments',
}: CommentsSectionProps) {
    const {
        loadComments,
        loadStats,
        stats,
        clearComments,
        subscribeToComments,
        getCommentsWithReplies,
        isLoading,
    } = useCommentsStore();

    useEffect(() => {
        loadComments(movieId, mediaType);
        loadStats(movieId, mediaType);

        // Подписываемся на real-time обновления
        subscribeToComments(movieId, mediaType);

        return () => {
            clearComments(); // Это также вызовет unsubscribeFromComments
        };
    }, [movieId, mediaType]);

    const commentsWithReplies = getCommentsWithReplies();

    return (
        <section className="space-y-8">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
                    <MessageSquare size={28} className="text-amber-500" />
                    {title}
                </h2>
                {stats && (
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="font-medium">
                            {stats.count} comments
                        </span>
                        {stats.averageRating > 0 && (
                            <span className="flex items-center gap-1.5">
                                <Star
                                    size={16}
                                    className="fill-amber-500 text-amber-500"
                                />
                                <span className="font-medium">
                                    {stats.averageRating.toFixed(1)} average
                                    rating
                                </span>
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Comments List */}
            {isLoading ? (
                <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-4">
                            <Skeleton
                                circle
                                width={40}
                                height={40}
                                baseColor="#262626"
                                highlightColor="#404040"
                            />
                            <div className="flex-1">
                                <Skeleton
                                    height={20}
                                    width={150}
                                    baseColor="#262626"
                                    highlightColor="#404040"
                                    className="mb-2"
                                />
                                <Skeleton
                                    height={60}
                                    baseColor="#262626"
                                    highlightColor="#404040"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            ) : commentsWithReplies.length === 0 ? (
                <div className="text-center py-12">
                    <MessageSquare
                        size={48}
                        className="mx-auto text-gray-600 mb-3"
                    />
                    <p className="text-gray-500 text-lg">
                        No comments yet. Be the first to share your thoughts!
                    </p>
                </div>
            ) : (
                <div className="space-y-8">
                    {commentsWithReplies.map((comment) => (
                        <Comment
                            key={comment.$id}
                            comment={comment}
                            movieId={movieId}
                            mediaType={mediaType}
                            replies={comment.replies}
                        />
                    ))}
                </div>
            )}

            {/* New Comment Form */}
            <div className="pt-8 border-t border-gray-800">
                <h3 className="text-xl font-bold text-white mb-4">
                    Add Your Comment
                </h3>
                <NewCommentForm movieId={movieId} mediaType={mediaType} />
            </div>
        </section>
    );
}
