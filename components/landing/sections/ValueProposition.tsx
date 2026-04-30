"use client"

import { motion } from "motion/react"
import { useTranslations } from "next-intl"
import ShineText from "@/components/ui/ShineText"
import SectionContainer from "@/components/landing/shared/SectionContainer"

export default function ValueProposition() {
    const t = useTranslations('value')

    return (
        <section className="py-24 relative bg-[#060606]">
            <SectionContainer width="narrow" className="text-center">
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
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        {t('description')} <strong className="text-primary font-semibold">{t('descriptionBold')}</strong> {t('descriptionEnd')}
                    </p>
                </motion.div>
            </SectionContainer>
        </section>
    )
}
