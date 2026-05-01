"use client"

import { useTranslations } from "next-intl"
import { Settings, User, Bell, Palette, Shield } from "lucide-react"

export default function SettingsPage() {
    const t = useTranslations("dashboard")

    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h1 className="text-2xl font-bold">Configuración</h1>
                <p className="text-muted-foreground mt-1">Gestiona las preferencias de tu cuenta y el comportamiento de Yeison.</p>
            </div>

            <div className="grid gap-6">
                {/* Profile Card */}
                <div className="bg-card/40 backdrop-blur-md border border-primary/10 rounded-2xl p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-primary/10 rounded-xl text-primary">
                            <User className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">Perfil de Usuario</h2>
                            <p className="text-sm text-muted-foreground">Actualiza tu información personal</p>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Nombre Completo</label>
                                <input type="text" className="w-full bg-background/50 border border-border rounded-xl px-4 py-2.5 outline-none focus:border-primary/50 transition-colors" placeholder="Tu Nombre" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Correo Electrónico</label>
                                <input type="email" className="w-full bg-background/50 border border-border rounded-xl px-4 py-2.5 outline-none focus:border-primary/50 transition-colors" placeholder="correo@ejemplo.com" />
                            </div>
                        </div>
                        <button className="px-6 py-2.5 bg-primary/10 text-primary hover:bg-primary/20 font-medium rounded-xl transition-colors">Guardar Cambios</button>
                    </div>
                </div>

                {/* Notifications & Preferences */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-card/40 backdrop-blur-md border border-primary/10 rounded-2xl p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
                                <Bell className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold">Notificaciones</h2>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Alertas de Leads</span>
                                <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-background rounded-full"></div></div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Reportes Diarios</span>
                                <div className="w-10 h-6 bg-primary/20 rounded-full relative cursor-pointer"><div className="absolute left-1 top-1 w-4 h-4 bg-muted-foreground rounded-full"></div></div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card/40 backdrop-blur-md border border-primary/10 rounded-2xl p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                                <Palette className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold">Apariencia</h2>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Modo Oscuro</span>
                                <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-background rounded-full"></div></div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Animaciones Reducidas</span>
                                <div className="w-10 h-6 bg-primary/20 rounded-full relative cursor-pointer"><div className="absolute left-1 top-1 w-4 h-4 bg-muted-foreground rounded-full"></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
