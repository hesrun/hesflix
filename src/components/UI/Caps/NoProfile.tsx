import { LucideSquareUserRound } from 'lucide-react';

export default function NoProfile() {
    return (
        <div className="aspect-[2/3] bg-white/10 flex items-center justify-center p-[30%]">
            <LucideSquareUserRound
                className="w-full h-full opacity-20"
                strokeWidth={0.5}
            />
        </div>
    );
}
