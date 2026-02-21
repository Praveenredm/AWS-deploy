import * as React from 'react';
import {
    BarChart3,
    Mic,
    Clock,
    MessageSquare,
    ArrowUpRight,
    Plus
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { formatDate } from '../lib/utils';

export default function DashboardHome() {
    const notes = useAppStore(state => state.notes);
    const fetchNotes = useAppStore(state => state.fetchNotes);

    React.useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    const stats = [
        { label: 'Total Notes', value: notes.length.toString(), icon: MessageSquare, color: 'text-blue-400' },
        { label: 'Hours Saved', value: '12.4', icon: Clock, color: 'text-primary-400' },
        { label: 'Accuracy', value: '98.2%', icon: BarChart3, color: 'text-emerald-400' },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, John!</h1>
                    <p className="text-foreground-muted">Here's what's happening with your voice notes today.</p>
                </div>
                <Link to="/dashboard/record">
                    <Button className="gap-2">
                        <Mic size={18} />
                        <span>New Note</span>
                    </Button>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6">
                {stats.map((stat, idx) => (
                    <Card key={idx} className="bg-surface/50">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 bg-foreground/5 rounded-lg flex items-center justify-center border border-foreground/5">
                                    <stat.icon size={20} className={stat.color} />
                                </div>
                                <Badge variant="success" className="bg-emerald-500/10 text-emerald-400 border-none">
                                    +12% <ArrowUpRight size={10} className="ml-1" />
                                </Badge>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm text-foreground-muted">{stat.label}</p>
                                <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-foreground">Recent Recordings</h2>
                    <Link to="/dashboard/history" className="text-sm text-primary-400 hover:text-primary-300 transition-colors">
                        View all history
                    </Link>
                </div>

                <div className="grid gap-4">
                    {notes.length === 0 ? (
                        <Card className="p-12 text-center flex flex-col items-center justify-center border-dashed border-foreground/10">
                            <div className="w-16 h-16 bg-foreground/5 rounded-full flex items-center justify-center mb-4">
                                <Mic size={24} className="text-foreground-muted" />
                            </div>
                            <p className="text-foreground-muted mb-6">No recordings yet. Speak your first note!</p>
                            <Link to="/dashboard/record">
                                <Button>Create your first note</Button>
                            </Link>
                        </Card>
                    ) : (
                        notes.slice(0, 3).map((note) => (
                            <Link key={note.id} to={`/dashboard/note/${note.id}`}>
                                <Card hover className="bg-surface/30 group">
                                    <CardContent className="p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-primary-600/10 rounded-xl flex items-center justify-center border border-primary-600/20 group-hover:bg-primary-600/20 transition-all">
                                                <Mic size={20} className="text-primary-400" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-foreground group-hover:text-primary-400 transition-colors">{note.title}</h4>
                                                <p className="text-xs text-foreground-muted mt-1">{formatDate(note.date)} • {note.duration}</p>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="border-foreground/10 text-foreground-muted">
                                            {note.status}
                                        </Badge>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
