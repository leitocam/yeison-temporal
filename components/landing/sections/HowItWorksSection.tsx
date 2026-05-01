"use client"

import { motion } from "motion/react"
import { useTranslations } from "next-intl"
import ShineText from "@/components/ui/ShineText"
import { SectionContainer, SectionHeader } from "@/components/landing/shared"

interface Step {
    number: number
    title: string
    description: string
}

export default function HowItWorksSection() {
    const t = useTranslations('howItWorks')

    const steps = (t.raw('steps') || []) as Step[]

    return (
        <section className="py-24 relative bg-[#060606]">
            <SectionContainer width="section">
                <SectionHeader
                    className="mb-16"
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
                    subtitle={t('subtitle')}
                />

                <div className="max-w-4xl mx-auto">
                    <div className="space-y-8">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                className="relative"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="flex gap-6 items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-primary text-primary-foreground font-bold text-lg">
                                            {step.number}
                                        </div>
                                    </div>
                                    <div className="flex-1 pt-1">
                                        <h3 className="text-xl font-bold mb-2 text-foreground">{step.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                                    </div>
                                </div>
                                {i < steps.length - 1 && (
                                    <div className="absolute left-7 top-14 w-0.5 h-12 bg-gradient-to-b from-primary/50 to-transparent"></div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className="mt-12 p-6 rounded-2xl border border-primary/30 bg-primary/5 text-center"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-lg font-semibold text-primary">{t('subtitle')}</p>
                    </motion.div>
                </div>
            </SectionContainer>
        </section>
    )
}
