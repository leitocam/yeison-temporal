"use client"

import { MessageCircle, BarChart3, Sparkles, Clock, Users, Shield } from "lucide-react"
import { useTranslations } from "next-intl"
import FeatureCard3D from "@/components/ui/FeatureCard3D"
import { SectionContainer, SectionHeader } from "@/components/landing/shared"
import { LANDING_FEATURE_GRADIENTS } from "@/components/landing/theme/brand"

export default function FeaturesSection() {
    const t = useTranslations('features')

    const features = [
        {
            icon: MessageCircle,
            title: t('whatsapp.title'),
            description: t('whatsapp.description'),
            gradientFrom: LANDING_FEATURE_GRADIENTS.whatsapp.from,
            gradientTo: LANDING_FEATURE_GRADIENTS.whatsapp.to
        },
        {
            icon: BarChart3,
            title: t('analytics.title'),
            description: t('analytics.description'),
            gradientFrom: LANDING_FEATURE_GRADIENTS.analytics.from,
            gradientTo: LANDING_FEATURE_GRADIENTS.analytics.to
        },
        {
            icon: Sparkles,
            title: t('marketing.title'),
            description: t('marketing.description'),
            gradientFrom: LANDING_FEATURE_GRADIENTS.marketing.from,
            gradientTo: LANDING_FEATURE_GRADIENTS.marketing.to
        },
        {
            icon: Clock,
            title: t('automation.title'),
            description: t('automation.description'),
            gradientFrom: LANDING_FEATURE_GRADIENTS.automation.from,
            gradientTo: LANDING_FEATURE_GRADIENTS.automation.to
        },
        {
            icon: Users,
            title: t('team.title'),
            description: t('team.description'),
            gradientFrom: LANDING_FEATURE_GRADIENTS.team.from,
            gradientTo: LANDING_FEATURE_GRADIENTS.team.to
        },
        {
            icon: Shield,
            title: t('security.title'),
            description: t('security.description'),
            gradientFrom: LANDING_FEATURE_GRADIENTS.security.from,
            gradientTo: LANDING_FEATURE_GRADIENTS.security.to
        }
    ]

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

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {features.map((feature, i) => (
                        <FeatureCard3D
                            key={i}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            gradientFrom={feature.gradientFrom}
                            gradientTo={feature.gradientTo}
                            index={i}
                        />
                    ))}
                </div>
            </SectionContainer>
        </section>
    )
}
