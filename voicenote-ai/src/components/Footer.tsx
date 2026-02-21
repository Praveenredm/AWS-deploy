import * as React from 'react';
import { Mic } from 'lucide-react';

export function Footer() {
    return (
        <footer className="py-12 border-t border-foreground/5 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                            <Mic className="text-white w-5 h-5" />
                        </div>
                        <span className="text-lg font-bold text-foreground tracking-tight">VoiceNote AI</span>
                    </div>

                    <div className="flex gap-8 text-sm text-foreground-muted">
                        <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-foreground transition-colors">Contact</a>
                    </div>

                    <p className="text-sm text-foreground-muted/60">
                        © 2026 VoiceNote AI. Built for AWS Workshop.
                    </p>
                </div>
            </div>
        </footer>
    );
}
