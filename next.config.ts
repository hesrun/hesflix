import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            { hostname: 'image.tmdb.org' },
            { hostname: 'img.youtube.com' },
        ],
    },
};

export default nextConfig;
