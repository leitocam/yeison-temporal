"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { CheckCircle, Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"
import GradientButton from "@/components/ui/GradientButton"
import type { SelectedPlan } from "./types"

interface PlanSelectionProps {
    onSelect: (plan: SelectedPlan) => void
    initialPlan?: SelectedPlan
}

export default function PlanSelection({ onSelect, initialPlan }: PlanSelectionProps) {
    const t = useTranslations('pricing')
    const tRegister = useTranslations('register.plan')

    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>(
        initialPlan?.billingCycle || 'monthly'
    )
    const [selectedPlanId, setSelectedPlanId] = useState<string | null>(
        initialPlan?.id || null
    )

    const plans = [
        {
            id: 'starter',
            name: t('plans.starter.name'),
            price: billingCycle === 'monthly' ? t('plans.starter.priceMonthly') : t('plans.starter.priceAnnual'),
            period: billingCycle === 'monthly' ? t('perMonth') : t('perMonthAnnual'),
            description: t('plans.starter.description'),
            features: [
                t('plans.starter.features.0'),
                t('plans.starter.features.1'),
                t('plans.starter.features.2'),
                t('plans.starter.features.3')
            ],
            highlight: false
        },
        {
            id: 'duo',
            name: t('plans.duo.name'),
            price: billingCycle === 'monthly' ? t('plans.duo.priceMonthly') : t('plans.duo.priceAnnual'),
            period: billingCycle === 'monthly' ? t('perMonth') : t('perMonthAnnual'),
            description: t('plans.duo.description'),
            features: [
                t('plans.duo.features.0'),
                t('plans.duo.features.1'),
                t('plans.duo.features.2'),
                t('plans.duo.features.3')
            ],
            highlight: false
        },
        {
            id: 'pro',
            name: t('plans.pro.name'),
            price: billingCycle === 'monthly' ? t('plans.pro.priceMonthly') : t('plans.pro.priceAnnual'),
            period: billingCycle === 'monthly' ? t('perMonth') : t('perMonthAnnual'),
            description: t('plans.pro.description'),
            features: [
                t('plans.pro.features.0'),
                t('plans.pro.features.1'),
                t('plans.pro.features.2'),
                t('plans.pro.features.3'),
                t('plans.pro.features.4')
            ],
            highlight: true
        },
        {
            id: 'full',
            name: t('plans.full.name'),
            price: billingCycle === 'monthly' ? t('plans.full.priceMonthly') : t('plans.full.priceAnnual'),
            period: billingCycle === 'monthly' ? t('perMonth') : t('perMonthAnnual'),
            description: t('plans.full.description'),
            features: [
                t('plans.full.features.0'),
                t('plans.full.features.1'),
                t('plans.full.features.2'),
                t('plans.full.features.3'),
                t('plans.full.features.4')
            ],
            highlight: false
        }
    ]

    const handleSelectPlan = (plan: typeof plans[0]) => {
        setSelectedPlanId(plan.id)
        onSelect({
            id: plan.id,
            name: plan.name,
            price: plan.price,
            period: plan.period,
            billingCycle
        })
    }

    return (
        <motion.div
            className="space-y-6 sm:space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Header */}
            <div className="text-center px-4">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">{tRegister('title')}</h2>
                <p className="text-muted-foreground text-sm sm:text-base">{tRegister('subtitle')}</p>
            </div>

            {/* Billing Toggle */}
            <div className="flex justify-center px-4">
                <div className="inline-flex items-center gap-2 sm:gap-4 p-1.5 sm:p-2 glass rounded-full border border-white/10">
                    <button
                        type="button"
                        onClick={() => setBillingCycle('monthly')}
                        className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${billingCycle === 'monthly'
                            ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                            : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        {t('monthly')}
                    </button>
                    <button
                        type="button"
                        onClick={() => setBillingCycle('annual')}
                        className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-1 sm:gap-2 ${billingCycle === 'annual'
                            ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                            : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        {t('annual')}
                        <span className="text-[10px] sm:text-xs bg-green-500/20 text-green-400 px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap">
                            {t('discount')}
                        </span>
                    </button>
                </div>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2 sm:px-0" id="planes">
                {plans.map((plan, i) => {
                    const isSelected = selectedPlanId === plan.id

                    return (
                        <motion.div
                            key={plan.id}
                            className={`
                                relative rounded-2xl border-2 cursor-pointer transition-all duration-300
                                ${plan.highlight
                                    ? 'bg-gradient-to-br from-primary/20 to-accent/10 border-primary/60 shadow-lg shadow-primary/20'
                                    : isSelected
                                        ? 'border-primary bg-primary/10'
                                        : 'glass border-primary/20 hover:border-primary/40'
                                }
                            `}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -4 }}
                            onClick={() => handleSelectPlan(plan)}
                        >
                            {/* Recommended Badge */}
                            {plan.highlight && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-primary to-accent text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1 whitespace-nowrap">
                                    <Sparkles className="w-3 h-3" />
                                    {t('recommended')}
                                </div>
                            )}

                            {/* Selected Checkmark */}
                            {isSelected && (
                                <motion.div
                                    className="absolute top-3 right-3"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                >
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-lg">
                                        <CheckCircle className="w-4 h-4 text-white" />
                                    </div>
                                </motion.div>
                            )}

                            <div className="p-4 sm:p-5 h-full flex flex-col">
                                {/* Plan Name & Description */}
                                <div className="text-center mb-3">
                                    <h3 className="text-lg font-bold">{plan.name}</h3>
                                    <p className="text-muted-foreground text-xs mt-1">{plan.description}</p>
                                </div>

                                {/* Price */}
                                <div className="text-center mb-4">
                                    <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">{plan.price}</div>
                                    <div className="text-muted-foreground text-xs">{plan.period}</div>
                                </div>

                                {/* Features */}
                                <ul className="space-y-2 mb-4 flex-1">
                                    {plan.features.map((feature, j) => (
                                        <li key={j} className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                            <span className="text-xs text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Button */}
                                <div className="mt-auto">
                                    <GradientButton onClick={() => handleSelectPlan(plan)} fullWidth>
                                        {isSelected ? tRegister('selected') : tRegister('select')}
                                    </GradientButton>
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
            {/* Legal notice */}
            <div className="px-2 sm:px-0">
                <div className="rounded-2xl border border-border/50 bg-white/[0.03] p-4 sm:p-5 text-center space-y-2">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        Al seleccionar un plan y continuar, aceptas los{" "}
                        <a
                            href="/terms"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline font-medium"
                        >
                            Términos y Condiciones
                        </a>{" "}
                        y la{" "}
                        <a
                            href="/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline font-medium"
                        >
                            Política de Privacidad
                        </a>{" "}
                        de Yeison AI. Los planes de pago se renuevan automáticamente cada período.
                        Puedes cancelar en cualquier momento desde tu panel de configuración.
                    </p>
                    <p className="text-[11px] text-muted-foreground/60">
                        Los precios están expresados en bolivianos (Bs.) e incluyen acceso completo a las funcionalidades del plan seleccionado.
                    </p>
                </div>
            </div>
        </motion.div>
    )
}
