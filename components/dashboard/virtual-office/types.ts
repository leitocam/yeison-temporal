import { Bot, TrendingUp, Sparkles, Users } from "lucide-react"

export interface Message {
    id: string
    type: "user" | "assistant" | "system" | "summary"
    content: string
    timestamp: Date
    summaryData?: {
        title: string
        agreements: string[]
        nextSteps: string[]
    }
}

export interface TeamKPI {
    label: string
    value: string
    change?: string
    positive?: boolean
}

export interface Team {
    id: string
    sessionIdPrefix: string
    name: string
    role: string
    icon: any
    color: string
    bgGradient: string
    borderColor: string
    kpis: TeamKPI[]
    greeting: string
    suggestions: string[]
    avatarImage: string // Requisito del usuario: caritas de los agentes
}

export interface SavedMeeting {
    id: string
    teamId: string
    date: Date
    title: string
    preview: string
    sessionId: string
}
