import { getSearchResultDirect } from '@/lib/api/TMDB/Search';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
        return Response.json(
            { error: 'Query parameter is required' },
            { status: 400 },
        );
    }

    try {
        const data = await getSearchResultDirect(query);
        return Response.json(data);
    } catch (error) {
        console.error('Search API error:', error);
        return Response.json(
            { error: 'Failed to fetch search results' },
            { status: 500 },
        );
    }
}
