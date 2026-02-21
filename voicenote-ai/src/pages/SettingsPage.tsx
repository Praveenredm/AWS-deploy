import {
    User,
    Bell,
    Shield,
    CreditCard,
    Cpu,
    Languages
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export default function SettingsPage() {
    const sections = [
        { icon: User, title: 'Profile', description: 'Manage your account details and avatar.' },
        { icon: Bell, title: 'Notifications', description: 'Configure how you want to be alerted.' },
        { icon: Languages, title: 'Transcription', description: 'Set default language and dialect preferences.' },
        { icon: Cpu, title: 'AI Configuration', description: 'Choose your summarization model and style.' },
        { icon: CreditCard, title: 'Billing', description: 'Manage your subscription and invoices.' },
        { icon: Shield, title: 'Privacy & Security', description: 'Data encryption and session management.' },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
                <p className="text-gray-400">Manage your account and application preferences.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {sections.map((section, idx) => (
                    <Card key={idx} hover className="bg-surface/30 cursor-pointer group">
                        <CardContent className="p-6 flex gap-4">
                            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/5 group-hover:bg-primary-600/10 transition-colors">
                                <section.icon size={24} className="text-gray-400 group-hover:text-primary-400" />
                            </div>
                            <div>
                                <CardTitle className="text-base group-hover:text-primary-400 transition-colors">{section.title}</CardTitle>
                                <p className="text-sm text-gray-500 mt-1">{section.description}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="bg-red-500/5 border-red-500/10">
                <CardContent className="p-6 flex items-center justify-between">
                    <div>
                        <h4 className="text-red-400 font-semibold">Danger Zone</h4>
                        <p className="text-sm text-gray-500 mt-1">Permanently delete your account and all recordings.</p>
                    </div>
                    <Button variant="danger">Delete Account</Button>
                </CardContent>
            </Card>
        </div>
    );
}
