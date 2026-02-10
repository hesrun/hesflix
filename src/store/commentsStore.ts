import { create } from 'zustand';
import { toast } from 'sonner';
import { CommentDocument, CommentWithReplies } from '@/types/comment';
import { commentsService } from '@/lib/api/appwrite/comments';
import {
    client,
    DATABASE_ID,
    COMMENTS_TABLE_ID,
} from '@/lib/api/appwrite/config';

interface CommentsState {
    comments: CommentDocument[];
    isLoading: boolean;
    stats: { count: number; averageRating: number } | null;
    unsubscribe: (() => void) | null;

    // Actions
    loadComments: (movieId: string, mediaType: 'movie' | 'tv') => Promise<void>;
    addComment: (
        userId: string,
        userName: string,
        movieId: string,
        mediaType: 'movie' | 'tv',
        content: string,
        rating?: number,
        parentId?: string,
    ) => Promise<void>;
    updateComment: (
        commentId: string,
        content: string,
        rating?: number,
    ) => Promise<void>;
    deleteComment: (commentId: string) => Promise<void>;
    loadStats: (movieId: string, mediaType: 'movie' | 'tv') => Promise<void>;
    getCommentsWithReplies: () => CommentWithReplies[];
    subscribeToComments: (movieId: string, mediaType: 'movie' | 'tv') => void;
    unsubscribeFromComments: () => void;
    clearComments: () => void;
}

export const useCommentsStore = create<CommentsState>((set, get) => ({
    comments: [],
    isLoading: false,
    stats: null,
    unsubscribe: null,

    loadComments: async (movieId: string, mediaType: 'movie' | 'tv') => {
        set({ isLoading: true });
        try {
            const comments = await commentsService.getMovieComments(
                movieId,
                mediaType,
            );
            set({ comments });
        } catch (error) {
            console.error('Error loading comments:', error);
            set({ comments: [] });
        } finally {
            set({ isLoading: false });
        }
    },

    addComment: async (
        userId: string,
        userName: string,
        movieId: string,
        mediaType: 'movie' | 'tv',
        content: string,
        rating?: number,
        parentId?: string,
    ) => {
        try {
            await commentsService.addComment({
                userId,
                userName,
                movieId,
                mediaType,
                content,
                rating,
                parentId,
            });
            toast.success('Comment added successfully');
            // Обновить статистику
            await get().loadStats(movieId, mediaType);
        } catch (error) {
            console.error('Error adding comment:', error);
            toast.error('Failed to add comment');
            throw error;
        }
    },

    updateComment: async (
        commentId: string,
        content: string,
        rating?: number,
    ) => {
        try {
            const updatedComment = await commentsService.updateComment(
                commentId,
                content,
                rating,
            );
            set((state) => ({
                comments: state.comments.map((c) =>
                    c.$id === commentId ? updatedComment : c,
                ),
            }));
            toast.success('Comment updated');
        } catch (error) {
            console.error('Error updating comment:', error);
            toast.error('Failed to update comment');
            throw error;
        }
    },

    deleteComment: async (commentId: string) => {
        try {
            await commentsService.deleteComment(commentId);
            set((state) => ({
                // Удаляем комментарий И все его ответы
                comments: state.comments.filter(
                    (c) => c.$id !== commentId && c.parentId !== commentId,
                ),
            }));
            toast.success('Comment deleted');
        } catch (error) {
            console.error('Error deleting comment:', error);
            toast.error('Failed to delete comment');
            throw error;
        }
    },

    loadStats: async (movieId: string, mediaType: 'movie' | 'tv') => {
        try {
            const stats = await commentsService.getCommentStats(
                movieId,
                mediaType,
            );
            set({ stats });
        } catch (error) {
            console.error('Error loading stats:', error);
            set({ stats: null });
        }
    },

    getCommentsWithReplies: () => {
        const { comments } = get();
        const topLevelComments = comments.filter((c) => !c.parentId);
        return topLevelComments.map((comment) => ({
            ...comment,
            replies: comments.filter((c) => c.parentId === comment.$id),
        }));
    },

    subscribeToComments: (movieId: string, mediaType: 'movie' | 'tv') => {
        // Отписываемся от предыдущей подписки, если она есть
        get().unsubscribeFromComments();

        // Подписываемся на изменения в таблице комментариев
        const channel = `databases.${DATABASE_ID}.tables.${COMMENTS_TABLE_ID}.rows`;

        const unsubscribeFn = client.subscribe(channel, (response) => {
            const payload = response.payload as CommentDocument;

            // Фильтруем только комментарии для текущего фильма/сериала
            if (
                payload.movieId !== movieId ||
                payload.mediaType !== mediaType
            ) {
                return;
            }

            const events = response.events;

            // Новый комментарий создан
            if (events.includes('databases.*.tables.*.rows.*.create')) {
                set((state) => {
                    // Проверяем, нет ли уже этого комментария (избегаем дублирования)
                    if (state.comments.some((c) => c.$id === payload.$id)) {
                        return state;
                    }
                    return {
                        comments: [payload, ...state.comments],
                    };
                });
                // Обновляем статистику
                get().loadStats(movieId, mediaType);
            }

            // Комментарий обновлен
            if (events.includes('databases.*.tables.*.rows.*.update')) {
                set((state) => ({
                    comments: state.comments.map((c) =>
                        c.$id === payload.$id ? payload : c,
                    ),
                }));
            }

            // Комментарий удален
            if (events.includes('databases.*.tables.*.rows.*.delete')) {
                set((state) => ({
                    comments: state.comments.filter(
                        (c) =>
                            c.$id !== payload.$id && c.parentId !== payload.$id,
                    ),
                }));
                // Обновляем статистику
                get().loadStats(movieId, mediaType);
            }
        });

        set({ unsubscribe: unsubscribeFn });
    },

    unsubscribeFromComments: () => {
        const { unsubscribe } = get();
        if (unsubscribe) {
            unsubscribe();
            set({ unsubscribe: null });
        }
    },

    clearComments: () => {
        get().unsubscribeFromComments();
        set({ comments: [], stats: null });
    },
}));
