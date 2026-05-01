"use client"

import { motion } from "motion/react"
import { useTranslations } from "next-intl"
import { CheckCircle } from "lucide-react"
import ShineText from "@/components/ui/ShineText"
import { SectionContainer } from "@/components/landing/shared"

export default function DifferentiatorSection() {
    const t = useTranslations('differentiator')

    const features = t.raw('features') || []

    return (
        <section className="py-24 relative bg-[#050505]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(163,255,0,0.08),transparent_55%)] pointer-events-none"></div>

            <SectionContainer width="narrow" className="relative z-10 text-center">
                <motion.div
                    className="rounded-3xl border border-border bg-card px-6 py-12 sm:px-10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-balance leading-[1.1] tracking-[-0.02em]">
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
                    </h2>
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
                        {t('description')}
                    </p>

                    <div className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-4 mb-8">
                        {features.map((feature: string, i: number) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                                <span className="text-foreground font-medium">{feature}</span>
                            </motion.div>
                        ))}
                    </div>

                    <p className="text-lg font-semibold text-primary italic max-w-2xl mx-auto">
                        {t('footer')}
                    </p>
                </motion.div>
            </SectionContainer>
        </section>
    )
}
