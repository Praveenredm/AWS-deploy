import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Pricing } from '../components/Pricing';
import { Footer } from '../components/Footer';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary-500/30">
            <Navbar />
            <main>
                <Hero />
                <Features />
                <Pricing />
            </main>
            <Footer />
        </div>
    );
}
