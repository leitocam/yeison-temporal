"use client"

import { useState, useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import { Bot, Settings, Play, BarChart3, Users, MessageSquare, TrendingUp, AlertCircle, Loader2, ChevronDown, Edit, Power, Save, X, CheckCircle, ExternalLink, Megaphone, ArrowRight } from "lucide-react"
import { useApi } from "@/hooks/useApi"
import { apiClient, AgentInstance } from "@/lib/api-client"
import { useRouter } from "next/navigation"
import { useLocale } from "next-intl"
import QRUploader from "./QRUploader"
import CreateSalesAgentDialog from "./CreateSalesAgentDialog"

interface TelegramConnectState {
    connecting: boolean
    deepLink: string | null
    error: boolean
}

interface Agent {
    id: string
    name: string
    description: string
    status: "active" | "inactive" | "training"
    icon: any
    type?: string
    instance: AgentInstance
}

// Map agent type to icon
const getIconForType = (type?: string) => {
    const typeMap: Record<string, any> = {
        sales: MessageSquare,
        lead: Users,
        analytics: BarChart3,
        customer: TrendingUp,
        ventas: MessageSquare,
        marketing: Megaphone,
    }
    return typeMap[type?.toLowerCase() || ""] || Bot
}

const MARKETING_TYPES = new Set(["marketing", "marketing_ai", "marketing-ai", "campañas"])

export default function AgentsTab() {
    const t = useTranslations("dashboard")
    const router = useRouter()
    const locale = useLocale()
    const [expandedAgent, setExpandedAgent] = useState<string | null>(null)
    const [editingAgent, setEditingAgent] = useState<string | null>(null)
    const [configForm, setConfigForm] = useState<any>({})
    const [createDialogOpen, setCreateDialogOpen] = useState(false)
    const [telegramState, setTelegramState] = useState<Record<string, TelegramConnectState>>({})
    const pollRefs = useRef<Record<string, ReturnType<typeof setInterval>>>({})

    const { data: agentInstances, isLoading, error, execute } = useApi<AgentInstance[]>(
        () => apiClient.get("/agents?skip=0&limit=100")
    )

    const handleMarketingAgentClick = () => {
        router.push(`/${locale}/dashboard/marketing`)
    }

    useEffect(() => {
        execute()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Clear all polling intervals on unmount
    useEffect(() => {
        return () => {
            Object.values(pollRefs.current).forEach(clearInterval)
        }
    }, [])

    // Transform API data to Agent format
    const agents: Agent[] = (agentInstances || []).map((instance) => ({
        id: instance.id,
        name: instance.configuration?.agent_info?.name || instance.name,
        description: `${instance.configuration?.agent_info?.type || "Agent"}: ${instance.configuration?.personality?.brand_voice || "Sin voz de marca configurada"}`,
        status: instance.is_active ? "active" : "inactive",
        icon: getIconForType(instance.configuration?.agent_info?.type),
        type: instance.configuration?.agent_info?.type,
        instance: instance,
    }))

    const handleDisableAgent = async (agentId: string, currentStatus: boolean) => {
        try {
            await apiClient.put(`/agents/${agentId}`, {
                is_active: !currentStatus
            })
            execute()
        } catch (err) {
            console.error('Failed to toggle agent status:', err)
        }
    }

    const handleSaveConfiguration = async (agentId: string) => {
        try {
            await apiClient.patch(`/agents/${agentId}/configuration`, configForm)
            setEditingAgent(null)
            setConfigForm({})
            execute()
        } catch (err) {
            console.error('Failed to update configuration:', err)
        }
    }

    const handleConnectTelegram = async (agentId: string) => {
        setTelegramState(prev => ({ ...prev, [agentId]: { connecting: true, deepLink: null, error: false } }))
        try {
            const res: { deep_link: string } = await apiClient.post(
                `/agents/${agentId}/integrations/telegram/connect-token`, {}
            )
            setTelegramState(prev => ({ ...prev, [agentId]: { connecting: true, deepLink: res.deep_link, error: false } }))
            window.open(res.deep_link, "_blank", "noopener,noreferrer")

            // Poll every 3s for up to 5 minutes to detect when the bot registers the chat
            const interval = setInterval(async () => {
                try {
                    const cfg: { enabled: boolean; supervisor_chat_id: string | null } =
                        await apiClient.get(`/agents/${agentId}/integrations/telegram`)
                    if (cfg.supervisor_chat_id) {
                        clearInterval(interval)
                        delete pollRefs.current[agentId]
                        setTelegramState(prev => ({ ...prev, [agentId]: { connecting: false, deepLink: null, error: false } }))
                        execute() // refresh agent list so configForm reloads
                    }
                } catch {
                    // ignore poll errors — keep polling
                }
            }, 3000)

            pollRefs.current[agentId] = interval

            // Stop polling after 5 minutes regardless
            setTimeout(() => {
                if (pollRefs.current[agentId]) {
                    clearInterval(pollRefs.current[agentId])
                    delete pollRefs.current[agentId]
                    setTelegramState(prev => {
                        if (prev[agentId]?.connecting) {
                            return { ...prev, [agentId]: { connecting: false, deepLink: null, error: false } }
                        }
                        return prev
                    })
                }
            }, 300_000)

        } catch {
            setTelegramState(prev => ({ ...prev, [agentId]: { connecting: false, deepLink: null, error: true } }))
        }
    }

    const handleDisconnectTelegram = async (agentId: string) => {
        try {
            await apiClient.delete(`/agents/${agentId}/integrations/telegram`)
            setConfigForm((prev: any) => ({
                ...prev,
                integrations: {
                    ...prev.integrations,
                    telegram: { enabled: false, supervisor_chat_id: null },
                },
            }))
            execute()
        } catch (err) {
            console.error('Failed to disconnect Telegram:', err)
        }
    }

    return (
        <div className="space-y-6">
            <div className="mb-8">
                <h2 className="text-3xl font-black mb-2">{t("agents.title")}</h2>
                <p className="text-muted-foreground">
                    {t("agents.description")}
                </p>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="glass rounded-2xl p-8 border-2 border-red-500/20">
                    <div className="flex items-center gap-4 mb-4">
                        <AlertCircle className="w-8 h-8 text-red-500" />
                        <div>
                            <h3 className="text-xl font-bold text-red-500">{t("agents.failedToLoad")}</h3>
                            <p className="text-sm text-muted-foreground">{error.message}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => execute()}
                        className="px-6 py-2 bg-primary/30 hover:bg-primary/40 rounded-lg font-semibold transition-all"
                    >
                        {t("agents.retry")}
                    </button>
                </div>
            )}

            {/* Empty State */}
            {!isLoading && !error && agents.length === 0 && (
                <div className="glass rounded-2xl p-12 border-2 border-primary/20 text-center">
                    <Bot className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">{t("agents.noAgents")}</h3>
                    <p className="text-muted-foreground mb-6">{t("agents.noAgentsDescription")}</p>
                    <button
                        onClick={() => setCreateDialogOpen(true)}
                        className="px-6 py-3 rounded-lg font-semibold bg-primary/30 hover:bg-primary/40 transition-colors inline-flex items-center gap-2"
                    >
                        <MessageSquare className="w-4 h-4" />
                        {t("agents.createSalesAgent.button")}
                    </button>
                </div>
            )}

            {/* Agents Grid */}
            {!isLoading && !error && agents.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {agents.map((agent, index) => {
                        const IconComponent = agent.icon
                        const isExpanded = expandedAgent === agent.id
                        const isMarketingAgent = MARKETING_TYPES.has((agent.type ?? "").toLowerCase())

                        // Marketing agents open the marketing wizard instead of the config panel
                        if (isMarketingAgent) {
                            return (
                                <div
                                    key={agent.id}
                                    className="fade-in-up glass rounded-2xl border-2 border-[#A3FF00]/30 hover:border-[#A3FF00]/60 transition-all duration-300 overflow-hidden hover-lift cursor-pointer group"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                    onClick={handleMarketingAgentClick}
                                >
                                    <div className="p-6 border-b border-[#A3FF00]/20">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start gap-4 flex-1">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#A3FF00]/30 to-[#C4FF4D]/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(163,255,0,0.2)]">
                                                    <Megaphone className="w-6 h-6 text-[#A3FF00]" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="text-lg font-bold">{agent.name}</h3>
                                                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${agent.status === "active" ? "bg-[#A3FF00] animate-pulse" : "bg-muted-foreground"}`} />
                                                    </div>
                                                    <p className="text-sm text-muted-foreground line-clamp-2">{agent.description}</p>
                                                </div>
                                            </div>
                                            <div className="p-2 glass hover:bg-[#A3FF00]/10 rounded-lg transition-all ml-2 flex-shrink-0">
                                                <ArrowRight className="w-5 h-5 text-[#A3FF00] group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-6 py-3 bg-[#A3FF00]/5 flex items-center gap-2">
                                        <span className="text-xs font-mono text-[#A3FF00] uppercase tracking-wider">Abrir wizard de Marketing IA →</span>
                                    </div>
                                </div>
                            )
                        }

                        return (
                            <div
                                key={agent.id}
                                className="fade-in-up glass rounded-2xl border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 overflow-hidden hover-lift"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Header */}
                                <div
                                    className="p-6 border-b border-primary/20 cursor-pointer hover:bg-white/10 transition-colors"
                                    onClick={() => setExpandedAgent(isExpanded ? null : agent.id)}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-4 flex-1">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center flex-shrink-0">
                                                <IconComponent className="w-6 h-6 text-primary" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="text-lg font-bold">{agent.name}</h3>
                                                    <div
                                                        className={`w-2 h-2 rounded-full flex-shrink-0 ${agent.status === "active"
                                                                ? "bg-emerald-500"
                                                                : agent.status === "training"
                                                                    ? "bg-blue-500"
                                                                    : "bg-muted-foreground"
                                                            }`}
                                                    ></div>
                                                </div>
                                                <p className="text-sm text-muted-foreground line-clamp-2">{agent.description}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setExpandedAgent(isExpanded ? null : agent.id)
                                            }}
                                            className="p-2 glass hover:bg-white/20 rounded-lg transition-all ml-2 flex-shrink-0"
                                        >
                                            <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                        </button>
                                    </div>
                                </div>

                                {/* Metrics — available once /agents/{id}/metrics endpoint is ready */}
                                <div className="px-6 py-3 bg-white/5 flex items-center justify-center">
                                    <p className="text-[10px] text-muted-foreground/40 font-mono">
                                        Métricas del agente disponibles próximamente
                                    </p>
                                </div>

                                {/* Expanded Configuration Menu */}
                                {isExpanded && (
                                    <div className="p-6 border-t border-primary/20 space-y-4">
                                        {/* Action Buttons */}
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => {
                                                    if (!isExpanded) {
                                                        setExpandedAgent(agent.id)
                                                    }
                                                    if (editingAgent === agent.id) {
                                                        setEditingAgent(null)
                                                        setConfigForm({})
                                                    } else {
                                                        const normalizedConfig = {
                                                            ...agent.instance.configuration,
                                                            personality: {
                                                                ...agent.instance.configuration?.personality,
                                                                formality_level:
                                                                    agent.instance.configuration?.personality?.formality_level ||
                                                                    (agent.instance.configuration?.personality as any)?.["formality level"] ||
                                                                    "",
                                                            },
                                                        }
                                                        setEditingAgent(agent.id)
                                                        setConfigForm(normalizedConfig || {})
                                                    }
                                                }}
                                                className="flex-1 py-3 rounded-lg font-semibold transition-all duration-300 bg-primary/30 hover:bg-primary/40 flex items-center justify-center gap-2"
                                            >
                                                {editingAgent === agent.id ? (
                                                    <><X className="w-4 h-4" /> {t("agents.cancelEdit")}</>
                                                ) : (
                                                    <><Edit className="w-4 h-4" /> {t("agents.editConfiguration")}</>
                                                )}
                                            </button>
                                            <button
                                                onClick={() => handleDisableAgent(agent.id, agent.instance.is_active)}
                                                className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${agent.status === "active"
                                                        ? "bg-red-500/20 text-red-500 hover:bg-red-500/30"
                                                        : "bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30"
                                                    }`}
                                            >
                                                <Power className="w-4 h-4" />
                                                {agent.status === "active" ? t("agents.disable") : t("agents.enable")}
                                            </button>
                                        </div>

                                        {/* Configuration Form */}
                                        {editingAgent === agent.id && (
                                            <div className="space-y-4 pt-4 border-t border-primary/20">
                                                <div className="flex items-center justify-between mb-4">
                                                    <h4 className="text-lg font-bold">{t("agents.config.title")}</h4>
                                                    <button
                                                        onClick={() => handleSaveConfiguration(agent.id)}
                                                        className="px-4 py-2 bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30 rounded-lg font-semibold transition-all flex items-center gap-2"
                                                    >
                                                        <Save className="w-4 h-4" />
                                                        {t("agents.saveChanges")}
                                                    </button>
                                                </div>

                                                {/* Agent Name */}
                                                <div>
                                                    <label className="text-sm font-semibold text-muted-foreground mb-2 block">{t("agents.config.agentName")}</label>
                                                    <input
                                                        type="text"
                                                        value={configForm?.agent_info?.name || ""}
                                                        onChange={(e) => setConfigForm({
                                                            ...configForm,
                                                            agent_info: { ...configForm.agent_info, name: e.target.value }
                                                        })}
                                                        className="w-full px-4 py-2 bg-white/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                                                        placeholder={t("agents.config.agentNamePlaceholder")}
                                                    />
                                                </div>

                                                {/* Brand Voice */}
                                                <div>
                                                    <label className="text-sm font-semibold text-muted-foreground mb-2 block">{t("agents.config.brandVoice")}</label>
                                                    <textarea
                                                        value={configForm?.personality?.brand_voice || ""}
                                                        onChange={(e) => setConfigForm({
                                                            ...configForm,
                                                            personality: { ...configForm.personality, brand_voice: e.target.value }
                                                        })}
                                                        className="w-full px-4 py-2 bg-white/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/40 transition-colors min-h-25"
                                                        placeholder={t("agents.config.brandVoicePlaceholder")}
                                                    />
                                                </div>

                                                {/* Tone */}
                                                <div>
                                                    <label className="text-sm font-semibold text-muted-foreground mb-2 block">{t("agents.config.tone")}</label>
                                                    <select
                                                        value={configForm?.personality?.tone || "cool"}
                                                        onChange={(e) => setConfigForm({
                                                            ...configForm,
                                                            personality: { ...configForm.personality, tone: e.target.value }
                                                        })}
                                                        className="w-full px-4 py-2 bg-white/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                                                    >
                                                        <option value="cool">{t("agents.config.tones.cool")}</option>
                                                        <option value="professional">{t("agents.config.tones.professional")}</option>
                                                        <option value="friendly">{t("agents.config.tones.friendly")}</option>
                                                        <option value="enthusiastic">{t("agents.config.tones.enthusiastic")}</option>
                                                    </select>
                                                </div>

                                                {/* Language */}
                                                <div>
                                                    <label className="text-sm font-semibold text-muted-foreground mb-2 block">{t("agents.config.language")}</label>
                                                    <select
                                                        value={configForm?.personality?.language || "es"}
                                                        onChange={(e) => setConfigForm({
                                                            ...configForm,
                                                            personality: { ...configForm.personality, language: e.target.value }
                                                        })}
                                                        className="w-full px-4 py-2 bg-white/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                                                    >
                                                        <option value="es">{t("agents.config.languages.es")}</option>
                                                        <option value="en">{t("agents.config.languages.en")}</option>
                                                        <option value="pt">{t("agents.config.languages.pt")}</option>
                                                    </select>
                                                </div>

                                                {/* Emoji Usage */}
                                                <div>
                                                    <label className="text-sm font-semibold text-muted-foreground mb-2 block">{t("agents.config.emojiUsage")}</label>
                                                    <select
                                                        value={configForm?.personality?.emoji_usage || "moderate"}
                                                        onChange={(e) => setConfigForm({
                                                            ...configForm,
                                                            personality: { ...configForm.personality, emoji_usage: e.target.value }
                                                        })}
                                                        className="w-full px-4 py-2 bg-white/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                                                    >
                                                        <option value="none">None</option>
                                                        <option value="low">Low</option>
                                                        <option value="moderate">Moderate</option>
                                                        <option value="high">High</option>
                                                    </select>
                                                </div>

                                                {/* Greeting Style */}
                                                <div>
                                                    <label className="text-sm font-semibold text-muted-foreground mb-2 block">{t("agents.config.greetingStyle")}</label>
                                                    <input
                                                        type="text"
                                                        value={configForm?.personality?.greeting_style || ""}
                                                        onChange={(e) => setConfigForm({
                                                            ...configForm,
                                                            personality: { ...configForm.personality, greeting_style: e.target.value }
                                                        })}
                                                        className="w-full px-4 py-2 bg-white/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                                                        placeholder={t("agents.config.greetingStylePlaceholder")}
                                                    />
                                                </div>

                                                {/* Formality Level */}
                                                <div>
                                                    <label className="text-sm font-semibold text-muted-foreground mb-2 block">{t("agents.config.formalityLevel")}</label>
                                                    <select
                                                        value={configForm?.personality?.formality_level || "formal"}
                                                        onChange={(e) => setConfigForm({
                                                            ...configForm,
                                                            personality: { ...configForm.personality, formality_level: e.target.value }
                                                        })}
                                                        className="w-full px-4 py-2 bg-white/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                                                    >
                                                        <option value="informal">{t("agents.config.formalityLevels.informal")}</option>
                                                        <option value="semi-formal">{t("agents.config.formalityLevels.semi-formal")}</option>
                                                        <option value="formal">{t("agents.config.formalityLevels.formal")}</option>
                                                        <option value="casual">Casual</option>
                                                    </select>
                                                </div>

                                                {/* Response Length */}
                                                <div>
                                                    <label className="text-sm font-semibold text-muted-foreground mb-2 block">{t("agents.config.responseLength")}</label>
                                                    <select
                                                        value={configForm?.personality?.response_length || "concise"}
                                                        onChange={(e) => setConfigForm({
                                                            ...configForm,
                                                            personality: { ...configForm.personality, response_length: e.target.value }
                                                        })}
                                                        className="w-full px-4 py-2 bg-white/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                                                    >
                                                        <option value="brief">{t("agents.config.responseLengths.brief")}</option>
                                                        <option value="concise">{t("agents.config.responseLengths.concise")}</option>
                                                        <option value="detailed">{t("agents.config.responseLengths.detailed")}</option>
                                                    </select>
                                                </div>

                                                {/* Custom Phrases */}
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                    <div>
                                                        <label className="text-sm font-semibold text-muted-foreground mb-2 block">{t("agents.config.greeting")}</label>
                                                        <input
                                                            type="text"
                                                            value={configForm?.personality?.custom_phrases?.greeting || ""}
                                                            onChange={(e) => setConfigForm({
                                                                ...configForm,
                                                                personality: {
                                                                    ...configForm.personality,
                                                                    custom_phrases: {
                                                                        ...configForm.personality?.custom_phrases,
                                                                        greeting: e.target.value
                                                                    }
                                                                }
                                                            })}
                                                            className="w-full px-4 py-2 bg-white/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                                                            placeholder={t("agents.config.greetingPlaceholder")}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-semibold text-muted-foreground mb-2 block">{t("agents.config.thanks")}</label>
                                                        <input
                                                            type="text"
                                                            value={configForm?.personality?.custom_phrases?.thanks || ""}
                                                            onChange={(e) => setConfigForm({
                                                                ...configForm,
                                                                personality: {
                                                                    ...configForm.personality,
                                                                    custom_phrases: {
                                                                        ...configForm.personality?.custom_phrases,
                                                                        thanks: e.target.value
                                                                    }
                                                                }
                                                            })}
                                                            className="w-full px-4 py-2 bg-white/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                                                            placeholder={t("agents.config.thanksPlaceholder")}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-semibold text-muted-foreground mb-2 block">{t("agents.config.farewell")}</label>
                                                        <input
                                                            type="text"
                                                            value={configForm?.personality?.custom_phrases?.farewell || ""}
                                                            onChange={(e) => setConfigForm({
                                                                ...configForm,
                                                                personality: {
                                                                    ...configForm.personality,
                                                                    custom_phrases: {
                                                                        ...configForm.personality?.custom_phrases,
                                                                        farewell: e.target.value
                                                                    }
                                                                }
                                                            })}
                                                            className="w-full px-4 py-2 bg-white/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                                                            placeholder={t("agents.config.farewellPlaceholder")}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Supervisor Number */}
                                                <div>
                                                    <label className="text-sm font-semibold text-muted-foreground mb-2 block">{t("agents.config.supervisorNumber")}</label>
                                                    <input
                                                        type="text"
                                                        value={configForm?.integrations?.supervisor_number || ""}
                                                        onChange={(e) => setConfigForm({
                                                            ...configForm,
                                                            integrations: { ...configForm.integrations, supervisor_number: e.target.value }
                                                        })}
                                                        className="w-full px-4 py-2 bg-white/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                                                        placeholder={t("agents.config.supervisorNumberPlaceholder")}
                                                    />
                                                </div>

                                                {/* Telegram Supervisor */}
                                                {(() => {
                                                    const tgState = telegramState[agent.id]
                                                    const isConnected = !!configForm?.integrations?.telegram?.supervisor_chat_id
                                                    const isConnecting = tgState?.connecting
                                                    const hasError = tgState?.error
                                                    const deepLink = tgState?.deepLink
                                                    return (
                                                        <div className="space-y-3 p-4 bg-white/5 border border-primary/20 rounded-xl">
                                                            <div>
                                                                <p className="text-sm font-semibold">{t("agents.config.telegramSupervisor")}</p>
                                                                <p className="text-xs text-muted-foreground mt-0.5">{t("agents.config.telegramSupervisorDescription")}</p>
                                                            </div>

                                                            {isConnected && !isConnecting ? (
                                                                <div className="space-y-2">
                                                                    <div className="flex items-center gap-2 text-sm text-green-400">
                                                                        <CheckCircle className="w-4 h-4 shrink-0" />
                                                                        <span className="font-semibold">{t("agents.config.telegramConnected")}</span>
                                                                    </div>
                                                                    <p className="text-xs text-muted-foreground">{t("agents.config.telegramConnectedHint")}</p>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleDisconnectTelegram(agent.id)}
                                                                        className="text-xs text-red-400 hover:text-red-300 transition-colors underline"
                                                                    >
                                                                        {t("agents.config.telegramDisconnect")}
                                                                    </button>
                                                                </div>
                                                            ) : isConnecting ? (
                                                                <div className="space-y-3">
                                                                    <div className="flex items-center gap-2 text-sm text-primary">
                                                                        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                                                                        <span>{t("agents.config.telegramConnecting")}</span>
                                                                    </div>
                                                                    <p className="text-xs text-muted-foreground">{t("agents.config.telegramConnectingHint")}</p>
                                                                    {deepLink && (
                                                                        <a
                                                                            href={deepLink}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 bg-primary/20 hover:bg-primary/30 border border-primary/30 rounded-lg transition-colors"
                                                                        >
                                                                            <ExternalLink className="w-3 h-3" />
                                                                            {t("agents.config.telegramOpenLink")}
                                                                        </a>
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <div className="space-y-2">
                                                                    {hasError && (
                                                                        <p className="text-xs text-red-400">{t("agents.config.telegramConnectError")}</p>
                                                                    )}
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleConnectTelegram(agent.id)}
                                                                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-primary/30 hover:bg-primary/40 border border-primary/30 rounded-lg transition-colors"
                                                                    >
                                                                        <ExternalLink className="w-4 h-4" />
                                                                        {t("agents.config.telegramConnectButton")}
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )
                                                })()}

                                                {/* Sales Process */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-semibold text-muted-foreground block">{t("agents.config.qrPayment")}</label>
                                                        <label className="flex items-center gap-2 text-sm">
                                                            <input
                                                                type="checkbox"
                                                                checked={!!configForm?.sales_process?.QR_payment}
                                                                onChange={(e) => setConfigForm({
                                                                    ...configForm,
                                                                    sales_process: { ...configForm.sales_process, QR_payment: e.target.checked }
                                                                })}
                                                            />
                                                            {t("agents.config.qrPayment")}
                                                        </label>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-semibold text-muted-foreground block">{t("agents.config.physicalPayment")}</label>
                                                        <label className="flex items-center gap-2 text-sm">
                                                            <input
                                                                type="checkbox"
                                                                checked={!!configForm?.sales_process?.physical_payment}
                                                                onChange={(e) => setConfigForm({
                                                                    ...configForm,
                                                                    sales_process: { ...configForm.sales_process, physical_payment: e.target.checked }
                                                                })}
                                                            />
                                                            {t("agents.config.physicalPayment")}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-semibold text-muted-foreground mb-2 block">{t("agents.config.qrImage")}</label>
                                                    <QRUploader agentId={agent.id} />
                                                </div>

                                                {/* Response Settings */}
                                                <div className="space-y-3">
                                                    <h5 className="text-sm font-semibold text-muted-foreground">{t("agents.config.responseSettings")}</h5>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                        <label className="flex items-center gap-2 text-sm">
                                                            <input
                                                                type="checkbox"
                                                                checked={!!configForm?.response_settings?.include_pricing}
                                                                onChange={(e) => setConfigForm({
                                                                    ...configForm,
                                                                    response_settings: { ...configForm.response_settings, include_pricing: e.target.checked }
                                                                })}
                                                            />
                                                            {t("agents.config.includePricing")}
                                                        </label>
                                                        <label className="flex items-center gap-2 text-sm">
                                                            <input
                                                                type="checkbox"
                                                                checked={!!configForm?.response_settings?.show_availability}
                                                                onChange={(e) => setConfigForm({
                                                                    ...configForm,
                                                                    response_settings: { ...configForm.response_settings, show_availability: e.target.checked }
                                                                })}
                                                            />
                                                            {t("agents.config.showAvailability")}
                                                        </label>
                                                        <label className="flex items-center gap-2 text-sm">
                                                            <input
                                                                type="checkbox"
                                                                checked={!!configForm?.response_settings?.include_product_images}
                                                                onChange={(e) => setConfigForm({
                                                                    ...configForm,
                                                                    response_settings: { ...configForm.response_settings, include_product_images: e.target.checked }
                                                                })}
                                                            />
                                                            {t("agents.config.includeProductImages")}
                                                        </label>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                        <div>
                                                            <label className="text-sm font-semibold text-muted-foreground mb-2 block">{t("agents.config.maxResponseLength")}</label>
                                                            <input
                                                                type="number"
                                                                value={configForm?.response_settings?.max_response_length || 0}
                                                                onChange={(e) => setConfigForm({
                                                                    ...configForm,
                                                                    response_settings: {
                                                                        ...configForm.response_settings,
                                                                        max_response_length: Number(e.target.value)
                                                                    }
                                                                })}
                                                                className="w-full px-4 py-2 bg-white/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="text-sm font-semibold text-muted-foreground mb-2 block">{t("agents.config.responseDelaySeconds")}</label>
                                                            <input
                                                                type="number"
                                                                value={configForm?.response_settings?.response_delay_seconds || 0}
                                                                onChange={(e) => setConfigForm({
                                                                    ...configForm,
                                                                    response_settings: {
                                                                        ...configForm.response_settings,
                                                                        response_delay_seconds: Number(e.target.value)
                                                                    }
                                                                })}
                                                                className="w-full px-4 py-2 bg-white/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="text-sm font-semibold text-muted-foreground mb-2 block">{t("agents.config.typingIndicatorDuration")}</label>
                                                            <input
                                                                type="number"
                                                                value={configForm?.response_settings?.typing_indicator_duration || 0}
                                                                onChange={(e) => setConfigForm({
                                                                    ...configForm,
                                                                    response_settings: {
                                                                        ...configForm.response_settings,
                                                                        typing_indicator_duration: Number(e.target.value)
                                                                    }
                                                                })}
                                                                className="w-full px-4 py-2 bg-white/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Conversation Settings */}
                                                <div className="space-y-3">
                                                    <h5 className="text-sm font-semibold text-muted-foreground">{t("agents.config.conversationSettings")}</h5>
                                                    <label className="flex items-center gap-2 text-sm">
                                                        <input
                                                            type="checkbox"
                                                            checked={!!configForm?.conversation_settings?.auto_handoff_enabled}
                                                            onChange={(e) => setConfigForm({
                                                                ...configForm,
                                                                conversation_settings: { ...configForm.conversation_settings, auto_handoff_enabled: e.target.checked }
                                                            })}
                                                        />
                                                        {t("agents.config.autoHandoffEnabled")}
                                                    </label>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                        <div>
                                                            <label className="text-sm font-semibold text-muted-foreground mb-2 block">{t("agents.config.contextMessagesLimit")}</label>
                                                            <input
                                                                type="number"
                                                                value={configForm?.conversation_settings?.context_messages_limit || 0}
                                                                onChange={(e) => setConfigForm({
                                                                    ...configForm,
                                                                    conversation_settings: {
                                                                        ...configForm.conversation_settings,
                                                                        context_messages_limit: Number(e.target.value)
                                                                    }
                                                                })}
                                                                className="w-full px-4 py-2 bg-white/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="text-sm font-semibold text-muted-foreground mb-2 block">{t("agents.config.sessionTimeoutMinutes")}</label>
                                                            <input
                                                                type="number"
                                                                value={configForm?.conversation_settings?.session_timeout_minutes || 0}
                                                                onChange={(e) => setConfigForm({
                                                                    ...configForm,
                                                                    conversation_settings: {
                                                                        ...configForm.conversation_settings,
                                                                        session_timeout_minutes: Number(e.target.value)
                                                                    }
                                                                })}
                                                                className="w-full px-4 py-2 bg-white/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="text-sm font-semibold text-muted-foreground mb-2 block">{t("agents.config.handoffKeywords")}</label>
                                                            <input
                                                                type="text"
                                                                value={(configForm?.conversation_settings?.handoff_to_human_keywords || []).join(", ")}
                                                                onChange={(e) => setConfigForm({
                                                                    ...configForm,
                                                                    conversation_settings: {
                                                                        ...configForm.conversation_settings,
                                                                        handoff_to_human_keywords: e.target.value
                                                                            .split(",")
                                                                            .map((value) => value.trim())
                                                                            .filter(Boolean)
                                                                    }
                                                                })}
                                                                className="w-full px-4 py-2 bg-white/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                            </div>
                        )
                    })}
                </div>
            )}

            {/* Create Agent CTA */}
            <div className="fade-in-up glass rounded-2xl p-8 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-xl bg-linear-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                        <Bot className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-2xl font-black mb-1">{t("agents.createNew")}</h3>
                        <p className="text-muted-foreground">{t("agents.createNewDescription")}</p>
                    </div>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={() => setCreateDialogOpen(true)}
                        className="w-full p-6 glass rounded-xl border-2 border-primary/20 hover:border-primary/40 hover:bg-white/10 transition-all group flex items-center gap-4"
                    >
                        <div className="w-12 h-12 rounded-xl bg-primary/20 grid place-items-center group-hover:scale-110 transition-transform">
                            <MessageSquare className="w-6 h-6 text-primary" />
                        </div>
                        <div className="text-left flex-1">
                            <p className="font-bold text-base mb-1">{t("agents.createSalesAgent.button")}</p>
                            <p className="text-xs text-muted-foreground">{t("agents.createSalesAgent.dialogDescription")}</p>
                        </div>
                    </button>

                    {/* Marketing AI discovery card */}
                    <button
                        onClick={handleMarketingAgentClick}
                        className="w-full p-6 rounded-xl border-2 border-[#A3FF00]/20 hover:border-[#A3FF00]/50 hover:bg-[#A3FF00]/5 transition-all group flex items-center gap-4"
                    >
                        <div className="w-12 h-12 rounded-xl bg-[#A3FF00]/20 grid place-items-center group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(163,255,0,0.15)]">
                            <Megaphone className="w-6 h-6 text-[#A3FF00]" />
                        </div>
                        <div className="text-left flex-1">
                            <p className="font-bold text-base mb-1 text-[#A3FF00]">Agente de Marketing IA</p>
                            <p className="text-xs text-muted-foreground">Crea campañas publicitarias con IA en 9 pasos. Copys, estrategia y predicción de resultados.</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-[#A3FF00]/50 group-hover:text-[#A3FF00] group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </button>
                </div>
            </div>

            <CreateSalesAgentDialog
                open={createDialogOpen}
                onClose={() => setCreateDialogOpen(false)}
                onSuccess={() => {
                    execute()
                }}
            />
        </div>
    )
}
