"use client"

import { useState } from "react"
import { CheckCircle } from "lucide-react"
import { motion } from "motion/react"
import { useTranslations } from "next-intl"
import GradientButton from "@/components/ui/GradientButton"

export default function PricingSection() {
  const t = useTranslations('pricing')
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')

  const pricingPlans = [
    {
      name: t('plans.starter.name'),
      price: t('plans.starter.price'),
      period: t('plans.starter.period'),
      description: t('plans.starter.description'),
      features: [
        t('plans.starter.features.0'),
        t('plans.starter.features.1'),
        t('plans.starter.features.2')
      ],
      cta: t('plans.starter.cta'),
      highlight: false
    },
    {
      name: t('plans.sales.name'),
      price: billingCycle === 'monthly' ? t('plans.sales.priceMonthly') : t('plans.sales.priceAnnual'),
      period: billingCycle === 'monthly' ? t('plans.sales.periodMonthly') : t('plans.sales.periodAnnual'),
      description: t('plans.sales.description'),
      features: [
        t('plans.sales.features.0'),
        t('plans.sales.features.1'),
        t('plans.sales.features.2'),
        t('plans.sales.features.3'),
        t('plans.sales.features.4')
      ],
      cta: t('plans.sales.cta'),
      highlight: false
    },
    {
      name: t('plans.salesMarketing.name'),
      price: billingCycle === 'monthly' ? t('plans.salesMarketing.priceMonthly') : t('plans.salesMarketing.priceAnnual'),
      period: billingCycle === 'monthly' ? t('plans.salesMarketing.periodMonthly') : t('plans.salesMarketing.periodAnnual'),
      description: t('plans.salesMarketing.description'),
      features: [
        t('plans.salesMarketing.features.0'),
        t('plans.salesMarketing.features.1'),
        t('plans.salesMarketing.features.2'),
        t('plans.salesMarketing.features.3'),
        t('plans.salesMarketing.features.4'),
        t('plans.salesMarketing.features.5')
      ],
      cta: t('plans.salesMarketing.cta'),
      highlight: true
    },
    {
      name: t('plans.premium.name'),
      price: billingCycle === 'monthly' ? t('plans.premium.priceMonthly') : t('plans.premium.priceAnnual'),
      period: billingCycle === 'monthly' ? t('plans.premium.periodMonthly') : t('plans.premium.periodAnnual'),
      description: t('plans.premium.description'),
      features: [
        t('plans.premium.features.0'),
        t('plans.premium.features.1'),
        t('plans.premium.features.2'),
        t('plans.premium.features.3'),
        t('plans.premium.features.4'),
        t('plans.premium.features.5')
      ],
      cta: t('plans.premium.cta'),
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
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4">{t('title')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {t('subtitle')}
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 p-2 glass rounded-full border border-white/10">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${billingCycle === 'monthly'
                  ? 'bg-gradient-to-r from-primary to-accent text-white'
                  : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              {t('monthly')}
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${billingCycle === 'annual'
                  ? 'bg-gradient-to-r from-primary to-accent text-white'
                  : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              {t('annual')}
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">{t('discount')}</span>
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={i}
              className={`relative rounded-3xl border-2 transition-all duration-300 ${plan.highlight
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
                  {t('recommended')}
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
