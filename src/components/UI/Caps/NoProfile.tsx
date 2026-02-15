import { LucideSquareUserRound } from 'lucide-react';
type AspectRatio = '2/3' | '16/9' | '4/3' | '1/1' | '3/2';
const aspectClasses: Record<AspectRatio, string> = {
    '2/3': 'aspect-[2/3]',
    '16/9': 'aspect-[16/9]',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
    '3/2': 'aspect-[3/2]',
};
export default function NoProfile({
    className,
    aspect = '2/3',
}: {
    className?: string;
    aspect?: AspectRatio;
}) {
    const aspectClass = aspectClasses[aspect];
    return (
        <div
            className={`${aspectClass} bg-white/10 rounded-md relative ${className ? className : ''}`}
        >
            <LucideSquareUserRound
                className="opacity-20 w-full h-full max-w-[30%] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                strokeWidth={0.5}
            />
        </div>
    );
}
