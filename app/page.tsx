"use client"

import Link from "next/link"
import { ArrowRight, Zap, BarChart3, Users, Sparkles, Shield, MessageCircle, Clock, CheckCircle, TrendingDown } from "lucide-react"
import { useState } from "react"

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full glass z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary via-accent to-primary rounded-lg flex items-center justify-center shadow-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Yeison</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm text-muted-foreground hover:text-accent transition relative group"
            >
              Producto
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-accent transition relative group">
              Precios
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-accent transition relative group">
              Documentación
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-accent transition">
              Ingresar
            </Link>
            <Link
              href="/login"
              className="px-6 py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover-lift"
            >
              Probar Gratis
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto text-center">
          <div className="fade-in-up inline-block mb-6 px-4 py-2 glass rounded-full border-2 border-primary/30">
            <span className="text-sm font-medium text-accent">✨ Nuevo: Agentes en Español adaptados al mercado boliviano</span>
          </div>

          <h1 className="fade-in-up stagger-1 text-5xl sm:text-6xl lg:text-7xl font-black mb-6 text-balance leading-tight tracking-tight">
            Cierra más ventas{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              sin contratar más personal
            </span>
          </h1>

          <p className="fade-in-up stagger-2 text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 text-balance leading-relaxed">
            Agente inteligente que atienden por WhatsApp 24/7, hacen seguimiento automático y venden por ti.
            Reduce costos, responde a todos tus clientes a tiempo y escala tu negocio sin aumentar tu planilla.
          </p>

          <div className="fade-in-up stagger-3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link
              href="/login"
              className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-bold hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 hover-lift flex items-center gap-2 group btn-premium text-lg"
            >
              Probar Gratis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#demo"
              className="px-8 py-4 glass rounded-lg font-bold transition-all duration-300 border-2 border-primary/30 hover:border-primary/60 text-lg hover:bg-white/20"
            >
              Ver demo (2 minutos)
            </Link>
          </div>

          {/* Hero Visualization */}
          <div className="fade-in-up stagger-4 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary opacity-20 rounded-3xl blur-2xl"></div>
            <div className="relative glass rounded-3xl p-10 border-2 border-primary/30 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full mix-blend-screen filter blur-3xl -z-10"></div>
              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="h-32 bg-gradient-to-br from-primary/30 to-primary/10 rounded-xl animate-pulse"></div>
                  <div
                    className="h-16 bg-gradient-to-br from-accent/30 to-accent/10 rounded-lg animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <div className="space-y-4">
                  <div
                    className="h-40 bg-gradient-to-br from-accent/30 to-accent/10 rounded-xl animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
                <div className="space-y-4">
                  <div
                    className="h-28 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl animate-pulse"
                    style={{ animationDelay: "0.6s" }}
                  ></div>
                  <div
                    className="h-20 bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg animate-pulse"
                    style={{ animationDelay: "0.8s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-y border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-muted-foreground mb-8 text-lg">+2.500 empresas confían en automatización inteligente</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "En ventas gestionadas automáticamente", value: "Bs. millones" },
              { label: "Disponibilidad garantizada", value: "99.9%" },
              { label: "Tiempo de respuesta", value: "<100 ms" },
            ].map((stat, i) => (
              <div
                key={i}
                className="fade-in-up group text-center p-6 glass rounded-2xl transition-all border-2 border-primary/20 hover:bg-white/20"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-4xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-black mb-6">
            Automatización empresarial <span className="text-gradient">sin complejidad</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Yeison fue diseñado para <strong className="text-foreground">PYMES bolivianas</strong> que necesitan vender más, atender mejor y gastar menos.
          </p>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl font-black mb-6 text-balance">
              Todo lo que necesitas. <span className="text-gradient">En un solo lugar.</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Automatización poderosa que tu equipo amará usar
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: MessageCircle,
                title: "🤖 Agente de Ventas por WhatsApp",
                description:
                  "Atiende clientes automáticamente, envía cotizaciones, responde objeciones y hace seguimiento hasta cerrar la venta. Funciona las 24 horas, todos los días.",
                color: "from-primary to-accent",
              },
              {
                icon: BarChart3,
                title: "📊 Análisis y Seguimiento",
                description:
                  "Visualiza cuántos clientes escriben, cuántos compran y en qué etapa se pierden. Decisiones claras, sin Excel.",
                color: "from-accent to-primary",
              },
              {
                icon: Sparkles,
                title: "📣 Agente de Marketing",
                description:
                  "Genera publicaciones, textos promocionales y mantiene activas tus redes sociales sin contratar un community manager.",
                color: "from-primary to-accent",
              },
              {
                icon: Clock,
                title: "⚙️ Flujos Automatizados",
                description:
                  "Seguimientos, recordatorios, recuperación de clientes inactivos y respuestas frecuentes sin intervención humana.",
                color: "from-accent to-primary",
              },
              {
                icon: Users,
                title: "👥 Control para tu Equipo",
                description: "Define reglas, revisa conversaciones y mantén control total. La IA trabaja, tú decides.",
                color: "from-primary to-accent",
              },
              {
                icon: Shield,
                title: "🔒 Seguridad Empresarial",
                description: "Arquitectura segura, control de accesos y datos protegidos. Preparado para crecer con tu empresa.",
                color: "from-accent to-primary",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="fade-in-up group glass p-8 rounded-2xl border-2 border-primary/20 hover:border-primary/60 transition-all duration-300 hover-lift"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} p-2.5 mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Comparison Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-black mb-6">
              Comparación real <span className="text-gradient">(Dolor del mercado)</span>
            </h2>
          </div>

          <div className="glass rounded-3xl p-8 border-2 border-primary/30">
            <h3 className="text-xl font-bold mb-6 text-center">Contratar hoy en Bolivia:</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-xl border border-red-500/30">
                <span className="text-muted-foreground">Vendedor:</span>
                <span className="font-bold text-red-400">Bs. 2.000 – 4.000 / mes</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-xl border border-red-500/30">
                <span className="text-muted-foreground">Encargado de redes:</span>
                <span className="font-bold text-red-400">Bs. 1.500 – 3.000 / mes</span>
              </div>
            </div>

            <div className="text-center p-6 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl border-2 border-primary/40">
              <p className="text-lg mb-2">
                <strong className="text-2xl font-black text-gradient">Yeison reemplaza gran parte de ese trabajo</strong>
              </p>
              <p className="text-3xl font-black text-accent">desde Bs. 700 – 1.000 / mes</p>
              <p className="text-muted-foreground mt-4">Sin horarios, sin rotación y sin errores humanos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl font-black mb-6">Planes y Precios</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Empieza gratis. Escala cuando estés listo.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                name: "Starter",
                price: "Gratis",
                period: "Para siempre",
                description: "Ideal para probar",
                features: [
                  "Hasta 1 agente",
                  "Uso limitado",
                  "Soporte comunidad",
                ],
                cta: "Empezar gratis",
                highlight: false,
              },
              {
                name: "Ventas",
                price: "USD 29-39",
                period: "/mes",
                description: "Agente de ventas completo",
                features: [
                  "Agente de ventas por WhatsApp",
                  "Cotizaciones automáticas",
                  "Seguimiento de clientes",
                  "Soporte estándar",
                ],
                cta: "Probar ahora",
                highlight: false,
              },
              {
                name: "Ventas + Marketing",
                price: "USD 49-59",
                period: "/mes",
                description: "La combinación perfecta",
                features: [
                  "Todo de Ventas",
                  "Agente de Marketing",
                  "Contenidos mensuales",
                  "Métricas básicas",
                  "Soporte prioritario",
                ],
                cta: "Recomendado",
                highlight: true,
              },
              {
                name: "Premium",
                price: "USD 79-99",
                period: "/mes",
                description: "Para equipos grandes",
                features: [
                  "Todos los agentes",
                  "Mayor volumen",
                  "Soporte prioritario 24/7",
                  "Configuración avanzada",
                  "Onboarding personalizado",
                ],
                cta: "Hablar con ventas",
                highlight: false,
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`fade-in-up group relative rounded-3xl border-2 transition-all duration-300 hover-lift ${plan.highlight
                  ? "bg-gradient-to-br from-primary/20 to-accent/10 border-primary/60 md:scale-105"
                  : "glass border-primary/20 hover:border-primary/40"
                  }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-accent text-white text-sm font-bold rounded-full">
                    RECOMENDADO
                  </div>
                )}
                <div className="p-6 h-full flex flex-col">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>

                  <div className="mb-6">
                    <div className="text-3xl font-black">{plan.price}</div>
                    <div className="text-muted-foreground text-sm mt-1">{plan.period}</div>
                  </div>

                  <ul className="space-y-3 mb-6 flex-1">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/login"
                    className={`w-full py-3 rounded-xl font-bold text-center transition-all duration-300 text-sm ${plan.highlight
                      ? "bg-gradient-to-r from-primary to-accent text-white hover:shadow-2xl hover:shadow-primary/40"
                      : "glass border border-primary/30 hover:bg-white/20"
                      }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 glass border-y border-primary/30"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="text-5xl sm:text-6xl font-black mb-6">Automatiza tu negocio hoy</h2>
          <p className="text-xl text-muted-foreground mb-12 text-balance">
            Más ventas, menos costos y control total desde un solo panel.
          </p>
          <Link
            href="/login"
            className="inline-flex px-10 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 hover-lift group btn-premium text-lg"
          >
            Probar gratis – sin tarjeta
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-lg">Yeison</span>
              </div>
              <p className="text-sm text-muted-foreground">Automatización empresarial con IA</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Producto</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="#features" className="hover:text-accent transition">
                    Características
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-accent transition">
                    Precios
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-accent transition">
                    Seguridad
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Empresa</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-accent transition">
                    Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-accent transition">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-accent transition">
                    Carreras
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Recursos</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-accent transition">
                    Documentación
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-accent transition">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-accent transition">
                    Estado
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-accent transition">
                    Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-accent transition">
                    Términos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-accent transition">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground gap-4">
            <p>&copy; 2025 Yeison. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-accent transition">
                Twitter
              </Link>
              <Link href="#" className="hover:text-accent transition">
                LinkedIn
              </Link>
              <Link href="#" className="hover:text-accent transition">
                WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
