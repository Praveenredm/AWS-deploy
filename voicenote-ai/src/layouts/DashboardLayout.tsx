import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { useAppStore } from '../store/useAppStore';
import { Mic, Search, Bell } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';

export default function DashboardLayout() {
    const user = useAppStore(state => state.user);

    // For demo purposes, we'll allow access but in a real app:
    // if (!user) return <Navigate to="/login" replace />;

    return (
        <div className="min-h-screen bg-background flex">
            <Sidebar />

            <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
                <header className="h-16 border-b border-white/5 bg-surface/30 backdrop-blur-sm px-8 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center lg:hidden gap-2">
                        <Mic className="text-primary-500 w-6 h-6" />
                        <span className="font-bold text-foreground">VoiceNote</span>
                    </div>

                    <div className="hidden md:flex items-center bg-foreground/5 border border-foreground/5 rounded-lg px-3 py-1.5 w-96 group focus-within:border-primary-500/50 transition-all">
                        <Search size={16} className="text-foreground-muted group-focus-within:text-primary-400" />
                        <input
                            type="text"
                            placeholder="Search notes, transcripts..."
                            className="bg-transparent border-none focus:ring-0 text-sm text-foreground placeholder:text-foreground-muted w-full ml-2"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <button className="p-2 text-foreground-muted hover:text-foreground hover:bg-foreground/5 rounded-lg relative transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-primary-600 rounded-full border-2 border-background" />
                        </button>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-600 to-indigo-600 border border-foreground/10" />
                    </div>
                </header>

                <main className="flex-1 p-8 overflow-y-auto">
                    <div className="max-w-6xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
