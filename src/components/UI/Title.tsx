interface TitleProps {
    children: React.ReactNode;
    type?: 'h1' | 'h2' | 'h3';
}

export default function Title({ children, type = 'h1' }: TitleProps) {
    const Tag = type;
    const sizeClasses = {
        h1: 'text-4xl',
        h2: 'text-3xl',
        h3: 'text-2xl',
    };
    return (
        <Tag
            className={`font-bold bg-gradient-to-r w-max from-amber-700 to-amber-300 text-transparent bg-clip-text ${sizeClasses[type]}`}
        >
            {children}
        </Tag>
    );
}
