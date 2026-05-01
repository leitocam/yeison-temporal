"use client"

import { useState } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { useAuth } from "@/hooks/useAuth"
import {
  Bell,
  Settings,
  User,
  ChevronDown,
  Search,
  Sparkles,
  Command,
} from "lucide-react"
import LanguageSwitcher from "@/components/ui/LanguageSwitcher"

export default function Topbar() {
  const t = useTranslations("dashboard")
  const { user, logout } = useAuth()
  const [showProfile, setShowProfile] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const handleLogout = async () => {
    await logout()
  }

  const notifications = [
    { id: 1, title: "Lead caliente detectado", desc: "Juan Pérez - 78% probabilidad", time: "hace 3 min", unread: true },
    { id: 2, title: "Venta cerrada", desc: "María García - Plan Pro", time: "hace 12 min", unread: true },
    { id: 3, title: "Seguimiento enviado", desc: "5 leads contactados automáticamente", time: "hace 1 hora", unread: false },
  ]

  return (
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
              onClick={() => {
                setShowNotifications(!showNotifications)
                setShowProfile(false)
              }}
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
              onClick={() => {
                setShowProfile(!showProfile)
                setShowNotifications(false)
              }}
              className="flex items-center gap-2 p-1.5 pl-1.5 pr-3 rounded-xl bg-white/5 border border-primary/10 
                                             hover:bg-white/10 hover:border-primary/20 transition-all duration-300"
            >
              <div className="relative">
                <div className="w-8 h-8 bg-linear-to-br from-primary via-accent to-primary rounded-lg 
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
                <div className="p-4 border-b border-primary/10 bg-linear-to-r from-primary/5 to-accent/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-linear-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{user?.name || 'Usuario'}</p>
                      <p className="text-xs text-muted-foreground">{user?.email || 'Sin email'}</p>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <Link href="/onboarding" className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl hover:bg-white/10 transition-colors text-left">
                    <User className="w-4 h-4 text-muted-foreground" />
                    {t("header.profile")}
                  </Link>
                  <Link href="/dashboard/settings" className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl hover:bg-white/10 transition-colors text-left">
                    <Settings className="w-4 h-4 text-muted-foreground" />
                    {t("header.settings")}
                  </Link>
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
    </header>
  )
}
