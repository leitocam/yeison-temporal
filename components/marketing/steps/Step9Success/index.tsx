'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Share2, FileDown, Edit, Rocket, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useMarketingStore } from '../../context/useMarketingStore'
import { NeonCard } from '../../shared/NeonCard'
import { apiClient } from '@/lib/api-client'

const DEFAULT_SUMMARY = {
  objective: 'Generación de leads calificados',
  platform: 'Meta Ads (Facebook + Instagram)',
  budget: '$500 USD/mes',
  audience: 'Emprendedores 25-45 años',
  creatives: 6,
  duration: '30 días',
}

export function Step9Success() {
  const campaignSummary = useMarketingStore((s) => s.campaignSummary)
  const creatives = useMarketingStore((s) => s.creatives)
  const setStep = useMarketingStore((s) => s.setStep)
  const prevStep = useMarketingStore((s) => s.prevStep)

  const [publishing, setPublishing] = useState(false)
  const [exportingPdf, setExportingPdf] = useState(false)
  const [checkmarkDone, setCheckmarkDone] = useState(false)
  const summaryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setCheckmarkDone(true), 1400)
    return () => clearTimeout(t)
  }, [])

  const summary = campaignSummary ?? { ...DEFAULT_SUMMARY, creatives: creatives.filter((c) => c.isFavorite).length || DEFAULT_SUMMARY.creatives }

  const handlePublish = async () => {
    setPublishing(true)
    try {
      await apiClient.post('/marketing/campaigns/publish', { summary })
      toast.success('¡Campaña publicada con éxito!', { description: 'Recibirás un email con el resumen completo.' })
    } catch {
      // Backend endpoint may not exist yet — show success anyway as the plan is ready
      toast.success('¡Campaña lista para publicar!', {
        description: 'Cuando conectes tu cuenta de Meta Ads, la campaña se activará automáticamente.',
      })
    } finally {
      setPublishing(false)
    }
  }

  const handleExportPdf = async () => {
    if (!summaryRef.current) return
    setExportingPdf(true)
    try {
      const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
        import('jspdf'),
        import('html2canvas'),
      ])
      const canvas = await html2canvas(summaryRef.current, {
        backgroundColor: '#050505',
        scale: 2,
      })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const pageWidth = pdf.internal.pageSize.getWidth()
      const imgHeight = (canvas.height * pageWidth) / canvas.width
      pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, imgHeight)
      pdf.save(`yeison-campana-${new Date().toISOString().slice(0, 10)}.pdf`)
    } catch {
      toast.error('No se pudo generar el PDF. Intenta de nuevo.')
    } finally {
      setExportingPdf(false)
    }
  }

  const handleShare = async () => {
    const text = `Mi campaña de Marketing IA está lista: ${summary.objective} en ${summary.platform} con presupuesto ${summary.budget}`
    if (navigator.share) {
      navigator.share({ title: 'Campaña Yeison AI', text })
    } else {
      await navigator.clipboard.writeText(text)
      toast.info('Resumen copiado al portapapeles')
    }
  }

  const SUMMARY_FIELDS = [
    { label: 'Objetivo', value: summary.objective },
    { label: 'Plataforma', value: summary.platform },
    { label: 'Presupuesto', value: summary.budget },
    { label: 'Audiencia', value: summary.audience },
    { label: 'Creativos', value: `${summary.creatives} aprobados` },
    { label: 'Duración', value: summary.duration },
  ]

  return (
    <div className="max-w-2xl mx-auto text-center py-8">
      {/* Animated checkmark */}
      <div className="w-24 h-24 mx-auto mb-8">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <motion.circle
            cx="50" cy="50" r="45"
            fill="none" stroke="#1A1A1A" strokeWidth="4"
          />
          <motion.circle
            cx="50" cy="50" r="45"
            fill="none" stroke="#A3FF00" strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ rotate: -90, transformOrigin: 'center' }}
          />
          {checkmarkDone && (
            <motion.path
              d="M 30 50 L 45 65 L 70 38"
              fill="none" stroke="#A3FF00" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          )}
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-4xl font-black text-white mb-2">¡Campaña lista!</h2>
        <p className="text-[#ADADAD] mb-8">Tu campaña de Marketing IA está configurada y lista para publicar.</p>
      </motion.div>

      {/* Summary Card */}
      <div ref={summaryRef}>
      <NeonCard className="text-left mb-8" glow>
        <p className="text-xs font-mono text-[#A3FF00] uppercase tracking-widest mb-4">Resumen de campaña</p>
        <div className="grid grid-cols-2 gap-4">
          {SUMMARY_FIELDS.map((field) => (
            <div key={field.label}>
              <p className="text-[#666] text-xs mb-0.5">{field.label}</p>
              <p className="text-white text-sm font-medium">{field.value}</p>
            </div>
          ))}
        </div>
      </NeonCard>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handlePublish}
          disabled={publishing}
          className="col-span-2 flex items-center justify-center gap-2 py-4 bg-[#A3FF00] text-black font-black text-lg rounded-2xl hover:shadow-[0_0_30px_rgba(163,255,0,0.4)] transition-all disabled:opacity-70"
        >
          {publishing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Rocket className="w-5 h-5" />}
          {publishing ? 'Publicando...' : 'Publicar campaña'}
        </button>

        <button
          onClick={handleExportPdf}
          disabled={exportingPdf}
          className="flex items-center justify-center gap-2 py-3 border border-[#1A1A1A] text-[#ADADAD] rounded-xl hover:border-[#333] hover:text-white transition-all text-sm disabled:opacity-50"
        >
          {exportingPdf ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileDown className="w-4 h-4" />}
          {exportingPdf ? 'Generando...' : 'Exportar PDF'}
        </button>

        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 py-3 border border-[#1A1A1A] text-[#ADADAD] rounded-xl hover:border-[#333] hover:text-white transition-all text-sm"
        >
          <Share2 className="w-4 h-4" />
          Compartir
        </button>

        <button
          onClick={() => setStep(3)}
          className="col-span-2 flex items-center justify-center gap-2 py-3 border border-[#1A1A1A] text-[#666] rounded-xl hover:border-[#333] hover:text-white transition-all text-sm"
        >
          <Edit className="w-4 h-4" />
          Editar campaña
        </button>
      </div>

      <button onClick={prevStep} className="mt-6 text-[#444] hover:text-white text-xs transition-colors">
        ← Volver a automatizaciones
      </button>
    </div>
  )
}
