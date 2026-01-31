"use client"

import { MessageCircle, BarChart3, Sparkles, Clock, Users, Shield } from "lucide-react"
import { motion } from "motion/react"
import { useTranslations } from "next-intl"
import FeatureCard3D from "@/components/ui/FeatureCard3D"

export default function FeaturesSection() {
    const t = useTranslations('features')

    const features = [
        {
            icon: MessageCircle,
            title: t('whatsapp.title'),
            description: t('whatsapp.description'),
            gradientFrom: "#03a9f4",
            gradientTo: "#00d9ff"
        },
        {
            icon: BarChart3,
            title: t('analytics.title'),
            description: t('analytics.description'),
            gradientFrom: "#f441a5",
            gradientTo: "#ff6b6b"
        },
        {
            icon: Sparkles,
            title: t('marketing.title'),
            description: t('marketing.description'),
            gradientFrom: "#7c3aed",
            gradientTo: "#a855f7"
        },
        {
            icon: Clock,
            title: t('automation.title'),
            description: t('automation.description'),
            gradientFrom: "#10b981",
            gradientTo: "#34d399"
        },
        {
            icon: Users,
            title: t('team.title'),
            description: t('team.description'),
            gradientFrom: "#f59e0b",
            gradientTo: "#fbbf24"
        },
        {
            icon: Shield,
            title: t('security.title'),
            description: t('security.description'),
            gradientFrom: "#06b6d4",
            gradientTo: "#22d3ee"
        }
    ]

    return (
        <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-balance">
                        {t('title')}{" "}
                        <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                            {t('titleHighlight')}
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            </div>
        </section>
    )
}
