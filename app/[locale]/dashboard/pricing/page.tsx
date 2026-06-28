"use client"

import { useState } from "react"
import { Crown, CheckCircle2, Zap, X, AlertCircle } from "lucide-react"

export default function PricingPage() {
    const [showUpgradeModal, setShowUpgradeModal] = useState(false)
    const [accepted, setAccepted] = useState(false)

    const handleUpgradeClick = () => {
        setAccepted(false)
        setShowUpgradeModal(true)
    }

    const handleConfirmUpgrade = () => {
        if (!accepted) return
        setShowUpgradeModal(false)
        // TODO: llamar al endpoint de upgrade cuando esté disponible
    }

    return (
        <>
        <div className="space-y-8 max-w-5xl mx-auto py-8">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-500 rounded-full font-medium text-sm">
                    <Crown className="w-4 h-4" />
                    <span>Mejora tu plan</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight">Desbloquea todo el potencial de Yeison</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Escala las operaciones de tu empresa con agentes de IA ilimitados y análisis predictivo avanzado.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
                {/* Current Plan */}
                <div className="bg-card/40 backdrop-blur-md border border-primary/10 rounded-3xl p-8 relative overflow-hidden">
                    <h3 className="text-2xl font-semibold mb-2">Plan Starter</h3>
                    <div className="flex items-baseline gap-2 mb-6">
                        <span className="text-4xl font-bold">$0</span>
                        <span className="text-muted-foreground">/mes</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-8">Plan actual. Ideal para explorar la plataforma.</p>
                    
                    <ul className="space-y-4 mb-8">
                        {["1 Agente IA Activo", "Historial de 7 días", "Métricas básicas", "Soporte comunitario"].map((feature, i) => (
                            <li key={i} className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                                <span className="text-muted-foreground">{feature}</span>
                            </li>
                        ))}
                    </ul>
                    
                    <button className="w-full py-3 px-6 rounded-xl bg-white/5 text-muted-foreground font-medium cursor-default">Plan Actual</button>
                </div>

                {/* Pro Plan */}
                <div className="bg-linear-to-b from-primary/20 to-background border border-primary/40 rounded-3xl p-8 relative overflow-hidden shadow-[0_0_40px_rgba(var(--brand-cyan-rgb),0.15)]">
                    <div className="absolute top-0 right-0 bg-primary text-background text-xs font-bold px-3 py-1 rounded-bl-lg">RECOMENDADO</div>
                    
                    <h3 className="text-2xl font-semibold mb-2 text-primary">Plan Business</h3>
                    <div className="flex items-baseline gap-2 mb-6">
                        <span className="text-4xl font-bold">$99</span>
                        <span className="text-muted-foreground">/mes</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-8">Para empresas que quieren automatizar todo su flujo.</p>
                    
                    <ul className="space-y-4 mb-8">
                        {["Agentes IA Ilimitados", "Historial Ilimitado", "Integración WhatsApp & CRM", "Métricas predictivas avanzadas", "Soporte prioritario 24/7"].map((feature, i) => (
                            <li key={i} className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-primary" />
                                <span className="text-foreground">{feature}</span>
                            </li>
                        ))}
                    </ul>
                    
                    <button
                        onClick={handleUpgradeClick}
                        className="w-full py-3 px-6 rounded-xl bg-primary text-background font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                    >
                        <Zap className="w-5 h-5" />
                        Actualizar Ahora
                    </button>
                </div>
            </div>

            {/* Legal notice */}
            <p className="text-center text-xs text-muted-foreground max-w-xl mx-auto">
                Al actualizar tu plan, aceptas los{" "}
                <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Términos y Condiciones
                </a>{" "}
                y la{" "}
                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Política de Privacidad
                </a>
                . La suscripción se renueva automáticamente. Cancela en cualquier momento desde Configuración.
            </p>
        </div>

        {/* Upgrade Confirmation Modal */}
        {showUpgradeModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                <div className="w-full max-w-md bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between p-5 border-b border-border/50">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-xl">
                                <Zap className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold text-base">Actualizar a Plan Business</h3>
                                <p className="text-xs text-muted-foreground">$99 USD / mes · renovación automática</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowUpgradeModal(false)}
                            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <X className="w-4 h-4 text-muted-foreground" />
                        </button>
                    </div>

                    <div className="p-5 space-y-4">
                        {/* Summary */}
                        <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 space-y-2">
                            <p className="text-xs font-semibold text-primary uppercase tracking-wider">Resumen del contrato</p>
                            <ul className="text-xs text-muted-foreground space-y-1.5">
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                                    Agentes IA ilimitados activos
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                                    Integración WhatsApp Business & CRM
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                                    Soporte prioritario 24/7
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                                    Métricas predictivas avanzadas
                                </li>
                            </ul>
                        </div>

                        {/* Billing notice */}
                        <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-amber-200 leading-relaxed">
                                Se realizará un cargo de <strong>$99 USD</strong> al inicio de cada mes.
                                Puedes cancelar en cualquier momento antes del siguiente período de facturación
                                desde <strong>Configuración → Suscripción</strong>.
                            </p>
                        </div>

                        {/* T&C acceptance */}
                        <label className="flex items-start gap-3 cursor-pointer group p-3 rounded-xl hover:bg-white/5 transition-colors">
                            <input
                                type="checkbox"
                                checked={accepted}
                                onChange={(e) => setAccepted(e.target.checked)}
                                className="mt-0.5 w-4 h-4 accent-primary cursor-pointer flex-shrink-0"
                            />
                            <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                                He leído y acepto los{" "}
                                <a
                                    href="/terms"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    Términos y Condiciones
                                </a>{" "}
                                y la{" "}
                                <a
                                    href="/privacy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    Política de Privacidad
                                </a>
                                , incluyendo la renovación automática mensual de la suscripción.
                            </span>
                        </label>

                        {/* Actions */}
                        <div className="flex gap-3 pt-1">
                            <button
                                onClick={() => setShowUpgradeModal(false)}
                                className="flex-1 py-2.5 bg-white/5 border border-border text-muted-foreground rounded-xl text-sm font-medium hover:text-foreground transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleConfirmUpgrade}
                                disabled={!accepted}
                                className="flex-1 py-2.5 bg-primary text-background rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <Zap className="w-4 h-4" />
                                Confirmar upgrade
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}
