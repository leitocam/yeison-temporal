"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, ArrowRight, X } from "lucide-react"
import { apiClient } from "@/lib/api-client"

export default function OnboardingAlert() {
    const [isVisible, setIsVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const config = await apiClient.get<any>('/configurations/current-or-create')
                if (config && config.is_completed === false) {
                    setIsVisible(true)
                }
            } catch (error) {
                console.error("Failed to check onboarding status for alert", error)
            } finally {
                setIsLoading(false)
            }
        }
        
        checkStatus()
    }, [])

    if (isLoading || !isVisible) return null

    return (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-3 relative overflow-hidden backdrop-blur-xl z-30">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-amber-500/20 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="relative max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-amber-500">
                    <div className="p-2 bg-amber-500/10 rounded-lg shrink-0">
                        <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="font-semibold text-sm">Perfil incompleto</p>
                        <p className="text-xs text-amber-500/80">Para que tus agentes IA funcionen al 100%, es necesario completar la información de tu empresa.</p>
                    </div>
                </div>
                
                <Link 
                    href="/onboarding" 
                    className="shrink-0 flex items-center gap-2 px-4 py-2 bg-amber-500 text-background font-bold text-sm rounded-xl hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
                >
                    Completar Perfil
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    )
}
