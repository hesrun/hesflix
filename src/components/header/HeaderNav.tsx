'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderNavProps {
    className?: string;
    onClick?: () => void;
}

const navigationLinks = [
    { href: '/movie', label: 'Movies' },
    { href: '/tv', label: 'Serials' },
    { href: '/peoples', label: 'Peoples' },
    { href: '/collections', label: 'Collections' },
];

export default function HeaderNav({ className = '', onClick }: HeaderNavProps) {
    const pathname = usePathname();

    return (
        <nav className={`${className}`}>
            <ul className="flex list-none flex-col gap-2 md:flex-row md:gap-4">
                {navigationLinks.map(({ href, label }) => {
                    const isActive = pathname.startsWith(href);
                    return (
                        <li key={href}>
                            <Link
                                onClick={onClick}
                                href={href}
                                className={`block rounded-md transition-colors px-2 py-2 leading-none font-semibold md:text-sm md:py-1 ${
                                    isActive
                                        ? 'bg-amber-500 text-black  '
                                        : 'hover:bg-white/10'
                                }`}
                            >
                                {label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
