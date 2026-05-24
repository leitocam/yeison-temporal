'use client'

import { useMemo } from 'react'
import { motion } from 'motion/react'
import * as Slider from '@radix-ui/react-slider'
import { useMarketingStore } from '../../context/useMarketingStore'
import { StepHeader } from '../../shared/StepHeader'
import type { FunnelOutput } from '../../shared/types'

const CPM = 8

function computeFunnel(budget: number, durationDays: number, ctr: number, conversionRate: number): FunnelOutput {
  const impressions = Math.round((budget / CPM) * 1000)
  const clicks = Math.round(impressions * (ctr / 100))
  const leads = Math.round(clicks * (conversionRate / 100))
  const salesBase = leads * 0.15
  return {
    impressions,
    clicks,
    leads,
    sales: [Math.round(salesBase * 0.85), Math.round(salesBase * 1.15)],
  }
}

function fmt(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n)
}

const FUNNEL_LEVELS = [
  { key: 'impressions' as const, label: 'Impresiones', color: 'from-[#A3FF00]/60 to-[#A3FF00]/20', widthClass: 'w-full' },
  { key: 'clicks' as const, label: 'Clicks', color: 'from-[#A3FF00]/80 to-[#A3FF00]/40', widthClass: 'w-4/5' },
  { key: 'leads' as const, label: 'Leads', color: 'from-[#A3FF00] to-[#A3FF00]/60', widthClass: 'w-3/5' },
  { key: 'sales' as const, label: 'Ventas estimadas', color: 'from-[#A3FF00] to-[#C4FF4D]', widthClass: 'w-2/5' },
]

const SLIDERS = [
  { key: 'budget' as const, label: 'Presupuesto (USD)', min: 50, max: 5000, step: 50, format: (v: number) => `$${v}` },
  { key: 'durationDays' as const, label: 'Duración (días)', min: 7, max: 90, step: 1, format: (v: number) => `${v}d` },
  { key: 'ctr' as const, label: 'CTR (%)', min: 0.5, max: 10, step: 0.1, format: (v: number) => `${v.toFixed(1)}%` },
  { key: 'conversionRate' as const, label: 'Tasa de conversión (%)', min: 0.5, max: 20, step: 0.5, format: (v: number) => `${v.toFixed(1)}%` },
]

export function Step6FunnelPrediction() {
  const sliders = useMarketingStore((s) => s.funnelSliders)
  const updateFunnelSlider = useMarketingStore((s) => s.updateFunnelSlider)
  const nextStep = useMarketingStore((s) => s.nextStep)
  const prevStep = useMarketingStore((s) => s.prevStep)

  const funnel = useMemo(
    () => computeFunnel(sliders.budget, sliders.durationDays, sliders.ctr, sliders.conversionRate),
    [sliders]
  )

  return (
    <div>
      <StepHeader step={6} title="Predicción de embudo" subtitle="Ajusta los parámetros y ve cómo impactan en tus resultados esperados." />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        {/* Funnel Chart */}
        <div className="space-y-3">
          {FUNNEL_LEVELS.map((level, i) => {
            const value = level.key === 'sales' ? `${fmt(funnel.sales[0])} - ${fmt(funnel.sales[1])}` : fmt(funnel[level.key] as number)
            return (
              <motion.div
                key={level.key}
                className="flex flex-col items-center"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className={`${level.widthClass} transition-all duration-500`}>
                  <div
                    className={`h-14 rounded-xl bg-gradient-to-r ${level.color} flex items-center justify-between px-5`}
                    style={{ clipPath: i < 3 ? `polygon(${i * 5}% 0%, ${100 - i * 5}% 0%, ${100 - (i + 1) * 5}% 100%, ${(i + 1) * 5}% 100%)` : undefined }}
                  >
                    <span className="text-black font-bold text-sm">{level.label}</span>
                    <span className="text-black font-black">{value}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Sliders Panel */}
        <div className="space-y-6 bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl p-6">
          <p className="text-xs font-mono text-[#A3FF00] uppercase tracking-widest">Parámetros</p>
          {SLIDERS.map((sl) => (
            <div key={sl.key}>
              <div className="flex justify-between mb-2">
                <label className="text-sm text-white">{sl.label}</label>
                <span className="text-sm font-mono text-[#A3FF00]">{sl.format(sliders[sl.key])}</span>
              </div>
              <Slider.Root
                min={sl.min}
                max={sl.max}
                step={sl.step}
                value={[sliders[sl.key]]}
                onValueChange={([v]) => updateFunnelSlider(sl.key, v)}
                className="relative flex items-center select-none touch-none h-5 w-full"
              >
                <Slider.Track className="bg-[#1A1A1A] relative grow rounded-full h-1.5">
                  <Slider.Range className="absolute bg-[#A3FF00] rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 bg-[#A3FF00] rounded-full shadow-[0_0_10px_rgba(163,255,0,0.5)] focus:outline-none hover:scale-110 transition-transform cursor-grab" />
              </Slider.Root>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={prevStep} className="text-[#666] hover:text-white text-sm transition-colors">
          ← Volver
        </button>
        <button
          onClick={nextStep}
          className="px-8 py-3 bg-[#A3FF00] text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(163,255,0,0.3)] transition-all text-sm"
        >
          Plan de ejecución →
        </button>
      </div>
    </div>
  )
}
