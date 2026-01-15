"use client"

import Link from "next/link"
import { LayoutDashboard, Bot, Settings, LogOut, Menu, X, Lock } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"

interface DashboardSidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function DashboardSidebar({ open, setOpen }: DashboardSidebarProps) {
  const [expandUpgrade, setExpandUpgrade] = useState(false)
  const { logout } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", active: true },
    { icon: Bot, label: "Agents", href: "/dashboard#agents", active: false },
  ]

  const bottomItems = [
    { icon: Settings, label: "Settings", href: "/settings" },
    { icon: Lock, label: "Security", href: "/security" },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-6 left-4 z-50 p-2 glass hover:bg-white/20 rounded-lg transition-all"
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 glass border-r border-primary/20 transition-all duration-300 z-40 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-primary/20 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-lg shadow-primary/40">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xl font-black block">Yeison</span>
              <span className="text-xs text-muted-foreground">Professional</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                  item.active
                    ? "bg-gradient-to-r from-primary/20 to-accent/20 text-primary font-bold border-l-2 border-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/10 transition"
                }`}
              >
                <item.icon className={`w-5 h-5 transition-transform ${item.active ? "group-hover:scale-110" : ""}`} />
                <span className="text-sm">{item.label}</span>
                {item.active && <div className="ml-auto w-2 h-2 bg-primary rounded-full animate-pulse"></div>}
              </Link>
            ))}
          </nav>

          {/* Upgrade CTA */}
          <button
            onClick={() => setExpandUpgrade(!expandUpgrade)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 border-2 border-primary/40 hover:border-primary/60 transition-all group"
          >
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-accent" />
              <span className="text-sm font-bold">Upgrade Plan</span>
            </div>
          </button>

          {expandUpgrade && (
            <div className="p-4 glass rounded-lg border border-primary/30 space-y-2 text-sm">
              <p className="text-muted-foreground">Current plan expires on Mar 15, 2025</p>
              <Link href="/pricing" className="block px-3 py-2 text-accent hover:bg-white/10 rounded transition-colors">
                View all plans →
              </Link>
            </div>
          )}

          {/* Bottom Navigation */}
          <div className="space-y-2 pt-3 border-t border-primary/20">
            {bottomItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all text-sm"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Sign Out */}
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-all text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {open && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setOpen(false)}></div>}
    </>
  )
}
