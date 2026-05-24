'use client'

import { motion, AnimatePresence } from 'motion/react'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Collapsible from '@radix-ui/react-collapsible'
import { Check, ChevronDown, BookOpen, ExternalLink } from 'lucide-react'
import { useMarketingStore } from '../../context/useMarketingStore'
import { StepHeader } from '../../shared/StepHeader'

const RESOURCES = [
  { label: 'Meta Ads Manager', url: 'https://www.facebook.com/adsmanager' },
  { label: 'Guía de públicos', url: 'https://www.facebook.com/business/help/audiences' },
  { label: 'Biblioteca de creativos', url: 'https://www.facebook.com/ads/library' },
]

export function Step7ExecutionPlan() {
  const tasks = useMarketingStore((s) => s.executionTasks)
  const toggleTask = useMarketingStore((s) => s.toggleTask)
  const nextStep = useMarketingStore((s) => s.nextStep)
  const prevStep = useMarketingStore((s) => s.prevStep)

  const completedCount = tasks.filter((t) => t.isCompleted).length
  const allDone = completedCount === tasks.length

  return (
    <div>
      <StepHeader step={7} title="Plan de ejecución" subtitle="Sigue estos pasos para lanzar tu campaña con éxito." />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
        {/* Tasks */}
        <div className="space-y-3">
          {tasks.map((task, i) => (
            <Collapsible.Root key={task.id}>
              <div
                className={`rounded-2xl border transition-all duration-300 ${
                  task.isCompleted ? 'border-[#A3FF00]/40 bg-[#A3FF00]/5' : 'border-[#1A1A1A] bg-[#0A0A0A]'
                }`}
              >
                <div className="flex items-center gap-4 p-4">
                  <span
                    className={`text-2xl font-black w-8 text-center transition-colors duration-300 ${
                      task.isCompleted ? 'text-[#A3FF00]' : 'text-[#1A1A1A]'
                    }`}
                  >
                    {task.isCompleted ? <Check className="w-6 h-6 text-[#A3FF00] mx-auto" /> : String(i + 1).padStart(2, '0')}
                  </span>

                  <Checkbox.Root
                    checked={task.isCompleted}
                    onCheckedChange={() => toggleTask(task.id)}
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                      task.isCompleted ? 'bg-[#A3FF00] border-[#A3FF00]' : 'border-[#333] hover:border-[#A3FF00]/50'
                    }`}
                  >
                    <Checkbox.Indicator>
                      <Check className="w-3.5 h-3.5 text-black" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>

                  <div className="flex-1">
                    <p className={`font-semibold text-sm ${task.isCompleted ? 'line-through text-[#666]' : 'text-white'}`}>
                      {task.title}
                    </p>
                  </div>

                  <Collapsible.Trigger className="p-1 text-[#444] hover:text-white transition-colors">
                    <ChevronDown className="w-4 h-4" />
                  </Collapsible.Trigger>
                </div>

                <Collapsible.Content>
                  <div className="px-4 pb-4 pl-[4.5rem]">
                    <p className="text-[#ADADAD] text-sm">{task.description}</p>
                  </div>
                </Collapsible.Content>
              </div>
            </Collapsible.Root>
          ))}

          {/* All done banner */}
          <AnimatePresence>
            {allDone && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl bg-[#A3FF00]/10 border border-[#A3FF00]/40 p-5 text-center"
              >
                <p className="text-[#A3FF00] font-bold text-lg">Todo listo para el lanzamiento</p>
                <p className="text-[#ADADAD] text-sm mt-1">Completaste todas las tareas del plan de ejecución.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Resources Panel */}
        <div className="space-y-4">
          <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-[#A3FF00]" />
              <p className="text-xs font-mono text-[#A3FF00] uppercase tracking-widest">Recursos</p>
            </div>
            <div className="space-y-3">
              {RESOURCES.map((r) => (
                <a
                  key={r.label}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#111] hover:bg-[#1A1A1A] transition-all group"
                >
                  <span className="text-sm text-[#ADADAD] group-hover:text-white transition-colors">{r.label}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#444] group-hover:text-[#A3FF00] transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl p-5 text-center">
            <p className="text-sm font-semibold text-white mb-2">¿Necesitas ayuda?</p>
            <p className="text-[#666] text-xs mb-4">Agenda una sesión estratégica con nuestro equipo.</p>
            <button
              onClick={() => window.open('https://calendly.com', '_blank')}
              className="w-full py-2.5 rounded-xl border border-[#A3FF00]/40 text-[#A3FF00] text-sm font-medium hover:bg-[#A3FF00]/10 transition-all"
            >
              Agendar llamada
            </button>
          </div>

          <div className="text-center">
            <div className="text-2xl font-black text-white">{completedCount}/{tasks.length}</div>
            <div className="text-xs text-[#666] mt-0.5">tareas completadas</div>
          </div>
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
          Automatizaciones →
        </button>
      </div>
    </div>
  )
}
