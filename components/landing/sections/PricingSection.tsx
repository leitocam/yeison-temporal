"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useTranslations } from "next-intl"
import { Check } from "lucide-react"
import ShineText from "@/components/ui/ShineText"
import { SectionContainer, SectionHeader } from "@/components/landing/shared"
import { Link } from "@/i18n/routing"

const PLAN_KEYS = ["starter", "duo", "pro", "full", "max"] as const

export default function PricingSection() {
    const t = useTranslations('pricing')
    const [isAnnual, setIsAnnual] = useState(false)

    return (
        <section id="pricing" className="py-24 bg-[#060606] relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(163,255,0,0.04),transparent_55%)] pointer-events-none"></div>
            <SectionContainer width="section" className="relative z-10">
                <SectionHeader
                    className="mb-12"
                    title={
                        <>
                            {t('title').split(' ')[0]}{" "}
                            <ShineText
                                as="span"
                                fontSize="inherit"
                                fontWeight={900}
                                baseColor="#A3FF00"
                                shineColor="#C4FF4D"
                                duration={4}
                            >
                                {t('title').split(' ').slice(1).join(' ')}
                            </ShineText>
                        </>
                    }
                    subtitle={t('subtitle')}
                />

                {/* Monthly / Annual Toggle */}
                <div className="flex items-center justify-center gap-4 mb-14">
                    <span className={`text-sm font-medium transition-colors ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {t('monthly')}
                    </span>
                    <button
                        onClick={() => setIsAnnual(!isAnnual)}
                        className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${isAnnual ? 'bg-primary' : 'bg-muted'}`}
                        aria-label="Toggle annual pricing"
                    >
                        <motion.span
                            className="inline-block h-5 w-5 rounded-full bg-white shadow-md"
                            animate={{ x: isAnnual ? 30 : 4 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                    </button>
                    <span className={`text-sm font-medium transition-colors ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {t('annual')} <span className="text-primary font-bold">{t('discount')}</span>
                    </span>
                </div>

                {/* Plans Grid - 5 cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {PLAN_KEYS.map((key, i) => {
                        const isPro = key === "pro"
                        const agents = parseInt(t(`plans.${key}.agents`))
                        const features = t.raw(`plans.${key}.features`) as string[]

                        return (
                            <motion.div
                                key={key}
                                className={`rounded-2xl border p-5 flex flex-col relative overflow-hidden transition-all ${
                                    isPro
                                        ? 'border-primary bg-primary/5 shadow-[0_0_40px_rgba(163,255,0,0.08)]'
                                        : 'border-border bg-card hover:border-primary/30'
                                }`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                whileHover={{ y: -5 }}
                            >
                                {isPro && (
                                    <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-xs font-bold text-center py-1 uppercase tracking-widest">
                                        {t('recommended')}
                                    </div>
                                )}

                                <div className={isPro ? "mt-5" : ""}>
                                    <h3 className="text-lg font-bold mb-1">{t(`plans.${key}.name`)}</h3>
                                    <p className="text-xs text-muted-foreground mb-3">{t(`plans.${key}.description`)}</p>

                                    {/* Agent count badge */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="flex -space-x-1.5">
                                            {Array.from({ length: agents }).map((_, j) => (
                                                <div key={j} className="w-6 h-6 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center">
                                                    <span className="text-[10px]">🤖</span>
                                                </div>
                                            ))}
                                        </div>
                                        <span className="text-xs text-muted-foreground">
                                            {agents} {agents === 1 ? t('agentsLabel') : t('agentsLabelPlural')}
                                        </span>
                                    </div>

                                    {/* Price */}
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={isAnnual ? 'annual' : 'monthly'}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="mb-4"
                                        >
                                            <span className="text-2xl font-black text-foreground">
                                                {isAnnual ? t(`plans.${key}.priceAnnual`) : t(`plans.${key}.priceMonthly`)}
                                            </span>
                                            <span className="text-xs text-muted-foreground ml-1">
                                                {isAnnual ? t('perMonthAnnual') : t('perMonth')}
                                            </span>
                                        </motion.div>
                                    </AnimatePresence>

                                    {/* Features */}
                                    <ul className="space-y-2 mb-5 flex-1">
                                        {features.map((feature, j) => (
                                            <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                                                <Check className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${isPro ? 'text-primary' : 'text-muted-foreground'}`} />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA Button */}
                                    <Link href="/register">
                                        <motion.button
                                            className={`w-full py-2.5 px-4 rounded-xl text-sm font-bold transition-all ${
                                                isPro
                                                    ? 'bg-primary text-primary-foreground hover:brightness-110 shadow-lg shadow-primary/30'
                                                    : 'bg-card border border-border text-foreground hover:border-primary/50'
                                            }`}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {t(`plans.${key}.cta`)}
                                        </motion.button>
                                    </Link>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Insight bar */}
                <motion.div
                    className="mt-10 text-center p-4 rounded-2xl bg-primary/5 border border-primary/20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p className="text-lg font-bold text-primary">💡 {t('insightText')}</p>
                </motion.div>
            </SectionContainer>
        </section>
    )
}
