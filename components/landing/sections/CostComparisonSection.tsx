"use client"

import { motion } from "motion/react"
import { useTranslations } from "next-intl"
import ShineText from "@/components/ui/ShineText"
import { SectionContainer, SectionHeader } from "@/components/landing/shared"

interface ComparisonRow {
    aspect: string
    employee: string
    yeison: string
}

export default function CostComparisonSection() {
    const t = useTranslations('costs')
    const rows = (t.raw('rows') || []) as ComparisonRow[]

    return (
        <section className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none"></div>
            <SectionContainer width="narrow" className="relative z-10">
                <SectionHeader
                    className="mb-12"
                    titleClassName="text-4xl sm:text-5xl lg:text-6xl"
                    subtitleClassName="max-w-none"
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
                                {t('subtitle')}
                            </ShineText>
                        </>
                    }
                />

                <motion.div
                    className="glass rounded-3xl p-6 sm:p-8 border-2 border-primary/30"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-xl font-bold mb-6 text-center">{t('tableTitle')}</h3>

                    {/* Table Header */}
                    <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="p-3 text-sm font-bold uppercase tracking-wider text-muted-foreground">{t('headers.aspect')}</div>
                        <div className="p-3 text-sm font-bold uppercase tracking-wider text-center text-red-400">{t('headers.employee')}</div>
                        <div className="p-3 text-sm font-bold uppercase tracking-wider text-center text-primary">{t('headers.yeison')}</div>
                    </div>

                    {/* Table Rows */}
                    <div className="space-y-2">
                        {rows.map((row, i) => (
                            <motion.div
                                key={i}
                                className="grid grid-cols-3 gap-2 rounded-xl overflow-hidden"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <div className="p-3 sm:p-4 bg-card border border-border rounded-l-xl text-sm font-medium text-foreground">{row.aspect}</div>
                                <div className="p-3 sm:p-4 bg-red-500/5 border border-red-500/20 text-sm text-center text-red-400">{row.employee}</div>
                                <div className="p-3 sm:p-4 bg-primary/5 border border-primary/20 rounded-r-xl text-sm text-center text-primary font-semibold">{row.yeison}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Insight */}
                    <div className="text-center p-6 sm:p-8 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl border-2 border-primary/40 relative overflow-hidden mt-6">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 animate-pulse"></div>
                        <div className="relative z-10">
                            <ShineText
                                as="h3"
                                fontSize="24px"
                                fontWeight={900}
                                baseColor="#22c55e"
                                shineColor="#86efac"
                                duration={6}
                                className="mb-2"
                            >
                                {t('insight')}
                            </ShineText>
                            <p className="text-lg font-bold text-primary mt-2">{t('insightPrice')}</p>
                        </div>
                    </div>
                </motion.div>
            </SectionContainer>
        </section>
    )
}
