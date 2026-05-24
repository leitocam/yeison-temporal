'use client'

import { useCallback } from 'react'
import { useMarketingStore } from '@/components/marketing/context/useMarketingStore'

export function useMarketingFlow() {
  const currentStep = useMarketingStore((s) => s.currentStep)
  const experienceLevel = useMarketingStore((s) => s.experienceLevel)
  const businessContext = useMarketingStore((s) => s.businessContext)
  const nextStep = useMarketingStore((s) => s.nextStep)
  const prevStep = useMarketingStore((s) => s.prevStep)
  const setStep = useMarketingStore((s) => s.setStep)

  const canAdvance = useCallback((): boolean => {
    if (currentStep === 2 && !experienceLevel) return false
    if (currentStep === 3 && !businessContext) return false
    return true
  }, [currentStep, experienceLevel, businessContext])

  const safeNext = useCallback(() => {
    if (canAdvance()) nextStep()
  }, [canAdvance, nextStep])

  return { currentStep, canAdvance, safeNext, prevStep, setStep }
}
