import * as React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    glass?: boolean;
    hover?: boolean;
}

export function Card({ className, glass = true, hover = false, ...props }: CardProps) {
    return (
        <div
            className={cn(
                glass ? 'glass-card' : 'bg-surface border border-white/5 rounded-xl',
                hover && 'hover:translate-y-[-2px]',
                className
            )}
            {...props}
        />
    );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('p-6 pb-3', className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return <h3 className={cn('text-lg font-semibold text-white', className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('p-6 pt-0', className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('p-6 pt-0 border-t border-white/5 mt-auto', className)} {...props} />;
}
