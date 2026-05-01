"use client"

import { Navbar, TestimonialsSection, CTASection, Footer } from "@/components/landing"

export default function TestimonialsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-hidden">
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/8 rounded-full mix-blend-screen filter blur-[120px] opacity-60 animate-pulse"></div>
            </div>
            <Navbar />
            <div className="pt-20">
                <TestimonialsSection />
            </div>
            <CTASection />
            <Footer />
        </div>
    )
}
