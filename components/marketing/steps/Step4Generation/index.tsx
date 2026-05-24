'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Heart, X, Loader2, ImagePlay, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as Tabs from '@radix-ui/react-tabs'
import { useMarketingStore } from '../../context/useMarketingStore'
import { StepHeader } from '../../shared/StepHeader'
import { NeonCard } from '../../shared/NeonCard'
import type { CreativeCard, CreativeTab, GenerationPhase } from '../../shared/types'

const PHASES: { key: GenerationPhase; label: string }[] = [
  { key: 'analizando', label: 'Analizando negocio' },
  { key: 'entendiendo', label: 'Entendiendo audiencia' },
  { key: 'generando', label: 'Generando copys' },
  { key: 'creando', label: 'Creando hooks' },
  { key: 'optimizando', label: 'Optimizando' },
]

const TABS: { key: CreativeTab; label: string }[] = [
  { key: 'hooks', label: 'Hooks' },
  { key: 'copys', label: 'Copys' },
  { key: 'guiones', label: 'Guiones' },
  { key: 'angulos', label: 'Ángulos' },
  { key: 'visuales', label: '🎨 Visuales' },
]

const MOCK_CREATIVES: CreativeCard[] = [
  { id: '1', tab: 'hooks', text: '¿Sabías que el 80% de las personas abandona su carrito porque no confía en la marca? Nosotros lo resolvemos.', isFavorite: false, isDiscarded: false },
  { id: '2', tab: 'hooks', text: 'De 0 a 100 clientes en 30 días. Sin trucos, solo estrategia y consistencia.', isFavorite: false, isDiscarded: false },
  { id: '3', tab: 'copys', text: 'Tu competencia ya está usando IA para vender más. ¿Cuándo empiezas tú? Únete a los +500 negocios que ya duplicaron sus ventas.', isFavorite: false, isDiscarded: false },
  { id: '4', tab: 'copys', text: 'No necesitas un presupuesto enorme. Necesitas el mensaje correcto para la persona correcta en el momento correcto.', isFavorite: false, isDiscarded: false },
  { id: '5', tab: 'guiones', text: '[Imagen: Cliente feliz] ¿Quieres resultados como este? Empezamos con una consulta gratis. Link en bio.', isFavorite: false, isDiscarded: false },
  { id: '6', tab: 'angulos', text: 'Ángulo FOMO: "Solo quedan 5 cupos para este mes. Los negocios que no actúan ahora, perderán terreno ante la competencia que sí lo hace."', isFavorite: false, isDiscarded: false },
]

