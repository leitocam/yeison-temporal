'use client'

import * as Switch from '@radix-ui/react-switch'
import { Blend, Square, Layers } from 'lucide-react'
import type { ContentStyle } from '../shared/types'

interface StyleEditorProps {
  style: ContentStyle
  onChange: (style: ContentStyle) => void
}

const BG_OPTIONS: { key: ContentStyle['backgroundStyle']; label: string; icon: React.ComponentType<{ className?: string }>; desc: string }[] = [
  { key: 'gradient', label: 'Degradado neon', icon: Blend, desc: 'Verde sobre negro' },
  { key: 'blurred_product', label: 'Producto difuminado', icon: Layers, desc: 'Tu imagen de fondo' },
  { key: 'solid_dark', label: 'Sólido oscuro', icon: Square, desc: 'Minimalista' },
]

export function StyleEditor({ style, onChange }: StyleEditorProps) {
  const set = <K extends keyof ContentStyle>(key: K, value: ContentStyle[K]) =>
    onChange({ ...style, [key]: value })

  return (
    <div className="space-y-6">
      <p className="text-white font-semibold">3. Personaliza el estilo</p>

      {/* Overlay text */}
      <div>
        <label className="block text-sm text-[#ADADAD] mb-1.5">Texto principal</label>
        <input
          value={style.overlayText}
          onChange={(e) => set('overlayText', e.target.value)}
          placeholder="Nombre del producto o titular..."
          className="w-full bg-[#0F0F0F] border border-[#1A1A1A] rounded-xl px-4 py-2.5 text-white placeholder:text-[#333] text-sm focus:outline-none focus:border-[#A3FF00]/50 transition-all"
        />
      </div>

      {/* Tagline */}
      <div>
        <label className="block text-sm text-[#ADADAD] mb-1.5">Tagline / subtítulo</label>
        <input
          value={style.tagline}
          onChange={(e) => set('tagline', e.target.value)}
          placeholder="Ej: Envío gratis hoy · Solo por tiempo limitado"
          className="w-full bg-[#0F0F0F] border border-[#1A1A1A] rounded-xl px-4 py-2.5 text-white placeholder:text-[#333] text-sm focus:outline-none focus:border-[#A3FF00]/50 transition-all"
        />
      </div>

      {/* Include price toggle */}
      <div className="flex items-center justify-between p-4 bg-[#0F0F0F] border border-[#1A1A1A] rounded-xl">
        <div>
          <p className="text-sm font-medium text-white">Mostrar precio</p>
          <p className="text-xs text-[#666] mt-0.5">Incluye el precio en el diseño generado</p>
        </div>
        <Switch.Root
          checked={style.includePrice}
          onCheckedChange={(v) => set('includePrice', v)}
          className={`w-11 h-6 rounded-full transition-all duration-200 focus:outline-none ${
            style.includePrice ? 'bg-[#A3FF00]' : 'bg-[#1A1A1A]'
          }`}
        >
          <Switch.Thumb
            className={`block w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
              style.includePrice ? 'translate-x-5' : 'translate-x-0.5'
            }`}
          />
        </Switch.Root>
      </div>

      {/* Background style */}
      <div>
        <label className="block text-sm text-[#ADADAD] mb-3">Fondo del diseño</label>
        <div className="grid grid-cols-3 gap-2">
          {BG_OPTIONS.map((opt) => {
            const isSelected = style.backgroundStyle === opt.key
            return (
              <button
                key={opt.key}
                onClick={() => set('backgroundStyle', opt.key)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-200 text-center ${
                  isSelected
                    ? 'border-[#A3FF00] bg-[#A3FF00]/10 text-[#A3FF00]'
                    : 'border-[#1A1A1A] text-[#666] hover:border-[#333] hover:text-white'
                }`}
              >
                <opt.icon className="w-5 h-5" />
                <div>
                  <p className="text-xs font-medium leading-tight">{opt.label}</p>
                  <p className="text-[10px] mt-0.5 opacity-70">{opt.desc}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
