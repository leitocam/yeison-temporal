'use client'

import { Sparkles } from 'lucide-react'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'

interface OnboardingHeaderProps {
    currentStep: number
    totalSteps: number
}

export default function OnboardingHeader({ currentStep, totalSteps }: OnboardingHeaderProps) {
    const t = useTranslations('onboarding')

    return (
        <header className="onboarding-header">
            <div className="header-content">
                <div className="logo">
                    <Sparkles className="logo-icon" />
                    <span>Yeison</span>
                </div>
                <div className="header-info">
                    <span className="step-indicator">
                        {t('stepOf', { current: currentStep, total: totalSteps })}
                    </span>
                    <LanguageSwitcher />
                </div>
            </div>
        </header>
    )
}
