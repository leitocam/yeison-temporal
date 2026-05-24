'use client'

import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import { useMarketingStore } from '../context/useMarketingStore'

const STEP_LABELS = ['Bienvenida', 'Nivel', 'Negocio', 'IA', 'Estrategia', 'Embudo', 'Plan', 'Auto', 'Listo']

export function StepProgress() {
  const currentStep = useMarketingStore((s) => s.currentStep)
  const setStep = useMarketingStore((s) => s.setStep)

  const progress = ((currentStep - 1) / 8) * 100

  return (
    <div className="mb-10">
      {/* Progress bar */}
      <div className="relative h-1 bg-[#1A1A1A] rounded-full mb-6 overflow-hidden">
        <motion.div
          className="absolute left-0 top-0 h-full bg-[#A3FF00] rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </div>

      {/* Dots */}
      <div className="flex items-center justify-between gap-1">
        {STEP_LABELS.map((label, i) => {
          const step = i + 1
          const isCompleted = step < currentStep
          const isActive = step === currentStep

          return (
            <button
              key={step}
              onClick={() => isCompleted && setStep(step)}
              className="flex flex-col items-center gap-1.5 group"
              disabled={!isCompleted}
            >
              <motion.div
                className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isCompleted
                    ? 'bg-[#A3FF00] border-[#A3FF00]'
                    : isActive
                    ? 'border-[#A3FF00] bg-transparent shadow-[0_0_10px_rgba(163,255,0,0.4)]'
                    : 'border-[#1A1A1A] bg-transparent'
                }`}
                animate={isActive ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                transition={isActive ? { duration: 2, repeat: Infinity } : {}}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 text-black" />
                ) : (
                  <span
                    className={`text-[10px] font-bold ${
                      isActive ? 'text-[#A3FF00]' : 'text-[#444]'
                    }`}
                  >
                    {step}
                  </span>
                )}
              </motion.div>
              <span
                className={`text-[9px] font-mono uppercase tracking-wider hidden sm:block ${
                  isActive ? 'text-[#A3FF00]' : isCompleted ? 'text-[#666]' : 'text-[#333]'
                }`}
              >
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
