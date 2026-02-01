import { tmdb } from '@/lib/api/TMDB';
import { Collection } from '@/types/collection';
import FilmCard from '@/components/filmGrid/FilmCard';
import { Movie } from '@/types/movie';
import { TV } from '@/types/tv';

interface CollectionGridServerProps {
    collection: Collection;
    page?: number;
}

export default async function CollectionGridServer({
    collection,
    page = 1,
}: CollectionGridServerProps) {
    const data = await tmdb.collections.getByEndpoint(
        collection.endpoint,
        page,
    );

    const results = 'results' in data ? data.results : [];

    if (!results || results.length === 0) {
        return (
            <div className="py-12 text-center text-gray-400">
                No content found for this collection
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {results.map((item: any) => {
                if ('known_for_department' in item) {
                    return null;
                }

                const mediaType =
                    collection.type === 'both'
                        ? 'media_type' in item
                            ? item.media_type
                            : 'movie'
                        : collection.type;

                return (
                    <FilmCard
                        key={item.id}
                        data={{
                            movieId: item.id,
                            title: 'title' in item ? item.title : item.name,
                            posterPath: item.poster_path,
                            mediaType: mediaType as 'movie' | 'tv',
                            rating: item.vote_average,
                            releaseDate:
                                'release_date' in item
                                    ? item.release_date
                                    : 'first_air_date' in item
                                      ? item.first_air_date
                                      : undefined,
                        }}
                    />
                );
            })}
        </div>
    );
}
