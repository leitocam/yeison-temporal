'use client'

import { motion } from 'motion/react'
import { ArrowRight, Play, Pause, Zap, MessageSquare, Clock, Users, Database } from 'lucide-react'
import { NeonBadge } from '../../shared/NeonBadge'
import { StepHeader } from '../../shared/StepHeader'
import { useMarketingStore } from '../../context/useMarketingStore'

const FLOW_NODES = [
  { id: 'n1', label: 'Nuevo Lead', icon: Users, x: 0 },
  { id: 'n2', label: 'Enviar Mensaje', icon: MessageSquare, x: 1 },
  { id: 'n3', label: 'Esperar 24h', icon: Clock, x: 2 },
  { id: 'n4', label: 'Calificar Lead', icon: Zap, x: 3 },
  { id: 'n5', label: 'Agregar a CRM', icon: Database, x: 4 },
]

const AUTOMATIONS = [
  { id: 'a1', name: 'Bienvenida a nuevos leads', trigger: 'Nuevo lead capturado', status: 'active' as const, leads: 142, lastRun: 'Hace 5 min' },
  { id: 'a2', name: 'Re-engagement 3 días', trigger: 'Sin respuesta 3 días', status: 'active' as const, leads: 38, lastRun: 'Hace 2h' },
  { id: 'a3', name: 'Seguimiento post-venta', trigger: 'Venta completada', status: 'paused' as const, leads: 15, lastRun: 'Hace 1d' },
  { id: 'a4', name: 'Recuperación carrito', trigger: 'Carrito abandonado', status: 'draft' as const, leads: 0, lastRun: 'Nunca' },
]

const statusConfig = {
  active: { label: 'Activo', class: 'bg-[#A3FF00]/10 text-[#A3FF00] border-[#A3FF00]/30' },
  paused: { label: 'Pausado', class: 'bg-amber-500/10 text-amber-400 border-amber-500/30' },
  draft: { label: 'Borrador', class: 'bg-[#1A1A1A] text-[#666] border-[#1A1A1A]' },
}

export function Step8Automations() {
  const nextStep = useMarketingStore((s) => s.nextStep)
  const prevStep = useMarketingStore((s) => s.prevStep)

  return (
    <div>
      <StepHeader step={8} title="Centro de Automatizaciones" subtitle="Automatiza el seguimiento de leads para que tu campaña trabaje 24/7." />

      {/* Visual Flow (simplified, no @xyflow/react dependency) */}
      <div className="bg-[#050505] border border-[#1A1A1A] rounded-2xl p-6 mb-8 overflow-x-auto">
        <p className="text-xs font-mono text-[#A3FF00] uppercase tracking-widest mb-6">Flujo de automatización</p>
        <div className="flex items-center gap-2 min-w-max">
          {FLOW_NODES.map((node, i) => (
            <div key={node.id} className="flex items-center gap-2">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#0A0A0A] border border-[#A3FF00]/30 flex flex-col items-center justify-center gap-1 hover:border-[#A3FF00] hover:shadow-[0_0_15px_rgba(163,255,0,0.2)] transition-all cursor-default">
                  <node.icon className="w-5 h-5 text-[#A3FF00]" />
                </div>
                <p className="text-[9px] text-[#666] font-mono text-center w-20 leading-tight">{node.label}</p>
              </motion.div>
              {i < FLOW_NODES.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className="flex-shrink-0"
                >
                  <ArrowRight className="w-5 h-5 text-[#A3FF00]/60" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Automations Table */}
      <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl overflow-hidden mb-8">
        <div className="p-4 border-b border-[#1A1A1A] flex items-center justify-between">
          <p className="text-sm font-semibold text-white">Automatizaciones activas</p>
          <button className="text-xs text-[#A3FF00] border border-[#A3FF00]/30 px-3 py-1.5 rounded-lg hover:bg-[#A3FF00]/10 transition-all">
            + Nueva
          </button>
        </div>
        <div className="divide-y divide-[#1A1A1A]">
          {AUTOMATIONS.map((auto, i) => {
            const cfg = statusConfig[auto.status]
            return (
              <motion.div
                key={auto.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 p-4 hover:bg-[#111] transition-colors"
              >
                <div
                  className={`flex-shrink-0 w-2 h-2 rounded-full ${
                    auto.status === 'active' ? 'bg-[#A3FF00] animate-pulse' : auto.status === 'paused' ? 'bg-amber-400' : 'bg-[#333]'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{auto.name}</p>
                  <p className="text-xs text-[#666]">{auto.trigger}</p>
                </div>
                <span className={`flex-shrink-0 text-[10px] font-mono uppercase tracking-wider border px-2 py-1 rounded-full ${cfg.class}`}>
                  {cfg.label}
                </span>
                <div className="flex-shrink-0 text-right hidden sm:block">
                  <p className="text-sm font-bold text-white">{auto.leads}</p>
                  <p className="text-[10px] text-[#666]">leads</p>
                </div>
                <div className="flex-shrink-0 hidden md:block">
                  <p className="text-xs text-[#444]">{auto.lastRun}</p>
                </div>
                <button className="flex-shrink-0 p-1.5 rounded-lg text-[#444] hover:text-[#A3FF00] hover:bg-[#A3FF00]/10 transition-all">
                  {auto.status === 'active' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={prevStep} className="text-[#666] hover:text-white text-sm transition-colors">
          ← Volver
        </button>
        <button
          onClick={nextStep}
          className="px-8 py-3 bg-[#A3FF00] text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(163,255,0,0.3)] transition-all text-sm"
        >
          Publicar campaña →
        </button>
      </div>
    </div>
  )
}
