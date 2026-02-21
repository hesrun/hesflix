import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'My Favorites - HesFlix',
    description: 'Your collection of favorite movies and TV shows',
    openGraph: {
        title: 'My Favorites - HesFlix',
        type: 'website',
        description: 'Your collection of favorite movies and TV shows',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/favorites`,
        siteName: 'HesFlix',
    },
};

export default function FavoritesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
