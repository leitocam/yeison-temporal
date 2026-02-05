"use client"

import { motion } from "motion/react"
import { Check, User, Package, CreditCard, PartyPopper } from "lucide-react"
import { useTranslations } from "next-intl"
import type { RegisterStep } from "./types"

interface RegisterProgressProps {
    currentStep: RegisterStep
}

const steps: { key: RegisterStep; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: 'form', icon: User },
    { key: 'plan', icon: Package },
    { key: 'payment', icon: CreditCard },
    { key: 'confirmation', icon: PartyPopper },
]

export default function RegisterProgress({ currentStep }: RegisterProgressProps) {
    const t = useTranslations('register.progress')

    const currentIndex = steps.findIndex(s => s.key === currentStep)

    return (
        <div className="w-full max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                    const Icon = step.icon
                    const isCompleted = index < currentIndex
                    const isCurrent = index === currentIndex
                    const isUpcoming = index > currentIndex

                    return (
                        <div key={step.key} className="flex items-center flex-1">
                            {/* Step Circle */}
                            <motion.div
                                className={`
                  relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300
                  ${isCompleted
                                        ? 'bg-gradient-to-r from-primary to-accent border-transparent'
                                        : isCurrent
                                            ? 'border-primary/60 bg-primary/20'
                                            : 'border-primary/20 bg-card/50'
                                    }
                `}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {isCompleted ? (
                                    <Check className="w-5 h-5 text-white" />
                                ) : (
                                    <Icon className={`w-5 h-5 ${isCurrent ? 'text-primary' : 'text-muted-foreground'}`} />
                                )}

                                {/* Pulse effect for current step */}
                                {isCurrent && (
                                    <motion.div
                                        className="absolute inset-0 rounded-full border-2 border-primary"
                                        animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                )}
                            </motion.div>

                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div className="flex-1 h-0.5 mx-2 bg-primary/20 relative overflow-hidden">
                                    <motion.div
                                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent"
                                        initial={{ width: '0%' }}
                                        animate={{ width: isCompleted ? '100%' : '0%' }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                    />
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            {/* Step Labels */}
            <div className="flex items-center justify-between mt-3">
                {steps.map((step, index) => {
                    const isCurrent = index === currentIndex
                    const isCompleted = index < currentIndex

                    return (
                        <div key={`label-${step.key}`} className="flex-1 text-center first:text-left last:text-right">
                            <span className={`text-xs font-medium ${isCurrent || isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {t(`steps.${step.key}`)}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
