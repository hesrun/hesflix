'use client';

import { CommentDocument } from '@/types/comment';
import Reply from './Reply';

interface RepliesListProps {
    replies: CommentDocument[];
}

export default function RepliesList({ replies }: RepliesListProps) {
    if (replies.length === 0) return null;

    return (
        <div className="space-y-4">
            {replies.map((reply) => (
                <Reply key={reply.$id} reply={reply} />
            ))}
        </div>
    );
}
