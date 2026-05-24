'use client'

import { motion } from 'motion/react'
import { Megaphone, TrendingUp, Users, Zap } from 'lucide-react'
import { useMarketingStore } from '../../context/useMarketingStore'
import { NeonCard } from '../../shared/NeonCard'

const DEMO_METRICS = [
  { icon: Megaphone, label: 'Campañas activas', value: '12', color: 'text-[#A3FF00]' },
  { icon: TrendingUp, label: 'ROI promedio', value: '340%', color: 'text-emerald-400' },
  { icon: Users, label: 'Leads generados', value: '1.2K', color: 'text-blue-400' },
]

export function Step1Welcome() {
  const nextStep = useMarketingStore((s) => s.nextStep)
  const facebookInsights = useMarketingStore((s) => s.facebookInsights)
  const facebookConnection = useMarketingStore((s) => s.facebookConnection)

  const metrics = facebookConnection.isConnected && facebookInsights
    ? [
        { icon: Megaphone, label: 'Campañas activas', value: String(facebookInsights.totalCampaigns), color: 'text-[#A3FF00]' },
        { icon: TrendingUp, label: 'ROI promedio', value: facebookInsights.avgROI, color: 'text-emerald-400' },
        { icon: Users, label: 'Leads generados', value: String(facebookInsights.totalLeads), color: 'text-blue-400' },
      ]
    : DEMO_METRICS

  return (
    <div className="flex flex-col items-center text-center py-10">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        {/* Mascot placeholder */}
        <div className="w-28 h-28 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-[#A3FF00]/20 to-[#A3FF00]/5 border border-[#A3FF00]/30 flex items-center justify-center shadow-[0_0_40px_rgba(163,255,0,0.15)]">
          <Zap className="w-14 h-14 text-[#A3FF00]" />
        </div>

        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
          Marketing IA
          <span className="block text-[#A3FF00]">que convierte</span>
        </h1>
        <p className="text-[#ADADAD] text-lg max-w-xl mx-auto mb-8">
          En 9 pasos vamos a construir una campaña publicitaria optimizada con inteligencia artificial, desde la estrategia hasta la publicación.
        </p>

        <motion.button
          onClick={nextStep}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="px-10 py-4 bg-[#A3FF00] text-black font-black text-lg rounded-2xl shadow-[0_0_30px_rgba(163,255,0,0.3)] hover:shadow-[0_0_45px_rgba(163,255,0,0.45)] transition-all duration-300"
        >
          Comenzar ahora →
        </motion.button>
      </motion.div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <NeonCard className="text-center" glow>
              <metric.icon className={`w-6 h-6 mx-auto mb-2 ${metric.color}`} />
              <p className={`text-2xl font-black ${metric.color}`}>{metric.value}</p>
              <p className="text-[#666] text-xs mt-1">{metric.label}</p>
            </NeonCard>
          </motion.div>
        ))}
      </div>

      {!facebookConnection.isConnected && (
        <p className="text-[#444] text-xs mt-4 font-mono">
          * Datos demo — conecta Facebook para ver tus métricas reales
        </p>
      )}
    </div>
  )
}
