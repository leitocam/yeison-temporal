"use client"

import {
    User,
    MessageSquare,
    AlertTriangle,
    CheckCircle,
    Clock,
    TrendingUp,
    Bot,
    Send,
    XCircle
} from "lucide-react"

interface Activity {
    id: string
    type: "lead_hot" | "followup_sent" | "objection" | "stalled" | "sale" | "ai_action"
    title: string
    description: string
    time: string
    priority?: "high" | "medium" | "low"
}

interface ActivityFeedProps {
    activities?: Activity[]
    maxItems?: number
}

const activityConfig = {
    lead_hot: {
        icon: User,
        color: "text-orange-500",
        bgColor: "bg-orange-500/20",
        borderColor: "border-l-orange-500"
    },
    followup_sent: {
        icon: Send,
        color: "text-blue-500",
        bgColor: "bg-blue-500/20",
        borderColor: "border-l-blue-500"
    },
    objection: {
        icon: AlertTriangle,
        color: "text-amber-500",
        bgColor: "bg-amber-500/20",
        borderColor: "border-l-amber-500"
    },
    stalled: {
        icon: Clock,
        color: "text-red-500",
        bgColor: "bg-red-500/20",
        borderColor: "border-l-red-500"
    },
    sale: {
        icon: CheckCircle,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/20",
        borderColor: "border-l-emerald-500"
    },
    ai_action: {
        icon: Bot,
        color: "text-purple-500",
        bgColor: "bg-purple-500/20",
        borderColor: "border-l-purple-500"
    }
}

export default function ActivityFeed({ activities, maxItems = 6 }: ActivityFeedProps) {
    const defaultActivities: Activity[] = [
        {
            id: "1",
            type: "lead_hot",
            title: "Nuevo lead caliente",
            description: "Juan Pérez - Interesado en plan Enterprise",
            time: "hace 3 min",
            priority: "high"
        },
        {
            id: "2",
            type: "sale",
            title: "Venta cerrada",
            description: "María García - Plan Pro ($299/mes)",
            time: "hace 12 min",
            priority: "high"
        },
        {
            id: "3",
            type: "followup_sent",
            title: "Seguimiento automático",
            description: "Cotización enviada a Carlos López",
            time: "hace 25 min",
            priority: "medium"
        },
        {
            id: "4",
            type: "ai_action",
            title: "IA optimizó respuesta",
            description: "Mejor guión de ventas aplicado",
            time: "hace 45 min",
            priority: "low"
        },
        {
            id: "5",
            type: "objection",
            title: "Objeción detectada",
            description: "Precio alto - Lead: Ana Martínez",
            time: "hace 1 hora",
            priority: "medium"
        },
        {
            id: "6",
            type: "stalled",
            title: "Conversación estancada",
            description: "Roberto Sánchez sin respuesta >24h",
            time: "hace 2 horas",
            priority: "high"
        }
    ]

    const displayActivities = (activities || defaultActivities).slice(0, maxItems)

    return (
        <div className="rounded-2xl bg-primary/5 border border-primary/10 overflow-hidden">
            <div className="p-4 border-b border-primary/10 flex items-center justify-between">
                <div>
                    <h3 className="font-bold text-sm">Actividad Reciente</h3>
                    <p className="text-[10px] text-muted-foreground">Eventos importantes en tiempo real</p>
                </div>
                <button className="text-[10px] text-primary hover:underline font-medium">
                    Ver todo
                </button>
            </div>

            <div className="divide-y divide-primary/5">
                {displayActivities.map((activity, index) => {
                    const config = activityConfig[activity.type]
                    const Icon = config.icon

                    return (
                        <div
                            key={activity.id}
                            className={`flex items-start gap-3 p-3 hover:bg-primary/5 transition-colors border-l-2 ${config.borderColor}`}
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className={`p-1.5 rounded-lg ${config.bgColor} flex-shrink-0`}>
                                <Icon className={`w-3.5 h-3.5 ${config.color}`} />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <p className="text-xs font-semibold truncate">{activity.title}</p>
                                    {activity.priority === "high" && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                    )}
                                </div>
                                <p className="text-[11px] text-muted-foreground truncate">{activity.description}</p>
                            </div>

                            <span className="text-[10px] text-muted-foreground/70 whitespace-nowrap flex-shrink-0">
                                {activity.time}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
