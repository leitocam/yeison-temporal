"use client"

import { useState } from "react"
import { Bell, Settings, User, ChevronDown } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

export default function DashboardHeader() {
  const [showProfile, setShowProfile] = useState(false)
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <header className="sticky top-0 glass border-b border-primary/20 z-40">
      <div className="px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="min-w-0">
          <h1 className="text-3xl font-black tracking-tight">
            Welcome back, {user?.name || 'User'}
          </h1>
          <p className="text-sm text-muted-foreground mt-1 truncate">Here's your sales intelligence dashboard</p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <button className="p-2 glass hover:bg-white/20 rounded-lg transition-all duration-300 text-muted-foreground hover:text-accent group">
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-primary to-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Bell className="w-5 h-5" />
          </button>

          <button className="p-2 glass hover:bg-white/20 rounded-lg transition-all duration-300 text-muted-foreground hover:text-accent">
            <Settings className="w-5 h-5" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 p-2 glass hover:bg-white/20 rounded-lg transition-all duration-300"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary via-accent to-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/40">
                <User className="w-4 h-4 text-white font-bold" />
              </div>
              <ChevronDown
                className={`w-4 h-4 text-muted-foreground transition-transform ${showProfile ? "rotate-180" : ""}`}
              />
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 glass rounded-xl border border-primary/30 shadow-xl overflow-hidden z-50">
                <div className="p-4 border-b border-primary/20">
                  <p className="font-semibold text-sm">{user?.name || 'User'}</p>
                  <p className="text-xs text-muted-foreground">{user?.email || 'No email'}</p>
                </div>
                <div className="p-2 space-y-1">
                  <button className="w-full text-left px-3 py-2 text-sm hover:bg-white/10 rounded-lg transition-colors">
                    Profile
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm hover:bg-white/10 rounded-lg transition-colors">
                    Settings
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
