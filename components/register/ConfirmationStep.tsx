"use client"

import { motion } from "motion/react"
import { CheckCircle, Sparkles, ArrowRight, PartyPopper } from "lucide-react"
import { useTranslations } from "next-intl"
import GradientButton from "@/components/ui/GradientButton"
import GradientText from "@/components/ui/GradientText"
import type { SelectedPlan } from "./types"

interface ConfirmationStepProps {
    plan: SelectedPlan
    onContinue: () => void
}

export default function ConfirmationStep({ plan, onContinue }: ConfirmationStepProps) {
    const t = useTranslations('register.confirmation')

    return (
        <motion.div
            className="max-w-md mx-auto text-center space-y-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Success Animation */}
            <motion.div
                className="relative"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-2xl shadow-green-500/30">
                    <CheckCircle className="w-12 h-12 text-white" />
                </div>

                {/* Confetti particles */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute"
                        style={{
                            top: '50%',
                            left: '50%',
                        }}
                        initial={{ scale: 0, x: 0, y: 0 }}
                        animate={{
                            scale: [0, 1, 0],
                            x: Math.cos((i * 45) * Math.PI / 180) * 80,
                            y: Math.sin((i * 45) * Math.PI / 180) * 80,
                        }}
                        transition={{ delay: 0.4 + i * 0.05, duration: 0.8 }}
                    >
                        <Sparkles className="w-4 h-4 text-primary" />
                    </motion.div>
                ))}
            </motion.div>

            {/* Message */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <div className="flex items-center justify-center gap-2 mb-4">
                    <PartyPopper className="w-6 h-6 text-primary" />
                    <GradientText className="text-3xl font-black">
                        {t('title')}
                    </GradientText>
                    <PartyPopper className="w-6 h-6 text-accent" style={{ transform: 'scaleX(-1)' }} />
                </div>
                <p className="text-lg text-muted-foreground">
                    {t('subtitle')}
                </p>
            </motion.div>

            {/* Plan Summary Card */}
            <motion.div
                className="glass rounded-2xl p-6 border border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <div className="flex items-center justify-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-lg">{t('yourPlan')}</h3>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                        <span className="text-muted-foreground">{t('plan')}</span>
                        <span className="font-semibold">{plan.name}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                        <span className="text-muted-foreground">{t('price')}</span>
                        <span className="font-semibold text-primary">{plan.price}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                        <span className="text-muted-foreground">{t('billing')}</span>
                        <span className="font-semibold">
                            {plan.billingCycle === 'monthly' ? t('monthly') : t('annual')}
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Next Steps */}
            <motion.div
                className="text-left glass rounded-xl p-5 border border-primary/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
            >
                <h4 className="font-semibold mb-3">{t('nextSteps')}</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-primary">1</span>
                        </div>
                        {t('step1')}
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-primary">2</span>
                        </div>
                        {t('step2')}
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-primary">3</span>
                        </div>
                        {t('step3')}
                    </li>
                </ul>
            </motion.div>

            {/* CTA Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
            >
                <GradientButton onClick={onContinue}>
                    {t('continue')}
                    <ArrowRight className="w-4 h-4" />
                </GradientButton>
                <p className="mt-3 text-xs text-muted-foreground">
                    {t('setupTime')}
                </p>
            </motion.div>
        </motion.div>
    )
}
