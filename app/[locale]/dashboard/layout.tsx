"use client"

import { useState } from "react"
import DashboardSidebar from "@/components/dashboard-sidebar"
import Topbar from "@/components/dashboard-layout/Topbar"
import { OnboardingAlert } from "@/components/dashboard"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(163, 255, 0, 1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(163, 255, 0, 1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
        <div className="absolute top-0 left-1/4 w-125 h-125 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-100 h-100 bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <DashboardSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <main className={`relative z-10 transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}>
        <Topbar />
        <OnboardingAlert />
        
        {/* Tab Content */}
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
