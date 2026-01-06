interface CircleProgressProps {
    vote: number;
    size?: 'small' | 'large';
}

export default function CircleProgress({
    vote,
    size = 'small',
}: CircleProgressProps) {
    const percent = (vote / 10) * 100;

    const sizeClasses = {
        outer: size === 'small' ? 'w-10 h-10' : 'w-16 h-16',
        inner:
            size === 'small'
                ? 'w-8 h-8 left-1 top-1 text-xs'
                : 'w-12 h-12 left-2 top-2 text-lg',
    };

    let color = '#22c55e';
    if (percent < 40) {
        color = '#ef4444';
    } else if (percent < 70) {
        color = '#facc15';
    }

    return (
        <div
            style={
                {
                    '--value': `${percent}%`,
                    '--color': color,
                } as React.CSSProperties
            }
            className={`
             rounded-full  bg-[conic-gradient(var(--color)_0%_var(--value),_black_var(--value)_100%)] relative ${sizeClasses.outer}`}
        >
            <div>
                <div
                    className={`absolute rounded-full bg-black   font-semibold flex items-center justify-center ${sizeClasses.inner}`}
                >
                    {vote.toFixed(1)}
                </div>
            </div>
        </div>
    );
}
