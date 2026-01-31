"use client"

import { motion } from "motion/react"
import { useTranslations } from "next-intl"
import ShineText from "@/components/ui/ShineText"

export default function ValueProposition() {
    const t = useTranslations('value')

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl sm:text-5xl font-black mb-6">
                        {t('title')}{" "}
                        <ShineText
                            as="span"
                            fontSize="inherit"
                            fontWeight={900}
                            baseColor="#c026d3"
                            shineColor="#f0abfc"
                            duration={4}
                        >
                            {t('titleHighlight')}
                        </ShineText>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {t('description')} <strong className="text-foreground">{t('descriptionBold')}</strong> {t('descriptionEnd')}
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
