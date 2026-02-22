import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { COLLECTIONS } from '@/constants/collections';

/** User-Agent bots and scrapers — return 403 */
const BOT_PATTERNS = [
    /curl/i,
    /wget/i,
    /python-requests/i,
    /axios/i,
    /node-fetch/i,
    /go-http-client/i,
    /AhrefsBot/i,
    /SemrushBot/i,
    /MJ12bot/i,
    /DotBot/i,
    /GPTBot/i,
    /ChatGPT-User/i,
    /Claude-Web/i,
    /CCBot/i,
    /ScoutJet/i,
    /petalbot/i,
    /Bytespider/i,
    /DataForSeoBot/i,
];

function isBot(userAgent: string | null): boolean {
    if (!userAgent) return false;
    return BOT_PATTERNS.some((p) => p.test(userAgent));
}

const MAX_TMDB_ID = 999_999_999;

function isValidTmdbId(id: string): boolean {
    const num = Number(id);
    return (
        Number.isInteger(num) &&
        num > 0 &&
        num <= MAX_TMDB_ID &&
        id === String(num)
    );
}

const validSlugs = new Set(COLLECTIONS.map((c) => c.slug));

function addCacheHeaders(res: NextResponse): NextResponse {
    res.headers.set(
        'Cache-Control',
        'public, s-maxage=86400, stale-while-revalidate=86400',
    );
    return res;
}

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const userAgent = request.headers.get('user-agent');
    const isHeavyRoute = /^\/(peoples|movie|tv|collections)\//.test(pathname);

    // bots blocking
    if (isBot(userAgent) && isHeavyRoute) {
        return new NextResponse(null, { status: 403 });
    }

    // /peoples/123
    const peoplesMatch = pathname.match(/^\/peoples\/([^/]+)$/);
    if (peoplesMatch) {
        if (!isValidTmdbId(peoplesMatch[1])) {
            return new NextResponse(null, { status: 404 });
        }
        return addCacheHeaders(NextResponse.next());
    }

    // /movie/123 или /movie/123/seasons/...
    const movieMatch = pathname.match(/^\/movie\/([^/]+)(?:\/|$)/);
    if (movieMatch) {
        if (!isValidTmdbId(movieMatch[1])) {
            return new NextResponse(null, { status: 404 });
        }
        return addCacheHeaders(NextResponse.next());
    }

    // /tv/123 или /tv/123/seasons/...
    const tvMatch = pathname.match(/^\/tv\/([^/]+)(?:\/|$)/);
    if (tvMatch) {
        if (!isValidTmdbId(tvMatch[1])) {
            return new NextResponse(null, { status: 404 });
        }
        return addCacheHeaders(NextResponse.next());
    }

    // /collections/trending-today and etc.
    const collectionsMatch = pathname.match(/^\/collections\/([^/]+)(?:\/|$)/);
    if (collectionsMatch) {
        if (!validSlugs.has(collectionsMatch[1])) {
            return new NextResponse(null, { status: 404 });
        }
        return addCacheHeaders(NextResponse.next());
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/peoples/:path*',
        '/movie/:path*',
        '/tv/:path*',
        '/collections/:path*',
    ],
};
