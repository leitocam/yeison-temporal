'use client'

import { useState, useMemo } from 'react'
import { HelpCircle, Book, MessageSquare, PhoneCall, ChevronDown, Search } from 'lucide-react'
import * as Collapsible from '@radix-ui/react-collapsible'

const FAQ_ITEMS = [
  {
    q: '¿Cómo configuro mi agente de IA?',
    a: 'Ve a Dashboard → Agentes → Crear nuevo agente. Elige el tipo de agente (ventas, soporte, etc.), personaliza el tono y comportamiento, y conecta tu número de WhatsApp o Telegram siguiendo los pasos del asistente de configuración.',
  },
  {
    q: '¿Cómo conecto mi número de WhatsApp?',
    a: 'En la configuración del agente, ve a la pestaña de Integraciones y selecciona WhatsApp. Sigue el proceso de Embedded Signup de Meta para conectar tu cuenta de WhatsApp Business. Necesitarás una cuenta de Facebook Business verificada.',
  },
  {
    q: '¿Cómo agrego productos a mi inventario?',
    a: 'Ve a Dashboard → Inventario → Agregar producto. Completa el nombre, precio, descripción y sube una imagen. Puedes activar el seguimiento de stock para que el agente gestione la disponibilidad automáticamente.',
  },
  {
    q: '¿Cómo veo las métricas de conversación?',
    a: 'En el Dashboard principal encontrarás un resumen de KPIs. Para métricas detalladas, ve a la sección Métricas donde puedes filtrar por período de tiempo (24h, 7 días, 30 días o 90 días).',
  },
  {
    q: '¿Cómo funciona la sección de Marketing IA?',
    a: 'La sección de Campañas te guía en 9 pasos para crear una estrategia de marketing personalizada con IA. Incluye generación de copys, hooks, guiones y análisis de embudo. El Estudio de Contenido te permite generar imágenes publicitarias usando productos de tu inventario.',
  },
  {
    q: '¿Puedo tener múltiples agentes?',
    a: 'Sí. Puedes crear varios agentes con diferentes configuraciones, tipos y canales de comunicación. Cada agente puede tener su propio número de WhatsApp, personalidad y catálogo de productos.',
  },
  {
    q: '¿Qué pasa cuando un cliente quiere hablar con un humano?',
    a: 'Puedes configurar el umbral de transferencia en la sección de Conversaciones del agente. Cuando se activa, el agente notifica al equipo y puede transferir la conversación. También puedes configurar el número de mensajes antes de sugerir hablar con un humano.',
  },
  {
    q: '¿Los datos de mis clientes están seguros?',
    a: 'Sí. Todos los datos se cifran en tránsito y en reposo. Cumplimos con las políticas de privacidad de WhatsApp Business API y no compartimos datos con terceros. Puedes solicitar la eliminación de datos en cualquier momento.',
  },
]

const SUPPORT_OPTIONS = [
  {
    icon: Book,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    title: 'Documentación',
    desc: 'Guías paso a paso para configurar Yeison en tu empresa.',
    action: () => window.open('https://docs.yeison.ai', '_blank'),
    label: 'Ver documentación',
  },
  {
    icon: MessageSquare,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    title: 'Chat con Soporte',
    desc: 'Habla con nuestro equipo de soporte para resolver dudas técnicas.',
    action: () => window.open('https://wa.me/573001234567?text=Hola, necesito ayuda con Yeison', '_blank'),
    label: 'Abrir chat',
  },
  {
    icon: PhoneCall,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    title: 'Agendar Llamada',
    desc: 'Habla con un experto en integraciones IA para tu negocio.',
    action: () => window.open('https://calendly.com/yeison-ai', '_blank'),
    label: 'Agendar ahora',
  },
]

export default function HelpPage() {
  const [search, setSearch] = useState('')
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  const filteredFAQ = useMemo(() => {
    const q = search.toLowerCase().trim()
    if (!q) return FAQ_ITEMS
    return FAQ_ITEMS.filter(
      (item) => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
    )
  }, [search])

  const toggleItem = (i: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Hero Search */}
      <div className="bg-linear-to-br from-primary/20 via-accent/10 to-transparent p-8 rounded-3xl border border-primary/20">
        <h1 className="text-3xl font-bold">¿Cómo podemos ayudarte hoy?</h1>
        <p className="text-muted-foreground mt-2 max-w-xl">
          Encuentra respuestas rápidas o contacta directamente con nuestro equipo de soporte.
        </p>

        <div className="mt-6 relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar en preguntas frecuentes..."
            className="w-full bg-background/80 backdrop-blur-md border border-primary/20 rounded-xl pl-10 pr-4 py-3 outline-none focus:border-primary/50 transition-colors shadow-lg text-sm"
          />
        </div>
      </div>

      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SUPPORT_OPTIONS.map((opt) => {
          const Icon = opt.icon
          return (
            <button
              key={opt.title}
              onClick={opt.action}
              className="bg-card/40 backdrop-blur-md border border-primary/10 rounded-2xl p-6 hover:bg-white/5 transition-colors cursor-pointer group text-left"
            >
              <div className={`p-3 ${opt.bg} rounded-xl ${opt.color} w-fit mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg">{opt.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{opt.desc}</p>
              <span className={`text-xs font-medium ${opt.color} mt-3 block`}>{opt.label} →</span>
            </button>
          )
        })}
      </div>

      {/* FAQ Section */}
      <div className="bg-card/40 backdrop-blur-md border border-primary/10 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Preguntas Frecuentes</h2>
          {search && (
            <span className="text-xs text-muted-foreground ml-auto">
              {filteredFAQ.length} resultado{filteredFAQ.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        <div className="space-y-2">
          {filteredFAQ.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No se encontraron resultados para "{search}".
            </p>
          ) : (
            filteredFAQ.map((item, i) => {
              const open = openItems.has(i)
              return (
                <Collapsible.Root key={i} open={open} onOpenChange={() => toggleItem(i)}>
                  <Collapsible.Trigger className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors text-left group">
                    <span className="text-sm font-medium">{item.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-muted-foreground flex-shrink-0 ml-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                    />
                  </Collapsible.Trigger>
                  <Collapsible.Content className="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
                    <p className="text-sm text-muted-foreground px-4 pb-4 leading-relaxed">
                      {item.a}
                    </p>
                  </Collapsible.Content>
                </Collapsible.Root>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
