import Image from 'next/image';
import Link from 'next/link';
import CircleProgress from '../UI/CircleProgress';
import NoPoster from '../UI/Caps/NoPoster';
import RemoveFavoriteButton from '../favorites/RemoveFavoriteButton';
import FavoriteButton from '../favorites/FavoriteButton';

interface FilmCardProps {
    data: {
        movieId: number;
        title: string;
        posterPath: string | null;
        mediaType: 'movie' | 'tv';
        rating?: number;
        releaseDate?: string;
        $id?: string;
    };
    removeFavorite?: boolean;
    setFavorites?: React.Dispatch<React.SetStateAction<any[]>>;
}
export default function FilmCard({
    data,
    removeFavorite = false,
    setFavorites,
}: FilmCardProps) {
    const { movieId, title, posterPath, mediaType, rating, releaseDate } = data;
    return (
        <>
            <Link
                href={`/${mediaType}/${movieId}`}
                key={movieId}
                className="group bg-gray-900 border-1 border-gray-800 rounded-md overflow-hidden"
            >
                <div className="overflow-hidden relative">
                    {posterPath ? (
                        <Image
                            src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
                            width={350}
                            height={500}
                            alt={title}
                            className="group-hover:scale-110 transition-all"
                        />
                    ) : (
                        <NoPoster />
                    )}
                    {rating && rating > 0 && (
                        <div className="absolute top-2 right-2">
                            <CircleProgress vote={rating} />
                        </div>
                    )}
                    {removeFavorite && setFavorites ? (
                        <RemoveFavoriteButton
                            id={data.$id}
                            setFavorites={setFavorites}
                        />
                    ) : !removeFavorite ? (
                        <div className="absolute top-2 left-2">
                            <FavoriteButton {...data} />
                        </div>
                    ) : null}
                </div>
                <div className="p-2 gap-2 xl:p-4 flex items-baseline justify-between">
                    <h3 className="font-medium text-amber-500 text-sm xl:text-base leading-snug">
                        {title}
                    </h3>
                    <span className="text-sm opacity-50">
                        {releaseDate && releaseDate.split('-')[0]}
                    </span>
                </div>
            </Link>
        </>
    );
}
