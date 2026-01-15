import type { ReactNode } from 'react';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info';

interface BadgeProps {
    children: ReactNode;
    variant?: BadgeVariant;
    className?: string;
}

export const Badge = ({ children, variant = 'info', className = '' }: BadgeProps) => {
    const variantClasses = {
        success: 'badge-success',
        warning: 'badge-warning',
        danger: 'badge-danger',
        info: 'badge-info',
    };

    return (
        <span className={`${variantClasses[variant]} ${className}`}>
            {children}
        </span>
    );
};
