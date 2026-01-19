import { LucideFilm } from 'lucide-react';

export default function NoPoster() {
    return (
        <div className="aspect-[2/3] bg-white/10 flex items-center justify-center p-[30%]">
            <LucideFilm
                className="w-full h-full opacity-20"
                strokeWidth={0.5}
            />
        </div>
    );
}
