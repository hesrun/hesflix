'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigationLinks = [
    { href: '/movie', label: 'Movies' },
    { href: '/tv', label: 'Serials' },
    { href: '/peoples', label: 'Peoples' },
];

export default function HeaderNav() {
    const pathname = usePathname();

    return (
        <nav>
            <ul className="flex items-center gap-8 list-none ml-16">
                {navigationLinks.map(({ href, label }) => {
                    const isActive = pathname.startsWith(href);
                    return (
                        <li key={href}>
                            <Link
                                href={href}
                                className={`${
                                    isActive
                                        ? 'text-amber-500 font-semibold'
                                        : ''
                                } hover:text-amber-400 transition-colors`}
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
