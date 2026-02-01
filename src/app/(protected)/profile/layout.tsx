import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'My Profile - HessFlix',
    description: 'Manage your HessFlix account settings and preferences',
    openGraph: {
        title: 'My Profile - HessFlix',
        type: 'profile',
        description: 'Manage your HessFlix account settings and preferences',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile`,
        siteName: 'HessFlix',
    },
};

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
