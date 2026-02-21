import * as React from 'react';
import { motion } from 'framer-motion';
import { Mic, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary-600/10 blur-[120px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6">
                        <Sparkles size={14} />
                        <span>AI-Powered Transcription is here</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
                        Turn speech into <br />
                        <span className="gradient-text">structured notes</span> instantly
                    </h1>

                    <p className="text-xl text-foreground-muted max-w-2xl mx-auto mb-10 leading-relaxed">
                        Real-time transcription and AI summaries powered by cloud AI.
                        Focus on the conversation, let us handle the notes.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/dashboard">
                            <Button size="lg" className="h-14 px-8 text-lg gap-2">
                                Start Recording <Mic size={20} />
                            </Button>
                        </Link>
                        <Link to="/dashboard">
                            <Button size="lg" variant="outline" className="h-14 px-8 text-lg gap-2">
                                Try Demo <ArrowRight size={20} />
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                {/* Preview UI Placeholder */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="mt-20 relative px-4"
                >
                    <div className="max-w-4xl mx-auto glass-panel p-2 shadow-2xl shadow-primary-900/10">
                        <div className="bg-surface rounded-xl aspect-[16/10] flex items-center justify-center border border-foreground/5 overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-surface-lighter to-surface flex flex-col items-center justify-center p-8">
                                <div className="w-full max-w-md space-y-4 animate-pulse-slow">
                                    <div className="h-4 bg-foreground/5 rounded-full w-3/4" />
                                    <div className="h-4 bg-foreground/5 rounded-full w-full" />
                                    <div className="h-4 bg-foreground/5 rounded-full w-5/6" />
                                    <div className="h-20 bg-primary-500/5 rounded-xl border border-primary-500/10 w-full" />
                                    <div className="h-4 bg-white/5 rounded-full w-2/3" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
