import { TextareaHTMLAttributes, forwardRef } from 'react';

export interface TextareaProps extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'size'
> {
    size?: 'sm' | 'md' | 'lg';
    error?: boolean;
    helperText?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        {
            size = 'md',
            error = false,
            helperText,
            disabled,
            className = '',
            ...props
        },
        ref,
    ) => {
        const sizeClasses = {
            sm: 'px-3 py-1.5 text-sm',
            md: 'px-4 py-2 text-base',
            lg: 'px-6 py-3 text-lg',
        };

        const baseClasses =
            'w-full rounded-md bg-transparent border-1 font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-amber-500/60 focus:ring-offset-2 focus:ring-offset-black disabled:cursor-not-allowed disabled:opacity-70 disabled:bg-gray-900';

        const stateClasses = error
            ? 'border-red-600 text-white placeholder:text-red-400'
            : 'border-gray-700 text-white placeholder:text-gray-400 hover:border-amber-500';

        return (
            <div className="w-full">
                <textarea
                    ref={ref}
                    disabled={disabled}
                    className={`scroll-vertical ${baseClasses} ${sizeClasses[size]} ${stateClasses} ${className}`}
                    {...props}
                />
                {helperText && (
                    <p
                        className={`mt-1 text-sm ${error ? 'text-red-500' : 'text-gray-400'}`}
                    >
                        {helperText}
                    </p>
                )}
            </div>
        );
    },
);

Textarea.displayName = 'Textarea';

export default Textarea;
