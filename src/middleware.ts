import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const MAX_PERSON_ID = 50_000_000;

function isValidPersonId(id: string): boolean {
    const num = Number(id);
    return (
        Number.isInteger(num) &&
        num > 0 &&
        num <= MAX_PERSON_ID &&
        id === String(num)
    );
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // /peoples/123 — валидация на Edge + CDN-кэш, чтобы не дергать origin
    const peoplesMatch = pathname.match(/^\/peoples\/(.+)$/);
    if (peoplesMatch) {
        const id = peoplesMatch[1];
        if (!isValidPersonId(id)) {
            return new NextResponse(null, { status: 404 });
        }
        const res = NextResponse.next();
        res.headers.set(
            'Cache-Control',
            'public, s-maxage=86400, stale-while-revalidate=86400',
        );
        return res;
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/peoples/:path*',
};
