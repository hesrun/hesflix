interface LineTitleProps {
    className?: string;
    children: React.ReactNode;
    type?: 'h2' | 'h3' | 'h4' | 'h5';
}
export default function LineTitle({
    children,
    type = 'h2',
    className,
}: LineTitleProps) {
    const Tag = type;
    return (
        <Tag
            className={`text-xl font-medium text-amber-500 mb-2 flex items-center uppercase gap-4 ${
                className ?? ''
            }`}
        >
            {children}
            <span className="block h-[2px] bg-amber-500 grow"></span>
        </Tag>
    );
}
