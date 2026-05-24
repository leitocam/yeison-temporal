"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useTranslations } from "next-intl"
import { AlertCircle, Bot, CheckCircle2, Loader2, X } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useFacebookSDK, FBLoginResponse } from "@/hooks/useFacebookSDK"
import {
    apiClient,
    AgentInstance,
    OnboardingInitiateResponse,
    OnboardingCompleteResponse,
    ApiError,
} from "@/lib/api-client"

const E164 = /^\+[1-9]\d{1,14}$/

type WizardStep = "details" | "initiating" | "meta" | "completing" | "done"

interface MetaPayload {
    waba_id: string
    whatsapp_phone_number_id: string
    whatsapp_phone_number: string
}

interface Props {
    open: boolean
    onClose: () => void
    onSuccess: (agent: AgentInstance, connection: OnboardingCompleteResponse) => void
}

function normalizeE164(value: string): string {
    const trimmed = value.trim().replace(/[^\d+]/g, "")
    if (!trimmed) return ""
    return trimmed.startsWith("+") ? trimmed : `+${trimmed}`
}

export default function CreateSalesAgentDialog({ open, onClose, onSuccess }: Props) {
    const t = useTranslations("dashboard.agents.createSalesAgent")
    const { user } = useAuth()
    const { ready: fbReady, error: fbError } = useFacebookSDK()

    const [step, setStep] = useState<WizardStep>("details")
    const [agentName, setAgentName] = useState("")
    const [supervisorPhone, setSupervisorPhone] = useState("")
    const [language, setLanguage] = useState("es")
    const [createdAgent, setCreatedAgent] = useState<AgentInstance | null>(null)
    const [connection, setConnection] = useState<OnboardingInitiateResponse | null>(null)
    const [finalConnection, setFinalConnection] = useState<OnboardingCompleteResponse | null>(null)
    const [metaLaunching, setMetaLaunching] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)

    const tenantId = useMemo<number | null>(() => {
        if (!user?.id) return null
        const parsed = Number(user.id)
        return Number.isFinite(parsed) ? parsed : null
    }, [user])

    const resetState = useCallback(() => {
        setStep("details")
        setAgentName("")
        setSupervisorPhone("")
        setLanguage("es")
        setCreatedAgent(null)
        setConnection(null)
        setFinalConnection(null)
        setMetaLaunching(false)
        setError(null)
        setSubmitting(false)
    }, [])

    useEffect(() => {
        if (!open) {
            // Defer reset so the closing animation doesn't flash empty state mid-fade.
            const timer = setTimeout(resetState, 200)
            return () => clearTimeout(timer)
        }
    }, [open, resetState])

    const closeIfIdle = useCallback(() => {
        if (submitting) return
        onClose()
    }, [submitting, onClose])

    // ---------- Step transitions ----------

    const handleCreateAgent = async (event: React.FormEvent) => {
        event.preventDefault()
        setError(null)

        if (!tenantId) {
            setError(t("errors.missingTenant"))
            return
        }
        if (!agentName.trim()) {
            setError(t("errors.missingName"))
            return
        }
        const phone = normalizeE164(supervisorPhone)
        if (!E164.test(phone)) {
            setError(t("errors.invalidPhone"))
            return
        }

        setSubmitting(true)
        try {
            const agent = await apiClient.createAgent({
                agent_type: "Ventas",
                phone_number: phone,
                configuration: {
                    agent_info: { name: agentName.trim(), type: "ventas" },
                    personality: { language },
                    integrations: { supervisor_number: phone },
                },
            })
            setCreatedAgent(agent)
            setStep("initiating")
            await runInitiate(agent)
        } catch (err) {
            const apiErr = err as ApiError
            setError(apiErr?.message || t("errors.generic"))
            setSubmitting(false)
        }
    }

    const runInitiate = async (agent: AgentInstance) => {
        setError(null)
        try {
            const response = await apiClient.initiateOnboarding({
                tenant_id: tenantId!,
                agent_instance_id: Number(agent.id),
            })
            setConnection(response)
            setStep("meta")
        } catch (err) {
            const apiErr = err as ApiError
            setError(apiErr?.message || t("initiating.error"))
        } finally {
            setSubmitting(false)
        }
    }

    const retryInitiate = async () => {
        if (!createdAgent) return
        setSubmitting(true)
        setStep("initiating")
        await runInitiate(createdAgent)
    }

    const launchMetaSignup = () => {
        setError(null)
        if (!fbReady || typeof window === "undefined" || !window.FB) {
            setError(fbError || t("meta.sdkUnavailable"))
            return
        }
        const configId = process.env.NEXT_PUBLIC_META_EMBEDDED_SIGNUP_CONFIG_ID
        if (!configId) {
            setError(t("meta.sdkUnavailable"))
            return
        }

        setMetaLaunching(true)

        const messageHandler = (event: MessageEvent) => {
            if (event.origin !== "https://www.facebook.com" && event.origin !== "https://web.facebook.com") {
                return
            }
            try {
                const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data
                if (data?.type !== "WA_EMBEDDED_SIGNUP") return

                if (data.event === "FINISH") {
                    const payload: MetaPayload = {
                        waba_id: data.data?.waba_id,
                        whatsapp_phone_number_id: data.data?.phone_number_id,
                        whatsapp_phone_number: data.data?.phone_number || "",
                    }
                    window.removeEventListener("message", messageHandler)
                    void completeWithMeta(payload)
                } else if (data.event === "CANCEL") {
                    window.removeEventListener("message", messageHandler)
                    setMetaLaunching(false)
                    setError(t("meta.cancelled"))
                } else if (data.event === "ERROR") {
                    window.removeEventListener("message", messageHandler)
                    setMetaLaunching(false)
                    setError(data.data?.error_message || t("meta.error"))
                }
            } catch {
                // ignore non-JSON / non-relevant postMessages
            }
        }

        window.addEventListener("message", messageHandler)

        window.FB.login(
            (response: FBLoginResponse) => {
                if (!response.authResponse) {
                    window.removeEventListener("message", messageHandler)
                    setMetaLaunching(false)
                    if (!error) setError(t("meta.cancelled"))
                }
            },
            {
                config_id: configId,
                response_type: "code",
                override_default_response_type: true,
                extras: {
                    setup: {},
                    featureType: "whatsapp_embedded_signup",
                    sessionInfoVersion: "3",
                },
            },
        )
    }

    const completeWithMeta = async (payload: MetaPayload) => {
        if (!createdAgent || !tenantId) {
            setError(t("errors.missingTenant"))
            setMetaLaunching(false)
            return
        }
        const phone = normalizeE164(payload.whatsapp_phone_number)
        if (!payload.waba_id || !payload.whatsapp_phone_number_id || !E164.test(phone)) {
            setError(t("meta.noPayload"))
            setMetaLaunching(false)
            return
        }

        setStep("completing")
        setSubmitting(true)
        try {
            const result = await apiClient.completeOnboarding({
                tenant_id: tenantId,
                agent_instance_id: Number(createdAgent.id),
                waba_id: payload.waba_id,
                whatsapp_phone_number_id: payload.whatsapp_phone_number_id,
                whatsapp_phone_number: phone,
            })
            setFinalConnection(result)
            setStep("done")
            onSuccess(createdAgent, result)
        } catch (err) {
            const apiErr = err as ApiError
            setError(apiErr?.message || t("completing.error"))
            setStep("meta")
        } finally {
            setSubmitting(false)
            setMetaLaunching(false)
        }
    }

    // ---------- Render ----------

    if (!open) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            role="dialog"
            aria-modal="true"
            onClick={closeIfIdle}
        >
            <div
                className="relative w-full max-w-xl glass rounded-2xl border-2 border-primary/30 overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex items-start justify-between gap-4 p-6 border-b border-primary/20">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                            <Bot className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black">{t("dialogTitle")}</h2>
                            <p className="text-sm text-muted-foreground">{t("dialogDescription")}</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={closeIfIdle}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-40"
                        disabled={submitting}
                        aria-label={t("close")}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </header>

                <Stepper current={step} t={t} />

                <div className="p-6 space-y-4">
                    {error && (
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-300">
                            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}

                    {step === "details" && (
                        <form onSubmit={handleCreateAgent} className="space-y-4">
                            <div>
                                <label className="text-sm font-semibold text-muted-foreground mb-2 block">
                                    {t("details.agentName")}
                                </label>
                                <input
                                    type="text"
                                    value={agentName}
                                    onChange={(e) => setAgentName(e.target.value)}
                                    placeholder={t("details.agentNamePlaceholder")}
                                    className="w-full px-4 py-2.5 bg-white/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                                    autoFocus
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-muted-foreground mb-2 block">
                                    {t("details.supervisorPhone")}
                                </label>
                                <input
                                    type="tel"
                                    value={supervisorPhone}
                                    onChange={(e) => setSupervisorPhone(e.target.value)}
                                    placeholder={t("details.supervisorPhonePlaceholder")}
                                    className="w-full px-4 py-2.5 bg-white/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                                />
                                <p className="text-xs text-muted-foreground mt-1">{t("details.supervisorPhoneHint")}</p>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-muted-foreground mb-2 block">
                                    {t("details.language")}
                                </label>
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-white/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                                >
                                    <option value="es">Español</option>
                                    <option value="en">English</option>
                                    <option value="pt">Português</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={closeIfIdle}
                                    className="px-4 py-2 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                                >
                                    {t("cancel")}
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-5 py-2 rounded-lg font-semibold bg-primary/30 hover:bg-primary/40 transition-colors flex items-center gap-2 disabled:opacity-50"
                                >
                                    {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {t("details.submit")}
                                </button>
                            </div>
                        </form>
                    )}

                    {step === "initiating" && (
                        <ProgressBody
                            title={t("initiating.title")}
                            description={t("initiating.description")}
                            showSpinner={!error}
                            actionLabel={error ? t("retry") : undefined}
                            onAction={error ? retryInitiate : undefined}
                        />
                    )}

                    {step === "meta" && (
                        <div className="space-y-4">
                            <div className="text-center py-4">
                                <h3 className="text-lg font-bold mb-2">{t("meta.title")}</h3>
                                <p className="text-sm text-muted-foreground">{t("meta.description")}</p>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    type="button"
                                    onClick={launchMetaSignup}
                                    disabled={metaLaunching || !fbReady}
                                    className="px-6 py-3 rounded-lg font-semibold bg-[#1877F2] hover:bg-[#166fe5] text-white transition-colors flex items-center gap-2 disabled:opacity-50"
                                >
                                    {metaLaunching && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {metaLaunching ? t("meta.launching") : t("meta.launch")}
                                </button>
                            </div>
                            {fbError && (
                                <p className="text-xs text-center text-red-300">{t("meta.sdkUnavailable")}</p>
                            )}
                        </div>
                    )}

                    {step === "completing" && (
                        <ProgressBody
                            title={t("completing.title")}
                            description={t("completing.description")}
                            showSpinner
                        />
                    )}

                    {step === "done" && finalConnection && (
                        <div className="text-center py-6 space-y-3">
                            <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
                            <h3 className="text-xl font-black">{t("done.title")}</h3>
                            <p className="text-sm text-muted-foreground">{t("done.description")}</p>
                            <div className="inline-flex flex-col items-center gap-1 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                                    {t("done.connectedNumber")}
                                </span>
                                <span className="text-base font-bold text-emerald-400">
                                    {finalConnection.whatsapp_phone_number}
                                </span>
                            </div>
                            <div className="pt-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-5 py-2 rounded-lg font-semibold bg-primary/30 hover:bg-primary/40 transition-colors"
                                >
                                    {t("done.goToAgents")}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// ---------- Small subcomponents ----------

function Stepper({
    current,
    t,
}: {
    current: WizardStep
    t: ReturnType<typeof useTranslations>
}) {
    const order: WizardStep[] = ["details", "initiating", "meta", "completing", "done"]
    const activeIndex = order.indexOf(current)

    return (
        <ol className="flex items-center gap-2 px-6 py-3 border-b border-primary/10 bg-white/5 overflow-x-auto">
            {order.map((s, i) => {
                const reached = i <= activeIndex
                return (
                    <li
                        key={s}
                        className={`flex items-center gap-2 text-xs whitespace-nowrap ${
                            reached ? "text-primary" : "text-muted-foreground"
                        }`}
                    >
                        <span
                            className={`w-5 h-5 rounded-full grid place-items-center text-[10px] font-bold border ${
                                reached
                                    ? "bg-primary/30 border-primary/60"
                                    : "bg-white/5 border-white/10"
                            }`}
                        >
                            {i + 1}
                        </span>
                        <span className="font-semibold">{t(`steps.${s}`)}</span>
                        {i < order.length - 1 && <span className="opacity-30 mx-1">›</span>}
                    </li>
                )
            })}
        </ol>
    )
}

function ProgressBody({
    title,
    description,
    showSpinner,
    actionLabel,
    onAction,
}: {
    title: string
    description: string
    showSpinner?: boolean
    actionLabel?: string
    onAction?: () => void
}) {
    return (
        <div className="text-center py-8 space-y-3">
            {showSpinner && <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto" />}
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
            {actionLabel && onAction && (
                <div className="pt-2">
                    <button
                        type="button"
                        onClick={onAction}
                        className="px-5 py-2 rounded-lg font-semibold bg-primary/30 hover:bg-primary/40 transition-colors"
                    >
                        {actionLabel}
                    </button>
                </div>
            )}
        </div>
    )
}
