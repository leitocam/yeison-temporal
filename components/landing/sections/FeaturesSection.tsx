"use client"

import { MessageCircle, Megaphone, Users, Package, Calculator, Cog } from "lucide-react"
import { useTranslations } from "next-intl"
import { motion } from "motion/react"
import FeatureCard3D from "@/components/ui/FeatureCard3D"
import { SectionContainer, SectionHeader } from "@/components/landing/shared"
import { LANDING_FEATURE_GRADIENTS } from "@/components/landing/theme/brand"

interface SpecializedAgent {
    title: string
    description: string
    price: string
}

export default function FeaturesSection() {
    const t = useTranslations('features')

    const agents = [
        {
            icon: MessageCircle,
            title: t('ventas.title'),
            description: t('ventas.description'),
            gradientFrom: LANDING_FEATURE_GRADIENTS.whatsapp.from,
            gradientTo: LANDING_FEATURE_GRADIENTS.whatsapp.to
        },
        {
            icon: Megaphone,
            title: t('marketing.title'),
            description: t('marketing.description'),
            gradientFrom: LANDING_FEATURE_GRADIENTS.marketing.from,
            gradientTo: LANDING_FEATURE_GRADIENTS.marketing.to
        },
        {
            icon: Users,
            title: t('rrhh.title'),
            description: t('rrhh.description'),
            gradientFrom: LANDING_FEATURE_GRADIENTS.team.from,
            gradientTo: LANDING_FEATURE_GRADIENTS.team.to
        },
        {
            icon: Package,
            title: t('inventarios.title'),
            description: t('inventarios.description'),
            gradientFrom: LANDING_FEATURE_GRADIENTS.analytics.from,
            gradientTo: LANDING_FEATURE_GRADIENTS.analytics.to
        },
        {
            icon: Calculator,
            title: t('contabilidad.title'),
            description: t('contabilidad.description'),
            gradientFrom: LANDING_FEATURE_GRADIENTS.automation.from,
            gradientTo: LANDING_FEATURE_GRADIENTS.automation.to
        },
        {
            icon: Cog,
            title: t('automatizacion.title'),
            description: t('automatizacion.description'),
            gradientFrom: LANDING_FEATURE_GRADIENTS.security.from,
            gradientTo: LANDING_FEATURE_GRADIENTS.security.to
        }
    ]

    const specializedAgents = ['inmobiliario', 'seguros', 'legal'] as const
    const specializedData = specializedAgents.map(key => t.raw(`specialized.${key}`) as SpecializedAgent)

    return (
        <section id="features" className="py-24 bg-[#060606]">
            <SectionContainer width="section">
                <SectionHeader
                    className="mb-16"
                    titleClassName="mb-6"
                    title={
                        <>
                        {t('title')}{" "}
                        <span className="text-primary">
                            {t('titleHighlight')}
                        </span>
                        </>
                    }
                    subtitle={t('subtitle')}
                />

                {/* Main Agents Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {agents.map((agent, i) => (
                        <FeatureCard3D
                            key={i}
                            icon={agent.icon}
                            title={agent.title}
                            description={agent.description}
                            gradientFrom={agent.gradientFrom}
                            gradientTo={agent.gradientTo}
                            index={i}
                        />
                    ))}
                </div>

                {/* Specialized Agents */}
                <div className="mt-20">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5">
                            <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary">{t('specializedBadge')}</span>
                        </div>
                        <h3 className="text-3xl sm:text-4xl font-black mb-3 tracking-[-0.02em]">{t('specializedTitle')}</h3>
                        <p className="text-muted-foreground max-w-xl mx-auto">{t('specializedSubtitle')}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {specializedData.map((agent, i) => (
                            <motion.div
                                key={i}
                                className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all relative overflow-hidden group"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -5 }}
                            >
                                <div className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary/70 bg-primary/10 rounded-full border border-primary/20">
                                    {t('specializedBadge')}
                                </div>
                                <h4 className="text-lg font-bold mb-2">{agent.title}</h4>
                                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{agent.description}</p>
                                <p className="text-sm font-semibold text-primary">{agent.price}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </SectionContainer>
        </section>
    )
}
