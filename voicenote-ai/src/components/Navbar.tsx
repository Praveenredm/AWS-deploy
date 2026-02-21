import * as React from 'react';
import { Link } from 'react-router-dom';
import { Mic, Menu, X } from 'lucide-react';
import { Button } from './ui/Button';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-600/20">
                            <Mic className="text-white w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">VoiceNote AI</span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">Features</a>
                        <a href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</a>
                        <ThemeToggle />
                        <Link to="/login" className="text-sm text-gray-400 hover:text-white transition-colors">Login</Link>
                        <Link to="/dashboard">
                            <Button size="sm">Try Demo</Button>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-400 hover:text-white p-2"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden bg-surface border-b border-white/5 px-4 py-4 space-y-4">
                    <a href="#features" className="block text-gray-400 hover:text-white">Features</a>
                    <a href="#pricing" className="block text-gray-400 hover:text-white">Pricing</a>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Theme</span>
                        <ThemeToggle />
                    </div>
                    <Link to="/login" className="block text-gray-400 hover:text-white">Login</Link>
                    <Link to="/dashboard" className="block">
                        <Button className="w-full">Try Demo</Button>
                    </Link>
                </div>
            )}
        </nav>
    );
}
