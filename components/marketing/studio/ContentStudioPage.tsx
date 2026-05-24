'use client'

import { useState, useRef } from 'react'
import { apiClient, type InventoryItem } from '@/lib/api-client'
import { ProductPicker } from './ProductPicker'
import { FormatSelector } from './FormatSelector'
import { StyleEditor } from './StyleEditor'
import { GenerationPanel } from './GenerationPanel'
import { ResultDisplay } from './ResultDisplay'
import type { ContentFormat, ContentStyle, ContentResult, StudioPhase } from '../shared/types'

const DEFAULT_STYLE: ContentStyle = {
  backgroundStyle: 'gradient',
  overlayText: '',
  includePrice: true,
  tagline: '',
}

// Fallback placeholders por formato cuando la API no está disponible aún
const PLACEHOLDER_IMAGES: Record<ContentFormat, string> = {
  post_square: 'https://placehold.co/1080x1080/0A0A0A/A3FF00?text=Post+Publicitario',
  story_vertical: 'https://placehold.co/1080x1920/0A0A0A/A3FF00?text=Story+Generada',
  banner_horizontal: 'https://placehold.co/1920x1080/0A0A0A/A3FF00?text=Banner+Generado',
  video_short: 'https://placehold.co/1080x1920/0A0A0A/A3FF00?text=Video+Generado',
}

const GENERATION_PHASES: StudioPhase[] = ['analizando', 'componiendo', 'aplicando', 'renderizando', 'done']

export function ContentStudioPage() {
  const [selectedProduct, setSelectedProduct] = useState<InventoryItem | null>(null)
  const [format, setFormat] = useState<ContentFormat>('post_square')
  const [style, setStyle] = useState<ContentStyle>(DEFAULT_STYLE)
  const [phase, setPhase] = useState<StudioPhase>('idle')
  const [result, setResult] = useState<ContentResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const phaseTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const handleProductSelect = (product: InventoryItem | null) => {
    setSelectedProduct(product)
    if (product && !style.overlayText) {
      setStyle((s) => ({ ...s, overlayText: product.product_name }))
    }
  }

  const runPhases = (onDone: () => void) => {
    let i = 0
    setPhase(GENERATION_PHASES[0])
    phaseTimerRef.current = setInterval(() => {
      i++
      if (i < GENERATION_PHASES.length - 1) {
        setPhase(GENERATION_PHASES[i])
      } else {
        if (phaseTimerRef.current) clearInterval(phaseTimerRef.current)
        onDone()
      }
    }, 850)
  }

  const handleGenerate = async () => {
    if (!selectedProduct) return
    setError(null)
    setResult(null)

    let apiResult: ContentResult | null = null

    // Start phase animation immediately
    runPhases(() => {
      // When phases finish, either apiResult is ready or we use placeholder
      const finalResult = apiResult ?? {
        imageUrl: PLACEHOLDER_IMAGES[format],
        generationId: `mock-${Date.now()}`,
        format,
      }
      setResult(finalResult)
      setPhase('done')
    })

    // Parallel API call
    try {
      const data = await apiClient.post<{ image_url: string; video_url?: string; generation_id: string }>(
        '/marketing/content/generate',
        { product: selectedProduct, format, style }
      )
      apiResult = {
        imageUrl: data.image_url,
        videoUrl: data.video_url,
        generationId: data.generation_id,
        format,
      }
    } catch {
      // API not available yet — phases will finish and use placeholder
    }
  }

  const handleRegenerate = () => {
    if (phaseTimerRef.current) clearInterval(phaseTimerRef.current)
    setResult(null)
    setPhase('idle')
    setError(null)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div>
        <h2 className="text-3xl font-black tracking-tight text-white mb-1">Estudio de Contenido</h2>
        <p className="text-[#ADADAD]">
          Selecciona un producto de tu inventario y genera imágenes o videos publicitarios con IA.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
        {/* Left column: pickers + style */}
        <div className="space-y-10">
          <ProductPicker selected={selectedProduct} onSelect={handleProductSelect} />
          <FormatSelector selected={format} onSelect={setFormat} />
          <StyleEditor style={style} onChange={setStyle} />
        </div>

        {/* Right column: generation + result */}
        <div className="space-y-6">
          <div className="sticky top-6 space-y-6">
            {/* Preview placeholder before generation */}
            {phase === 'idle' && !result && (
              <div
                className="w-full rounded-2xl border border-dashed border-[#1A1A1A] bg-[#050505] flex flex-col items-center justify-center text-center p-6"
                style={{
                  aspectRatio: format === 'banner_horizontal' ? '16/9' : format === 'post_square' ? '1/1' : '9/16',
                  maxHeight: '420px',
                }}
              >
                <div className="w-16 h-16 rounded-2xl bg-[#A3FF00]/10 border border-[#A3FF00]/20 flex items-center justify-center mb-3">
                  <span className="text-2xl">🎨</span>
                </div>
                <p className="text-[#333] text-sm">La imagen generada aparecerá aquí</p>
                {selectedProduct && (
                  <p className="text-[#444] text-xs mt-1">{selectedProduct.product_name}</p>
                )}
              </div>
            )}

            {/* Result */}
            {result && (
              <ResultDisplay
                result={result}
                productName={selectedProduct?.product_name ?? 'Producto'}
                onRegenerate={handleRegenerate}
              />
            )}

            {/* Generation panel */}
            {!result && (
              <GenerationPanel
                phase={phase}
                error={error}
                canGenerate={!!selectedProduct}
                onGenerate={handleGenerate}
              />
            )}

            {/* Product summary card */}
            {selectedProduct && phase === 'idle' && !result && (
              <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl p-4 space-y-2">
                <p className="text-xs font-mono text-[#A3FF00] uppercase tracking-widest">Producto seleccionado</p>
                <div className="flex items-center gap-3">
                  {selectedProduct.image_url ? (
                    <img
                      src={selectedProduct.image_url}
                      alt={selectedProduct.product_name}
                      className="w-12 h-12 rounded-lg object-cover border border-[#1A1A1A]"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-[#111] border border-[#1A1A1A] flex items-center justify-center text-[#333] text-xl">
                      📦
                    </div>
                  )}
                  <div>
                    <p className="text-white text-sm font-semibold">{selectedProduct.product_name}</p>
                    <p className="text-[#A3FF00] text-xs font-mono">${selectedProduct.price.toLocaleString('es-CO')}</p>
                    {selectedProduct.description && (
                      <p className="text-[#555] text-[10px] mt-0.5 line-clamp-1">{selectedProduct.description}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
