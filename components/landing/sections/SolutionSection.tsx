"use client"

import { motion } from "motion/react"
import { useTranslations } from "next-intl"
import ShineText from "@/components/ui/ShineText"
import { SectionContainer, SectionHeader } from "@/components/landing/shared"

interface Pillar {
    icon: string
    title: string
    description: string
}

const PILLAR_ACCENTS = [
    { gradient: "from-primary/20 to-primary/5", border: "border-primary/25", glow: "rgba(163,255,0,0.08)" },
    { gradient: "from-blue-500/20 to-blue-500/5", border: "border-blue-500/25", glow: "rgba(59,130,246,0.08)" },
    { gradient: "from-violet-500/20 to-violet-500/5", border: "border-violet-500/25", glow: "rgba(139,92,246,0.08)" },
    { gradient: "from-amber-500/20 to-amber-500/5", border: "border-amber-500/25", glow: "rgba(245,158,11,0.08)" },
]

export default function SolutionSection() {
    const t = useTranslations('solution')
    const pillars = (t.raw('pillars') || []) as Pillar[]

    return (
        <section className="py-28 relative overflow-hidden bg-[#050505]">
            {/* Background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(163,255,0,0.05),transparent_50%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.03),transparent_50%)] pointer-events-none" />

            <SectionContainer width="section" className="relative z-10">
                {/* Header */}
                <SectionHeader
                    className="mb-8"
                    titleClassName="text-4xl sm:text-5xl lg:text-6xl"
                    title={
                        <>
                            {t('title')}{" "}
                            <ShineText
                                as="span"
                                fontSize="inherit"
                                fontWeight={900}
                                baseColor="#A3FF00"
                                shineColor="#C4FF4D"
                                duration={4}
                            >
                                {t('titleHighlight')}
                            </ShineText>
                        </>
                    }
                    subtitle={t('description')}
                />

                {/* Time badge */}
                <motion.div
                    className="flex justify-center mb-16"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/25">
                        <span className="text-xl">⚡</span>
                        <span className="text-sm font-bold text-primary uppercase tracking-wider">{t('subtitle')}</span>
                    </div>
                </motion.div>

                {/* Pillars Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {pillars.map((pillar, i) => {
                        const accent = PILLAR_ACCENTS[i % PILLAR_ACCENTS.length]
                        return (
                            <motion.div
                                key={i}
                                className="group relative"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                            >
                                <motion.div
                                    className={`relative h-full p-6 rounded-2xl border ${accent.border} bg-[#0A0A0A] overflow-hidden transition-all duration-300`}
                                    whileHover={{
                                        y: -8,
                                        boxShadow: `0 20px 40px ${accent.glow}`,
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    {/* Top gradient accent */}
                                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accent.gradient}`} />

                                    {/* Icon */}
                                    <motion.div
                                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${accent.gradient} flex items-center justify-center mb-5 border ${accent.border}`}
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                    >
                                        <span className="text-2xl">{pillar.icon}</span>
                                    </motion.div>

                                    {/* Content */}
                                    <h3 className="text-lg font-bold mb-3 text-foreground tracking-[-0.01em]">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {pillar.description}
                                    </p>

                                    {/* Hover glow effect */}
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                                        style={{ background: `radial-gradient(circle at 50% 0%, ${accent.glow}, transparent 70%)` }}
                                    />
                                </motion.div>
                            </motion.div>
                        )
                    })}
                </div>
            </SectionContainer>
        </section>
    )
}
