import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { COLLECTIONS } from '@/constants/collections';

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

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

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

    // /collections/trending-today и т.д.
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
