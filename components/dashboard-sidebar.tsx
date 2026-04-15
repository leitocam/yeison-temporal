"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import {
  LayoutDashboard,
  Bot,
  Settings,
  LogOut,
  Menu,
  ChevronLeft,
  Lock,
  MessageSquare,
  BarChart3,
  Boxes,
  Zap,
  Crown,
  HelpCircle,
  Home,
  TrendingUp
} from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"

interface DashboardSidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
  activeTab?: "executive" | "chat" | "agents" | "metrics" | "inventory"
  onTabChange?: (tab: "executive" | "chat" | "agents" | "metrics" | "inventory") => void
}

export default function DashboardSidebar({ open, setOpen, activeTab = "executive", onTabChange }: DashboardSidebarProps) {
  const t = useTranslations("dashboard")
  const [expandUpgrade, setExpandUpgrade] = useState(false)
  const { logout } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  const mainMenuItems = [
    { icon: Home, label: "Inicio", id: "executive" as const, color: "from-emerald-500 to-teal-500" },
    { icon: MessageSquare, label: t("tabs.chat"), id: "chat" as const, color: "from-blue-500 to-cyan-500" },
    { icon: Bot, label: t("tabs.agents"), id: "agents" as const, color: "from-purple-500 to-pink-500" },
    { icon: BarChart3, label: t("tabs.metrics"), id: "metrics" as const, color: "from-orange-500 to-red-500" },
    { icon: Boxes, label: t("tabs.inventory"), id: "inventory" as const, color: "from-amber-500 to-yellow-500" },
  ]

  const settingsItems = [
    { icon: Settings, label: t("sidebar.settings"), href: "/settings" },
    { icon: Lock, label: t("sidebar.security"), href: "/security" },
    { icon: HelpCircle, label: "Ayuda", href: "/help" },
  ]

  const handleItemClick = (id: "executive" | "chat" | "agents" | "metrics" | "inventory") => {
    if (onTabChange) {
      onTabChange(id)
    }
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-5 left-4 z-50 p-2.5 bg-background/80 backdrop-blur-xl border border-primary/20 
                           hover:border-primary/40 hover:bg-primary/5 rounded-xl transition-all duration-300 shadow-lg shadow-black/10"
      >
        <Menu className="w-5 h-5 text-foreground" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-linear-to-b from-background via-background to-background/95 
                            backdrop-blur-xl border-r border-primary/10 transition-all duration-300 z-40 
                            ${open ? "w-64" : "w-20"} 
                            ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Decorative gradient line on the right edge */}
        <div className="absolute right-0 top-0 h-full w-px bg-linear-to-b from-primary/40 via-accent/20 to-transparent" />

        <div className="h-full flex flex-col relative">
          {/* Header with Logo */}
          <div className={`p-4 border-b border-primary/10 flex items-center ${open ? "justify-between" : "justify-center"}`}>
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-11 h-11 bg-linear-to-br from-primary via-accent to-primary rounded-xl flex items-center justify-center 
                                              shadow-lg shadow-primary/30 group-hover:shadow-xl group-hover:shadow-primary/40 
                                              transition-all duration-300 group-hover:scale-105">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                {/* Online indicator */}
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-background" />
              </div>
              {open && (
                <div className="overflow-hidden">
                  <span className="text-xl font-black block bg-linear-to-r from-foreground to-foreground/70 bg-clip-text">Yeison</span>
                  <span className="text-[10px] uppercase tracking-widest text-primary/80 font-semibold">AI Platform</span>
                </div>
              )}
            </Link>

            {/* Collapse Button - Desktop */}
            <button
              onClick={() => setOpen(!open)}
              className={`hidden lg:flex p-2 rounded-lg hover:bg-primary/10 transition-all duration-300 
                                       ${open ? "" : "absolute -right-3 top-6 bg-background border border-primary/20 shadow-lg"}`}
            >
              <ChevronLeft className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${!open ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            <div className={`${open ? "px-3" : "px-0"} py-2`}>
              {open && <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-semibold mb-3">Principal</p>}
            </div>

            {mainMenuItems.map((item, index) => {
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group relative
                                               ${isActive
                      ? "bg-linear-to-r from-primary/15 via-accent/10 to-transparent text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }
                                               ${!open ? "justify-center" : ""}`}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-linear-to-b ${item.color} rounded-r-full`} />
                  )}

                  <div className={`relative flex items-center justify-center ${isActive ? "text-primary" : ""}`}>
                    <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${!open ? "mx-auto" : ""}`} />
                    {isActive && (
                      <div className="absolute inset-0 bg-primary/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>

                  {open && (
                    <>
                      <span className={`text-sm font-medium ${isActive ? "font-semibold" : ""}`}>{item.label}</span>
                      {isActive && (
                        <div className="ml-auto w-2 h-2 bg-primary rounded-full animate-pulse shadow-lg shadow-primary/50" />
                      )}
                    </>
                  )}

                  {/* Tooltip for collapsed state */}
                  {!open && (
                    <div className="absolute left-full ml-3 px-3 py-1.5 bg-background border border-primary/20 rounded-lg 
                                                      shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                                                      transition-all duration-200 whitespace-nowrap z-50 text-sm font-medium">
                      {item.label}
                    </div>
                  )}
                </button>
              )
            })}

            {/* Quick Stats - when expanded */}
            {open && (
              <div className="mx-3 mt-4 p-3 rounded-xl bg-primary/5 border border-primary/10">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Hoy</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-background/50">
                    <p className="text-lg font-black">47</p>
                    <p className="text-[9px] text-muted-foreground uppercase">Leads</p>
                  </div>
                  <div className="p-2 rounded-lg bg-background/50">
                    <p className="text-lg font-black text-emerald-500">3</p>
                    <p className="text-[9px] text-muted-foreground uppercase">Ventas</p>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Section */}
            <div className={`${open ? "px-3" : "px-0"} py-2 mt-4`}>
              {open && <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-semibold mb-3">Configuración</p>}
            </div>

            {settingsItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground 
                                           hover:text-foreground hover:bg-white/5 transition-all duration-300 group
                                           ${!open ? "justify-center" : ""}`}
              >
                <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                {open && <span className="text-sm">{item.label}</span>}

                {/* Tooltip for collapsed state */}
                {!open && (
                  <div className="absolute left-full ml-3 px-3 py-1.5 bg-background border border-primary/20 rounded-lg 
                                                  shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                                                  transition-all duration-200 whitespace-nowrap z-50 text-sm">
                    {item.label}
                  </div>
                )}
              </Link>
            ))}
          </nav>

          {/* Upgrade Card */}
          {open && (
            <div className="p-3">
              <div
                onClick={() => setExpandUpgrade(!expandUpgrade)}
                className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary/10 via-accent/5 to-transparent 
                                          border border-primary/20 p-4 cursor-pointer group hover:border-primary/40 transition-all duration-300"
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-primary/20 to-transparent rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-linear-to-tr from-accent/20 to-transparent rounded-full blur-2xl" />

                <div className="relative flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{t("sidebar.upgradePlan")}</p>
                    <p className="text-[10px] text-muted-foreground">Desbloquea todas las funciones</p>
                  </div>
                </div>

                {expandUpgrade && (
                  <div className="mt-3 pt-3 border-t border-primary/10 space-y-2">
                    <p className="text-xs text-muted-foreground">{t("sidebar.planExpires")} Mar 15, 2025</p>
                    <Link
                      href="/pricing"
                      className="block text-xs text-primary hover:text-accent transition-colors font-medium"
                    >
                      {t("sidebar.viewPlans")}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* User Section / Sign Out */}
          <div className={`p-3 border-t border-primary/10 ${!open ? "flex justify-center" : ""}`}>
            <button
              onClick={handleLogout}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground 
                                       hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 group w-full
                                       ${!open ? "justify-center w-auto" : ""}`}
            >
              <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
              {open && <span className="text-sm">{t("sidebar.signOut")}</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  )
}
