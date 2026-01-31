"use client"

import {
    Navbar,
    HeroSection,
    StatsSection,
    ValueProposition,
    FeaturesSection,
    CostComparisonSection,
    TestimonialsSection,
    PricingSection,
    CTASection,
    Footer
} from "@/components/landing"

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-hidden">
            {/* Animated Background Gradient */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/8 rounded-full mix-blend-screen filter blur-[120px] opacity-60 animate-pulse"></div>
                <div
                    className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/8 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-pulse"
                    style={{ animationDelay: "1s" }}
                ></div>
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full mix-blend-screen filter blur-[80px] opacity-40 animate-pulse"
                    style={{ animationDelay: "2s" }}
                ></div>
            </div>

            {/* Page Sections */}
            <Navbar />
            <HeroSection />
            <StatsSection />
            <ValueProposition />
            <FeaturesSection />
            <CostComparisonSection />
            <TestimonialsSection />
            <PricingSection />
            <CTASection />
            <Footer />
        </div>
    )
}
