import { LucideLoaderCircle } from 'lucide-react';
import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'filled' | 'outline';
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
    isLoading?: boolean;
    children?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            size = 'md',
            variant = 'filled',
            icon,
            iconPosition = 'left',
            isLoading = false,
            disabled,
            children,
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

        const variantClasses = {
            filled: 'bg-amber-500 border-2 border-amber-500 text-black hover:bg-transparent hover:text-amber-500 disabled:bg-gray-600 disabled:border-gray-600 disabled:text-white',
            outline:
                'border-2 border-amber-500 bg-transparent text-amber-500 hover:bg-amber-500 hover:text-black disabled:text-gray-600 disabled:border-gray-600',
        };

        const baseClasses =
            'cursor-pointer inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-black disabled:cursor-not-allowed disabled:opacity-70 disabled:pointer-events-none';

        const isDisabled = disabled || isLoading;

        return (
            <button
                ref={ref}
                disabled={isDisabled}
                className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
                {...props}
            >
                {isLoading && (
                    <LucideLoaderCircle className="animate-spin w-5 h-5" />
                )}
                {!isLoading && icon && iconPosition === 'left' && icon}
                {children}
                {!isLoading && icon && iconPosition === 'right' && icon}
            </button>
        );
    },
);

Button.displayName = 'Button';

export default Button;
