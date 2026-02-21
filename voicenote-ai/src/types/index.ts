export interface Note {
    id: string;
    title: string;
    date: string;
    duration: string;
    transcript: string;
    summary: string;
    keyPoints: string[];
    actionItems: string[];
    status: 'processing' | 'completed' | 'failed';
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
}

export interface TranscriptionChunk {
    text: string;
    isPartial: boolean;
    timestamp: number;
}

export interface RecordingState {
    isRecording: boolean;
    isPaused: boolean;
    duration: number;
    transcript: string;
    analyzer?: AnalyserNode;
}
