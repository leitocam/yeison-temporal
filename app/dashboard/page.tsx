"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/useAuth"
import DashboardHeader from "@/components/dashboard-header"
import DashboardMetrics from "@/components/dashboard-metrics"
import DashboardCharts from "@/components/dashboard-charts"
import AgentsSection from "@/components/agents-section"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { Loader2 } from "lucide-react"

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("dashboard")
  const { user, isLoading, isAuthenticated } = useAuth()

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <main className={`transition-all duration-200 ${sidebarOpen ? "lg:ml-64" : "ml-0"}`}>
        <DashboardHeader />

        {/* Welcome Banner */}
        {user && (
          <div className="px-6 lg:px-8 py-4 glass border-b border-primary/20">
            <p className="text-sm text-muted-foreground">
              Welcome back, <span className="font-semibold text-foreground">{user.name}</span>
            </p>
          </div>
        )}

        <div className="sticky top-20 glass border-b border-primary/20 z-30 px-6 lg:px-8">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-6 py-4 text-sm font-semibold border-b-2 transition-all duration-300 ${activeTab === "dashboard"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("agents")}
              className={`px-6 py-4 text-sm font-semibold border-b-2 transition-all duration-300 ${activeTab === "agents"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
            >
              Agents
            </button>
          </div>
        </div>

        <div className="p-6 lg:p-8">
          {activeTab === "dashboard" ? (
            <>
              <DashboardMetrics />
              <DashboardCharts />
            </>
          ) : (
            <AgentsSection />
          )}
        </div>
      </main>
    </div>
  )
}
