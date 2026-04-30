"use client"

import { useState } from "react"
import { CheckCircle } from "lucide-react"
import { motion } from "motion/react"
import { useTranslations } from "next-intl"
import GradientButton from "@/components/ui/GradientButton"
import { SectionContainer, SectionHeader } from "@/components/landing/shared"

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
    <section id="pricing" className="py-24 relative bg-[#050505]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(163,255,0,0.08),transparent_55%)] pointer-events-none"></div>

      <SectionContainer width="section" className="relative z-10">
        <SectionHeader className="mb-12" title={t('title')} subtitle={t('subtitle')} />

        {/* Billing Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-3 p-2 rounded-full bg-card border border-border">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${billingCycle === 'monthly'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              {t('monthly')}
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${billingCycle === 'annual'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              {t('annual')}
              <span className="text-xs bg-primary/15 text-primary px-2 py-0.5 rounded-full">{t('discount')}</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={i}
              className={`relative rounded-3xl border-2 transition-all duration-300 ${plan.highlight
                  ? "bg-card border-primary/70 lg:scale-105 lg:-my-4 shadow-[0_0_30px_rgba(163,255,0,0.16)]"
                  : "bg-card border-border hover:border-primary/40"
                }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={!plan.highlight ? { y: -8 } : undefined}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-bold rounded-full shadow-lg">
                  {t('recommended')}
                </div>
              )}
              <div className="p-6 h-full flex flex-col">
                <h3 className="text-xl font-bold mb-2 tracking-[-0.01em]">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>

                <div className="mb-6">
                  <div className="text-3xl font-black text-primary">{plan.price}</div>
                  <div className="text-muted-foreground text-sm mt-1">{plan.period}</div>
                </div>

                <ul className="space-y-3 mb-6 flex-1">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <GradientButton href="/login">{plan.cta}</GradientButton>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionContainer>
    </section>
  )
}
