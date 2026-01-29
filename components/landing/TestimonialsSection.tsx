"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "motion/react"
import TestimonialCard from "@/components/ui/TestimonialCard"

const testimonials = [
    {
        quote: "Yeison transformó nuestra forma de vender. Antes perdíamos clientes por no responder a tiempo, ahora el agente responde al instante y nuestras ventas subieron un 40%.",
        author: "María Fernández",
        role: "Gerente Comercial",
        company: "Tienda El Sol",
        rating: 5
    },
    {
        quote: "El ROI fue inmediato. En el primer mes recuperamos la inversión. El agente de marketing nos genera contenido que realmente conecta con nuestros clientes bolivianos.",
        author: "Carlos Mamani",
        role: "Fundador",
        company: "TechnoCell Bolivia",
        rating: 5
    },
    {
        quote: "Pensé que la IA sería complicada, pero Yeison se configuró en minutos. Ahora tenemos un vendedor incansable que trabaja mientras dormimos.",
        author: "Ana Quispe",
        role: "Propietaria",
        company: "Boutique Elegance",
        rating: 5
    },
    {
        quote: "Nuestro equipo de 3 personas ahora rinde como si fuera de 10. Yeison maneja toda la primera línea de atención y solo nos pasan los clientes listos para comprar.",
        author: "Roberto Flores",
        role: "Director de Operaciones",
        company: "Distribuidora Oriental",
        rating: 5
    }
]

export default function TestimonialsSection() {
    const [currentTestimonial, setCurrentTestimonial] = useState(0)

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
                        Lo que dicen nuestros clientes
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        Empresas reales, resultados reales
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
