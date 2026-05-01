"use client"

import { motion } from "motion/react"
import { useTranslations } from "next-intl"
import ShineText from "@/components/ui/ShineText"
import { SectionContainer, SectionHeader } from "@/components/landing/shared"

interface Problem {
    icon: string
    text: string
}

export default function ValueProposition() {
    const t = useTranslations('value')
    const problems = (t.raw('problems') || []) as Problem[]

    return (
        <section className="py-28 relative overflow-hidden">
            {/* Dramatic red gradient background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.06),transparent_60%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(239,68,68,0.04),transparent_50%)] pointer-events-none" />

            <SectionContainer width="section" className="relative z-10">
                {/* Section Header */}
                <SectionHeader
                    className="mb-16"
                    titleClassName="text-4xl sm:text-5xl lg:text-6xl"
                    title={
                        <>
                            {t('title')}{" "}
                            <ShineText
                                as="span"
                                fontSize="inherit"
                                fontWeight={900}
                                baseColor="#ef4444"
                                shineColor="#f87171"
                                duration={4}
                            >
                                {t('titleHighlight')}
                            </ShineText>
                        </>
                    }
                />

                {/* Problems Grid */}
                <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-5">
                    {problems.map((problem, i) => (
                        <motion.div
                            key={i}
                            className="group relative"
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                        >
                            <div className="relative p-6 rounded-2xl border border-red-500/15 bg-gradient-to-br from-red-500/[0.03] to-transparent backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-red-500/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.06)]">
                                {/* Subtle corner accent */}
                                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-red-500/10 to-transparent rounded-bl-3xl" />

                                <div className="relative flex items-start gap-4">
                                    {/* Animated Icon Container */}
                                    <motion.div
                                        className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center"
                                        whileHover={{ scale: 1.1, rotate: -5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <span className="text-2xl">{problem.icon}</span>
                                    </motion.div>

                                    <div className="flex-1 pt-1">
                                        <p className="text-foreground font-semibold text-[15px] leading-relaxed">
                                            {problem.text}
                                        </p>
                                    </div>
                                </div>

                                {/* Bottom accent line */}
                                <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Connecting visual element */}
                <motion.div
                    className="flex justify-center mt-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="flex items-center gap-3 px-6 py-3 rounded-full border border-border bg-card/50 backdrop-blur-sm">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-sm text-muted-foreground font-medium">
                            ¿Te suena familiar?
                        </span>
                        <svg className="w-4 h-4 text-muted-foreground animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </motion.div>
            </SectionContainer>
        </section>
    )
}
