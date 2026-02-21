import { Mic, Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import * as React from 'react';

export default function LoginPage() {
    const navigate = useNavigate();
    const login = useAppStore(state => state.login);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await login('demo@example.com');
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-primary-600/5 blur-[120px] rounded-full -z-10" />

            <div className="w-full max-w-md space-y-8 glass-panel p-8">
                <div className="text-center">
                    <Link to="/" className="inline-flex items-center gap-2 mb-8">
                        <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Mic className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold text-white">VoiceNote AI</span>
                    </Link>
                    <h2 className="text-2xl font-bold text-white">Welcome back</h2>
                    <p className="text-gray-400 mt-2 text-sm">Please enter your details to sign in.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary-400 transition-colors" size={18} />
                                <input
                                    type="email"
                                    defaultValue="demo@example.com"
                                    className="w-full bg-surface/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-gray-200 outline-none focus:ring-1 focus:ring-primary-500 transition-all font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary-400 transition-colors" size={18} />
                                <input
                                    type="password"
                                    defaultValue="••••••••"
                                    className="w-full bg-surface/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-gray-200 outline-none focus:ring-1 focus:ring-primary-500 transition-all font-medium"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <Button type="submit" className="w-full h-12 text-base gap-2" isLoading={isLoading}>
                        Sign In <ArrowRight size={18} />
                    </Button>

                    <Button variant="outline" className="w-full h-12" onClick={() => navigate('/dashboard')}>
                        Continue as Guest
                    </Button>
                </form>

                <p className="text-center text-xs text-gray-500">
                    Don't have an account? <a href="#" className="text-primary-400 hover:text-primary-300">Sign up for free</a>
                </p>
            </div>
        </div>
    );
}
