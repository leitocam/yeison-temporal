"use client"

import { ArrowRight } from "lucide-react"
import { motion } from "motion/react"
import { useTranslations } from "next-intl"
import GradientButton from "@/components/ui/GradientButton"
import ShineText from "@/components/ui/ShineText"
import ParticleBackground from "@/components/ui/ParticleBackground"

export default function CTASection() {
    const t = useTranslations('cta')

    return (
        <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <ParticleBackground particleCount={30} />
            <div className="absolute inset-0 glass border-y border-primary/30"></div>
            <div className="max-w-4xl mx-auto relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
                        <ShineText
                            as="span"
                            fontSize="inherit"
                            fontWeight={900}
                            baseColor="#d97706"
                            shineColor="#fde68a"
                            duration={5}
                        >
                            {t('title')}
                        </ShineText>
                    </h2>
                    <p className="text-xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
                        {t('description')}
                        <span className="block mt-2 font-medium text-foreground">{t('descriptionHighlight')}</span>
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <GradientButton href="/login">
                            {t('button')}
                            <ArrowRight className="w-5 h-5" />
                        </GradientButton>
                        <GradientButton href="/contact">
                            {t('buttonSecondary')}
                        </GradientButton>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
