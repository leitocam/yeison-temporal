"use client"

import {
    Navbar,
    HeroSection,
    ValueProposition,
    SolutionSection,
    FeaturesSection,
    HowItWorksSection,
    StatsSection,
    CostComparisonSection,
    DifferentiatorSection,
    TestimonialsSection,
    PricingSection,
    CTASection,
    Footer
} from "@/components/landing"

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-hidden">
            {/* Animated Background — Orbital Glow */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute w-[700px] h-[700px] bg-primary/6 rounded-full mix-blend-screen filter blur-[140px]"
                    style={{
                        top: '10%',
                        left: '15%',
                        animation: 'orbitalFloat 20s ease-in-out infinite',
                    }}
                />
                <div
                    className="absolute w-[500px] h-[500px] bg-accent/5 rounded-full mix-blend-screen filter blur-[120px]"
                    style={{
                        bottom: '15%',
                        right: '10%',
                        animation: 'orbitalFloat 25s ease-in-out infinite reverse',
                    }}
                />
                <div
                    className="absolute w-[350px] h-[350px] bg-primary/4 rounded-full mix-blend-screen filter blur-[100px]"
                    style={{
                        top: '45%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        animation: 'pulseGlow 8s ease-in-out infinite',
                    }}
                />
                {/* Subtle grid pattern overlay */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(163,255,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(163,255,0,0.3) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />
            </div>

            <style jsx>{`
                @keyframes orbitalFloat {
                    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
                    25% { transform: translate(80px, -60px) scale(1.1); opacity: 0.7; }
                    50% { transform: translate(-40px, 40px) scale(0.95); opacity: 0.4; }
                    75% { transform: translate(60px, 80px) scale(1.05); opacity: 0.6; }
                }
                @keyframes pulseGlow {
                    0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
                    50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.2); }
                }
            `}</style>

            {/* Page Sections — Strategic Flow */}
            <Navbar />
            <HeroSection />
            <ValueProposition />
            <SolutionSection />
            <FeaturesSection />
            <HowItWorksSection />
            <PricingSection />
            <StatsSection />
            <CostComparisonSection />
            <DifferentiatorSection />
            <TestimonialsSection />
            <CTASection />
            <Footer />
        </div>
    )
}
