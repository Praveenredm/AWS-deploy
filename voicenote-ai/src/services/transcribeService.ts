import { TranscriptionChunk } from '../types';

export const transcribeService = {
    // Mock streaming transcription
    startStreaming: (onChunk: (chunk: TranscriptionChunk) => void): () => void => {
        const phrases = [
            "Hello and welcome to the team meeting.",
            "Today we're going to discuss the new feature set for VoiceNote AI.",
            "We need to focus on real-time transcription and AI-powered summaries.",
            "AWS Transcribe is our primary choice for speech-to-text.",
            "The goal is to provide users with structured notes instantly.",
            "Let's make sure the UI is clean and professional.",
            "Any questions before we dive into the technical details?",
            "Great, let's start with the architecture overview."
        ];

        let currentPhraseIdx = 0;

        const interval = setInterval(() => {
            if (currentPhraseIdx < phrases.length) {
                onChunk({
                    text: phrases[currentPhraseIdx],
                    isPartial: false,
                    timestamp: Date.now()
                });
                currentPhraseIdx++;
            } else {
                clearInterval(interval);
            }
        }, 3000);

        return () => clearInterval(interval);
    },

    // Mock audio visualization
    getMockAnalyzer: (audioContext: AudioContext): AnalyserNode => {
        const analyzer = audioContext.createAnalyser();
        analyzer.fftSize = 256;
        return analyzer;
    }
};
