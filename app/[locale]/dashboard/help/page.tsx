"use client"

import { HelpCircle, Book, MessageSquare, PhoneCall } from "lucide-react"

export default function HelpPage() {
    return (
        <div className="space-y-6 max-w-4xl">
            <div className="bg-linear-to-br from-primary/20 via-accent/10 to-transparent p-8 rounded-3xl border border-primary/20">
                <h1 className="text-3xl font-bold">¿Cómo podemos ayudarte hoy?</h1>
                <p className="text-muted-foreground mt-2 max-w-xl">Encuentra respuestas rápidas en nuestra documentación o contacta directamente con nuestro equipo de soporte IA.</p>
                
                <div className="mt-6 relative max-w-md">
                    <input type="text" placeholder="Buscar en la base de conocimientos..." className="w-full bg-background/80 backdrop-blur-md border border-primary/20 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-colors shadow-lg" />
                    <button className="absolute right-2 top-2 px-4 py-1 bg-primary text-background font-medium rounded-lg">Buscar</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card/40 backdrop-blur-md border border-primary/10 rounded-2xl p-6 hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500 w-fit mb-4 group-hover:scale-110 transition-transform">
                        <Book className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-lg">Documentación</h3>
                    <p className="text-sm text-muted-foreground mt-1">Guías paso a paso para configurar Yeison en tu empresa.</p>
                </div>

                <div className="bg-card/40 backdrop-blur-md border border-primary/10 rounded-2xl p-6 hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500 w-fit mb-4 group-hover:scale-110 transition-transform">
                        <MessageSquare className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-lg">Chat con Soporte</h3>
                    <p className="text-sm text-muted-foreground mt-1">Habla con nuestro agente de soporte para resolver dudas técnicas.</p>
                </div>

                <div className="bg-card/40 backdrop-blur-md border border-primary/10 rounded-2xl p-6 hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500 w-fit mb-4 group-hover:scale-110 transition-transform">
                        <PhoneCall className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-lg">Agendar Llamada</h3>
                    <p className="text-sm text-muted-foreground mt-1">Habla con un humano experto en integraciones IA.</p>
                </div>
            </div>
        </div>
    )
}
