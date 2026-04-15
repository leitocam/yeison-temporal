"use client"

import { useEffect, useMemo, useState } from "react"
import { useTranslations } from "next-intl"
import {
    ArrowUpRight,
    ArrowDownRight,
    TrendingUp,
    Users,
    Target,
    DollarSign,
    MessageSquare,
    Filter,
    Download,
    RefreshCw,
    ChevronDown
} from "lucide-react"
import { apiClient, DashboardMetricsResponse } from "@/lib/api-client"
import { useApi } from "@/hooks/useApi"

// Chart components
function LineChart({ data, color, height = 120 }: { data: number[], color: string, height?: number }) {
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1

    const points = data.map((value, index) => {
        const x = (index / (data.length - 1)) * 100
        const y = 100 - ((value - min) / range) * 100
        return `${x},${y}`
    }).join(' ')

    const areaPoints = `0,100 ${points} 100,100`

    return (
        <svg viewBox="0 0 100 100" className="w-full" style={{ height }} preserveAspectRatio="none">
            <defs>
                <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
            <polygon points={areaPoints} fill={`url(#gradient-${color})`} />
            <polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    )
}

function DonutChart({ value, total, color }: { value: number, total: number, color: string }) {
    const safeTotal = total || 1
    const percentage = Math.min((value / safeTotal) * 100, 100)
    const strokeWidth = 8
    const radius = 40
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (percentage / 100) * circumference

    return (
        <div className="relative w-24 h-24">
            <svg width="100%" height="100%" viewBox="0 0 100 100">
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    className="text-primary/10"
                />
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 -rotate-90 origin-center"
                    style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-black">{Math.round(percentage)}%</span>
                <span className="text-[9px] text-muted-foreground">de {total}</span>
            </div>
        </div>
    )
}

