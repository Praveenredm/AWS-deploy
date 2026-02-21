import * as React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'warning';
}

export function Badge({ className, variant = 'primary', ...props }: BadgeProps) {
    const variants = {
        primary: 'bg-primary-500/10 text-primary-400 border-primary-500/20',
        secondary: 'bg-white/10 text-gray-300 border-white/10',
        outline: 'bg-transparent text-gray-400 border-white/10',
        success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    };

    return (
        <div
            className={cn(
                'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border transition-colors',
                variants[variant],
                className
            )}
            {...props}
        />
    );
}
