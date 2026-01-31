'use client'

import { CheckCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { StepInfo } from './types'

interface OnboardingProgressProps {
    steps: StepInfo[]
    currentStep: number
    onStepClick: (stepId: number) => void
}

export default function OnboardingProgress({ steps, currentStep, onStepClick }: OnboardingProgressProps) {
    const t = useTranslations('onboarding.steps')

    return (
        <div className="progress-container">
            <div className="progress-steps">
                {steps.map((step) => (
                    <div
                        key={step.id}
                        className={`step-item ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
                        onClick={() => onStepClick(step.id)}
                    >
                        <div className="step-icon">
                            {currentStep > step.id ? (
                                <CheckCircle className="icon" />
                            ) : (
                                <step.icon className="icon" />
                            )}
                        </div>
                        <div className="step-text">
                            <span className="step-title">{t(`${step.id}.title`)}</span>
                            <span className="step-description">{t(`${step.id}.description`)}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="progress-bar">
                <div
                    className="progress-fill"
                    style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                ></div>
            </div>
        </div>
    )
}
