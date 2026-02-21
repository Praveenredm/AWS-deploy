import * as React from 'react';
import {
    Mic,
    Square,
    Pause,
    Play,
    RotateCcw,
    Save,
    Trash2,
    Sparkles,
    ListChecks,
    AlertCircle
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { motion, AnimatePresence } from 'framer-motion';
import { transcribeService } from '../services/transcribeService';
import { apiService } from '../services/apiService';
import { useAppStore } from '../store/useAppStore';
import { formatDuration, cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

export default function RecordingPage() {
    const navigate = useNavigate();
    const [isRecording, setIsRecording] = React.useState(false);
    const [isPaused, setIsPaused] = React.useState(false);
    const [duration, setDuration] = React.useState(0);
    const [transcript, setTranscript] = React.useState('');
    const [summaryData, setSummaryData] = React.useState<any>(null);
    const [isSummarizing, setIsSummarizing] = React.useState(false);

    const timerRef = React.useRef<number>();
    const stopStreamingRef = React.useRef<() => void>();
    const addNote = useAppStore(state => state.addNote);

    const startRecording = () => {
        setIsRecording(true);
        setIsPaused(false);
        setDuration(0);
        setTranscript('');
        setSummaryData(null);

        timerRef.current = window.setInterval(() => {
            setDuration((prev: number) => prev + 1);
        }, 1000);

        stopStreamingRef.current = transcribeService.startStreaming((chunk) => {
            setTranscript((prev: string) => prev + ' ' + chunk.text);
        });
    };

    const pauseRecording = () => {
        setIsPaused(true);
        clearInterval(timerRef.current);
        if (stopStreamingRef.current) stopStreamingRef.current();
    };

    const resumeRecording = () => {
        setIsPaused(false);
        timerRef.current = window.setInterval(() => {
            setDuration((prev: number) => prev + 1);
        }, 1000);
        stopStreamingRef.current = transcribeService.startStreaming((chunk) => {
            setTranscript((prev: string) => prev + ' ' + chunk.text);
        });
    };

    const stopRecording = async () => {
        clearInterval(timerRef.current);
        if (stopStreamingRef.current) stopStreamingRef.current();
        setIsRecording(false);
        setIsPaused(false);

        // Generate AI Summary
        setIsSummarizing(true);
        const data = await apiService.generateSummary(transcript);
        setSummaryData(data);
        setIsSummarizing(false);
    };

    const saveNote = async () => {
        if (!transcript) return;

        const newNote = await apiService.saveNote({
            title: `Note ${new Date().toLocaleTimeString()}`,
            date: new Date().toISOString(),
            duration: formatDuration(duration),
            transcript,
            summary: summaryData?.summary || '',
            keyPoints: summaryData?.keyPoints || [],
            actionItems: summaryData?.actionItems || [],
            status: 'completed'
        });

        addNote(newNote);
        navigate('/dashboard/history');
    };

    const discardNote = () => {
        if (confirm('Are you sure you want to discard this recording?')) {
            setIsRecording(false);
            setIsPaused(false);
            setDuration(0);
            setTranscript('');
            setSummaryData(null);
        }
    };

    React.useEffect(() => {
        return () => clearInterval(timerRef.current);
    }, []);

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-20">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">Real-time Transcription</h1>
                <p className="text-foreground-muted">Speak naturally, we'll take care of the rest.</p>
            </div>

            {/* Recording Control Center */}
            <Card className="bg-surface/50 border-foreground/10 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-600 via-indigo-600 to-primary-600 animate-pulse" />
                <CardContent className="p-8">
                    <div className="flex flex-col items-center gap-6">
                        <div className="relative">
                            {isRecording && !isPaused && (
                                <div className="absolute inset-0 bg-primary-500/20 rounded-full animate-recording-pulse" />
                            )}
                            <button
                                onClick={!isRecording ? startRecording : (isPaused ? resumeRecording : stopRecording)}
                                className={cn(
                                    "relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl active:scale-95",
                                    !isRecording ? "bg-primary-600 hover:bg-primary-500" : (isPaused ? "bg-emerald-600" : "bg-red-600 ring-4 ring-red-600/20")
                                )}
                            >
                                {!isRecording ? <Mic size={40} className="text-white" /> : (isPaused ? <Play size={40} className="text-white ml-2" /> : <Square size={32} className="text-white" />)}
                            </button>
                        </div>

                        <div className="text-center">
                            <p className="text-4xl font-mono font-bold text-foreground tracking-tighter">
                                {formatDuration(duration)}
                            </p>
                            <div className="flex items-center justify-center gap-2 mt-2">
                                <div className={cn("w-2 h-2 rounded-full", isRecording && !isPaused ? "bg-red-500 animate-pulse" : "bg-foreground/20")} />
                                <span className="text-sm font-medium text-foreground-muted uppercase tracking-widest">
                                    {isRecording ? (isPaused ? 'Paused' : 'Recording...') : 'Ready to record'}
                                </span>
                            </div>
                        </div>

                        {isRecording && (
                            <div className="flex gap-4">
                                <Button variant="outline" onClick={isPaused ? resumeRecording : pauseRecording}>
                                    {isPaused ? <Play size={18} className="mr-2" /> : <Pause size={18} className="mr-2" />}
                                    {isPaused ? 'Resume' : 'Pause'}
                                </Button>
                                <Button variant="danger" onClick={discardNote}>
                                    <Trash2 size={18} className="mr-2" />
                                    Discard
                                </Button>
                            </div>
                        )}

                        {!isRecording && transcript && (
                            <div className="flex gap-4">
                                <Button variant="primary" onClick={saveNote}>
                                    <Save size={18} className="mr-2" />
                                    Save Note
                                </Button>
                                <Button variant="outline" onClick={() => setTranscript('')}>
                                    <RotateCcw size={18} className="mr-2" />
                                    Start Over
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Visualization Placeholder */}
                    {isRecording && !isPaused && (
                        <div className="mt-8 h-12 flex items-center justify-center gap-1">
                            {[...Array(20)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ height: [12, Math.random() * 40 + 12, 12] }}
                                    transition={{ repeat: Infinity, duration: 0.5 + Math.random() * 0.5 }}
                                    className="w-1.5 bg-primary-500/40 rounded-full"
                                />
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Live Transcript */}
                <Card className="h-[400px] flex flex-col bg-surface/30">
                    <CardHeader className="border-b border-foreground/5 pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base flex items-center gap-2">
                                <Mic size={18} className="text-primary-400" />
                                Live Transcript
                            </CardTitle>
                            {isRecording && <Badge variant="primary" className="animate-pulse">Live</Badge>}
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto p-6">
                        {transcript ? (
                            <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                                {transcript}
                                {isRecording && !isPaused && <span className="inline-block w-1.5 h-4 ml-1 bg-primary-500 animate-pulse align-middle" />}
                            </p>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-foreground-muted text-center">
                                <p>Transcript will appear here as you speak.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* AI Summary Side Panel */}
                <Card className="h-[400px] flex flex-col bg-surface/30">
                    <CardHeader className="border-b border-foreground/5 pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                            <Sparkles size={18} className="text-amber-400" />
                            AI Insights
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto p-6">
                        {isSummarizing ? (
                            <div className="space-y-4 animate-pulse">
                                <div className="h-4 bg-white/5 rounded w-full" />
                                <div className="h-4 bg-white/5 rounded w-5/6" />
                                <div className="h-20 bg-white/5 rounded w-full mt-8" />
                            </div>
                        ) : summaryData ? (
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-xs font-bold text-foreground-muted uppercase tracking-wider mb-2">Executive Summary</h4>
                                    <p className="text-sm text-foreground/80 leading-relaxed italic border-l-2 border-primary-500/50 pl-4">
                                        {summaryData.summary}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                        <ListChecks size={14} className="text-emerald-400" />
                                        Key Action Items
                                    </h4>
                                    <ul className="space-y-2">
                                        {summaryData.actionItems.map((item: string, i: number) => (
                                            <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 mt-1.5 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-500 text-center">
                                <p>AI Insights will be generated after you stop recording.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
