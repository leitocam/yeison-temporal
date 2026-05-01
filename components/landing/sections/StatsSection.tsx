"use client"

import { motion } from "motion/react"
import { useTranslations } from "next-intl"
import AnimatedCounter from "@/components/ui/AnimatedCounter"
import { SectionContainer } from "@/components/landing/shared"

export default function StatsSection() {
    const t = useTranslations('stats')

    const stats = [
        { value: 3, prefix: "< ", suffix: " seg", label: t('responseTime'), decimals: 0 },
        { value: 24, suffix: "/7", label: t('uptime'), decimals: 0 },
        { value: 72, prefix: "< ", suffix: "h", label: t('setupTime'), decimals: 0 },
        { value: 8, suffix: "+", label: t('agentsAvailable'), decimals: 0 }
    ]

    return (
        <section className="py-20 border-y border-border relative overflow-hidden bg-[#070707]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(163,255,0,0.08),transparent_55%)]"></div>
            <SectionContainer width="section" className="relative z-10">
                <motion.p
                    className="text-center text-muted-foreground mb-12 text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {t('trust')}
                </motion.p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            className="text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            <div className="text-4xl font-black text-primary mb-2 tracking-[-0.02em]">
                                <AnimatedCounter
                                    value={stat.value}
                                    prefix={stat.prefix}
                                    suffix={stat.suffix}
                                    decimals={stat.decimals}
                                />
                            </div>
                            <p className="text-sm text-muted-foreground uppercase tracking-[0.15em]">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </SectionContainer>
        </section>
    )
}
