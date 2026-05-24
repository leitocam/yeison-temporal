"use client"

import {
    AlertTriangle,
    AlertCircle,
    XCircle,
    Info,
    ArrowUpCircle,
    X
} from "lucide-react"
import { useState } from "react"

interface Alert {
    id: string
    type: "warning" | "error" | "info" | "upgrade"
    title: string
    description: string
    dismissible?: boolean
}

interface SmartAlertsProps {
    alerts?: Alert[]
}

const alertConfig = {
    warning: {
        icon: AlertTriangle,
        color: "text-amber-500",
        bgColor: "bg-amber-500/10",
        borderColor: "border-amber-500/30"
    },
    error: {
        icon: XCircle,
        color: "text-red-500",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/30"
    },
    info: {
        icon: Info,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/30"
    },
    upgrade: {
        icon: ArrowUpCircle,
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
        borderColor: "border-purple-500/30"
    }
}

export default function SmartAlerts({ alerts }: SmartAlertsProps) {
    const defaultAlerts: Alert[] = [
        {
            id: "1",
            type: "warning",
            title: "Riesgo de pérdida detectado",
            description: "Lead 'Ana Martínez' sin responder en 48h",
            dismissible: true
        },
        {
            id: "2",
            type: "info",
            title: "Límite de mensajes: 78%",
            description: "2,200 de 3,000 mensajes usados este mes",
            dismissible: false
        },
        {
            id: "3",
            type: "upgrade",
            title: "Desbloquea más agentes",
            description: "Mejora a Pro para 5 agentes activos",
            dismissible: true
        }
    ]

    const [visibleAlerts, setVisibleAlerts] = useState(alerts || [])

    const dismissAlert = (id: string) => {
        setVisibleAlerts(prev => prev.filter(a => a.id !== id))
    }

    if (visibleAlerts.length === 0) return null

    return (
        <div className="space-y-2">
            {visibleAlerts.map((alert) => {
                const config = alertConfig[alert.type]
                const Icon = config.icon

                return (
                    <div
                        key={alert.id}
                        className={`flex items-center gap-3 p-3 rounded-xl ${config.bgColor} border ${config.borderColor}`}
                    >
                        <Icon className={`w-4 h-4 ${config.color} flex-shrink-0`} />

                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold">{alert.title}</p>
                            <p className="text-[10px] text-muted-foreground">{alert.description}</p>
                        </div>

                        {alert.type === "upgrade" && (
                            <button className={`px-3 py-1 rounded-lg text-[10px] font-bold ${config.bgColor} ${config.color} hover:opacity-80 transition-opacity`}>
                                Mejorar
                            </button>
                        )}

                        {alert.dismissible && (
                            <button
                                onClick={() => dismissAlert(alert.id)}
                                className="p-1 hover:bg-white/10 rounded transition-colors"
                            >
                                <X className="w-3 h-3 text-muted-foreground" />
                            </button>
                        )}
                    </div>
                )
            })}
        </div>
    )
}
