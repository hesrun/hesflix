import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'My Favorites - HessFlix',
    description: 'Your collection of favorite movies and TV shows',
    openGraph: {
        title: 'My Favorites - HessFlix',
        type: 'website',
        description: 'Your collection of favorite movies and TV shows',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/favorites`,
        siteName: 'HessFlix',
    },
};

export default function FavoritesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
