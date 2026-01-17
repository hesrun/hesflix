import Link from 'next/link';
import HeaderNav from './HeaderNav';
import HeaderSearch from './HeaderSearch';

export default function Header() {
    return (
        <header className="container mx-auto flex items-center py-4">
            <Link href="/" className="text-2xl font-bold text-amber-500">
                TVDTB
            </Link>
            <HeaderNav />
            <HeaderSearch />
        </header>
    );
}
