"use client"

import { useState } from "react"
import { Link } from "@/i18n/routing"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { Zap, Settings, CreditCard, Headphones } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import GradientText from "@/components/ui/GradientText"
import LanguageSwitcher from "@/components/ui/LanguageSwitcher"
import Image from "next/image"
import LogoHorizontal from "@/components/Logos/LogoHorizontal.png"
import {
    RegisterProgress,
    RegisterForm,
    PlanSelection,
    PaymentQR,
    ConfirmationStep,
} from "@/components/register"
import type { RegisterStep, RegisterFormData, SelectedPlan } from "@/components/register/types"

export default function RegisterPage() {
    const t = useTranslations('register')
    const router = useRouter()

    const [currentStep, setCurrentStep] = useState<RegisterStep>('form')
    const [formData, setFormData] = useState<RegisterFormData | null>(null)
    const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleFormSubmit = (data: RegisterFormData) => {
        setFormData(data)
        setCurrentStep('plan')
    }

    const handlePlanSelect = (plan: SelectedPlan) => {
        setSelectedPlan(plan)
        // If starter plan (free), skip payment
        if (plan.id === 'starter') {
            setCurrentStep('confirmation')
        } else {
            setCurrentStep('payment')
        }
    }

    const handlePaymentConfirm = () => {
        setCurrentStep('confirmation')
    }

    const handlePaymentBack = () => {
        setCurrentStep('plan')
    }

    const handleContinueToOnboarding = () => {
        router.push('/onboarding')
    }

    const highlights = [
        { icon: Settings, title: t('feature1Title'), desc: t('feature1Desc'), gradient: 'from-primary/20 to-accent/5' },
        { icon: CreditCard, title: t('feature2Title'), desc: t('feature2Desc'), gradient: 'from-primary/20 to-accent/5' },
        { icon: Headphones, title: t('feature3Title'), desc: t('feature3Desc'), gradient: 'from-primary/20 to-accent/5' },
    ]

    return (
        <div className="min-h-screen bg-background text-foreground flex overflow-hidden relative">
            {/* Tech Pattern Background */}
            <div className="fixed inset-0 pointer-events-none opacity-30">
                {/* Grid Pattern */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
                        `,
                        backgroundSize: '50px 50px'
                    }}
                />
            </div>

            {/* Animated Gradient Orbs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-pulse" />
                <div
                    className="absolute bottom-20 right-1/4 w-72 h-72 bg-accent/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-pulse"
                    style={{ animationDelay: "1s" }}
                />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-pulse"
                    style={{ animationDelay: "2s" }}
                />
            </div>

            {/* Circuit Pattern - Decorative Lines */}
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="circuit-register" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            <path d="M 0 50 L 30 50 L 35 45 L 65 45 L 70 50 L 100 50" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-primary/30" />
                            <circle cx="50" cy="45" r="3" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/30" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#circuit-register)" />
                </svg>
            </div>

            {/* Left side - Branding (hidden on steps that need full width) */}
            {(currentStep === 'form') && (
                <div className="hidden lg:flex lg:w-2/5 flex-col justify-between p-6 xl:p-10 border-r border-border bg-background relative z-10">
                    <div className="absolute inset-0 backdrop-blur-sm pointer-events-none" />

                    <div className="relative z-10">
                        <Link href="/" className="flex items-center gap-3 mb-4 group w-full">
                            <div className="relative w-[280px] h-[85px] transition-transform duration-300 group-hover:scale-105">
                                <Image src={LogoHorizontal} alt="Yeison Logo" fill className="object-contain object-left" priority />
                            </div>
                        </Link>
                    </div>

                    <div className="relative z-10 space-y-6">
                        {/* Main Heading */}
                        <div className="fade-in-up">
                            <h2 className="text-3xl xl:text-4xl font-black mb-3 tracking-tight leading-tight">
                                <GradientText>{t('brandTitle')}</GradientText>
                            </h2>
                            <p className="text-sm xl:text-base text-muted-foreground leading-relaxed max-w-md">
                                {t('brandSubtitle')}
                            </p>
                        </div>

                        {/* Feature Cards - Premium Design */}
                        <div className="space-y-3 pt-4">
                            {highlights.map((item, i) => {
                                const Icon = item.icon
                                return (
                                    <div
                                        key={i}
                                        className="fade-in-up group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm hover:border-primary/40 transition-all duration-500"
                                        style={{ animationDelay: `${0.1 + i * 0.1}s` }}
                                    >
                                        {/* Shine effect on hover */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                        </div>

                                        <div className="relative p-4 flex items-center gap-4">
                                            {/* Icon with gradient background */}
                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} border border-primary/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(163,255,0,0.15)] group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300`}>
                                                <Icon className="w-6 h-6 text-primary" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="font-bold text-base mb-0.5 text-foreground">{item.title}</h3>
                                                <p className="text-xs xl:text-sm text-muted-foreground line-clamp-2">{item.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="relative z-10 pt-4 border-t border-border/50">
                        <p className="text-sm text-muted-foreground">{t('tagline')}</p>
                    </div>
                </div>
            )}

            {/* Right side - Registration Flow */}
            <div className={`w-full ${currentStep === 'form' ? 'lg:w-3/5' : ''} flex flex-col relative z-10`}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 sm:p-6">
                    <Link href="/" className="flex items-center gap-2 lg:hidden w-full">
                        <div className="relative w-52 h-[65px]">
                            <Image src={LogoHorizontal} alt="Yeison Logo" fill className="object-contain object-left" priority />
                        </div>
                    </Link>

                    {/* Show logo on desktop when not on form step */}
                    {currentStep !== 'form' && (
                        <Link href="/" className="hidden lg:flex items-center gap-2 w-full">
                            <div className="relative w-52 h-[65px]">
                                <Image src={LogoHorizontal} alt="Yeison Logo" fill className="object-contain object-left" priority />
                            </div>
                        </Link>
                    )}

                    <div className="flex items-center gap-2 sm:gap-4 ml-auto">
                        <LanguageSwitcher />
                        <span className="hidden sm:inline text-sm text-muted-foreground">
                            {t('haveAccount')}{' '}
                            <Link href="/login" className="text-accent font-bold hover:text-primary transition">
                                {t('loginLink')}
                            </Link>
                        </span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col items-center justify-start sm:justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    <div className={`w-full ${currentStep === 'plan' ? 'max-w-6xl' : 'max-w-md'}`}>
                        {/* Progress Indicator */}
                        <RegisterProgress currentStep={currentStep} />

                        {/* Step Content */}
                        <AnimatePresence mode="wait">
                            {currentStep === 'form' && (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="text-center mb-6 sm:mb-8">
                                        <h1 className="text-2xl sm:text-3xl font-black mb-2 sm:mb-3 tracking-tight">
                                            <GradientText>{t('title')}</GradientText>
                                        </h1>
                                        <p className="text-sm sm:text-base text-muted-foreground">{t('subtitle')}</p>
                                    </div>
                                    <RegisterForm
                                        onSubmit={handleFormSubmit}
                                        initialData={formData || undefined}
                                        isLoading={isLoading}
                                    />
                                </motion.div>
                            )}

                            {currentStep === 'plan' && (
                                <motion.div
                                    key="plan"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <PlanSelection
                                        onSelect={handlePlanSelect}
                                        initialPlan={selectedPlan || undefined}
                                    />
                                </motion.div>
                            )}

                            {currentStep === 'payment' && selectedPlan && (
                                <motion.div
                                    key="payment"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <PaymentQR
                                        plan={selectedPlan}
                                        onConfirm={handlePaymentConfirm}
                                        onBack={handlePaymentBack}
                                    />
                                </motion.div>
                            )}

                            {currentStep === 'confirmation' && selectedPlan && (
                                <motion.div
                                    key="confirmation"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ConfirmationStep
                                        plan={selectedPlan}
                                        onContinue={handleContinueToOnboarding}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    )
}
