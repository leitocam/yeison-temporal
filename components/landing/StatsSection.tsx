"use client"

import { motion } from "motion/react"
import { useTranslations } from "next-intl"
import AnimatedCounter from "@/components/ui/AnimatedCounter"

export default function StatsSection() {
    const t = useTranslations('stats')

    const stats = [
        { value: 2.5, prefix: "Bs. ", suffix: "M+", label: t('salesManaged'), decimals: 1 },
        { value: 99.9, suffix: "%", label: t('uptime'), decimals: 1 },
        { value: 100, prefix: "<", suffix: "ms", label: t('responseTime'), decimals: 0 },
        { value: 40, suffix: "%", label: t('salesIncrease'), decimals: 0 }
    ]

    return (
        <section className="py-20 border-y border-border/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                            className="text-center p-6 glass rounded-2xl border-2 border-primary/20 hover:border-primary/40 transition-all group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            <div className="text-4xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                                <AnimatedCounter
                                    value={stat.value}
                                    prefix={stat.prefix}
                                    suffix={stat.suffix}
                                    decimals={stat.decimals}
                                />
                            </div>
                            <p className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
