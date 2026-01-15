import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, icon, className = '', ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-body-sm font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={`input ${icon ? 'pl-12' : ''} ${error ? 'border-red-500 focus:ring-red-500' : ''
                            } ${className}`}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="mt-2 text-body-sm text-red-500">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