export function Step4Generation() {
  const businessContext = useMarketingStore((s) => s.businessContext)
  const generationPhase = useMarketingStore((s) => s.generationPhase)
  const creatives = useMarketingStore((s) => s.creatives)
  const setGenerationPhase = useMarketingStore((s) => s.setGenerationPhase)
  const setCreatives = useMarketingStore((s) => s.setCreatives)
  const toggleFavorite = useMarketingStore((s) => s.toggleFavorite)
  const discardCreative = useMarketingStore((s) => s.discardCreative)
  const nextStep = useMarketingStore((s) => s.nextStep)
  const prevStep = useMarketingStore((s) => s.prevStep)
  const pathname = usePathname()
  const localeMatch = pathname.match(/^\/([a-z]{2})\//)
  const locale = localeMatch ? localeMatch[1] : 'es'

  const [activeTab, setActiveTab] = useState<CreativeTab>('hooks')
  const [phaseIndex, setPhaseIndex] = useState(0)

  useEffect(() => {
    if (creatives.length > 0) return
    let phase = 0
    setGenerationPhase('analizando')

    const interval = setInterval(() => {
      phase++
      if (phase < PHASES.length) {
        setGenerationPhase(PHASES[phase].key)
        setPhaseIndex(phase)
      } else {
        clearInterval(interval)
        setGenerationPhase('done')
        setCreatives(MOCK_CREATIVES)
      }
    }, 900)

    return () => clearInterval(interval)
  }, [])

  const isDone = generationPhase === 'done' || creatives.length > 0
  const visibleCreatives = creatives.filter((c) => c.tab === activeTab && !c.isDiscarded)
  const currentPhaseIndex = isDone ? PHASES.length : phaseIndex

  return (
    <div>
      <StepHeader step={4} title="Generando creativos con IA" subtitle="La IA está analizando tu negocio y generando copys, hooks y guiones personalizados." />

      {/* Generation Stepper */}
      <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
        {PHASES.map((p, i) => {
          const isActive = i === currentPhaseIndex && !isDone
          const isDonePhase = i < currentPhaseIndex || isDone
          return (
            <div key={p.key} className="flex items-center gap-2 flex-shrink-0">
              <motion.div
                className={`w-3 h-3 rounded-full ${isDonePhase ? 'bg-[#A3FF00]' : isActive ? 'bg-[#A3FF00]' : 'bg-[#1A1A1A]'}`}
                animate={isActive ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
              <span className={`text-xs font-mono ${isActive ? 'text-[#A3FF00]' : isDonePhase ? 'text-[#666]' : 'text-[#333]'}`}>
                {p.label}
              </span>
              {i < PHASES.length - 1 && <div className={`w-6 h-px ${isDonePhase ? 'bg-[#A3FF00]/40' : 'bg-[#1A1A1A]'}`} />}
            </div>
          )
        })}
        {isDone && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#A3FF00]" />
            <span className="text-xs font-mono text-[#A3FF00]">Listo</span>
          </div>
        )}
      </div>

      {!isDone ? (
        <div className="flex flex-col items-center py-16 gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-[#A3FF00]" />
          <p className="text-[#ADADAD] font-mono text-sm">{PHASES[phaseIndex]?.label}...</p>
        </div>
      ) : (
        <>
          <Tabs.Root value={activeTab} onValueChange={(v) => setActiveTab(v as CreativeTab)}>
            <Tabs.List className="flex gap-1 mb-6 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl p-1">
              {TABS.map((tab) => (
                <Tabs.Trigger
                  key={tab.key}
                  value={tab.key}
                  className="flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all data-[state=active]:bg-[#A3FF00] data-[state=active]:text-black text-[#666] hover:text-white"
                >
                  {tab.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            {TABS.filter((t) => t.key !== 'visuales').map((tab) => (
              <Tabs.Content key={tab.key} value={tab.key}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AnimatePresence>
                    {visibleCreatives.length === 0 ? (
                      <p className="text-[#444] text-sm col-span-2 text-center py-8">No hay creativos en esta categoría.</p>
                    ) : (
                      visibleCreatives.map((creative, i) => (
                        <motion.div
                          key={creative.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8, filter: 'blur(8px)' }}
                          transition={{ delay: i * 0.08 }}
                        >
                          <NeonCard glow className="relative">
                            <p className="text-sm text-[#ADADAD] font-mono leading-relaxed pr-8">{creative.text}</p>
                            <div className="flex gap-2 mt-4">
                              <button
                                onClick={() => toggleFavorite(creative.id)}
                                className={`p-2 rounded-lg border transition-all ${creative.isFavorite ? 'border-[#A3FF00] text-[#A3FF00] bg-[#A3FF00]/10' : 'border-[#1A1A1A] text-[#444] hover:text-[#A3FF00] hover:border-[#A3FF00]/40'}`}
                              >
                                <Heart className="w-4 h-4" fill={creative.isFavorite ? 'currentColor' : 'none'} />
                              </button>
                              <button
                                onClick={() => discardCreative(creative.id)}
                                className="p-2 rounded-lg border border-[#1A1A1A] text-[#444] hover:text-red-400 hover:border-red-400/40 transition-all"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </NeonCard>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </Tabs.Content>
            ))}

            {/* Visuales tab — images/videos from Content Studio */}
            <Tabs.Content value="visuales">
              {(() => {
                const visualCreatives = creatives.filter((c) => c.tab === 'visuales' && !c.isDiscarded)
                if (visualCreatives.length === 0) {
                  return (
                    <div className="text-center py-12 bg-[#0A0A0A] border border-dashed border-[#1A1A1A] rounded-2xl">
                      <ImagePlay className="w-10 h-10 text-[#333] mx-auto mb-3" />
                      <p className="text-[#555] text-sm mb-4">Aún no tienes visuales generados.</p>
                      <Link
                        href={`/${locale}/dashboard/marketing/studio`}
                        className="inline-flex items-center gap-2 text-[#A3FF00] text-sm font-medium border border-[#A3FF00]/30 px-4 py-2 rounded-xl hover:bg-[#A3FF00]/10 transition-all"
                      >
                        <ImagePlay className="w-4 h-4" />
                        Ir al Estudio de Contenido
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )
                }
                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <AnimatePresence>
                      {visualCreatives.map((creative, i) => {
                        // text format: "[Visual] ProductName — Post 1:1"
                        const label = creative.text.replace('[Visual] ', '')
                        return (
                          <motion.div
                            key={creative.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8, filter: 'blur(8px)' }}
                            transition={{ delay: i * 0.08 }}
                          >
                            <NeonCard glow className="p-3 space-y-3">
                              <div className="w-full aspect-square rounded-xl bg-[#111] border border-[#1A1A1A] overflow-hidden flex items-center justify-center">
                                <ImagePlay className="w-8 h-8 text-[#A3FF00]/40" />
                              </div>
                              <p className="text-xs text-[#ADADAD] font-mono line-clamp-2">{label}</p>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => toggleFavorite(creative.id)}
                                  className={`p-1.5 rounded-lg border transition-all ${creative.isFavorite ? 'border-[#A3FF00] text-[#A3FF00] bg-[#A3FF00]/10' : 'border-[#1A1A1A] text-[#444] hover:text-[#A3FF00]'}`}
                                >
                                  <Heart className="w-3.5 h-3.5" fill={creative.isFavorite ? 'currentColor' : 'none'} />
                                </button>
                                <button
                                  onClick={() => discardCreative(creative.id)}
                                  className="p-1.5 rounded-lg border border-[#1A1A1A] text-[#444] hover:text-red-400 transition-all"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </NeonCard>
                          </motion.div>
                        )
                      })}
                    </AnimatePresence>
                  </div>
                )
              })()}
            </Tabs.Content>
          </Tabs.Root>

          <div className="flex justify-between mt-8">
            <button onClick={prevStep} className="text-[#666] hover:text-white text-sm transition-colors">
              ← Volver
            </button>
            <button
              onClick={nextStep}
              className="px-8 py-3 bg-[#A3FF00] text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(163,255,0,0.3)] transition-all text-sm"
            >
              Ver estrategia →
            </button>
          </div>
        </>
      )}
    </div>
  )
}
