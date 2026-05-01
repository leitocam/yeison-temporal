"use client"

import { Shield, Key, Smartphone, AlertTriangle } from "lucide-react"

export default function SecurityPage() {
    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h1 className="text-2xl font-bold">Seguridad y Privacidad</h1>
                <p className="text-muted-foreground mt-1">Protege tu cuenta y gestiona tus métodos de acceso.</p>
            </div>

            <div className="grid gap-6">
                <div className="bg-card/40 backdrop-blur-md border border-primary/10 rounded-2xl p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-red-500/10 rounded-xl text-red-500">
                            <Shield className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">Estado de la cuenta</h2>
                            <p className="text-sm text-muted-foreground">Revisión de seguridad sugerida</p>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-red-500">Autenticación de Dos Factores (2FA) desactivada</p>
                            <p className="text-xs text-muted-foreground mt-1">Aumenta significativamente la seguridad de tu cuenta activando el 2FA mediante una app de autenticación.</p>
                            <button className="mt-3 px-4 py-1.5 bg-red-500/10 text-red-500 font-medium text-sm rounded-lg hover:bg-red-500/20 transition-colors">Configurar 2FA</button>
                        </div>
                    </div>
                </div>

                <div className="bg-card/40 backdrop-blur-md border border-primary/10 rounded-2xl p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-primary/10 rounded-xl text-primary">
                            <Key className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">Contraseña</h2>
                        </div>
                    </div>
                    
                    <div className="space-y-4 max-w-md">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Contraseña Actual</label>
                            <input type="password" className="w-full bg-background/50 border border-border rounded-xl px-4 py-2.5 outline-none focus:border-primary/50 transition-colors" placeholder="••••••••" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Nueva Contraseña</label>
                            <input type="password" className="w-full bg-background/50 border border-border rounded-xl px-4 py-2.5 outline-none focus:border-primary/50 transition-colors" placeholder="••••••••" />
                        </div>
                        <button className="px-6 py-2.5 bg-primary/10 text-primary hover:bg-primary/20 font-medium rounded-xl transition-colors">Actualizar Contraseña</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
