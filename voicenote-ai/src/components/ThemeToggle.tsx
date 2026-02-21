import * as React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { cn } from '../lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
    const { theme, toggleTheme } = useAppStore();

    return (
        <button
            onClick={toggleTheme}
            className={cn(
                "p-2 rounded-lg transition-colors hover:bg-white/5 text-gray-400 hover:text-white",
                className
            )}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
    );
}
