import Link from 'next/link';
import HeaderSearch from './HeaderSearch';

export default function Header() {
    return (
        <header className="container mx-auto flex items-center py-4">
            <Link href="/" className="text-2xl font-bold text-amber-500">
                TVDTB
            </Link>
            <nav>
                <ul className="flex items-center gap-8 list-none ml-16">
                    <li>
                        <Link href={`/movie`} className="hover:text-amber-500">
                            Movies
                        </Link>
                    </li>
                    <li>
                        <Link href={`/tv`} className="hover:text-amber-500">
                            Serials
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={`/peoples`}
                            className="hover:text-amber-500"
                        >
                            Peoples
                        </Link>
                    </li>
                </ul>
            </nav>
            <HeaderSearch />
        </header>
    );
}
