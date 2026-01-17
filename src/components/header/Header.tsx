import Link from 'next/link';
import HeaderNav from './HeaderNav';
import HeaderSearch from './HeaderSearch';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="container mx-auto flex items-center py-4">
            <Link href="/" className="text-2xl font-bold text-amber-500">
                <Image
                    src="/logo.png"
                    alt="HesFlix Logo"
                    width={100}
                    height={30}
                    className="rounded-sm overflow-hidden"
                />
            </Link>
            <HeaderNav />
            <HeaderSearch />
        </header>
    );
}
