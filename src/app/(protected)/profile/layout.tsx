import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'My Profile - HesFlix',
    description: 'Manage your HesFlix account settings and preferences',
    openGraph: {
        title: 'My Profile - HesFlix',
        type: 'profile',
        description: 'Manage your HesFlix account settings and preferences',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile`,
        siteName: 'HesFlix',
    },
};

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
