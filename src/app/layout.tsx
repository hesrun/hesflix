import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/scss/global.scss';
import Header from '@/components/header/Header';
import VideoModal from '@/components/UI/VideoModal';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'HesFlix - Movies and TV Series',
    description:
        'Discover movies, TV series and peoples. Browse popular content, search and explore detailed information.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
            >
                <Header />
                <main className="py-8 container mx-auto px-4">{children}</main>
                <VideoModal />
            </body>
        </html>
    );
}
