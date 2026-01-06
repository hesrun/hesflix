'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface BackLinkProps {
    href?: string;
    label?: string;
    className?: string;
}

export default function BackLink({
    href,
    label = 'Go Back',
    className = '',
}: BackLinkProps) {
    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!href) {
            e.preventDefault();
            router.back();
        }
    };

    return (
        <Link
            href={href || '#'}
            onClick={handleClick}
            className={`mb-4 inline-block text-amber-500 hover:text-amber-400 transition-colors font-semibold ${className}`}
        >
            ← {label}
        </Link>
    );
}
