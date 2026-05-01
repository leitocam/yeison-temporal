"use client"

import { Crown, CheckCircle2, Zap } from "lucide-react"

export default function PricingPage() {
    return (
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
                    
                    <button className="w-full py-3 px-6 rounded-xl bg-primary text-background font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                        <Zap className="w-5 h-5" />
                        Actualizar Ahora
                    </button>
                </div>
            </div>
        </div>
    )
}
