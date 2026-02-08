import { tablesDB, DATABASE_ID, COMMENTS_TABLE_ID } from './config';
import { ID, Query } from 'appwrite';
import { Comment, CommentDocument } from '@/types/comment';

const TABLE_CONFIG = {
    databaseId: DATABASE_ID,
    tableId: COMMENTS_TABLE_ID,
};

export const commentsService = {
    async addComment(comment: Comment): Promise<CommentDocument> {
        try {
            const row = await tablesDB.createRow({
                ...TABLE_CONFIG,
                rowId: ID.unique(),
                data: {
                    userId: comment.userId,
                    userName: comment.userName,
                    movieId: comment.movieId,
                    mediaType: comment.mediaType,
                    content: comment.content,
                    rating: comment.rating || null,
                    parentId: comment.parentId || null,
                },
            });
            return row as unknown as CommentDocument;
        } catch (error) {
            console.error('Add comment error:', error);
            throw error;
        }
    },

    async updateComment(
        commentId: string,
        content: string,
        rating?: number,
    ): Promise<CommentDocument> {
        try {
            const row = await tablesDB.updateRow({
                ...TABLE_CONFIG,
                rowId: commentId,
                data: {
                    content,
                    ...(rating !== undefined && { rating }),
                },
            });
            return row as unknown as CommentDocument;
        } catch (error) {
            console.error('Update comment error:', error);
            throw error;
        }
    },

    async deleteComment(commentId: string): Promise<void> {
        try {
            // Сначала удаляем все ответы на этот комментарий (каскадное удаление)
            const replies = await this.getReplies(commentId);

            // Удаляем каждый ответ
            for (const reply of replies) {
                await tablesDB.deleteRow({
                    ...TABLE_CONFIG,
                    rowId: reply.$id,
                });
            }

            // Затем удаляем сам комментарий
            await tablesDB.deleteRow({
                ...TABLE_CONFIG,
                rowId: commentId,
            });
        } catch (error) {
            console.error('Delete comment error:', error);
            throw error;
        }
    },

    async getMovieComments(
        movieId: string,
        mediaType: 'movie' | 'tv',
    ): Promise<CommentDocument[]> {
        try {
            const response = await tablesDB.listRows({
                ...TABLE_CONFIG,
                queries: [
                    Query.equal('movieId', [movieId]),
                    Query.equal('mediaType', [mediaType]),
                    Query.orderDesc('$createdAt'),
                    Query.limit(100),
                ],
            });
            return response.rows as unknown as CommentDocument[];
        } catch (error) {
            console.error('Get comments error:', error);
            throw error;
        }
    },

    async getUserComments(userId: string): Promise<CommentDocument[]> {
        try {
            const response = await tablesDB.listRows({
                ...TABLE_CONFIG,
                queries: [
                    Query.equal('userId', [userId]),
                    Query.orderDesc('$createdAt'),
                ],
            });
            return response.rows as unknown as CommentDocument[];
        } catch (error) {
            console.error('Get user comments error:', error);
            throw error;
        }
    },

    async getReplies(parentId: string): Promise<CommentDocument[]> {
        try {
            const response = await tablesDB.listRows({
                ...TABLE_CONFIG,
                queries: [
                    Query.equal('parentId', [parentId]),
                    Query.orderAsc('$createdAt'),
                ],
            });
            return response.rows as unknown as CommentDocument[];
        } catch (error) {
            console.error('Get replies error:', error);
            throw error;
        }
    },

    async getCommentStats(
        movieId: string,
        mediaType: 'movie' | 'tv',
    ): Promise<{ count: number; averageRating: number }> {
        try {
            const comments = await this.getMovieComments(movieId, mediaType);
            const count = comments.filter((c) => !c.parentId).length;
            const ratings = comments
                .filter((c) => c.rating && !c.parentId)
                .map((c) => c.rating!);
            const averageRating =
                ratings.length > 0
                    ? ratings.reduce((a, b) => a + b, 0) / ratings.length
                    : 0;

            return { count, averageRating };
        } catch (error) {
            console.error('Get comment stats error:', error);
            return { count: 0, averageRating: 0 };
        }
    },
};
