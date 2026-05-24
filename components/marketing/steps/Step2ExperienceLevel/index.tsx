'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Sprout, TrendingUp, Rocket } from 'lucide-react'
import { useMarketingStore } from '../../context/useMarketingStore'
import { NeonCard } from '../../shared/NeonCard'
import type { ExperienceLevel } from '../../shared/types'

const LEVELS: { level: ExperienceLevel; icon: React.ComponentType<any>; title: string; desc: string }[] = [
  {
    level: 'principiante',
    icon: Sprout,
    title: 'Principiante',
    desc: 'Nunca he hecho publicidad paga o llevo menos de 6 meses.',
  },
  {
    level: 'intermedio',
    icon: TrendingUp,
    title: 'Intermedio',
    desc: 'Tengo experiencia con Meta Ads o Google Ads pero quiero optimizar.',
  },
  {
    level: 'experto',
    icon: Rocket,
    title: 'Experto',
    desc: 'Manejo campañas regularmente y busco escalar con IA.',
  },
]

export function Step2ExperienceLevel() {
  const setExperienceLevel = useMarketingStore((s) => s.setExperienceLevel)
  const nextStep = useMarketingStore((s) => s.nextStep)
  const prevStep = useMarketingStore((s) => s.prevStep)
  const stored = useMarketingStore((s) => s.experienceLevel)
  const [selected, setSelected] = useState<ExperienceLevel | null>(stored)

  const handleSelect = (level: ExperienceLevel) => {
    setSelected(level)
    setExperienceLevel(level)
    setTimeout(() => nextStep(), 600)
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-black tracking-tight text-white mb-2">
          ¿Cuál es tu nivel de experiencia?
        </h2>
        <p className="text-[#ADADAD]">Esto nos ayuda a adaptar la estrategia a tu situación actual.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {LEVELS.map((item, i) => (
          <motion.div
            key={item.level}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <NeonCard
              isSelected={selected === item.level}
              onClick={() => handleSelect(item.level)}
              className="flex items-center gap-5"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  selected === item.level
                    ? 'bg-[#A3FF00] shadow-[0_0_20px_rgba(163,255,0,0.4)]'
                    : 'bg-[#1A1A1A]'
                }`}
              >
                <item.icon
                  className={`w-6 h-6 transition-colors duration-300 ${
                    selected === item.level ? 'text-black' : 'text-[#666]'
                  }`}
                />
              </div>
              <div>
                <p className={`font-bold text-lg ${selected === item.level ? 'text-[#A3FF00]' : 'text-white'}`}>
                  {item.title}
                </p>
                <p className="text-[#ADADAD] text-sm">{item.desc}</p>
              </div>
            </NeonCard>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex justify-start">
        <button
          onClick={prevStep}
          className="text-[#666] hover:text-white text-sm transition-colors"
        >
          ← Volver
        </button>
      </div>
    </div>
  )
}
