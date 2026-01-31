"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "motion/react"
import { useTranslations } from "next-intl"
import TestimonialCard from "@/components/ui/TestimonialCard"

export default function TestimonialsSection() {
    const t = useTranslations('testimonials')
    const [currentTestimonial, setCurrentTestimonial] = useState(0)

    // Get testimonials from translations
    const testimonials = [
        {
            quote: t('items.0.quote'),
            author: t('items.0.author'),
            role: t('items.0.role'),
            company: t('items.0.company'),
            rating: 5
        },
        {
            quote: t('items.1.quote'),
            author: t('items.1.author'),
            role: t('items.1.role'),
            company: t('items.1.company'),
            rating: 5
        },
        {
            quote: t('items.2.quote'),
            author: t('items.2.author'),
            role: t('items.2.role'),
            company: t('items.2.company'),
            rating: 5
        },
        {
            quote: t('items.3.quote'),
            author: t('items.3.author'),
            role: t('items.3.role'),
            company: t('items.3.company'),
            rating: 5
        }
    ]

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    return (
        <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none"></div>
            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl sm:text-5xl font-black mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        {t('subtitle')}
                    </p>
                </motion.div>

                {/* Desktop: Grid */}
                <div className="hidden lg:grid grid-cols-2 gap-6">
                    {testimonials.map((testimonial, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <TestimonialCard {...testimonial} />
                        </motion.div>
                    ))}
                </div>

                {/* Mobile: Carousel */}
                <div className="lg:hidden relative">
                    <motion.div
                        key={currentTestimonial}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ type: 'spring', damping: 20 }}
                    >
                        <TestimonialCard {...testimonials[currentTestimonial]} />
                    </motion.div>
                    <div className="flex justify-center gap-4 mt-6">
                        <button
                            onClick={prevTestimonial}
                            className="p-3 glass rounded-full border border-white/10 hover:border-primary/50 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-2">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentTestimonial(i)}
                                    className={`w-2 h-2 rounded-full transition-all ${i === currentTestimonial ? 'bg-primary w-6' : 'bg-white/20'
                                        }`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={nextTestimonial}
                            className="p-3 glass rounded-full border border-white/10 hover:border-primary/50 transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
