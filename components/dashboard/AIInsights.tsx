"use client"

import {
    Sparkles,
    TrendingUp,
    AlertCircle,
    Zap,
    ArrowRight,
    Phone,
    MessageSquare
} from "lucide-react"

interface Insight {
    id: string
    type: "opportunity" | "optimization" | "integration" | "risk"
    title: string
    description: string
    confidence: number
    action: string
    actionLabel: string
}

interface AIInsightsProps {
    insights?: Insight[]
}

// Confidence ring component
function ConfidenceRing({ percent, size = 36 }: { percent: number, size?: number }) {
    const strokeWidth = 3
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (percent / 100) * circumference

    const getColor = (p: number) => {
        if (p >= 75) return "#10b981"
        if (p >= 50) return "#f59e0b"
        return "#ef4444"
    }

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    className="text-primary/10"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={getColor(percent)}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">
                {percent}%
            </span>
        </div>
    )
}

const insightConfig = {
    opportunity: {
        icon: TrendingUp,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
        borderColor: "border-emerald-500/30"
    },
    optimization: {
        icon: Zap,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/30"
    },
    integration: {
        icon: MessageSquare,
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
        borderColor: "border-purple-500/30"
    },
    risk: {
        icon: AlertCircle,
        color: "text-amber-500",
        bgColor: "bg-amber-500/10",
        borderColor: "border-amber-500/30"
    }
}

export default function AIInsights({ insights }: AIInsightsProps) {
    const defaultInsights: Insight[] = [
        {
            id: "1",
            type: "opportunity",
            title: "Lead de alto valor detectado",
            description: "Juan Pérez tiene 78% probabilidad de cierre. Interesado en Enterprise.",
            confidence: 78,
            action: "/leads/123",
            actionLabel: "Intervenir ahora"
        },
        {
            id: "2",
            type: "optimization",
            title: "Optimizar guión de ventas",
            description: "El guión 'Objeciones precio' tiene 23% menos efectividad esta semana.",
            confidence: 65,
            action: "/scripts",
            actionLabel: "Revisar guión"
        },
        {
            id: "3",
            type: "integration",
            title: "Integración pendiente",
            description: "Conectar con tu CRM puede aumentar conversiones un 35%.",
            confidence: 85,
            action: "/settings/integrations",
            actionLabel: "Conectar CRM"
        }
    ]

    const displayInsights = insights ?? []
    const isEmpty = displayInsights.length === 0

    return (
        <div className="rounded-2xl bg-primary/5 border border-primary/10 overflow-hidden">
            <div className="p-4 border-b border-primary/10 flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
                    <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div>
                    <h3 className="font-bold text-sm">Recomendaciones IA</h3>
                    <p className="text-[10px] text-muted-foreground">Acciones sugeridas para optimizar ventas</p>
                </div>
            </div>

            {isEmpty ? (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center gap-2">
                    <Sparkles className="w-8 h-8 text-muted-foreground/30" />
                    <p className="text-sm text-muted-foreground">Sin recomendaciones aún.</p>
                    <p className="text-[11px] text-muted-foreground/60">La IA generará insights a medida que lleguen más datos.</p>
                </div>
            ) : (
                <div className="divide-y divide-primary/5">
                    {displayInsights.map((insight) => {
                        const config = insightConfig[insight.type]
                        const Icon = config.icon

                        return (
                            <div
                                key={insight.id}
                                className={`p-4 hover:bg-primary/5 transition-colors border-l-2 ${config.borderColor}`}
                            >
                                <div className="flex items-start gap-3">
                                    <ConfidenceRing percent={insight.confidence} />

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Icon className={`w-3.5 h-3.5 ${config.color}`} />
                                            <p className="text-xs font-bold">{insight.title}</p>
                                        </div>
                                        <p className="text-[11px] text-muted-foreground mb-3">
                                            {insight.description}
                                        </p>
                                        <button className={`flex items-center gap-1.5 text-[11px] font-semibold ${config.color} hover:underline`}>
                                            {insight.actionLabel}
                                            <ArrowRight className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
