'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'motion/react'
import { Loader2, Sparkles } from 'lucide-react'
import { useMarketingStore } from '../../context/useMarketingStore'
import { StepHeader } from '../../shared/StepHeader'
import { businessContextSchema, type BusinessContextSchema } from '../../shared/schemas'

const FIELD_TIPS: Record<string, string> = {
  whatYouSell: 'Sé específico. "Vendo cursos de cocina vegana para mujeres mayores de 30" convierte mejor que "vendo cursos online".',
  averagePrice: 'El precio define la estrategia. Ticket bajo → volumen. Ticket alto → relación y confianza.',
  whereSell: 'Si es online, menciona la plataforma (Shopify, Instagram, WhatsApp). Si es físico, la ciudad importa.',
  targetAudience: 'Piensa en la persona, no en el segmento. ¿Qué problema tiene? ¿Qué busca en Google a las 2am?',
  differentiator: '¿Por qué alguien te compra a ti y no a la competencia? Esa respuesta es tu diferenciador.',
  businessUrl: 'Si tienes web o perfil de Instagram, la IA analizará tu contenido para generar mejores copys.',
}

type FieldName = keyof BusinessContextSchema

const FIELDS: { name: FieldName; label: string; placeholder: string; multiline?: boolean }[] = [
  { name: 'whatYouSell', label: '¿Qué vendes?', placeholder: 'Ej: Ropa deportiva para mujeres latinas de 25-40 años', multiline: true },
  { name: 'averagePrice', label: 'Precio promedio de venta', placeholder: 'Ej: $150 USD o $80.000 COP' },
  { name: 'whereSell', label: '¿Dónde vendes?', placeholder: 'Ej: Tienda física en Bogotá + Instagram' },
  { name: 'targetAudience', label: 'Audiencia objetivo', placeholder: 'Ej: Madres de 28-45 años interesadas en fitness y bienestar', multiline: true },
  { name: 'differentiator', label: 'Diferenciador clave', placeholder: 'Ej: Envíos en 24h y diseños exclusivos que no encontrarás en tiendas', multiline: true },
  { name: 'businessUrl', label: 'URL del negocio (opcional)', placeholder: 'https://tunegocio.com' },
]

export function Step3BusinessContext() {
  const setBusinessContext = useMarketingStore((s) => s.setBusinessContext)
  const nextStep = useMarketingStore((s) => s.nextStep)
  const prevStep = useMarketingStore((s) => s.prevStep)
  const stored = useMarketingStore((s) => s.businessContext)

  const [focusedField, setFocusedField] = useState<string>('whatYouSell')
  const [isAutofilling, setIsAutofilling] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BusinessContextSchema>({
    resolver: zodResolver(businessContextSchema),
    defaultValues: stored ?? undefined,
  })

  const onSubmit = (data: BusinessContextSchema) => {
    setBusinessContext({
      whatYouSell: data.whatYouSell,
      averagePrice: data.averagePrice,
      whereSell: data.whereSell,
      targetAudience: data.targetAudience,
      differentiator: data.differentiator ?? '',
      businessUrl: data.businessUrl ?? '',
    })
    nextStep()
  }

  const handleAutofill = async () => {
    setIsAutofilling(true)
    await new Promise((r) => setTimeout(r, 1500))
    reset({
      whatYouSell: 'Cursos de marketing digital para emprendedores latinoamericanos',
      averagePrice: '$97 USD',
      whereSell: 'Plataforma online + WhatsApp',
      targetAudience: 'Emprendedores de 25-45 años con negocio propio que quieren crecer en redes sociales',
      differentiator: 'Metodología probada con más de 500 alumnos y soporte personalizado vía WhatsApp',
      businessUrl: '',
    })
    setIsAutofilling(false)
  }

  const currentTip = FIELD_TIPS[focusedField] ?? FIELD_TIPS.whatYouSell

  return (
    <div>
      <StepHeader step={3} title="Cuéntanos sobre tu negocio" subtitle="La IA usará esta info para generar creativos y estrategias hiper-personalizadas." />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {FIELDS.map(({ name, label, placeholder, multiline }) => {
            const error = errors[name]
            return (
              <div key={name}>
                <label className="block text-sm font-medium text-white mb-1.5">{label}</label>
                {multiline ? (
                  <textarea
                    {...register(name)}
                    placeholder={placeholder}
                    rows={2}
                    onFocus={() => setFocusedField(name)}
                    className="w-full bg-[#0F0F0F] border border-[#1A1A1A] rounded-xl px-4 py-3 text-white placeholder:text-[#333] text-sm resize-none focus:outline-none focus:border-[#A3FF00] focus:shadow-[0_0_0_1px_rgba(163,255,0,0.2)] transition-all duration-200"
                  />
                ) : (
                  <input
                    {...register(name)}
                    placeholder={placeholder}
                    onFocus={() => setFocusedField(name)}
                    className="w-full bg-[#0F0F0F] border border-[#1A1A1A] rounded-xl px-4 py-3 text-white placeholder:text-[#333] text-sm focus:outline-none focus:border-[#A3FF00] focus:shadow-[0_0_0_1px_rgba(163,255,0,0.2)] transition-all duration-200"
                  />
                )}
                {error && (
                  <motion.p
                    animate={{ x: [0, 10, -10, 10, -10, 0] }}
                    transition={{ duration: 0.4 }}
                    className="text-red-400 text-xs mt-1"
                  >
                    {error.message}
                  </motion.p>
                )}
              </div>
            )
          })}

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={prevStep}
              className="px-5 py-3 rounded-xl border border-[#1A1A1A] text-[#666] hover:text-white hover:border-[#333] transition-all text-sm"
            >
              ← Volver
            </button>
            <button
              type="button"
              onClick={handleAutofill}
              disabled={isAutofilling}
              className="flex items-center gap-2 px-5 py-3 rounded-xl border border-[#A3FF00]/30 text-[#A3FF00] hover:bg-[#A3FF00]/10 transition-all text-sm font-medium"
            >
              {isAutofilling ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Autocompletar con IA
            </button>
            <button
              type="submit"
              className="ml-auto px-8 py-3 bg-[#A3FF00] text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(163,255,0,0.3)] transition-all text-sm"
            >
              Continuar →
            </button>
          </div>
        </form>

        {/* Tips Panel */}
        <div className="hidden lg:block">
          <div className="sticky top-6 bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl p-5">
            <p className="text-[#A3FF00] text-xs font-mono uppercase tracking-widest mb-3">Consejo IA</p>
            <motion.p
              key={focusedField}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#ADADAD] text-sm leading-relaxed"
            >
              {currentTip}
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  )
}
