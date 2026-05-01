"use client"

import { useEffect } from "react"
import { useTranslations } from "next-intl"
import { useApi } from "@/hooks/useApi"
import {
    SystemHealthBar,
    KPIGrid,
    ActivityFeed,
    AIInsights,
    AgentRanking,
    SmartAlerts
} from "@/components/dashboard"
import {
    Loader2,
    MessageSquare,
    Users,
    DollarSign,
    Target,
    TrendingUp
} from "lucide-react"
import { apiClient, DashboardMetricsResponse } from "@/lib/api-client"

export default function DashboardPage() {
    const t = useTranslations("dashboard")

    const { data: dashboardMetrics, error: metricsError, execute: loadMetrics, isLoading } = useApi<DashboardMetricsResponse>(
        () => apiClient.get("/dashboard/metrics")
    )

    useEffect(() => {
        loadMetrics()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const computePreviousValue = (value: number, changePercent?: number | null) => {
        if (changePercent === null || changePercent === undefined) return undefined
        const factor = 1 + changePercent / 100
        if (factor === 0) return undefined
        return Math.round(value / factor)
    }

    const kpis = dashboardMetrics
        ? [
            {
                id: "leads",
                label: t("kpis.leadsToday"),
                value: dashboardMetrics.leads_entrantes_hoy.value,
                previousValue: computePreviousValue(
                    dashboardMetrics.leads_entrantes_hoy.value,
                    dashboardMetrics.leads_entrantes_hoy.change_percent
                ),
                format: "number" as const,
                icon: Users,
                color: "bg-blue-500/20 text-blue-500",
            },
            {
                id: "conversations",
                label: t("kpis.activeConversations"),
                value: dashboardMetrics.conversaciones_activas.value,
                previousValue: computePreviousValue(
                    dashboardMetrics.conversaciones_activas.value,
                    dashboardMetrics.conversaciones_activas.change_percent
                ),
                format: "number" as const,
                icon: MessageSquare,
                color: "bg-emerald-500/20 text-emerald-500",
            },
            {
                id: "qualified",
                label: t("kpis.qualifiedLeads"),
                value: dashboardMetrics.leads_calificados_hoy.value,
                previousValue: computePreviousValue(
                    dashboardMetrics.leads_calificados_hoy.value,
                    dashboardMetrics.leads_calificados_hoy.change_percent
                ),
                format: "number" as const,
                icon: Target,
                color: "bg-purple-500/20 text-purple-500",
            },
            {
                id: "pipeline",
                label: t("kpis.pipelineValue"),
                value: dashboardMetrics.valor_pipeline,
                format: "currency" as const,
                icon: DollarSign,
                color: "bg-amber-500/20 text-amber-500",
            },
            {
                id: "closed",
                label: t("kpis.closedSales"),
                value: dashboardMetrics.ventas_cerradas_hoy.value,
                previousValue: computePreviousValue(
                    dashboardMetrics.ventas_cerradas_hoy.value,
                    dashboardMetrics.ventas_cerradas_hoy.change_percent
                ),
                format: "number" as const,
                icon: TrendingUp, // Changed from BarChart3 to TrendingUp
                color: "bg-primary/20 text-primary",
            },
            {
                id: "salesValue",
                label: t("kpis.salesValueToday"),
                value: dashboardMetrics.valor_ventas_hoy.value,
                previousValue: computePreviousValue(
                    dashboardMetrics.valor_ventas_hoy.value,
                    dashboardMetrics.valor_ventas_hoy.change_percent
                ),
                format: "currency" as const,
                icon: TrendingUp,
                color: "bg-emerald-500/20 text-emerald-500",
            },
        ]
        : undefined

    if (isLoading) {
        return (
            <div className="h-[80vh] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-primary to-accent flex items-center justify-center">
                            <Loader2 className="w-8 h-8 animate-spin text-white" />
                        </div>
                        <div className="absolute inset-0 bg-linear-to-br from-primary to-accent rounded-2xl blur-xl opacity-50 animate-pulse" />
                    </div>
                    <p className="text-muted-foreground font-medium">{t("loading")}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <SmartAlerts />
            <SystemHealthBar />
            <KPIGrid kpis={kpis} />

            {metricsError && (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-500">
                    {t("metrics.fetchError")}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <ActivityFeed />
                    <AgentRanking />
                </div>
                <div className="lg:col-span-1">
                    <AIInsights />
                </div>
            </div>
        </div>
    )
}

