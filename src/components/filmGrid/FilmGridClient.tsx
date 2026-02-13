import FilmCard from './FilmCard';
import { Movie } from '@/types/movie';
import { TV } from '@/types/tv';

interface FilmGridClientProps {
    data: any[];
    type?: 'movie' | 'tv';
}

export default function FilmGridClient({ data, type }: FilmGridClientProps) {
    return (
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {data.map((item) => {
                const mediaType = item.media_type || type || 'movie';

                const filmCardProps = {
                    mediaType: mediaType as 'movie' | 'tv',
                    movieId: item.id,
                    title:
                        mediaType === 'movie'
                            ? (item as Movie).title
                            : (item as TV).name,
                    posterPath: item.poster_path,
                    rating: item.vote_average,
                    releaseDate:
                        mediaType === 'movie'
                            ? (item as Movie).release_date
                            : (item as TV).first_air_date,
                };

                return <FilmCard key={item.id} data={filmCardProps} />;
            })}
        </div>
    );
}
