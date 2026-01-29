"use client"

import { ArrowRight, Play, CheckCircle } from "lucide-react"
import { motion } from "motion/react"
import GradientText from "@/components/ui/GradientText"
import GradientButton from "@/components/ui/GradientButton"
import ShineText from "@/components/ui/ShineText"
import WhatsAppDemo from "@/components/ui/WhatsAppDemo"
import ParticleBackground from "@/components/ui/ParticleBackground"

export default function HeroSection() {
    return (
        <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative min-h-screen flex items-center">
            <ParticleBackground particleCount={40} />
            <div className="max-w-7xl mx-auto w-full relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Text Content */}
                    <motion.div
                        className="text-center lg:text-left"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 glass rounded-full border-2 border-primary/30">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            <GradientText
                                colors={['#2f8db8ff', '#FF9FFC', '#5d6fe3ff']}
                                animationSpeed={8}
                                className="text-sm font-medium"
                            >
                                Agentes en Español adaptados al mercado boliviano
                            </GradientText>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-balance leading-tight tracking-tight">
                            Cierra más ventas{" "}
                            <ShineText
                                fontSize="inherit"
                                fontWeight={900}
                                baseColor="#0891b2"
                                shineColor="#67e8f9"
                                duration={5}
                            >
                                sin contratar más personal
                            </ShineText>
                        </h1>

                        <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 text-balance leading-relaxed">
                            Agentes inteligentes que atienden por WhatsApp 24/7, hacen seguimiento automático y venden por ti.
                            <span className="block mt-2 text-foreground font-medium">
                                Reduce costos, responde a todos tus clientes y escala tu negocio.
                            </span>
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
                            <GradientButton href="/login">
                                Comenzar gratis
                                <ArrowRight className="w-5 h-5" />
                            </GradientButton>
                            <motion.button
                                className="demo-button relative flex items-center gap-3 px-6 py-3 rounded-xl overflow-hidden group"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                }}
                            >
                                {/* Animated border gradient */}
                                <span
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{
                                        background: 'linear-gradient(90deg, rgba(3,169,244,0.2), rgba(244,65,165,0.2), rgba(3,169,244,0.2))',
                                        backgroundSize: '200% 100%',
                                        animation: 'shimmer 2s linear infinite',
                                    }}
                                />
                                {/* Play icon with ring */}
                                <span className="relative flex items-center justify-center w-10 h-10 rounded-full" style={{
                                    background: 'linear-gradient(135deg, rgba(3,169,244,0.2) 0%, rgba(244,65,165,0.2) 100%)',
                                    border: '2px solid rgba(255,255,255,0.15)',
                                }}>
                                    <span
                                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        style={{
                                            background: 'linear-gradient(135deg, #03a9f4 0%, #f441a5 100%)',
                                        }}
                                    />
                                    <Play className="w-4 h-4 text-white ml-0.5 relative z-10" fill="white" />
                                </span>
                                <span className="relative z-10 flex flex-col items-start">
                                    <span className="text-white font-semibold text-sm">Ver demo</span>
                                    <span className="text-white/50 text-xs">2 minutos</span>
                                </span>
                            </motion.button>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-primary" />
                                Sin tarjeta requerida
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-primary" />
                                Configuración en 5 min
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: WhatsApp Demo */}
                    <motion.div
                        className="relative hidden lg:block"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 rounded-[60px] blur-3xl opacity-50"></div>
                        <div className="relative">
                            <WhatsAppDemo />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
