'use client';
import Link from 'next/link';
import HeaderNav from './HeaderNav';
import UserMenu from './UserMenu';
import { useState } from 'react';
import { LucideWandSparkles } from 'lucide-react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleCloseHeaderMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="border-b border-white/10 sticky top-0 bg-black z-50">
            <div className="container px-4 mx-auto flex items-center py-4 relative gap-4">
                <button
                    aria-label="toggle menu"
                    className="w-6 h-6 flex md:hidden flex-col justify-center items-center gap-[6px] group shrink-0 cursor-pointer"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span
                        className={`w-full h-[1px] bg-amber-500 transition ${isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}
                    ></span>
                    <span
                        className={`w-full h-[1px] bg-amber-500 transition ${isMenuOpen ? 'opacity-0' : ''}`}
                    ></span>
                    <span
                        className={`w-full h-[1px] bg-amber-500 transition ${isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}
                    ></span>
                </button>
                <Link
                    href="/"
                    className="font-bold uppercase bg-amber-500 text-black p-1 rounded-md flex items-center gap-1 leading-none pr-2"
                >
                    <span className="bg-black text-amber-500 p-1 px-2 rounded-sm">
                        hes
                    </span>
                    flix
                </Link>
                <HeaderNav
                    className={`absolute left-0 top-full bg-black w-full p-4 pt-0 z-10 ${isMenuOpen ? 'block' : 'hidden'} md:static md:block md:ml-8 md:w-auto md:p-0`}
                    onClick={handleCloseHeaderMenu}
                />
                <div className="flex items-center ml-auto gap-4">
                    <Link
                        href="/ai-search"
                        className="flex items-center bg-gradient-to-r w-fit from-violet-500 to-rose-500 text-transparent bg-clip-text gap-2 hover:from-violet-600 hover:to-rose-600 transition"
                    >
                        <LucideWandSparkles className="text-violet-500 w-6" />
                        <span className="uppercase font-black text-xs">
                            Search
                        </span>
                    </Link>
                    <UserMenu />
                </div>
            </div>
        </header>
    );
}
