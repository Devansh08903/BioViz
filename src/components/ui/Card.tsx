import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    onClick?: () => void;
}

export const Card = ({ children, className = '', hover = false, onClick }: CardProps) => {
    return (
        <motion.div
            className={`card ${hover ? 'card-hover' : ''} ${className}`}
            onClick={onClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={hover ? { y: -4 } : undefined}
        >
            {children}
        </motion.div>
    );
};

interface GlassCardProps {
    children: ReactNode;
    className?: string;
}

export const GlassCard = ({ children, className = '' }: GlassCardProps) => {
    return (
        <motion.div
            className={`glass rounded-xl p-6 ${className}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            {children}
        </motion.div>
    );
};
