import * as React from 'react';
import { Check } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/Card';

const tiers = [
    {
        name: 'Free',
        price: '$0',
        description: 'Perfect for getting started',
        features: ['30 mins/month', 'Basic AI Summary', 'Browser Recording', '7-day History'],
        buttonText: 'Get Started',
        popular: false,
    },
    {
        name: 'Pro',
        price: '$19',
        description: 'For professionals and creators',
        features: ['Unlimited Transcription', 'Advanced AI Insights', 'Export to PDF/TXT', 'Priority Support', 'Cloud Sync'],
        buttonText: 'Buy Pro',
        popular: true,
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        description: 'Scale with your organization',
        features: ['Bulk Processing', 'Custom AI Models', 'SSO & IAM', 'API Access', 'Dedicated Account Manager'],
        buttonText: 'Contact Sales',
        popular: false,
    },
];

export function Pricing() {
    return (
        <section id="pricing" className="py-24 relative bg-surface/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                        Simple, <span className="gradient-text">transparent</span> pricing
                    </h2>
                    <p className="text-foreground-muted text-lg">
                        Choose the plan that fits your needs.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {tiers.map((tier, idx) => (
                        <Card key={idx} className={tier.popular ? 'border-primary-500/50 bg-primary-500/5 ring-1 ring-primary-500/20' : ''}>
                            {tier.popular && (
                                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                                    <span className="px-3 py-1 bg-primary-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">Most Popular</span>
                                </div>
                            )}
                            <CardHeader>
                                <span className="text-primary-400 font-semibold mb-2 block">{tier.name}</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                                    {tier.price !== 'Custom' && <span className="text-foreground-muted text-sm">/mo</span>}
                                </div>
                                <p className="text-sm text-foreground-muted mt-2">{tier.description}</p>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {tier.features.map((feature, fIdx) => (
                                    <div key={fIdx} className="flex items-center gap-3 text-sm text-foreground/80">
                                        <Check className="text-primary-500 w-4 h-4 shrink-0" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full"
                                    variant={tier.popular ? 'primary' : 'outline'}
                                >
                                    {tier.buttonText}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
