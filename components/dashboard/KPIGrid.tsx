"use client"

import { useEffect, useState } from "react"
import {
    TrendingUp,
    TrendingDown,
    MessageSquare,
    Users,
    Target,
    DollarSign,
    Zap,
    BarChart3
} from "lucide-react"

interface KPI {
    id: string
    label: string
    value: number
    previousValue?: number
    format: "number" | "currency" | "percent"
    icon: any
    color: string
    sparklineData?: number[]
}

interface KPIGridProps {
    kpis?: KPI[]
}

// Animated counter hook
function useAnimatedCounter(end: number, duration: number = 1000) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        let startTime: number
        let animationFrame: number

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)

            setCount(Math.floor(progress * end))

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate)
            }
        }

        animationFrame = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animationFrame)
    }, [end, duration])

    return count
}

// Mini sparkline component
function Sparkline({ data, color }: { data: number[], color: string }) {
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1
    const height = 24
    const width = 60

    const points = data.map((value, index) => {
        const x = (index / (data.length - 1)) * width
        const y = height - ((value - min) / range) * height
        return `${x},${y}`
    }).join(' ')

    return (
        <svg width={width} height={height} className="opacity-60">
            <polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

// Single KPI Card
function KPICard({ kpi, index }: { kpi: KPI, index: number }) {
    const animatedValue = useAnimatedCounter(kpi.value, 1500)

    const formatValue = (val: number) => {
        if (kpi.format === "currency") {
            return `$${val.toLocaleString()}`
        }
        if (kpi.format === "percent") {
            return `${val}%`
        }
        return val.toLocaleString()
    }

    const change = kpi.previousValue
        ? ((kpi.value - kpi.previousValue) / kpi.previousValue * 100).toFixed(1)
        : null
    const isPositive = change ? parseFloat(change) >= 0 : true

    const Icon = kpi.icon

    return (
        <div
            className="group relative p-4 lg:p-5 rounded-2xl bg-primary/5 border border-primary/10 
                      hover:border-primary/30 hover:bg-primary/10 transition-all duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-xl ${kpi.color}`}>
                    <Icon className="w-4 h-4" />
                </div>
                {kpi.sparklineData && (
                    <Sparkline
                        data={kpi.sparklineData}
                        color={isPositive ? "#10b981" : "#ef4444"}
                    />
                )}
            </div>

            <div className="space-y-1">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                    {kpi.label}
                </p>
                <p className="text-2xl lg:text-3xl font-black tracking-tight">
                    {formatValue(animatedValue)}
                </p>

                {change && (
                    <div className="flex items-center gap-1">
                        {isPositive ? (
                            <TrendingUp className="w-3 h-3 text-emerald-500" />
                        ) : (
                            <TrendingDown className="w-3 h-3 text-red-500" />
                        )}
                        <span className={`text-xs font-bold ${isPositive ? "text-emerald-500" : "text-red-500"}`}>
                            {isPositive ? "+" : ""}{change}%
                        </span>
                        <span className="text-[10px] text-muted-foreground">vs ayer</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default function KPIGrid({ kpis }: KPIGridProps) {
    const defaultKPIs: KPI[] = [
        {
            id: "leads",
            label: "Leads Entrantes Hoy",
            value: 47,
            previousValue: 38,
            format: "number",
            icon: Users,
            color: "bg-blue-500/20 text-blue-500",
            sparklineData: [12, 18, 15, 22, 28, 35, 42, 47]
        },
        {
            id: "conversations",
            label: "Conversaciones Activas",
            value: 23,
            previousValue: 19,
            format: "number",
            icon: MessageSquare,
            color: "bg-emerald-500/20 text-emerald-500",
            sparklineData: [8, 12, 10, 15, 18, 20, 21, 23]
        },
        {
            id: "response_rate",
            label: "Tasa de Respuesta",
            value: 94,
            previousValue: 89,
            format: "percent",
            icon: Zap,
            color: "bg-amber-500/20 text-amber-500",
            sparklineData: [85, 87, 88, 90, 91, 92, 93, 94]
        },
        {
            id: "qualified",
            label: "Oportunidades Calificadas",
            value: 12,
            previousValue: 8,
            format: "number",
            icon: Target,
            color: "bg-purple-500/20 text-purple-500",
            sparklineData: [3, 4, 5, 6, 8, 9, 10, 12]
        },
        {
            id: "pipeline",
            label: "Valor del Pipeline",
            value: 84500,
            previousValue: 72000,
            format: "currency",
            icon: DollarSign,
            color: "bg-emerald-500/20 text-emerald-500",
            sparklineData: [45000, 52000, 58000, 65000, 70000, 75000, 80000, 84500]
        },
        {
            id: "closed",
            label: "Ventas Cerradas Hoy",
            value: 3,
            previousValue: 2,
            format: "number",
            icon: BarChart3,
            color: "bg-primary/20 text-primary",
            sparklineData: [0, 1, 1, 1, 2, 2, 2, 3]
        }
    ]

    const displayKPIs = kpis || defaultKPIs

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
            {displayKPIs.map((kpi, index) => (
                <KPICard key={kpi.id} kpi={kpi} index={index} />
            ))}
        </div>
    )
}
