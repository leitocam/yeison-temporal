"use client"

import { MessageCircle, BarChart3, Sparkles, Clock, Users, Shield } from "lucide-react"
import { motion } from "motion/react"
import FeatureCard3D from "@/components/ui/FeatureCard3D"

const features = [
    {
        icon: MessageCircle,
        title: "🤖 Agente de Ventas por WhatsApp",
        description: "Atiende clientes automáticamente, envía cotizaciones, responde objeciones y hace seguimiento hasta cerrar la venta. Funciona las 24 horas, todos los días.",
        gradientFrom: "#03a9f4",
        gradientTo: "#00d9ff"
    },
    {
        icon: BarChart3,
        title: "📊 Análisis y Seguimiento",
        description: "Visualiza cuántos clientes escriben, cuántos compran y en qué etapa se pierden. Decisiones claras, sin Excel.",
        gradientFrom: "#f441a5",
        gradientTo: "#ff6b6b"
    },
    {
        icon: Sparkles,
        title: "📣 Agente de Marketing",
        description: "Genera publicaciones, textos promocionales y mantiene activas tus redes sociales sin contratar un community manager.",
        gradientFrom: "#7c3aed",
        gradientTo: "#a855f7"
    },
    {
        icon: Clock,
        title: "⚙️ Flujos Automatizados",
        description: "Seguimientos, recordatorios, recuperación de clientes inactivos y respuestas frecuentes sin intervención humana.",
        gradientFrom: "#10b981",
        gradientTo: "#34d399"
    },
    {
        icon: Users,
        title: "👥 Control para tu Equipo",
        description: "Define reglas, revisa conversaciones y mantén control total. La IA trabaja, tú decides.",
        gradientFrom: "#f59e0b",
        gradientTo: "#fbbf24"
    },
    {
        icon: Shield,
        title: "🔒 Seguridad Empresarial",
        description: "Arquitectura segura, control de accesos y datos protegidos. Preparado para crecer con tu empresa.",
        gradientFrom: "#06b6d4",
        gradientTo: "#22d3ee"
    }
]

export default function FeaturesSection() {
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
                        Todo lo que necesitas.{" "}
                        <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                            En un solo lugar.
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Automatización poderosa que tu equipo amará usar
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
