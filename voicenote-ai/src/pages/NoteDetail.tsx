import {
    ArrowLeft,
    Copy,
    Download,
    Trash2,
    Sparkles,
    FileText,
    Clock,
    Calendar,
    Mic,
    ListChecks,
    CheckCircle2
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { apiService } from '../services/apiService';
import { useAppStore } from '../store/useAppStore';
import { formatDate } from '../lib/utils';
import * as React from 'react';

export default function NoteDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = React.useState<any>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const deleteNote = useAppStore(state => state.deleteNote);

    React.useEffect(() => {
        const fetchNote = async () => {
            if (!id) return;
            const data = await apiService.getNoteById(id);
            if (data) {
                setNote(data);
            }
            setIsLoading(false);
        };
        fetchNote();
    }, [id]);

    const handleCopy = () => {
        navigator.clipboard.writeText(note.transcript);
        alert('Transcript copied to clipboard!');
    };

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this note?')) {
            await deleteNote(note.id);
            navigate('/dashboard/history');
        }
    };

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
            </div>
        );
    }

    if (!note) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-white mb-4">Note not found</h2>
                <Link to="/dashboard/history">
                    <Button variant="outline">Back to History</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in pb-20">
            <div className="flex items-center justify-between">
                <Link
                    to="/dashboard/history"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft size={18} />
                    <span>Back to History</span>
                </Link>

                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" onClick={handleCopy}>
                        <Copy size={16} className="mr-2" />
                        Copy
                    </Button>
                    <Button variant="outline" size="sm">
                        <Download size={16} className="mr-2" />
                        Export
                    </Button>
                    <Button variant="danger" size="sm" onClick={handleDelete}>
                        <Trash2 size={16} />
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Content: Transcript & Summary */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="bg-surface/50">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-2xl">{note.title}</CardTitle>
                            <Badge variant="success">Completed</Badge>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-6 text-sm text-gray-400">
                                <span className="flex items-center gap-1.5">
                                    <Calendar size={14} className="text-primary-400" />
                                    {formatDate(note.date)}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Clock size={14} className="text-primary-400" />
                                    {note.duration}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Mic size={14} className="text-primary-400" />
                                    Voice Note
                                </span>
                            </div>

                            <div className="pt-6 border-t border-white/5">
                                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                                    <Sparkles size={18} className="text-primary-400" />
                                    AI Summary
                                </h4>
                                <p className="text-gray-300 leading-relaxed bg-primary-950/20 p-4 rounded-xl border border-primary-500/10">
                                    {note.summary}
                                </p>
                            </div>

                            <div className="pt-6 border-t border-white/5">
                                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                                    <FileText size={18} className="text-primary-400" />
                                    Full Transcript
                                </h4>
                                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                                    {note.transcript}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar: Key Points & Action Items */}
                <div className="space-y-6">
                    <Card className="bg-surface/50">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <CheckCircle2 size={18} className="text-primary-400" />
                                Key Highlights
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {note.keyPoints.map((point: string, i: number) => (
                                    <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500/50 mt-1.5 shrink-0" />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="bg-surface/50">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <ListChecks size={18} className="text-emerald-400" />
                                Action Items
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {note.actionItems.map((item: string, i: number) => (
                                    <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                                        <div className="w-5 h-5 rounded border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                                            <div className="w-2 h-2 rounded-sm bg-emerald-500/0 group-hover:bg-emerald-500/50 transition-all" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
