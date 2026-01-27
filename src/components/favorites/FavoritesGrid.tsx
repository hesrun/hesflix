import FilmCard from '@/components/filmGrid/FilmCard';
import { FavoriteDocument } from '@/types/favorite';

export default function FavoritesGrid({ data }: { data: FavoriteDocument[] }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {data.map((item) => (
                <FilmCard key={item.$id} data={item} removeFavorite={true} />
            ))}
        </div>
    );
}
