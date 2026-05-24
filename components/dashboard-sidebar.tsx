"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
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
  TrendingUp,
  Megaphone,
  Lock as LockIcon,
  Wand2,
  ImagePlay,
} from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"

// ─── Marketing agent purchase status ─────────────────────────────────────────
// Prepared for future integration: wire hasMarketingAgent to your plan/billing
// API (e.g. user.features?.includes('marketing') or a dedicated endpoint).
// Currently set to false so the UI shows the "locked" state by default.
function useMarketingAgentStatus(): boolean {
  // TODO: replace with real check once billing API is available
  // Example: return user?.plan === 'pro' || user?.addons?.includes('marketing')
  return false
}

// Import logos
import Logo from "@/components/Logos/Logo.png"
import LogoHorizontal from "@/components/Logos/LogoHorizontal.png"

interface DashboardSidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function DashboardSidebar({ open, setOpen }: DashboardSidebarProps) {
  const t = useTranslations("dashboard")
  const pathname = usePathname()
  const [expandUpgrade, setExpandUpgrade] = useState(false)
  const { logout } = useAuth()
  const hasMarketingAgent = useMarketingAgentStatus()

  // Persist sidebar open state across reloads
  const handleSetOpen = (value: boolean) => {
    setOpen(value)
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebar_open', String(value))
    }
  }

  const handleLogout = async () => {
    await logout()
  }

  // Helper to check if a route is active
  const isActiveRoute = (path: string) => {
    // pathname usually includes locale like /es/dashboard/chat
    return pathname.endsWith(path) || (path === "/dashboard" && pathname.endsWith("/dashboard"))
  }

  const mainMenuItems = [
    { icon: Home, label: "Inicio", href: "/dashboard", color: "from-emerald-500 to-teal-500" },
    { icon: MessageSquare, label: t("tabs.chat"), href: "/dashboard/chat", color: "from-blue-500 to-cyan-500" },
    { icon: Bot, label: t("tabs.agents"), href: "/dashboard/agents", color: "from-purple-500 to-pink-500" },
    { icon: BarChart3, label: t("tabs.metrics"), href: "/dashboard/metrics", color: "from-orange-500 to-red-500" },
    { icon: Boxes, label: t("tabs.inventory"), href: "/dashboard/inventory", color: "from-amber-500 to-yellow-500" },
    { icon: Megaphone, label: "Campañas", href: "/dashboard/marketing", color: "from-[#A3FF00] to-[#C4FF4D]", marketing: true },
  ]

  const settingsItems = [
    { icon: Settings, label: t("sidebar.settings"), href: "/dashboard/settings" },
    { icon: Zap, label: t("sidebar.onboarding"), href: "/onboarding" },
    { icon: Lock, label: t("sidebar.security"), href: "/dashboard/security" },
    { icon: HelpCircle, label: "Ayuda", href: "/dashboard/help" },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => handleSetOpen(!open)}
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
          <div className={`p-4 border-b border-primary/10 flex items-center ${open ? "justify-between" : "justify-center"} h-20`}>
            <Link href="/dashboard" className="flex items-center gap-3 group w-full">
                {open ? (
                    <div className="relative w-48 h-[60px] ml-1 transition-transform duration-300 group-hover:scale-105">
                        <Image src={LogoHorizontal} alt="Yeison Logo" fill className="object-contain" priority />
                    </div>
                ) : (
                    <div className="relative w-10 h-10 mx-auto transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_10px_rgba(163,255,0,0.5)]">
                        <Image src={Logo} alt="Yeison Logo" fill className="object-contain" priority />
                    </div>
                )}
            </Link>

            {/* Collapse Button - Desktop */}
            <button
              onClick={() => handleSetOpen(!open)}
              className={`hidden lg:flex p-2 rounded-lg hover:bg-primary/10 transition-all duration-300 z-10
                                       ${open ? "" : "absolute -right-3 top-7 bg-background border border-primary/20 shadow-lg"}`}
            >
              <ChevronLeft className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${!open ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            <div className={`${open ? "px-3" : "px-0"} py-2`}>
              {open && <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-semibold mb-3">Principal</p>}
            </div>

            {mainMenuItems.map((item) => {
              const isActive = isActiveRoute(item.href)
              const isMarketing = (item as any).marketing === true
              const isLocked = isMarketing && !hasMarketingAgent

              return (
                <div key={item.href}>
                <Link
                  href={item.href}
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
                    <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${!open ? "mx-auto" : ""} ${isMarketing && !isLocked ? "text-[#A3FF00]" : ""}`} />
                    {isActive && (
                      <div className="absolute inset-0 bg-primary/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>

                  {open && (
                    <>
                      <span className={`text-sm font-medium ${isActive ? "font-semibold" : ""} ${isMarketing && !isLocked ? "text-[#A3FF00]" : ""}`}>
                        {item.label}
                      </span>
                      {/* Marketing agent status badge */}
                      {isMarketing && (
                        <div className="ml-auto flex items-center gap-1">
                          {isLocked ? (
                            <span className="flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider text-[#666] border border-[#1A1A1A] rounded-full px-2 py-0.5">
                              <LockIcon className="w-2.5 h-2.5" />
                              Pro
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider text-[#A3FF00] border border-[#A3FF00]/30 bg-[#A3FF00]/10 rounded-full px-2 py-0.5">
                              Activo
                            </span>
                          )}
                        </div>
                      )}
                      {isActive && !isMarketing && (
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
                      {isMarketing && (
                        <span className="ml-2 text-[9px] font-mono uppercase text-[#666]">
                          {isLocked ? '🔒 Pro' : '✓'}
                        </span>
                      )}
                    </div>
                  )}
                </Link>

                {/* Marketing sub-menu — visible when sidebar is open and marketing route is active */}
                {isMarketing && open && pathname.includes('/dashboard/marketing') && (
                  <div className="ml-8 mt-1 space-y-0.5">
                    <Link
                      href={`/dashboard/marketing`}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all ${
                        !pathname.includes('/studio')
                          ? 'text-[#A3FF00] bg-[#A3FF00]/10'
                          : 'text-[#555] hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Wand2 className="w-3.5 h-3.5" />
                      Wizard
                    </Link>
                    <Link
                      href={`/dashboard/marketing/studio`}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all ${
                        pathname.includes('/studio')
                          ? 'text-[#A3FF00] bg-[#A3FF00]/10'
                          : 'text-[#555] hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <ImagePlay className="w-3.5 h-3.5" />
                      Estudio
                    </Link>
                  </div>
                )}
                </div>
              )
            })}

            {/* Quick Stats placeholder — connect to /dashboard/metrics when available */}
            {open && (
              <div className="mx-3 mt-4 p-3 rounded-xl bg-primary/5 border border-primary/10">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Dashboard</span>
                </div>
                <p className="text-[10px] text-muted-foreground/60">
                  Ve a <span className="text-primary/70">Métricas</span> para ver estadísticas detalladas.
                </p>
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
                    <p className="text-xs text-muted-foreground">Plan activo</p>
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
          onClick={() => handleSetOpen(false)}
        />
      )}
    </>
  )
}
