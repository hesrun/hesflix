import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hesflix.vercel.app';

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/peoples/', // перебор ID сжигает лимиты
                    '/movie/',
                    '/tv/',
                    '/collections/',
                ],
            },
        ],
        host: baseUrl.replace(/^https?:\/\//, ''),
    };
}
