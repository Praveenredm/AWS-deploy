import { Note, User } from '../types';

// Simulated storage
let mockNotes: Note[] = [
    {
        id: '1',
        title: 'Product Strategy Meeting',
        date: '2026-02-21T10:00:00Z',
        duration: '15:24',
        transcript: 'We discussed the roadmap for Q3. The focus will be on AI integration and improving the user dashboard. Key metrics include retention and NPS.',
        summary: 'Discussion on Q3 roadmap focusing on AI and dashboard improvements.',
        keyPoints: ['Q3 Roadmap focus', 'AI integration', 'Dashboard revamp'],
        actionItems: ['Prepare design system update', 'Schedule dev sync'],
        status: 'completed',
    },
    {
        id: '2',
        title: 'Interview with Sarah',
        date: '2026-02-21T14:30:00Z',
        duration: '42:10',
        transcript: 'Sarah has 5 years of experience in frontend development. She is proficient in React and AWS Amplify. Her previous projects involved real-time data streaming.',
        summary: 'Interview for Frontend Engineer position with Sarah.',
        keyPoints: ['5 years experience', 'React & AWS Amplify expert', 'Real-time project experience'],
        actionItems: ['Follow up interview', 'Check references'],
        status: 'completed',
    }
];

export const apiService = {
    getNotes: async (): Promise<Note[]> => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        return [...mockNotes].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    },

    getNoteById: async (id: string): Promise<Note | undefined> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockNotes.find(n => n.id === id);
    },

    deleteNote: async (id: string): Promise<void> => {
        mockNotes = mockNotes.filter(n => n.id !== id);
    },

    generateSummary: async (transcript: string): Promise<{ summary: string; keyPoints: string[]; actionItems: string[] }> => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        return {
            summary: 'Automatically generated summary from your transcript. Highlights key discussions and decisions.',
            keyPoints: ['Key point 1 extracted from transcript', 'Important milestone discussed', 'Technical requirement identified'],
            actionItems: ['Follow up with the team', 'Review technical docs', 'Sync on next steps'],
        };
    },

    saveNote: async (note: Omit<Note, 'id'>): Promise<Note> => {
        const newNote = { ...note, id: Math.random().toString(36).substr(2, 9) };
        mockNotes.push(newNote as Note);
        return newNote as Note;
    }
};
