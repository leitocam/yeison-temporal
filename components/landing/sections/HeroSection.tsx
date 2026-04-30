"use client"

import { ArrowRight, CheckCircle } from "lucide-react"
import { motion } from "motion/react"
import { useTranslations } from "next-intl"
import GradientText from "@/components/ui/GradientText"
import GradientButton from "@/components/ui/GradientButton"
import ShineText from "@/components/ui/ShineText"
import WhatsAppDemo from "@/components/ui/WhatsAppDemo"
import ParticleBackground from "@/components/ui/ParticleBackground"
import { HeroDemoButton, SectionContainer } from "@/components/landing/shared"
import { HERO_BADGE_COLORS, HERO_DEMO_VIDEO_URL, HERO_SHINE_COLORS } from "@/components/landing/theme"

export default function HeroSection() {
    const t = useTranslations('hero')

    return (
        <section className="pt-32 pb-24 relative min-h-screen flex items-center bg-background">
            <ParticleBackground particleCount={40} />
            <SectionContainer width="landing" className="w-full relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Text Content */}
                    <motion.div
                        className="text-center lg:text-left"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 glass rounded-full border-2 border-primary/30">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            <GradientText
                                colors={[...HERO_BADGE_COLORS]}
                                animationSpeed={8}
                                className="text-sm font-medium text-primary"
                            >
                                {t('badge')}
                            </GradientText>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-balance leading-[1.08] tracking-[-0.02em]">
                            {t('title')}{" "}
                            <ShineText
                                fontSize="inherit"
                                fontWeight={900}
                                baseColor={HERO_SHINE_COLORS.base}
                                shineColor={HERO_SHINE_COLORS.shine}
                                duration={5}
                            >
                                {t('titleHighlight')}
                            </ShineText>
                        </h1>

                        <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 text-balance leading-relaxed">
                            {t('description')}
                            <span className="block mt-2 text-primary font-medium">
                                {t('descriptionHighlight')}
                            </span>
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
                            <GradientButton href="/login">
                                {t('cta')}
                                <ArrowRight className="w-5 h-5" />
                            </GradientButton>
                            <HeroDemoButton
                                label={t('demo')}
                                timeLabel={t('demoTime')}
                                modalTitle={t('demoModalTitle')}
                                modalUnavailable={t('demoModalUnavailable')}
                                modalActionLabel={t('demoModalAction')}
                                modalCloseLabel={t('demoModalClose')}
                                videoUrl={HERO_DEMO_VIDEO_URL}
                            />
                        </div>

                        <div className="lg:hidden mb-10 flex justify-center">
                            <div className="w-full max-w-[380px]">
                                <WhatsAppDemo compact />
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-primary" />
                                {t('noCard')}
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-primary" />
                                {t('setup')}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: WhatsApp Demo */}
                    <motion.div
                        className="relative hidden lg:block"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="absolute -inset-4 bg-[radial-gradient(circle_at_center,rgba(163,255,0,0.2),rgba(163,255,0,0.02)_65%,transparent)] rounded-[60px] blur-3xl opacity-60"></div>
                        <div className="relative">
                            <WhatsAppDemo />
                        </div>
                    </motion.div>
                </div>
            </SectionContainer>
        </section>
    )
}
