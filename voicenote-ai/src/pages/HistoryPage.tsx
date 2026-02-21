import {
    Search,
    Filter,
    Trash2,
    FileText,
    MoreHorizontal,
    ChevronRight,
    Mic,
    Calendar
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { formatDate } from '../lib/utils';
import * as React from 'react';

export default function HistoryPage() {
    const notes = useAppStore(state => state.notes);
    const deleteNote = useAppStore(state => state.deleteNote);
    const fetchNotes = useAppStore(state => state.fetchNotes);
    const [searchTerm, setSearchTerm] = React.useState('');

    React.useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    const filteredNotes = notes.filter(n =>
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.transcript.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">History</h1>
                    <p className="text-gray-400">Access and manage all your past recordings.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary-400 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search history..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-surface/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-200 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none w-full md:w-64"
                        />
                    </div>
                    <Button variant="outline" size="icon">
                        <Filter size={18} />
                    </Button>
                </div>
            </div>

            <div className="grid gap-3">
                {filteredNotes.length === 0 ? (
                    <Card className="p-20 text-center border-dashed border-white/10">
                        <p className="text-gray-500">No notes found matching your criteria.</p>
                    </Card>
                ) : (
                    filteredNotes.map((note) => (
                        <Card key={note.id} hover className="bg-surface/30 group">
                            <Link to={`/dashboard/note/${note.id}`} className="block">
                                <CardContent className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-primary-600/10 rounded-xl flex items-center justify-center border border-primary-600/20 group-hover:bg-primary-600/20 transition-all">
                                            <FileText size={20} className="text-primary-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white group-hover:text-primary-400 transition-colors">{note.title}</h4>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="flex items-center gap-1 text-xs text-gray-500">
                                                    <Calendar size={12} />
                                                    {formatDate(note.date)}
                                                </span>
                                                <span className="flex items-center gap-1 text-xs text-gray-500">
                                                    <Mic size={12} />
                                                    {note.duration}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between md:justify-end gap-6">
                                        <div className="max-w-[200px] hidden lg:block">
                                            <p className="text-xs text-gray-500 truncate">{note.summary}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="success">{note.status}</Badge>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (confirm('Delete this note?')) deleteNote(note.id);
                                                }}
                                                className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                            <ChevronRight size={18} className="text-gray-600 group-hover:text-white transition-all group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Link>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
