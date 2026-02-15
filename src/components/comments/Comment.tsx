'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCommentsStore } from '@/store/commentsStore';
import { CommentDocument } from '@/types/comment';
import { Star, Trash2, Edit2, MessageSquare } from 'lucide-react';
import Button from '@/components/UI/Button';
import RepliesList from './RepliesList';
import ReplyForm from './ReplyForm';
import Textarea from '../UI/Textarea';

interface CommentProps {
    comment: CommentDocument;
    movieId: string;
    mediaType: 'movie' | 'tv';
    replies?: CommentDocument[];
}

export default function Comment({
    comment,
    movieId,
    mediaType,
    replies = [],
}: CommentProps) {
    const { user } = useAuth();
    const { deleteComment, updateComment } = useCommentsStore();
    const [isEditing, setIsEditing] = useState(false);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);

    const isOwner = user?.$id === comment.userId;
    const createdAt = new Date(comment.$createdAt);

    const handleDelete = async () => {
        try {
            await deleteComment(comment.$id);
        } catch (error) {
            console.error('Failed to delete:', error);
        }
    };

    const handleUpdate = async () => {
        if (!editContent.trim()) return;
        try {
            await updateComment(comment.$id, editContent.trim());
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update:', error);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-4 group">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-black font-bold">
                        {comment.userName.charAt(0).toUpperCase()}
                    </span>
                </div>
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-bold text-white">
                            {comment.userName}
                        </span>
                        {comment.rating && (
                            <div className="flex items-center gap-1">
                                <Star
                                    size={14}
                                    className="fill-amber-500 text-amber-500"
                                />
                                <span className="text-sm text-amber-500 font-semibold">
                                    {comment.rating}
                                </span>
                            </div>
                        )}
                        <span className="text-xs text-gray-500">
                            {createdAt.toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </span>
                        {isOwner && (
                            <div className="ml-auto flex gap-2">
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="p-1.5 hover:bg-neutral-800 rounded transition-colors cursor-pointer"
                                    title="Edit"
                                >
                                    <Edit2
                                        size={14}
                                        className="text-gray-400"
                                    />
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="p-1.5 hover:bg-neutral-800 rounded transition-colors cursor-pointer"
                                    title="Delete"
                                >
                                    <Trash2
                                        size={14}
                                        className="text-red-400"
                                    />
                                </button>
                            </div>
                        )}
                    </div>

                    {isEditing ? (
                        <div className="space-y-3">
                            <Textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="mt-2"
                                rows={3}
                                aria-label="Edit comment"
                            />
                            <div className="flex gap-2">
                                <Button onClick={handleUpdate} size="sm">
                                    Save
                                </Button>
                                <Button
                                    onClick={() => setIsEditing(false)}
                                    variant="ghost"
                                    size="sm"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <p className="text-gray-200 whitespace-pre-wrap break-words mb-3">
                                {comment.content}
                            </p>
                            {user && (
                                <button
                                    onClick={() =>
                                        setShowReplyForm(!showReplyForm)
                                    }
                                    className="flex items-center gap-1 text-sm text-gray-400 
                                                 hover:text-amber-500 transition-colors cursor-pointer"
                                >
                                    <MessageSquare size={14} />
                                    Reply
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>

            {showReplyForm && (
                <div className="ml-14">
                    <ReplyForm
                        movieId={movieId}
                        mediaType={mediaType}
                        parentId={comment.$id}
                        onSuccess={() => setShowReplyForm(false)}
                        onCancel={() => setShowReplyForm(false)}
                    />
                </div>
            )}

            <RepliesList replies={replies} />
        </div>
    );
}
