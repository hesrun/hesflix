import {
    InputHTMLAttributes,
    ReactNode,
    forwardRef,
    cloneElement,
} from 'react';

export interface InputProps extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'size'
> {
    size?: 'sm' | 'md' | 'lg';
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
    error?: boolean;
    helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            size = 'md',
            icon,
            iconPosition = 'left',
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

        const iconSizes = {
            sm: 16,
            md: 16,
            lg: 24,
        };

        const baseClasses =
            'w-full rounded-md bg-transparent border-1 font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-amber-500/60 focus:ring-offset-2 focus:ring-offset-black disabled:cursor-not-allowed disabled:opacity-70 disabled:bg-gray-900';

        const stateClasses = error
            ? 'border-red-600 text-white placeholder:text-red-400'
            : 'border-gray-700 text-white placeholder:text-gray-400 hover:border-amber-500';

        const paddingClasses =
            icon && iconPosition === 'left'
                ? 'pl-10'
                : icon && iconPosition === 'right'
                  ? 'pr-10'
                  : '';

        const renderIcon = () => {
            if (!icon) return null;
            return cloneElement(icon as React.ReactElement<any>, {
                size: iconSizes[size],
            });
        };

        return (
            <div className="w-full">
                <div className="relative">
                    {icon && iconPosition === 'left' && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500">
                            {renderIcon()}
                        </div>
                    )}
                    <input
                        ref={ref}
                        disabled={disabled}
                        className={`${baseClasses} ${sizeClasses[size]} ${stateClasses} ${paddingClasses} ${className}`}
                        {...props}
                    />
                    {icon && iconPosition === 'right' && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-500">
                            {renderIcon()}
                        </div>
                    )}
                </div>
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

Input.displayName = 'Input';

export default Input;
