'use client'

import { motion } from 'motion/react'
import { Loader2, Sparkles, AlertCircle } from 'lucide-react'
import type { StudioPhase } from '../shared/types'

const PHASES: { key: StudioPhase; label: string }[] = [
  { key: 'analizando', label: 'Analizando producto' },
  { key: 'componiendo', label: 'Componiendo escena' },
  { key: 'aplicando', label: 'Aplicando estilo' },
  { key: 'renderizando', label: 'Renderizando' },
]

interface GenerationPanelProps {
  phase: StudioPhase
  error: string | null
  canGenerate: boolean
  onGenerate: () => void
}

export function GenerationPanel({ phase, error, canGenerate, onGenerate }: GenerationPanelProps) {
  const isRunning = phase !== 'idle' && phase !== 'done'
  const isDone = phase === 'done'
  const currentPhaseIndex = PHASES.findIndex((p) => p.key === phase)

  return (
    <div className="space-y-4">
      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Phase stepper */}
      {isRunning && (
        <div className="flex flex-wrap items-center gap-2 p-4 bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl">
          {PHASES.map((p, i) => {
            const isActive = i === currentPhaseIndex
            const isPast = i < currentPhaseIndex
            return (
              <div key={p.key} className="flex items-center gap-2">
                <motion.div
                  className={`w-2.5 h-2.5 rounded-full ${
                    isPast ? 'bg-[#A3FF00]/60' : isActive ? 'bg-[#A3FF00]' : 'bg-[#1A1A1A]'
                  }`}
                  animate={isActive ? { scale: [1, 1.4, 1] } : {}}
                  transition={{ duration: 0.7, repeat: Infinity }}
                />
                <span
                  className={`text-xs font-mono ${
                    isActive ? 'text-[#A3FF00]' : isPast ? 'text-[#555]' : 'text-[#222]'
                  }`}
                >
                  {p.label}
                </span>
                {i < PHASES.length - 1 && (
                  <span className={`text-[#1A1A1A] ${isPast ? 'text-[#A3FF00]/30' : ''}`}>→</span>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Generate button */}
      {!isDone && (
        <motion.button
          onClick={onGenerate}
          disabled={!canGenerate || isRunning}
          whileHover={canGenerate && !isRunning ? { scale: 1.02 } : {}}
          whileTap={canGenerate && !isRunning ? { scale: 0.98 } : {}}
          className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-lg transition-all duration-300 ${
            canGenerate && !isRunning
              ? 'bg-[#A3FF00] text-black shadow-[0_0_30px_rgba(163,255,0,0.3)] hover:shadow-[0_0_45px_rgba(163,255,0,0.45)]'
              : 'bg-[#1A1A1A] text-[#444] cursor-not-allowed'
          }`}
        >
          {isRunning ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generando...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              {canGenerate ? 'Generar contenido' : 'Selecciona un producto'}
            </>
          )}
        </motion.button>
      )}

      {!canGenerate && !isRunning && (
        <p className="text-center text-[#444] text-xs">
          Necesitas seleccionar un producto para continuar.
        </p>
      )}
    </div>
  )
}
