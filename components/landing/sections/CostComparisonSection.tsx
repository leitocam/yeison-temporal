"use client"

import { motion } from "motion/react"
import { useTranslations } from "next-intl"
import ShineText from "@/components/ui/ShineText"
import { SectionContainer, SectionHeader } from "@/components/landing/shared"

export default function CostComparisonSection() {
    const t = useTranslations('costs')

    return (
        <section className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none"></div>
            <SectionContainer width="narrow" className="relative z-10">
                <SectionHeader
                    className="mb-12"
                    titleClassName="text-4xl sm:text-5xl lg:text-6xl"
                    subtitleClassName="max-w-none"
                    title={t('title')}
                    subtitle={t('subtitle')}
                />

                <motion.div
                    className="glass rounded-3xl p-8 border-2 border-primary/30"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                        {t('hiringTitle')}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-8">
                        <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-xl border border-red-500/30 hover:bg-red-500/15 transition-colors">
                            <span className="text-muted-foreground">{t('seller')}</span>
                            <span className="font-bold text-red-400">{t('sellerCost')}</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-xl border border-red-500/30 hover:bg-red-500/15 transition-colors">
                            <span className="text-muted-foreground">{t('community')}</span>
                            <span className="font-bold text-red-400">{t('communityCost')}</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-xl border border-red-500/30 hover:bg-red-500/15 transition-colors md:col-span-2">
                            <span className="text-muted-foreground">{t('benefits')}</span>
                            <span className="font-bold text-red-400">{t('benefitsCost')}</span>
                        </div>
                    </div>

                    <div className="text-center p-8 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl border-2 border-primary/40 relative overflow-hidden">
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
                                {t('yeisonReplaces')}
                            </ShineText>
                            <p className="text-4xl font-black text-accent mt-4 mb-2">{t('yeisonPrice')}</p>
                            <p className="text-muted-foreground">{t('yeisonBenefits')}</p>
                        </div>
                    </div>
                </motion.div>
            </SectionContainer>
        </section>
    )
}
