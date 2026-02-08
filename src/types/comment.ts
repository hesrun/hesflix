import { Models } from 'appwrite';

export interface Comment {
    userId: string;
    userName: string;
    movieId: string;
    mediaType: 'movie' | 'tv';
    content: string;
    rating?: number;
    parentId?: string | null;
}

export interface CommentDocument extends Comment, Models.Document {}

export interface CommentWithReplies extends CommentDocument {
    replies?: CommentDocument[];
}
