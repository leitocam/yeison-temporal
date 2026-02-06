"use client"

import {
    User,
    TrendingUp,
    Clock,
    Star,
    ChevronRight
} from "lucide-react"

interface Agent {
    id: string
    name: string
    avatar?: string
    conversions: number
    responseTime: string
    satisfaction: number
    trend: "up" | "down" | "stable"
}

interface AgentRankingProps {
    agents?: Agent[]
}

// Progress bar component
function ProgressBar({ value, max, color }: { value: number, max: number, color: string }) {
    const percent = (value / max) * 100

    return (
        <div className="h-1.5 bg-primary/10 rounded-full overflow-hidden flex-1">
            <div
                className={`h-full rounded-full ${color} transition-all duration-1000`}
                style={{ width: `${percent}%` }}
            />
        </div>
    )
}

export default function AgentRanking({ agents }: AgentRankingProps) {
    const defaultAgents: Agent[] = [
        {
            id: "1",
            name: "Agente Ventas #1",
            conversions: 24,
            responseTime: "1.2min",
            satisfaction: 98,
            trend: "up"
        },
        {
            id: "2",
            name: "Agente WhatsApp",
            conversions: 18,
            responseTime: "2.1min",
            satisfaction: 95,
            trend: "stable"
        },
        {
            id: "3",
            name: "Agente Soporte",
            conversions: 12,
            responseTime: "3.5min",
            satisfaction: 92,
            trend: "down"
        }
    ]

    const displayAgents = agents || defaultAgents
    const maxConversions = Math.max(...displayAgents.map(a => a.conversions))

    return (
        <div className="rounded-2xl bg-primary/5 border border-primary/10 overflow-hidden">
            <div className="p-4 border-b border-primary/10 flex items-center justify-between">
                <div>
                    <h3 className="font-bold text-sm">Rendimiento de Agentes</h3>
                    <p className="text-[10px] text-muted-foreground">Top agentes por conversiones</p>
                </div>
                <button className="text-[10px] text-primary hover:underline font-medium flex items-center gap-1">
                    Ver todos <ChevronRight className="w-3 h-3" />
                </button>
            </div>

            <div className="divide-y divide-primary/5">
                {displayAgents.map((agent, index) => (
                    <div
                        key={agent.id}
                        className="p-3 hover:bg-primary/5 transition-colors flex items-center gap-3"
                    >
                        {/* Rank */}
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black
                            ${index === 0 ? "bg-amber-500/20 text-amber-500" :
                                index === 1 ? "bg-slate-400/20 text-slate-400" :
                                    "bg-orange-800/20 text-orange-700"}`}>
                            {index + 1}
                        </div>

                        {/* Avatar */}
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                            <User className="w-4 h-4 text-primary" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <p className="text-xs font-semibold truncate">{agent.name}</p>
                                {agent.trend === "up" && <TrendingUp className="w-3 h-3 text-emerald-500" />}
                            </div>
                            <div className="flex items-center gap-2">
                                <ProgressBar
                                    value={agent.conversions}
                                    max={maxConversions}
                                    color={index === 0 ? "bg-emerald-500" : "bg-primary/60"}
                                />
                                <span className="text-[10px] font-bold text-foreground">{agent.conversions}</span>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-3 text-center">
                            <div>
                                <p className="text-[9px] text-muted-foreground uppercase">Resp</p>
                                <p className="text-[11px] font-bold">{agent.responseTime}</p>
                            </div>
                            <div>
                                <p className="text-[9px] text-muted-foreground uppercase">Sat</p>
                                <div className="flex items-center gap-0.5">
                                    <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                                    <p className="text-[11px] font-bold">{agent.satisfaction}%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
