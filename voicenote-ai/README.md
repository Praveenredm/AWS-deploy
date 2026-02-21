# VoiceNote AI

A modern SaaS platform for real-time speech-to-text transcription and AI-powered summarization. Built with React, TypeScript, and TailwindCSS.

## ✨ Features

- **Real-Time Transcription**: Streaming speech-to-text as you speak.
- **AI Summarization**: Instant extraction of executive summaries, key points, and action items.
- **Modern SaaS UI**: Beautiful glassmorphic design system with dark mode.
- **Note Management**: Organize, search, and manage your past recordings.
- **Responsive Design**: Optimized for Desktop, Tablet, and Mobile.

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: TailwindCSS + Framer Motion
- **Icons**: Lucide React
- **State Management**: Zustand
- **Routing**: React Router v6

## 🔌 AWS Integration (Ready)

This frontend is designed to be easily integrated with AWS services:
- **Amplify**: For Auth and hosting.
- **Transcribe**: Placeholder services are ready for streaming audio to AWS Transcribe.
- **API Gateway/Lambda**: Services are structured to call LLM-backed summarization endpoints.

## 🚀 Getting Started

1. **Clone and Install**:
```bash
npm install
```

2. **Run Development Server**:
```bash
npm run dev
```

3. **Build for Production**:
```bash
npm run build
```

## 📂 Project Structure

- `src/components`: Reusable UI and layout components.
- `src/pages`: Main application views.
- `src/services`: Mock services for Auth, API, and Transcription (AWS Integration points).
- `src/store`: Zustand state store.
- `src/types`: TypeScript definitions.
- `src/lib/utils.ts`: Tailwind merges and formatting helpers.

## 🎙️ Recording Logic

The app uses a simulated transcription stream for demonstration. The `transcribeService.ts` contains the logic which can be replaced with a real WebSocket connection to AWS Transcribe.
