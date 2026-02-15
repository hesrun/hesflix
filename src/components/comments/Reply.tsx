'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCommentsStore } from '@/store/commentsStore';
import { CommentDocument } from '@/types/comment';
import { Trash2, Edit2 } from 'lucide-react';
import Button from '@/components/UI/Button';
import Textarea from '../UI/Textarea';

interface ReplyProps {
    reply: CommentDocument;
}

export default function Reply({ reply }: ReplyProps) {
    const { user } = useAuth();
    const { deleteComment, updateComment } = useCommentsStore();
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(reply.content);

    const isOwner = user?.$id === reply.userId;
    const createdAt = new Date(reply.$createdAt);

    const handleDelete = async () => {
        if (confirm('Delete this reply?')) {
            try {
                await deleteComment(reply.$id);
            } catch (error) {
                console.error('Failed to delete:', error);
            }
        }
    };

    const handleUpdate = async () => {
        if (!editContent.trim()) return;
        try {
            await updateComment(reply.$id, editContent.trim());
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update:', error);
        }
    };

    return (
        <div className="flex gap-3 pl-14">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0">
                <span className="text-black font-bold text-sm">
                    {reply.userName.charAt(0).toUpperCase()}
                </span>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-white text-sm">
                        {reply.userName}
                    </span>
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
                                className="p-1 hover:bg-neutral-800 rounded transition-colors cursor-pointer"
                                title="Edit"
                            >
                                <Edit2 size={14} className="text-gray-400" />
                            </button>
                            <button
                                onClick={handleDelete}
                                className="p-1 hover:bg-neutral-800 rounded transition-colors cursor-pointer"
                                title="Delete"
                            >
                                <Trash2 size={14} className="text-red-400" />
                            </button>
                        </div>
                    )}
                </div>
                {isEditing ? (
                    <div className="mt-2 space-y-2">
                        <Textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className=""
                            rows={2}
                            aria-label="Edit reply"
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
                        <p className="text-gray-300 text-sm whitespace-pre-wrap break-words">
                            {reply.content}
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
