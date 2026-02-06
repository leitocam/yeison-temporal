"use client"

import { useTranslations } from "next-intl"
import {
    ArrowUpRight,
    ArrowDownRight,
    TrendingUp,
    Users,
    Target,
    DollarSign,
    MessageSquare,
    BarChart3,
    Calendar,
    Filter,
    Download,
    RefreshCw,
    ChevronDown
} from "lucide-react"
import { useState } from "react"

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

function BarChartHorizontal({ data }: { data: { label: string, value: number, color: string }[] }) {
    const max = Math.max(...data.map(d => d.value))

    return (
        <div className="space-y-3">
            {data.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-20 truncate">{item.label}</span>
                    <div className="flex-1 h-2 bg-primary/10 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full ${item.color} transition-all duration-1000`}
                            style={{ width: `${(item.value / max) * 100}%` }}
                        />
                    </div>
                    <span className="text-xs font-bold w-12 text-right">{item.value}%</span>
                </div>
            ))}
        </div>
    )
}

function DonutChart({ value, total, color }: { value: number, total: number, color: string }) {
    const percentage = (value / total) * 100
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

    // Mock data
    const leadsTrend = [120, 145, 132, 168, 185, 172, 198, 215, 245, 267, 289, 312]
    const conversionsTrend = [8, 12, 10, 15, 18, 14, 22, 25, 28, 32, 35, 38]
    const revenueTrend = [4500, 5200, 4800, 6100, 6800, 7200, 7800, 8500, 9200, 10000, 11200, 12500]

    const channelPerformance = [
        { label: "WhatsApp", value: 68, color: "bg-emerald-500" },
        { label: "Web Chat", value: 52, color: "bg-blue-500" },
        { label: "Instagram", value: 34, color: "bg-pink-500" },
        { label: "Email", value: 28, color: "bg-amber-500" },
    ]

    const metrics = [
        {
            title: "Total Leads",
            value: "1,247",
            change: "+23.5%",
            positive: true,
            icon: Users,
            color: "from-blue-500 to-cyan-500",
            trend: leadsTrend
        },
        {
            title: "Conversiones",
            value: "312",
            change: "+18.2%",
            positive: true,
            icon: Target,
            color: "from-emerald-500 to-teal-500",
            trend: conversionsTrend
        },
        {
            title: "Ingresos",
            value: "$84,500",
            change: "+31.4%",
            positive: true,
            icon: DollarSign,
            color: "from-purple-500 to-pink-500",
            trend: revenueTrend
        },
        {
            title: "Tasa Respuesta",
            value: "94.2%",
            change: "+5.1%",
            positive: true,
            icon: MessageSquare,
            color: "from-orange-500 to-red-500",
            trend: [85, 87, 88, 89, 90, 91, 92, 92, 93, 93, 94, 94]
        }
    ]

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

                    <button className="p-2 rounded-xl bg-background/50 border border-primary/10 hover:bg-primary/10 transition-colors">
                        <RefreshCw className="w-4 h-4 text-muted-foreground" />
                    </button>
                </div>
            </div>

            {/* Main Metrics with Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric, index) => {
                    const Icon = metric.icon
                    return (
                        <div
                            key={index}
                            className="p-5 rounded-2xl bg-primary/5 border border-primary/10 hover:border-primary/30 transition-all"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-2 rounded-xl bg-gradient-to-br ${metric.color} bg-opacity-20`}>
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
                            <p className="text-xs text-muted-foreground">Ingresos y conversiones en el tiempo</p>
                        </div>
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background/50 border border-primary/10 text-xs">
                            Ingresos
                            <ChevronDown className="w-3 h-3" />
                        </button>
                    </div>

                    <div className="h-64">
                        <LineChart data={revenueTrend} color="#8b5cf6" height={250} />
                    </div>

                    {/* Chart Legend */}
                    <div className="flex items-center justify-center gap-6 mt-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-primary" />
                            <span className="text-xs text-muted-foreground">Ingresos</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-emerald-500" />
                            <span className="text-xs text-muted-foreground">Conversiones</span>
                        </div>
                    </div>
                </div>

                {/* Right - Channel Performance & Donut */}
                <div className="space-y-6">
                    {/* Channel Performance */}
                    <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10">
                        <h3 className="font-bold mb-1">Rendimiento por Canal</h3>
                        <p className="text-xs text-muted-foreground mb-4">Tasa de conversión por fuente</p>
                        <BarChartHorizontal data={channelPerformance} />
                    </div>

                    {/* Lead Quality */}
                    <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10">
                        <h3 className="font-bold mb-1">Calidad de Leads</h3>
                        <p className="text-xs text-muted-foreground mb-4">Leads calificados vs total</p>
                        <div className="flex items-center justify-center">
                            <DonutChart value={312} total={1247} color="#10b981" />
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

            {/* Bottom Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Tiempo Promedio de Respuesta", value: "1.8 min", icon: MessageSquare, color: "text-blue-500" },
                    { label: "Leads por Agente", value: "52", icon: Users, color: "text-purple-500" },
                    { label: "Valor Ticket Promedio", value: "$2,450", icon: DollarSign, color: "text-emerald-500" },
                    { label: "Tasa de Cierre", value: "25%", icon: Target, color: "text-orange-500" },
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
        </div>
    )
}
