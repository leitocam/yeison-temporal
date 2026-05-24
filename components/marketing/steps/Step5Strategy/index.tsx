'use client'

import { useEffect } from 'react'
import { motion } from 'motion/react'
import { Target, DollarSign, Users, TrendingUp, Clock, MessageSquare } from 'lucide-react'
import { useMarketingStore } from '../../context/useMarketingStore'
import { StepHeader } from '../../shared/StepHeader'
import { NeonCard } from '../../shared/NeonCard'
import { NeonBadge } from '../../shared/NeonBadge'

const MOCK_STRATEGY = {
  businessSummary: 'Negocio digital con ticket medio-alto, orientado a un público profesional con capacidad de compra.',
  channels: ['Meta Ads', 'Instagram Stories', 'WhatsApp Retargeting'],
  budget: '$500 - $1,000 USD/mes',
  mainMessage: 'Resultados reales sin desperdiciar presupuesto. IA que trabaja mientras tú descansas.',
  expectedLeads: 180,
  expectedROI: '280%',
  duration: '30 días',
}

export function Step5Strategy() {
  const strategy = useMarketingStore((s) => s.strategy)
  const setStrategy = useMarketingStore((s) => s.setStrategy)
  const businessContext = useMarketingStore((s) => s.businessContext)
  const nextStep = useMarketingStore((s) => s.nextStep)
  const prevStep = useMarketingStore((s) => s.prevStep)

  useEffect(() => {
    if (!strategy) {
      setStrategy({
        ...MOCK_STRATEGY,
        businessSummary: businessContext
          ? `Negocio que vende ${businessContext.whatYouSell} a ${businessContext.targetAudience}.`
          : MOCK_STRATEGY.businessSummary,
      })
    }
  }, [])

  const data = strategy ?? MOCK_STRATEGY

  const cards = [
    {
      icon: Target,
      title: 'Resumen del negocio',
      content: <p className="text-[#ADADAD] text-sm leading-relaxed">{data.businessSummary}</p>,
    },
    {
      icon: MessageSquare,
      title: 'Estrategia recomendada',
      content: (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {data.channels.map((ch) => <NeonBadge key={ch}>{ch}</NeonBadge>)}
          </div>
          <div className="flex items-center gap-2 text-sm text-[#ADADAD]">
            <DollarSign className="w-4 h-4 text-[#A3FF00]" />
            <span>{data.budget}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#ADADAD]">
            <Clock className="w-4 h-4 text-[#A3FF00]" />
            <span>Duración: {data.duration}</span>
          </div>
          <p className="text-xs text-[#666] italic">"{data.mainMessage}"</p>
        </div>
      ),
    },
    {
      icon: TrendingUp,
      title: 'Resultados esperados',
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-4xl font-black text-[#A3FF00]">{data.expectedLeads}</p>
            <p className="text-xs text-[#666] mt-1">Leads estimados</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-black text-emerald-400">{data.expectedROI}</p>
            <p className="text-xs text-[#666] mt-1">ROI proyectado</p>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div>
      <StepHeader step={5} title="Estrategia recomendada" subtitle="Basada en tu negocio y los creativos aprobados, la IA diseñó esta estrategia." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <NeonCard glow className="h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#A3FF00]/10 flex items-center justify-center">
                  <card.icon className="w-4 h-4 text-[#A3FF00]" />
                </div>
                <p className="font-bold text-white text-sm">{card.title}</p>
              </div>
              {card.content}
            </NeonCard>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between">
        <button onClick={prevStep} className="text-[#666] hover:text-white text-sm transition-colors">
          ← Volver
        </button>
        <button
          onClick={nextStep}
          className="px-8 py-3 bg-[#A3FF00] text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(163,255,0,0.3)] transition-all text-sm"
        >
          Simular embudo →
        </button>
      </div>
    </div>
  )
}
