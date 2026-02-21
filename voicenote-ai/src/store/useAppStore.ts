import { create } from 'zustand';
import { User, Note, RecordingState } from '../types';
import { authService } from '../services/authService';
import { apiService } from '../services/apiService';

interface AppState {
    user: User | null;
    notes: Note[];
    isLoading: boolean;
    recording: RecordingState;
    theme: 'light' | 'dark';

    // Auth actions
    login: (email: string) => Promise<void>;
    logout: () => Promise<void>;

    // Note actions
    fetchNotes: () => Promise<void>;
    addNote: (note: Note) => void;
    deleteNote: (id: string) => Promise<void>;

    // Recording actions
    setRecording: (recording: Partial<RecordingState>) => void;

    // Theme actions
    toggleTheme: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
    user: authService.getCurrentUser(),
    notes: [],
    isLoading: false,
    recording: {
        isRecording: false,
        isPaused: false,
        duration: 0,
        transcript: '',
    },
    theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'dark',

    login: async (email: string) => {
        set({ isLoading: true });
        try {
            const user = await authService.login(email);
            set({ user, isLoading: false });
        } catch (error) {
            set({ isLoading: false });
        }
    },

    logout: async () => {
        await authService.logout();
        set({ user: null });
    },

    fetchNotes: async () => {
        set({ isLoading: true });
        try {
            const notes = await apiService.getNotes();
            set({ notes, isLoading: false });
        } catch (error) {
            set({ isLoading: false });
        }
    },

    addNote: (note: Note) => {
        set((state) => ({ notes: [note, ...state.notes] }));
    },

    deleteNote: async (id: string) => {
        await apiService.deleteNote(id);
        set((state) => ({ notes: state.notes.filter((n) => n.id !== id) }));
    },

    setRecording: (recording) => {
        set((state) => ({
            recording: { ...state.recording, ...recording },
        }));
    },

    toggleTheme: () => {
        set((state) => {
            const newTheme = state.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            if (newTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            return { theme: newTheme };
        });
    },
}));
