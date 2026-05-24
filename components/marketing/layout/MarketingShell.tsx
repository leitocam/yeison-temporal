'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useMarketingStore } from '../context/useMarketingStore'
import { StepProgress } from './StepProgress'
import { Step1Welcome } from '../steps/Step1Welcome'
import { Step2ExperienceLevel } from '../steps/Step2ExperienceLevel'
import { Step3BusinessContext } from '../steps/Step3BusinessContext'
import { Step4Generation } from '../steps/Step4Generation'
import { Step5Strategy } from '../steps/Step5Strategy'
import { Step6FunnelPrediction } from '../steps/Step6FunnelPrediction'
import { Step7ExecutionPlan } from '../steps/Step7ExecutionPlan'
import { Step8Automations } from '../steps/Step8Automations'
import { Step9Success } from '../steps/Step9Success'

const stepComponents: Record<number, React.ComponentType> = {
  1: Step1Welcome,
  2: Step2ExperienceLevel,
  3: Step3BusinessContext,
  4: Step4Generation,
  5: Step5Strategy,
  6: Step6FunnelPrediction,
  7: Step7ExecutionPlan,
  8: Step8Automations,
  9: Step9Success,
}

export function MarketingShell() {
  const currentStep = useMarketingStore((s) => s.currentStep)
  const StepComponent = stepComponents[currentStep] ?? Step1Welcome
  const showProgress = currentStep >= 3

  return (
    <div className="min-h-[calc(100vh-10rem)] max-w-5xl mx-auto">
      {showProgress && <StepProgress />}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          <StepComponent />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