export default function MetricsTab() {
    const t = useTranslations("dashboard")
    const [timeRange, setTimeRange] = useState("7d")

    const { data: metrics, isLoading, error, execute } = useApi<DashboardMetricsResponse>(
        () => apiClient.get("/dashboard/metrics")
    )

    useEffect(() => {
        execute()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const buildTrend = (value: number, changePercent?: number, points: number = 12) => {
        if (!Number.isFinite(value) || points < 2) return [value]
        const prev = changePercent !== undefined
            ? value / (1 + changePercent / 100)
            : value
        return Array.from({ length: points }, (_, index) => {
            const ratio = index / (points - 1)
            return Math.round(prev + (value - prev) * ratio)
        })
    }

    const formatCurrency = (value: number) => {
        return `$${Math.round(value).toLocaleString()}`
    }

    const formatChange = (change?: number) => {
        if (change === undefined || change === null || Number.isNaN(change)) {
            return "0.0%"
        }
        return `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`
    }

    const topMetrics = useMemo(() => {
        if (!metrics) return []

        return [
            {
                title: t("kpis.leadsToday"),
                value: metrics.leads_entrantes_hoy.value.toLocaleString(),
                change: formatChange(metrics.leads_entrantes_hoy.change_percent),
                positive: (metrics.leads_entrantes_hoy.change_percent ?? 0) >= 0,
                icon: Users,
                color: "from-blue-500 to-cyan-500",
                trend: buildTrend(metrics.leads_entrantes_hoy.value, metrics.leads_entrantes_hoy.change_percent)
            },
            {
                title: t("kpis.activeConversations"),
                value: metrics.conversaciones_activas.value.toLocaleString(),
                change: formatChange(metrics.conversaciones_activas.change_percent),
                positive: (metrics.conversaciones_activas.change_percent ?? 0) >= 0,
                icon: MessageSquare,
                color: "from-emerald-500 to-teal-500",
                trend: buildTrend(metrics.conversaciones_activas.value, metrics.conversaciones_activas.change_percent)
            },
            {
                title: t("kpis.closedSales"),
                value: metrics.ventas_cerradas_hoy.value.toLocaleString(),
                change: formatChange(metrics.ventas_cerradas_hoy.change_percent),
                positive: (metrics.ventas_cerradas_hoy.change_percent ?? 0) >= 0,
                icon: Target,
                color: "from-purple-500 to-pink-500",
                trend: buildTrend(metrics.ventas_cerradas_hoy.value, metrics.ventas_cerradas_hoy.change_percent)
            },
            {
                title: t("kpis.salesValueToday"),
                value: formatCurrency(metrics.valor_ventas_hoy.value),
                change: formatChange(metrics.valor_ventas_hoy.change_percent),
                positive: (metrics.valor_ventas_hoy.change_percent ?? 0) >= 0,
                icon: DollarSign,
                color: "from-orange-500 to-red-500",
                trend: buildTrend(metrics.valor_ventas_hoy.value, metrics.valor_ventas_hoy.change_percent)
            }
        ]
    }, [metrics, t])

    const pipelineTrend = useMemo(() => {
        if (!metrics) return []
        return buildTrend(metrics.valor_pipeline)
    }, [metrics])

    return (
        <div className="space-y-6">
            {/* Header Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                <div>
                    <h2 className="text-lg font-bold">Métricas y Analytics</h2>
                    <p className="text-xs text-muted-foreground">Análisis detallado de rendimiento de ventas</p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Time Range */}
                    <div className="flex items-center gap-1 p-1 rounded-xl bg-background/50 border border-primary/10">
                        {["24h", "7d", "30d", "90d"].map((range) => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${timeRange === range
                                        ? "bg-primary/20 text-primary"
                                        : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                {range}
                            </button>
                        ))}
                    </div>

                    <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-background/50 border border-primary/10 text-xs font-medium hover:bg-primary/10 transition-colors">
                        <Filter className="w-3 h-3" />
                        Filtros
                    </button>

                    <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-background/50 border border-primary/10 text-xs font-medium hover:bg-primary/10 transition-colors">
                        <Download className="w-3 h-3" />
                        Exportar
                    </button>

                    <button
                        onClick={() => execute()}
                        className="p-2 rounded-xl bg-background/50 border border-primary/10 hover:bg-primary/10 transition-colors"
                    >
                        <RefreshCw className="w-4 h-4 text-muted-foreground" />
                    </button>
                </div>
            </div>

            {isLoading && (
                <div className="rounded-2xl border border-primary/10 bg-primary/5 p-4 text-sm text-muted-foreground">
                    {t("loading")}
                </div>
            )}

            {error && (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-500">
                    {t("metrics.fetchError")}
                </div>
            )}

            {/* Main Metrics with Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {topMetrics.map((metric, index) => {
                    const Icon = metric.icon
                    return (
                        <div
                            key={index}
                            className="p-5 rounded-2xl bg-primary/5 border border-primary/10 hover:border-primary/30 transition-all"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-2 rounded-xl bg-linear-to-br ${metric.color} bg-opacity-20`}>
                                    <Icon className="w-4 h-4 text-white" />
                                </div>
                                <div className={`flex items-center gap-1 text-xs font-bold ${metric.positive ? "text-emerald-500" : "text-red-500"}`}>
                                    {metric.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                    {metric.change}
                                </div>
                            </div>

                            <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">{metric.title}</p>
                            <p className="text-2xl font-black mb-4">{metric.value}</p>

                            <LineChart
                                data={metric.trend}
                                color={metric.positive ? "#10b981" : "#ef4444"}
                                height={60}
                            />
                        </div>
                    )
                })}
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left - Large Chart */}
                <div className="lg:col-span-2 p-6 rounded-2xl bg-primary/5 border border-primary/10">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-bold">Evolución de Pipeline</h3>
                            <p className="text-xs text-muted-foreground">{t("kpis.pipelineValue")}</p>
                        </div>
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background/50 border border-primary/10 text-xs">
                            Ingresos
                            <ChevronDown className="w-3 h-3" />
                        </button>
                    </div>

                    <div className="h-64">
                        <LineChart data={pipelineTrend} color="#8b5cf6" height={250} />
                    </div>

                    {/* Chart Legend */}
                    <div className="flex items-center justify-center gap-6 mt-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-primary" />
                            <span className="text-xs text-muted-foreground">Pipeline</span>
                        </div>
                    </div>
                </div>

                {/* Right - Lead Quality */}
                <div className="space-y-6">
                    {/* Lead Quality */}
                    <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10">
                        <h3 className="font-bold mb-1">Calidad de Leads</h3>
                        <p className="text-xs text-muted-foreground mb-4">Leads calificados vs total</p>
                        <div className="flex items-center justify-center">
                            <DonutChart
                                value={metrics?.leads_calificados_hoy.value || 0}
                                total={metrics?.leads_entrantes_hoy.value || 0}
                                color="#10b981"
                            />
                        </div>
                        <div className="flex items-center justify-center gap-4 mt-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="text-xs text-muted-foreground">Calificados</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-primary/20" />
                                <span className="text-xs text-muted-foreground">Total</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {metrics && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        {
                            label: t("kpis.pipelineValue"),
                            value: formatCurrency(metrics.valor_pipeline),
                            icon: TrendingUp,
                            color: "text-emerald-500"
                        },
                        {
                            label: t("kpis.salesValueToday"),
                            value: formatCurrency(metrics.valor_ventas_hoy.value),
                            icon: DollarSign,
                            color: "text-blue-500"
                        },
                        {
                            label: t("kpis.closedSales"),
                            value: metrics.ventas_cerradas_hoy.value.toLocaleString(),
                            icon: Target,
                            color: "text-orange-500"
                        },
                        {
                            label: t("kpis.qualifiedLeads"),
                            value: metrics.leads_calificados_hoy.value.toLocaleString(),
                            icon: Users,
                            color: "text-purple-500"
                        },
                    ].map((stat, i) => {
                        const Icon = stat.icon
                        return (
                            <div key={i} className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                                <div className="flex items-center gap-2 mb-2">
                                    <Icon className={`w-4 h-4 ${stat.color}`} />
                                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{stat.label}</span>
                                </div>
                                <p className="text-xl font-black">{stat.value}</p>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
