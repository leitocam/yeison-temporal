"use client"

import { useState } from "react"
import { CheckCircle } from "lucide-react"
import { motion } from "motion/react"
import GradientButton from "@/components/ui/GradientButton"

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')

  const pricingPlans = [
    {
      name: "Starter",
      price: billingCycle === 'monthly' ? "Gratis" : "Gratis",
      period: "Para siempre",
      description: "Ideal para probar",
      features: [
        "Hasta 1 agente",
        "50 conversaciones/mes",
        "Soporte comunidad"
      ],
      cta: "Empezar gratis",
      highlight: false
    },
    {
      name: "Ventas",
      price: billingCycle === 'monthly' ? "USD 39" : "USD 33",
      period: billingCycle === 'monthly' ? "/mes" : "/mes (facturado anual)",
      description: "Agente de ventas completo",
      features: [
        "Agente de ventas por WhatsApp",
        "Cotizaciones automáticas",
        "Seguimiento de clientes",
        "500 conversaciones/mes",
        "Soporte estándar"
      ],
      cta: "Probar ahora",
      highlight: false
    },
    {
      name: "Ventas + Marketing",
      price: billingCycle === 'monthly' ? "USD 59" : "USD 49",
      period: billingCycle === 'monthly' ? "/mes" : "/mes (facturado anual)",
      description: "La combinación perfecta",
      features: [
        "Todo de Ventas",
        "Agente de Marketing",
        "30 contenidos/mes",
        "1000 conversaciones/mes",
        "Métricas avanzadas",
        "Soporte prioritario"
      ],
      cta: "Recomendado",
      highlight: true
    },
    {
      name: "Premium",
      price: billingCycle === 'monthly' ? "USD 99" : "USD 79",
      period: billingCycle === 'monthly' ? "/mes" : "/mes (facturado anual)",
      description: "Para equipos grandes",
      features: [
        "Todos los agentes",
        "Conversaciones ilimitadas",
        "Soporte prioritario 24/7",
        "Configuración avanzada",
        "API acceso completo",
        "Onboarding personalizado"
      ],
      cta: "Hablar con ventas",
      highlight: false
    }
  ]

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4">Planes y Precios</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Empieza gratis. Escala cuando estés listo.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 p-2 glass rounded-full border border-white/10">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-gradient-to-r from-primary to-accent text-white'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Mensual
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                billingCycle === 'annual'
                  ? 'bg-gradient-to-r from-primary to-accent text-white'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Anual
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">-20%</span>
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={i}
              className={`relative rounded-3xl border-2 transition-all duration-300 ${
                plan.highlight
                  ? "bg-gradient-to-br from-primary/20 to-accent/10 border-primary/60 lg:scale-105 lg:-my-4"
                  : "glass border-primary/20 hover:border-primary/40"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={!plan.highlight ? { y: -8 } : undefined}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-accent text-white text-sm font-bold rounded-full shadow-lg">
                  RECOMENDADO
                </div>
              )}
              <div className="p-6 h-full flex flex-col">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>

                <div className="mb-6">
                  <div className="text-3xl font-black">{plan.price}</div>
                  <div className="text-muted-foreground text-sm mt-1">{plan.period}</div>
                </div>

                <ul className="space-y-3 mb-6 flex-1">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <GradientButton href="/login">{plan.cta}</GradientButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
