import * as React from 'react';
import { Zap, Shield, Globe, MessageSquare, List, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';

const features = [
    {
        icon: Zap,
        title: 'Real-time Transcription',
        description: 'Watch your words appear on screen instantly with sub-second latency.',
    },
    {
        icon: MessageSquare,
        title: 'AI Summaries',
        description: 'Get concise bullet points and action items from any conversation.',
    },
    {
        icon: List,
        title: 'Structured Notes',
        description: 'Automatically organize transcripts into readable, formatted documents.',
    },
    {
        icon: Globe,
        title: 'Multi-language',
        description: 'Support for over 50 languages with intelligent dialect detection.',
    },
    {
        icon: Shield,
        title: 'Privacy First',
        description: 'Your recordings are encrypted and never used for training models.',
    },
    {
        icon: Clock,
        title: 'Quick Search',
        description: 'Find any keyword across all your past recordings in seconds.',
    },
];

export function Features() {
    return (
        <section id="features" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                        Everything you need for <span className="gradient-text">perfect notes</span>
                    </h2>
                    <p className="text-foreground-muted text-lg">
                        Powerful features to help you capture, summarize, and organize your thoughts.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <Card key={idx} hover className="border-foreground/5">
                            <CardHeader>
                                <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mb-4 border border-primary-500/20">
                                    <feature.icon className="text-primary-400 w-6 h-6" />
                                </div>
                                <CardTitle>{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-foreground-muted leading-relaxed">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
