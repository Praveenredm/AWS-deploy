import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Mic2,
    History,
    Settings,
    LogOut,
    Plus,
    User,
    Mic
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './ui/Button';
import { useAppStore } from '../store/useAppStore';

interface SidebarLinkProps {
    to: string;
    icon: React.ElementType;
    label: string;
    active?: boolean;
}

function SidebarLink({ to, icon: Icon, label, active }: SidebarLinkProps) {
    return (
        <Link
            to={to}
            className={cn(
                'group flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200',
                active
                    ? 'bg-primary-600/10 text-primary-400 border border-primary-600/20 shadow-sm'
                    : 'text-foreground-muted hover:text-foreground hover:bg-foreground/5'
            )}
        >
            <Icon size={20} className={cn(active ? 'text-primary-400' : 'group-hover:text-foreground')} />
            <span className="font-medium text-sm">{label}</span>
        </Link>
    );
}

export function Sidebar() {
    const location = useLocation();
    const logout = useAppStore(state => state.logout);

    return (
        <aside className="fixed left-0 top-0 bottom-0 w-64 bg-surface border-r border-foreground/5 hidden lg:flex flex-col z-40">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                        <Mic className="text-white w-5 h-5" />
                    </div>
                    <span className="text-lg font-bold text-foreground tracking-tight">VoiceNote AI</span>
                </div>

                <Link to="/dashboard/record">
                    <Button className="w-full justify-start gap-2 h-11 px-4 mb-6 shadow-lg shadow-primary-600/10">
                        <Plus size={18} />
                        <span>New Recording</span>
                    </Button>
                </Link>

                <nav className="space-y-1.5">
                    <SidebarLink
                        to="/dashboard"
                        icon={LayoutDashboard}
                        label="Dashboard"
                        active={location.pathname === '/dashboard'}
                    />
                    <SidebarLink
                        to="/dashboard/history"
                        icon={History}
                        label="History"
                        active={location.pathname === '/dashboard/history'}
                    />
                    <SidebarLink
                        to="/dashboard/settings"
                        icon={Settings}
                        label="Settings"
                        active={location.pathname === '/dashboard/settings'}
                    />
                </nav>
            </div>

            <div className="mt-auto p-4 border-t border-foreground/5">
                <div className="flex items-center gap-3 px-3 py-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-surface-lighter flex items-center justify-center border border-foreground/5">
                        <User size={16} className="text-foreground-muted" />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium text-foreground truncate">John Doe</span>
                        <span className="text-[10px] text-foreground-muted truncate">Pro Plan</span>
                    </div>
                </div>
                <button
                    onClick={() => logout()}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-foreground-muted hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-colors"
                >
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
