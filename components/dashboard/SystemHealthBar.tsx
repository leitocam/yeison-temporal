"use client"

import { useTranslations } from "next-intl"
import {
    Bot,
    MessageSquare,
    Phone,
    CheckCircle2,
    AlertTriangle,
    Wifi,
    WifiOff
} from "lucide-react"

interface SystemHealthBarProps {
    aiStatus?: "active" | "inactive" | "loading"
    agentsActive?: number
    agentsTotal?: number
    channelsConnected?: string[]
    slaPercent?: number
    hoursWithoutErrors?: number
}

export default function SystemHealthBar({
    aiStatus = "active",
    agentsActive = 3,
    agentsTotal = 4,
    channelsConnected = ["WhatsApp", "Web"],
    slaPercent = 98.5,
    hoursWithoutErrors = 24
}: SystemHealthBarProps) {
    const t = useTranslations("dashboard")

    const getStatusColor = (status: string) => {
        switch (status) {
            case "active": return "text-emerald-500"
            case "inactive": return "text-red-500"
            default: return "text-amber-500"
        }
    }

    const getSLAColor = (percent: number) => {
        if (percent >= 95) return "text-emerald-500 bg-emerald-500/10"
        if (percent >= 80) return "text-amber-500 bg-amber-500/10"
        return "text-red-500 bg-red-500/10"
    }

    return (
        <div className="flex flex-wrap items-center gap-3 lg:gap-6 p-3 lg:p-4 rounded-2xl bg-primary/5 border border-primary/10">
            {/* AI Status */}
            <div className="flex items-center gap-2">
                <div className="relative">
                    <Bot className={`w-5 h-5 ${getStatusColor(aiStatus)}`} />
                    {aiStatus === "active" && (
                        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    )}
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">IA</span>
                    <span className={`text-xs font-bold ${getStatusColor(aiStatus)}`}>
                        {aiStatus === "active" ? "Activa" : aiStatus === "inactive" ? "Inactiva" : "Cargando"}
                    </span>
                </div>
            </div>

            <div className="w-px h-8 bg-primary/20 hidden sm:block" />

            {/* Agents Operating */}
            <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                    {[...Array(Math.min(agentsActive, 3))].map((_, i) => (
                        <div key={i} className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-[10px] text-white font-bold border-2 border-background">
                            {i + 1}
                        </div>
                    ))}
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Agentes</span>
                    <span className="text-xs font-bold text-foreground">
                        {agentsActive}/{agentsTotal} <span className="text-emerald-500">activos</span>
                    </span>
                </div>
            </div>

            <div className="w-px h-8 bg-primary/20 hidden sm:block" />

            {/* Connected Channels */}
            <div className="flex items-center gap-2">
                <div className="flex gap-1">
                    {channelsConnected.includes("WhatsApp") && (
                        <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center" title="WhatsApp">
                            <MessageSquare className="w-3 h-3 text-emerald-500" />
                        </div>
                    )}
                    {channelsConnected.includes("Web") && (
                        <div className="w-6 h-6 rounded-lg bg-blue-500/20 flex items-center justify-center" title="Web">
                            <Wifi className="w-3 h-3 text-blue-500" />
                        </div>
                    )}
                    {channelsConnected.includes("Phone") && (
                        <div className="w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center" title="Teléfono">
                            <Phone className="w-3 h-3 text-purple-500" />
                        </div>
                    )}
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Canales</span>
                    <span className="text-xs font-bold text-foreground">{channelsConnected.length} conectados</span>
                </div>
            </div>

            <div className="w-px h-8 bg-primary/20 hidden lg:block" />

            {/* SLA */}
            <div className="flex items-center gap-2">
                <div className={`px-2 py-1 rounded-lg ${getSLAColor(slaPercent)}`}>
                    <span className="text-xs font-black">{slaPercent}%</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">SLA</span>
                    <span className="text-xs font-bold text-muted-foreground">Cumplimiento</span>
                </div>
            </div>

            <div className="w-px h-8 bg-primary/20 hidden lg:block" />

            {/* Uptime */}
            <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Uptime</span>
                    <span className="text-xs font-bold text-emerald-500">{hoursWithoutErrors}h sin errores</span>
                </div>
            </div>
        </div>
    )
}
