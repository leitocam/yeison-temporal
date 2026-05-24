'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Download, RefreshCw, PlusCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useMarketingStore } from '../context/useMarketingStore'
import { NeonBadge } from '../shared/NeonBadge'
import type { ContentResult, ContentFormat } from '../shared/types'

const FORMAT_LABELS: Record<ContentFormat, string> = {
  post_square: 'Post 1:1',
  story_vertical: 'Story 9:16',
  banner_horizontal: 'Banner 16:9',
  video_short: 'Video 9:16',
}

const FORMAT_RATIO: Record<ContentFormat, string> = {
  post_square: '1 / 1',
  story_vertical: '9 / 16',
  banner_horizontal: '16 / 9',
  video_short: '9 / 16',
}

interface ResultDisplayProps {
  result: ContentResult
  productName: string
  onRegenerate: () => void
}

export function ResultDisplay({ result, productName, onRegenerate }: ResultDisplayProps) {
  const appendCreative = useMarketingStore((s) => s.appendCreative)
  const router = useRouter()
  const pathname = usePathname()
  const localeMatch = pathname.match(/^\/([a-z]{2})\//)
  const locale = localeMatch ? localeMatch[1] : 'es'
  const [downloading, setDownloading] = useState(false)

  const isPlaceholder = result.imageUrl.includes('placehold.co')

  const handleDownload = async () => {
    if (isPlaceholder) {
      toast.info('Imagen de ejemplo — genera un resultado real para descargar')
      return
    }
    setDownloading(true)
    try {
      const res = await fetch(result.imageUrl)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${productName.replace(/\s+/g, '_')}_${result.format}.${isVideo ? 'mp4' : 'png'}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch {
      toast.error('No se pudo descargar la imagen. Intenta de nuevo.')
    } finally {
      setDownloading(false)
    }
  }

  const handleAddToCampaign = () => {
    appendCreative({
      id: result.generationId,
      tab: 'visuales',
      text: `[Visual] ${productName} — ${FORMAT_LABELS[result.format]}`,
      isFavorite: false,
      isDiscarded: false,
    })
    toast.success('Contenido agregado a la campaña', {
      description: 'Encuéntralo en el Wizard → Paso 4 → tab Visuales',
      action: {
        label: 'Ver campaña',
        onClick: () => router.push(`/${locale}/dashboard/marketing`),
      },
    })
  }

  const isVideo = !!result.videoUrl

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <NeonBadge>{FORMAT_LABELS[result.format]}</NeonBadge>
          <span className="text-xs text-[#666] font-mono">{productName}</span>
        </div>
        <button
          onClick={onRegenerate}
          className="flex items-center gap-1.5 text-xs text-[#666] hover:text-white transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Regenerar
        </button>
      </div>

      {/* Preview */}
      <div
        className="mx-auto overflow-hidden rounded-2xl border border-[#1A1A1A] shadow-[0_0_40px_rgba(163,255,0,0.08)] bg-[#050505]"
        style={{
          aspectRatio: FORMAT_RATIO[result.format],
          maxWidth: result.format === 'banner_horizontal' ? '100%' : '380px',
          maxHeight: '500px',
        }}
      >
        {isVideo ? (
          <video
            src={result.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={result.imageUrl}
            alt={`${productName} — ${FORMAT_LABELS[result.format]}`}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleDownload}
          disabled={downloading}
          title={isPlaceholder ? 'Imagen de ejemplo — genera un resultado real para descargar' : 'Descargar imagen'}
          className="flex items-center justify-center gap-2 py-3 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl text-[#ADADAD] text-sm font-medium hover:border-[#333] hover:text-white transition-all disabled:opacity-50"
        >
          {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          {isPlaceholder ? 'Ejemplo' : 'Descargar'}
        </button>

        <button
          onClick={handleAddToCampaign}
          className="flex items-center justify-center gap-2 py-3 bg-[#A3FF00] text-black rounded-xl text-sm font-bold hover:shadow-[0_0_20px_rgba(163,255,0,0.3)] transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          Agregar a campaña
        </button>
      </div>

      <p className="text-center text-[#333] text-[10px] font-mono">
        ID: {result.generationId}
      </p>
    </motion.div>
  )
}
