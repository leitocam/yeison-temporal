"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { useAuth } from "@/hooks/useAuth"
import DashboardSidebar from "@/components/dashboard-sidebar"
import {
    ChatTab,
    AgentsTab,
    MetricsTab,
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
    Bot,
    BarChart3,
    Bell,
    Settings,
    User,
    ChevronDown,
    Search,
    Sparkles,
    Command,
    LayoutDashboard
} from "lucide-react"
import LanguageSwitcher from "@/components/ui/LanguageSwitcher"

export default function DashboardPage() {
    const t = useTranslations("dashboard")
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [activeTab, setActiveTab] = useState<"executive" | "chat" | "agents" | "metrics">("executive")
    const [showProfile, setShowProfile] = useState(false)
    const [showNotifications, setShowNotifications] = useState(false)
    const { user, isLoading, logout } = useAuth()

    const handleLogout = async () => {
        await logout()
    }

    const tabs = [
        { id: "executive" as const, label: "Inicio", icon: LayoutDashboard, color: "from-emerald-500 to-teal-500" },
        { id: "chat" as const, label: t("tabs.chat"), icon: MessageSquare, color: "from-blue-500 to-cyan-500" },
        { id: "agents" as const, label: t("tabs.agents"), icon: Bot, color: "from-purple-500 to-pink-500" },
        { id: "metrics" as const, label: t("tabs.metrics"), icon: BarChart3, color: "from-orange-500 to-red-500" },
    ]

    const notifications = [
        { id: 1, title: "Lead caliente detectado", desc: "Juan Pérez - 78% probabilidad", time: "hace 3 min", unread: true },
        { id: 2, title: "Venta cerrada", desc: "María García - Plan Pro", time: "hace 12 min", unread: true },
        { id: 3, title: "Seguimiento enviado", desc: "5 leads contactados automáticamente", time: "hace 1 hora", unread: false },
    ]

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                            <Loader2 className="w-8 h-8 animate-spin text-white" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-2xl blur-xl opacity-50 animate-pulse" />
                    </div>
                    <p className="text-muted-foreground font-medium">{t("loading")}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(59, 130, 246, 1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59, 130, 246, 1) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px'
                    }}
                />
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
            </div>

            <DashboardSidebar open={sidebarOpen} setOpen={setSidebarOpen} activeTab={activeTab} onTabChange={setActiveTab} />

            <main className={`relative z-10 transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}>
                {/* Premium Header */}
                <header className="sticky top-0 z-40">
                    <div className="absolute inset-0 bg-background/70 backdrop-blur-xl border-b border-primary/10" />

                    <div className="relative px-4 lg:px-6 h-16 flex items-center justify-between gap-4">
                        {/* Left Section - Search */}
                        <div className="flex-1 max-w-md">
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground 
                                                 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Buscar leads, agentes..."
                                    className="w-full pl-10 pr-12 py-2.5 bg-white/5 border border-primary/10 rounded-xl
                                             text-sm placeholder:text-muted-foreground/50
                                             focus:outline-none focus:border-primary/30 focus:bg-white/10
                                             transition-all duration-300"
                                />
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 
                                              px-1.5 py-0.5 bg-primary/10 rounded-md">
                                    <Command className="w-3 h-3 text-muted-foreground" />
                                    <span className="text-[10px] text-muted-foreground font-medium">K</span>
                                </div>
                            </div>
                        </div>

                        {/* Center Section - Tabs */}
                        <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-primary/10">
                            {tabs.map((tab) => {
                                const Icon = tab.icon
                                const isActive = activeTab === tab.id
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium 
                                                   transition-all duration-300 ${isActive
                                                ? "text-foreground"
                                                : "text-muted-foreground hover:text-foreground"
                                            }`}
                                    >
                                        {isActive && (
                                            <div className={`absolute inset-0 bg-gradient-to-r ${tab.color} opacity-15 rounded-lg`} />
                                        )}
                                        {isActive && (
                                            <div className="absolute inset-0 bg-white/10 rounded-lg backdrop-blur-sm" />
                                        )}
                                        <Icon className={`relative w-4 h-4 ${isActive ? "text-primary" : ""}`} />
                                        <span className="relative hidden lg:inline">{tab.label}</span>
                                    </button>
                                )
                            })}
                        </div>

                        {/* Right Section - Actions */}
                        <div className="flex items-center gap-2">
                            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                <span className="text-xs font-medium text-emerald-500">IA Activa</span>
                            </div>

                            <LanguageSwitcher />

                            {/* Notifications */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowNotifications(!showNotifications)}
                                    className="relative p-2.5 rounded-xl bg-white/5 border border-primary/10 
                                             hover:bg-white/10 hover:border-primary/20 transition-all duration-300 group"
                                >
                                    <Bell className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                    <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                                </button>

                                {showNotifications && (
                                    <div className="absolute right-0 mt-2 w-80 bg-background/95 backdrop-blur-xl border border-primary/20 
                                                  rounded-2xl shadow-2xl shadow-black/20 overflow-hidden z-50">
                                        <div className="p-4 border-b border-primary/10 flex items-center justify-between">
                                            <h3 className="font-semibold">Notificaciones</h3>
                                            <span className="text-xs text-primary font-medium cursor-pointer hover:underline">Marcar leído</span>
                                        </div>
                                        <div className="max-h-64 overflow-y-auto">
                                            {notifications.map((notif) => (
                                                <div
                                                    key={notif.id}
                                                    className={`p-4 border-b border-primary/5 hover:bg-white/5 cursor-pointer transition-colors
                                                               ${notif.unread ? "bg-primary/5" : ""}`}
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className={`w-2 h-2 rounded-full mt-2 ${notif.unread ? "bg-primary" : "bg-muted"}`} />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium">{notif.title}</p>
                                                            <p className="text-xs text-muted-foreground truncate">{notif.desc}</p>
                                                            <p className="text-[10px] text-muted-foreground/60 mt-1">{notif.time}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button className="p-2.5 rounded-xl bg-white/5 border border-primary/10 
                                           hover:bg-white/10 hover:border-primary/20 transition-all duration-300 group">
                                <Settings className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:rotate-90 transition-all duration-500" />
                            </button>

                            {/* Profile Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowProfile(!showProfile)}
                                    className="flex items-center gap-2 p-1.5 pl-1.5 pr-3 rounded-xl bg-white/5 border border-primary/10 
                                             hover:bg-white/10 hover:border-primary/20 transition-all duration-300"
                                >
                                    <div className="relative">
                                        <div className="w-8 h-8 bg-gradient-to-br from-primary via-accent to-primary rounded-lg 
                                                      flex items-center justify-center shadow-lg shadow-primary/20">
                                            <User className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-background" />
                                    </div>
                                    <div className="hidden lg:block text-left">
                                        <p className="text-xs font-semibold leading-none">{user?.name?.split(' ')[0] || 'Usuario'}</p>
                                        <p className="text-[10px] text-muted-foreground leading-none mt-0.5">Pro</p>
                                    </div>
                                    <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform duration-300 ${showProfile ? "rotate-180" : ""}`} />
                                </button>

                                {showProfile && (
                                    <div className="absolute right-0 mt-2 w-56 bg-background/95 backdrop-blur-xl border border-primary/20 
                                                  rounded-2xl shadow-2xl shadow-black/20 overflow-hidden z-50">
                                        <div className="p-4 border-b border-primary/10 bg-gradient-to-r from-primary/5 to-accent/5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                                                    <User className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-sm">{user?.name || 'Usuario'}</p>
                                                    <p className="text-xs text-muted-foreground">{user?.email || 'Sin email'}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-2">
                                            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl hover:bg-white/10 transition-colors text-left">
                                                <User className="w-4 h-4 text-muted-foreground" />
                                                {t("header.profile")}
                                            </button>
                                            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl hover:bg-white/10 transition-colors text-left">
                                                <Settings className="w-4 h-4 text-muted-foreground" />
                                                {t("header.settings")}
                                            </button>
                                            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl hover:bg-white/10 transition-colors text-left">
                                                <Sparkles className="w-4 h-4 text-amber-500" />
                                                <span>Mejorar a Premium</span>
                                                <span className="ml-auto text-[10px] bg-amber-500/20 text-amber-500 px-1.5 py-0.5 rounded font-medium">PRO</span>
                                            </button>
                                        </div>
                                        <div className="p-2 border-t border-primary/10">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl text-red-400 hover:bg-red-500/10 transition-colors text-left"
                                            >
                                                {t("header.signOut")}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Mobile Tabs */}
                <div className="md:hidden sticky top-16 z-30 px-4 py-2 bg-background/80 backdrop-blur-xl border-b border-primary/10">
                    <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl overflow-x-auto">
                        {tabs.map((tab) => {
                            const Icon = tab.icon
                            const isActive = activeTab === tab.id
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-shrink-0 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium 
                                               transition-all duration-300 ${isActive ? "bg-white/10 text-foreground" : "text-muted-foreground"
                                        }`}
                                >
                                    <Icon className={`w-4 h-4 ${isActive ? "text-primary" : ""}`} />
                                    <span className="hidden sm:inline">{tab.label}</span>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="p-4 lg:p-6">
                    {activeTab === "executive" && (
                        <div className="space-y-6">
                            {/* Smart Alerts */}
                            <SmartAlerts />

                            {/* System Health */}
                            <SystemHealthBar />

                            {/* KPIs */}
                            <KPIGrid />

                            {/* Two Column Layout */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Left Column - Activity & Agents */}
                                <div className="lg:col-span-2 space-y-6">
                                    <ActivityFeed />
                                    <AgentRanking />
                                </div>

                                {/* Right Column - AI Insights */}
                                <div className="lg:col-span-1">
                                    <AIInsights />
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === "chat" && <ChatTab onTabChange={setActiveTab} />}
                    {activeTab === "agents" && <AgentsTab />}
                    {activeTab === "metrics" && <MetricsTab />}
                </div>
            </main>

            {/* Click outside to close dropdowns */}
            {(showProfile || showNotifications) && (
                <div
                    className="fixed inset-0 z-30"
                    onClick={() => {
                        setShowProfile(false)
                        setShowNotifications(false)
                    }}
                />
            )}
        </div>
    )
}
