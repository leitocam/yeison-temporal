'use client'

import { useTranslations } from 'next-intl'

interface OnboardingTipsProps {
    currentStep: number
}

export default function OnboardingTips({ currentStep }: OnboardingTipsProps) {
    const t = useTranslations('onboarding.tips')

    return (
        <aside className="tips-section">
            <div className="tip-card">
                <h3>💡 {t('title')}</h3>
                <p>{t(`step${currentStep}`)}</p>
            </div>
        </aside>
    )
}
